import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getWebsiteDataByHostname } from '@/lib/services/website';
import { getBlogPosts } from '@/lib/services/blog';
import { Metadata } from 'next';

interface AuthorPageProps {
  params: {
    'author-slug': string;
  };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const headersList = await headers();
  const hostname = headersList.get('host') || 'localhost';

  const websiteData = await getWebsiteDataByHostname(hostname);
  if (!websiteData || !websiteData.author_name) {
    return {};
  }

  if (!websiteData.author_slug || websiteData.author_slug !== params['author-slug']) {
    return {};
  }

  return {
    title: `${websiteData.author_name} - ${websiteData.website_name}`,
    description: websiteData.author_bio || `Artiklar av ${websiteData.author_name}`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const headersList = await headers();
  const hostname = headersList.get('host') || 'localhost';

  const websiteData = await getWebsiteDataByHostname(hostname);

  if (!websiteData || !websiteData.author_name) {
    notFound();
  }

  // Verify the slug matches
  if (!websiteData.author_slug || websiteData.author_slug !== params['author-slug']) {
    notFound();
  }

  // Get all blog posts for this website
  const posts = await getBlogPosts(websiteData.id, 100);

  return (
    <div className="min-h-screen">
      {/* Author Hero Section */}
      <div className="py-12 md:py-16" style={{ backgroundColor: websiteData.secondary_color }}>
        <div className={`${websiteData.container_width} mx-auto px-4 text-center`}>
          {websiteData.author_image_url && (
            <Image
              src={websiteData.author_image_url}
              alt={websiteData.author_name || "Author"}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-6"
            />
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: websiteData.primary_color }}>
            {websiteData.author_name}
          </h1>
          {websiteData.author_bio && (
            <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto" style={{ color: websiteData.text_color }}>
              {websiteData.author_bio}
            </p>
          )}
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-8 md:py-12`}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8" style={{ color: websiteData.primary_color }}>
          Artiklar av {websiteData.author_name}
        </h2>

        {posts.length === 0 ? (
          <p style={{ color: websiteData.text_color }}>Inga artiklar publicerade än.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blogg/${post.slug}`} className="group">
                <div className={`overflow-hidden ${websiteData.border_radius} border`} style={{ borderColor: websiteData.secondary_color }}>
                  {post.image_url && (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                      {post.title}
                    </h3>
                    {post.meta_description && (
                      <p className="text-sm md:text-base line-clamp-2" style={{ color: websiteData.text_color }}>
                        {post.meta_description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
