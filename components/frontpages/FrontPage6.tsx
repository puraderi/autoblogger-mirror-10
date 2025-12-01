import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import { getContrastTextColor } from '@/lib/utils';
import { getLanguageConfig } from '@/lib/languages';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

// FrontPage 6: Bold Hero - Full primary color hero section
export default function FrontPage6({ websiteData, blogPosts }: FrontPageProps) {
  const lang = getLanguageConfig(websiteData.language);
  const heroTextColor = getContrastTextColor(websiteData.primary_color);
  const heroMuted = heroTextColor === 'white' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)';

  return (
    <>
      {/* Colored Hero Section */}
      <div style={{ backgroundColor: websiteData.primary_color }}>
        <div className={`${websiteData.container_width} mx-auto px-4 py-16 md:py-24`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              {websiteData.frontpage_hero_title && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: heroTextColor }}>
                  {websiteData.frontpage_hero_title}
                </h1>
              )}
              {websiteData.frontpage_hero_text && (
                <p className="text-lg md:text-xl mb-8" style={{ color: heroMuted }}>
                  {websiteData.frontpage_hero_text}
                </p>
              )}
              <Link
                href={`/${lang.slugs.blog}`}
                className="inline-block text-base font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: heroTextColor === 'white' ? 'white' : 'black',
                  color: websiteData.primary_color,
                  padding: '1rem 2rem'
                }}
              >
                {lang.labels.exploreBlog} →
              </Link>
            </div>

            {websiteData.topic_image_landscape_16_9 && (
              <div className="hidden lg:block">
                <Image
                  src={websiteData.topic_image_landscape_16_9}
                  alt={websiteData.website_name}
                  width={600}
                  height={400}
                  className={`w-full h-auto shadow-2xl ${websiteData.border_radius}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: websiteData.primary_color }}>
            {lang.labels.latestPosts}
          </h2>
          <Link href={`/${lang.slugs.blog}`} className="text-sm font-medium hover:underline" style={{ color: websiteData.accent_color }}>
            {lang.labels.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/${lang.slugs.blog}/${post.slug}`} className="group">
              <article className={`border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${websiteData.border_radius}`} style={{ borderColor: websiteData.secondary_color }}>
                {post.image_url && (
                  <div className="overflow-hidden">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  {post.tags && post.tags[0] && (
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: websiteData.accent_color }}>
                      {post.tags[0]}
                    </span>
                  )}
                  <h3 className="text-lg font-bold mt-2 mb-2 line-clamp-2 transition-colors group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Outro Section */}
      {websiteData.frontpage_outro_text && (
        <div style={{ backgroundColor: websiteData.secondary_color }}>
          <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
            <div className="max-w-3xl mx-auto text-center">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: websiteData.frontpage_outro_text }} style={{ color: getContrastTextColor(websiteData.secondary_color) }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
