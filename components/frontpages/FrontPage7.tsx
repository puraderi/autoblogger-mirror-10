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

// FrontPage 7: Gradient Hero - Clean gradient with modern card grid
export default function FrontPage7({ websiteData, blogPosts }: FrontPageProps) {
  const lang = getLanguageConfig(websiteData.language);
  const heroTextColor = getContrastTextColor(websiteData.accent_color);

  return (
    <>
      {/* Gradient Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${websiteData.accent_color} 0%, ${websiteData.primary_color} 100%)`
        }}
      >
        {/* Soft decorative blurs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: heroTextColor }} />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: heroTextColor }} />

        <div className={`${websiteData.container_width} mx-auto px-4 py-20 md:py-32 relative z-10`}>
          <div className="text-center max-w-4xl mx-auto">
            {websiteData.frontpage_hero_title && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ color: heroTextColor }}>
                {websiteData.frontpage_hero_title}
              </h1>
            )}
            {websiteData.frontpage_hero_text && (
              <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: heroTextColor, opacity: 0.9 }}>
                {websiteData.frontpage_hero_text}
              </p>
            )}
            <Link
              href={`/${lang.slugs.blog}`}
              className="inline-block text-base font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: heroTextColor === 'white' ? 'white' : 'black',
                color: websiteData.accent_color,
                padding: '1rem 2rem'
              }}
            >
              {lang.labels.exploreBlog}
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Post - Overlapping */}
      {blogPosts[0] && (
        <div className={`${websiteData.container_width} mx-auto px-4 -mt-16 relative z-20`}>
          <Link href={`/${lang.slugs.blog}/${blogPosts[0].slug}`} className="group block">
            <article className={`bg-white shadow-2xl overflow-hidden ${websiteData.border_radius}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {blogPosts[0].image_url && (
                  <div className="overflow-hidden">
                    <Image
                      src={blogPosts[0].image_url}
                      alt={blogPosts[0].title}
                      width={600}
                      height={400}
                      className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: websiteData.accent_color }}>
                    {lang.labels.featuredPost}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 transition-colors group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blogPosts[0].excerpt}</p>
                  <span className="text-sm font-medium" style={{ color: websiteData.accent_color }}>
                    {lang.labels.readMore} →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </div>
      )}

      {/* Rest of posts */}
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
          {blogPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/${lang.slugs.blog}/${post.slug}`} className="group">
              <article className={`bg-white border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${websiteData.border_radius}`} style={{ borderColor: websiteData.secondary_color }}>
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

      {/* Outro */}
      {websiteData.frontpage_outro_text && (
        <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
          <div className={`text-center max-w-3xl mx-auto p-10 ${websiteData.border_radius}`} style={{ backgroundColor: websiteData.secondary_color }}>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: websiteData.frontpage_outro_text }} style={{ color: getContrastTextColor(websiteData.secondary_color) }} />
          </div>
        </div>
      )}
    </>
  );
}
