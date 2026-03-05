import { headers } from "next/headers";
import { getWebsiteDataByHostname } from "@/lib/services/website";
import { getBlogPostBySlug, getRelatedPosts, getSurroundingPosts } from "@/lib/services/blog";
import BlogPostTemplate from "@/components/blogposts";
import StructuredData from "@/components/StructuredData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { normalizeHostname } from "@/lib/utils";

// Use ISR with revalidation - pages are cached but refreshed every 24 hours
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get("host") || "localhost");
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return {
      title: "Post Not Found",
    };
  }

  const post = await getBlogPostBySlug(websiteData.id, slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const metaTitle = post.meta_title || post.title;
  const metaDescription = post.meta_description || post.excerpt;
  const url = `https://${hostname}/blogg/${post.slug}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: url,
      images: post.image_url ? [{ url: post.image_url, alt: post.title }] : [],
      siteName: websiteData.website_name,
      publishedTime: post.published_at || undefined,
      authors: [post.author_name],
      tags: post.tags || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: post.image_url ? [post.image_url] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get("host") || "localhost");
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return notFound();
  }

  const post = await getBlogPostBySlug(websiteData.id, slug);

  if (!post) {
    return notFound();
  }

  // Fetch related and surrounding posts with targeted queries (not entire catalog)
  const [relatedPosts, { previous: previousPost, next: nextPost }] = await Promise.all([
    getRelatedPosts(websiteData.id, post.id, post.tags || [], 3),
    getSurroundingPosts(websiteData.id, post.published_at || post.created_at),
  ]);

  return (
    <>
      <StructuredData websiteData={websiteData} post={post} hostname={hostname} />
      <BlogPostTemplate
        websiteData={websiteData}
        post={post}
        relatedPosts={relatedPosts}
        previousPost={previousPost}
        nextPost={nextPost}
      />
    </>
  );
}
