import { headers } from 'next/headers';
import { getWebsiteDataByHostname } from '@/lib/services/website';
import { getAllBlogPosts } from '@/lib/services/blog';
import { normalizeHostname } from '@/lib/utils';
import { getLanguageConfig } from '@/lib/languages';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get('host') || 'localhost');
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return new Response('Website not found', { status: 404 });
  }

  const lang = getLanguageConfig(websiteData.language);
  const blogPosts = await getAllBlogPosts(websiteData.id);
  const baseUrl = `https://${hostname}`;

  // Escape XML special characters
  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const rssItems = blogPosts
    .slice(0, 20) // Limit to 20 most recent posts
    .map((post) => {
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date(post.created_at).toUTCString();

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/${lang.slugs.blog}/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${lang.slugs.blog}/${post.slug}</guid>
      <description>${escapeXml(post.excerpt || '')}</description>
      <pubDate>${pubDate}</pubDate>
      ${post.author_name ? `<author>${escapeXml(post.author_name)}</author>` : ''}
      ${post.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ') || ''}
      ${post.image_url ? `<enclosure url="${escapeXml(post.image_url)}" type="image/jpeg" />` : ''}
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(websiteData.website_name)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(websiteData.meta_description || websiteData.topic || '')}</description>
    <language>${lang.code}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${websiteData.logo_url ? `<image>
      <url>${escapeXml(websiteData.logo_url)}</url>
      <title>${escapeXml(websiteData.website_name)}</title>
      <link>${baseUrl}</link>
    </image>` : ''}
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
