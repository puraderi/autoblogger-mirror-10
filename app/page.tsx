import { headers } from "next/headers";
import { getWebsiteDataByHostname } from "@/lib/services/website";
import { getBlogPosts } from "@/lib/services/blog";
import FrontPage from "@/components/frontpages";
import WebsiteStructuredData from "@/components/WebsiteStructuredData";
import { normalizeHostname } from "@/lib/utils";

// Revalidate every hour — homepage content rarely changes
export const revalidate = 3600;

export default async function Home() {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get("host") || "localhost");
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return null;
  }

  const blogPosts = await getBlogPosts(websiteData.id, 6);

  return (
    <>
      <WebsiteStructuredData websiteData={websiteData} hostname={hostname} />
      <FrontPage websiteData={websiteData} blogPosts={blogPosts} />
    </>
  );
}
