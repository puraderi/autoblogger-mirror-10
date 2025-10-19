import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

// FrontPage 1: Hero with Grid Layout
export default function FrontPage1({ websiteData, blogPosts }: FrontPageProps) {
  return (
    <>
      {/* Hero Section - Always present */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
        <div className="text-center max-w-4xl mx-auto">
          {websiteData.frontpage_hero_title && (
            <h1 className="text-5xl font-bold mb-6" style={{ color: websiteData.primary_color }}>
              {websiteData.frontpage_hero_title}
            </h1>
          )}
          {websiteData.frontpage_hero_text && (
            <p className="text-xl mb-8" style={{ color: websiteData.text_color }}>
              {websiteData.frontpage_hero_text}
            </p>
          )}
        </div>

        {/* Topic Image Below Text */}
        {websiteData.topic_image_landscape_16_9 && (
          <div className="mt-8 max-w-4xl mx-auto">
            <Image
              src={websiteData.topic_image_landscape_16_9}
              alt={websiteData.website_name}
              width={1200}
              height={675}
              className={`w-full h-auto ${websiteData.border_radius}`}
            />
          </div>
        )}
      </div>

      {/* Blog Posts Grid */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-12`}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: websiteData.primary_color }}>Senaste inläggen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blogg/${post.slug}`} className="group">
              <div className={`border ${websiteData.border_radius} overflow-hidden hover:shadow-lg transition-shadow`} style={{ borderColor: websiteData.secondary_color }}>
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
                  <h3 className="text-xl font-bold mb-2 group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                    {post.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: websiteData.text_color }}>{post.excerpt}</p>
                  <div className="text-sm opacity-70" style={{ color: websiteData.text_color }}>Av {websiteData.author_name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Outro Section - Always present */}
      {websiteData.frontpage_outro_text && (
        <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
          <div className={`text-center max-w-3xl mx-auto p-8 ${websiteData.border_radius}`} style={{ backgroundColor: websiteData.secondary_color }}>
            <div dangerouslySetInnerHTML={{ __html: websiteData.frontpage_outro_text }} style={{ color: websiteData.text_color }} />
          </div>
        </div>
      )}
    </>
  );
}
