import { headers } from "next/headers";
import { getWebsiteDataByHostname } from "@/lib/services/website";
import { getBlogPosts } from "@/lib/services/blog";
import FrontPage from "@/components/frontpages";
import WebsiteStructuredData from "@/components/WebsiteStructuredData";
import { normalizeHostname } from "@/lib/utils";
import { filterGeofencedPosts } from "@/lib/geofence";

export default async function Home() {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get("host") || "localhost");
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return null;
  }

  // Fetch extra so geofenced visitors still get a full grid after filtering
  const blogPosts = filterGeofencedPosts(headersList, await getBlogPosts(websiteData.id, 12)).slice(0, 6);

  return (
    <>
      <WebsiteStructuredData websiteData={websiteData} hostname={hostname} />
      <FrontPage websiteData={websiteData} blogPosts={blogPosts} />
    </>
  );
}
