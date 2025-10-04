import { headers } from "next/headers";
import { getWebsiteDataByHostname } from "@/lib/services/website";
import PageTemplate from "@/components/pages";

// Revalidate every hour (skip for localhost in production check)
export const revalidate = 3600;

export default async function AboutPage() {
  const headersList = await headers();
  const hostname = headersList.get("host") || "localhost";
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return null;
  }

  return (
    <PageTemplate
      websiteData={websiteData}
      title="Om oss"
      content={websiteData.about_us}
    />
  );
}
