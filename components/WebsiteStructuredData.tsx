import { WebsiteData } from '@/lib/services/website';

interface WebsiteStructuredDataProps {
  websiteData: WebsiteData;
  hostname: string;
}

export default function WebsiteStructuredData({ websiteData, hostname }: WebsiteStructuredDataProps) {
  const baseUrl = `https://${hostname}`;

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": websiteData.website_name,
    "url": baseUrl,
    "logo": websiteData.logo_url || undefined,
    "description": websiteData.meta_description || websiteData.topic,
    "sameAs": [
      websiteData.social_twitter,
      websiteData.social_facebook,
      websiteData.social_instagram,
      websiteData.social_linkedin,
    ].filter(Boolean),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": websiteData.website_name,
    "url": baseUrl,
    "description": websiteData.meta_description || websiteData.topic,
    "publisher": {
      "@type": "Organization",
      "name": websiteData.website_name,
      "logo": websiteData.logo_url ? {
        "@type": "ImageObject",
        "url": websiteData.logo_url,
      } : undefined,
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/blogg?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
