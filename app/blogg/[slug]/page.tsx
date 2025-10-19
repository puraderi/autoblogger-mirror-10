import { headers } from "next/headers";
import { getWebsiteDataByHostname } from "@/lib/services/website";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/services/blog";
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

  // Fetch all posts to find related, previous, and next posts
  const allPosts = await getAllBlogPosts(websiteData.id);
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);

  // Get related posts (exclude current post, take up to 3 random posts with same tags)
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.tags?.some((tag) => post.tags?.includes(tag)))
    .slice(0, 3);

  // If not enough related posts with same tags, fill with other posts
  if (relatedPosts.length < 3) {
    const additionalPosts = allPosts
      .filter((p) => p.id !== post.id && !relatedPosts.includes(p))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...additionalPosts);
  }

  // Get previous and next posts
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

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
