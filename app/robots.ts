import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { normalizeHostname } from '@/lib/utils';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get('host') || 'localhost');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${hostname}/sitemap.xml`,
  };
}
