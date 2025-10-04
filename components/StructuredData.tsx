import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';

interface StructuredDataProps {
  websiteData: WebsiteData;
  post: BlogPost;
  hostname: string;
}

export default function StructuredData({ websiteData, post, hostname }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image_url || undefined,
    "author": {
      "@type": "Person",
      "name": post.author_name,
      "image": post.author_avatar || undefined,
    },
    "publisher": {
      "@type": "Organization",
      "name": websiteData.website_name,
      "logo": websiteData.logo_url ? {
        "@type": "ImageObject",
        "url": websiteData.logo_url
      } : undefined,
    },
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://${hostname}/blogg/${post.slug}`
    },
    "keywords": post.tags?.join(", ") || undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
