import { headers } from "next/headers";
import { getWebsiteDataByHostname } from "@/lib/services/website";
import { getAllBlogPosts } from "@/lib/services/blog";
import Link from "next/link";
import Image from "next/image";

// Revalidate every 60 seconds (skip for localhost in production check)
export const revalidate = 60;

export default async function BlogListPage() {
  const headersList = await headers();
  const hostname = headersList.get("host") || "localhost";
  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData) {
    return null;
  }

  const blogPosts = await getAllBlogPosts(websiteData.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-12" style={{ color: websiteData.primary_color }}>
        Alla blogginlägg
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blogg/${post.slug}`} className="group">
            <article className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow" style={{ borderColor: websiteData.secondary_color }}>
              {post.image_url && (
                <Image
                  src={post.image_url}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: websiteData.accent_color, color: 'white' }}>
                      {post.tags[0]}
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-bold mb-2 group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author_name}</span>
                  {post.published_at && (
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Inga blogginlägg hittades.</p>
        </div>
      )}
    </div>
  );
}
