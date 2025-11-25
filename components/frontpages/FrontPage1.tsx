import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

// FrontPage 1: Classic Grid - Hero section with 3-column post grid
export default function FrontPage1({ websiteData, blogPosts }: FrontPageProps) {
  return (
    <>
      {/* Hero Section */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-12 md:py-20`}>
        <div className="text-center max-w-4xl mx-auto">
          {websiteData.frontpage_hero_title && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: websiteData.primary_color }}>
              {websiteData.frontpage_hero_title}
            </h1>
          )}
          {websiteData.frontpage_hero_text && (
            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
              {websiteData.frontpage_hero_text}
            </p>
          )}
        </div>

        {websiteData.topic_image_landscape_16_9 && (
          <div className="mt-8 max-w-5xl mx-auto">
            <Image
              src={websiteData.topic_image_landscape_16_9}
              alt={websiteData.website_name}
              width={1200}
              height={675}
              className={`w-full h-auto shadow-lg ${websiteData.border_radius}`}
            />
          </div>
        )}
      </div>

      {/* Blog Posts Grid */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-12`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: websiteData.primary_color }}>
            Senaste inläggen
          </h2>
          <Link href="/blogg" className="text-sm font-medium hover:underline" style={{ color: websiteData.accent_color }}>
            Visa alla
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blogg/${post.slug}`} className="group">
              <article className={`border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${websiteData.border_radius}`} style={{ borderColor: websiteData.secondary_color }}>
                {post.image_url && (
                  <div className="overflow-hidden">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  {post.tags && post.tags[0] && (
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: websiteData.accent_color }}>
                      {post.tags[0]}
                    </span>
                  )}
                  <h3 className="text-lg font-bold mt-2 mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity" style={{ color: websiteData.primary_color }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="text-xs text-gray-500">
                    {websiteData.author_name}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Outro Section */}
      {websiteData.frontpage_outro_text && (
        <div className={`${websiteData.container_width} mx-auto px-4 py-12 md:py-16`}>
          <div className={`text-center max-w-3xl mx-auto p-8 md:p-10 ${websiteData.border_radius}`} style={{ backgroundColor: `${websiteData.secondary_color}50` }}>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: websiteData.frontpage_outro_text }} style={{ color: websiteData.text_color }} />
          </div>
        </div>
      )}
    </>
  );
}
