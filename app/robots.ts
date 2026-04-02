import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { normalizeHostname } from '@/lib/utils';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get('host') || 'localhost');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Block AI crawlers that waste CPU scraping content
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'Amazonbot',
          'FacebookBot',
          'Meta-ExternalAgent',
          'Bytespider',
          'Applebot-Extended',
          'PerplexityBot',
          'Cohere-ai',
        ],
        disallow: '/',
      },
    ],
    sitemap: `https://${hostname}/sitemap.xml`,
  };
}
