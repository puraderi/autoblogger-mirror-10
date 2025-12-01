import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getWebsiteDataByHostname } from '@/lib/services/website';
import { getAllBlogPosts } from '@/lib/services/blog';
import { normalizeHostname } from '@/lib/utils';
import { getLanguageConfig } from '@/lib/languages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get('host') || 'localhost');
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return [];
  }

  const lang = getLanguageConfig(websiteData.language);
  const blogPosts = await getAllBlogPosts(websiteData.id);
  const baseUrl = `https://${hostname}`;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/${lang.slugs.blog}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${lang.slugs.about}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang.slugs.contact}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Add author page if author_slug exists
  if (websiteData.author_slug) {
    staticPages.push({
      url: `${baseUrl}/${websiteData.author_slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Blog post pages
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/${lang.slugs.blog}/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...blogPostPages];
}
