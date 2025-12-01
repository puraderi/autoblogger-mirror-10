import { headers } from "next/headers";
import { getWebsiteDataByHostname } from "@/lib/services/website";
import PageTemplate from "@/components/pages";
import { normalizeHostname } from "@/lib/utils";
import { getLanguageConfig } from "@/lib/languages";

// Revalidate every hour (skip for localhost in production check)
export const revalidate = 3600;

export default async function ContactPage() {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get("host") || "localhost");
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return null;
  }

  const lang = getLanguageConfig(websiteData.language);

  // Replace {{CONTACT_EMAIL}} placeholder with actual email
  const contactEmail = websiteData.contact_email || 'nordicblogs@gmail.com';
  const contactContent = websiteData.contact_us.replace(/\{\{CONTACT_EMAIL\}\}/g, contactEmail);

  return (
    <PageTemplate
      websiteData={websiteData}
      title={lang.labels.contact}
      content={contactContent}
    />
  );
}
