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

// FrontPage 8: Split Tone - Two-tone design with dotted pattern
export default function FrontPage8({ websiteData, blogPosts }: FrontPageProps) {
  const lang = getLanguageConfig(websiteData.language);
  const secondaryTextColor = getContrastTextColor(websiteData.secondary_color);
  const accentTextColor = getContrastTextColor(websiteData.accent_color);
  const contactEmail = websiteData.contact_email || 'nordicblogs@gmail.com';
  const outroText = websiteData.frontpage_outro_text?.replace(/\{\{CONTACT_EMAIL\}\}/g, contactEmail);

  return (
    <>
      {/* Two-tone Hero */}
      <div className="relative">
        {/* Left side - secondary color */}
        <div className="absolute inset-0 lg:w-1/2" style={{ backgroundColor: websiteData.secondary_color }}>
          {/* Dotted pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(${secondaryTextColor === 'white' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'} 1px, transparent 1px)`,
              backgroundSize: '16px 16px'
            }}
          />
        </div>
        {/* Right side - accent color (desktop only) */}
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block" style={{ backgroundColor: websiteData.accent_color }} />

        <div className={`${websiteData.container_width} mx-auto px-4 relative z-10`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] md:min-h-[600px]">
            {/* Text side */}
            <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-12">
              {websiteData.frontpage_hero_title && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: secondaryTextColor }}>
                  {websiteData.frontpage_hero_title}
                </h1>
              )}
              {websiteData.frontpage_hero_text && (
                <p className="text-lg mb-8" style={{ color: secondaryTextColor, opacity: 0.8 }}>
                  {websiteData.frontpage_hero_text}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${lang.slugs.blog}`}
                  className="font-semibold rounded-lg transition-all hover:scale-105"
                  style={{ backgroundColor: websiteData.accent_color, color: accentTextColor, padding: '0.75rem 1.5rem' }}
                >
                  {lang.labels.exploreBlog}
                </Link>
                <Link
                  href={`/${lang.slugs.about}`}
                  className="font-semibold rounded-lg transition-all hover:opacity-80"
                  style={{ backgroundColor: `${secondaryTextColor === 'white' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`, color: secondaryTextColor, padding: '0.75rem 1.5rem' }}
                >
                  {lang.labels.about}
                </Link>
              </div>
            </div>

            {/* Image side (desktop) */}
            <div className="hidden lg:flex items-center justify-center py-16 lg:py-24 lg:pl-12">
              {websiteData.topic_image_landscape_16_9 && (
                <Image
                  src={websiteData.topic_image_landscape_16_9}
                  alt={websiteData.website_name}
                  width={600}
                  height={400}
                  className={`w-full max-w-lg h-auto shadow-2xl ${websiteData.border_radius}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="w-12 h-1 rounded-full mb-4" style={{ backgroundColor: websiteData.accent_color }} />
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: websiteData.primary_color }}>
              {lang.labels.latestPosts}
            </h2>
          </div>
          <Link href={`/${lang.slugs.blog}`} className="text-sm font-medium hover:underline" style={{ color: websiteData.accent_color }}>
            {lang.labels.viewAll}
          </Link>
        </div>

        {/* First post - large */}
        {blogPosts[0] && (
          <Link href={`/${lang.slugs.blog}/${blogPosts[0].slug}`} className="group block mb-10">
            <article className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 transition-all duration-300 hover:shadow-lg ${websiteData.border_radius}`} style={{ backgroundColor: websiteData.secondary_color }}>
              {blogPosts[0].image_url && (
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={blogPosts[0].image_url}
                    alt={blogPosts[0].title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center">
                {blogPosts[0].tags && blogPosts[0].tags[0] && (
                  <span className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: websiteData.accent_color }}>
                    {blogPosts[0].tags[0]}
                  </span>
                )}
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 transition-colors group-hover:opacity-80" style={{ color: secondaryTextColor }}>
                  {blogPosts[0].title}
                </h3>
                <p className="mb-4 line-clamp-3" style={{ color: secondaryTextColor, opacity: 0.8 }}>{blogPosts[0].excerpt}</p>
                <span className="text-sm font-medium" style={{ color: websiteData.accent_color }}>
                  {lang.labels.readMore} →
                </span>
              </div>
            </article>
          </Link>
        )}

        {/* Grid of remaining posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1, 4).map((post) => (
            <Link key={post.id} href={`/${lang.slugs.blog}/${post.slug}`} className="group">
              <article className={`border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${websiteData.border_radius}`} style={{ borderColor: websiteData.secondary_color }}>
                {post.image_url && (
                  <div className="overflow-hidden">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
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
      {outroText && (
        <div style={{ backgroundColor: websiteData.accent_color }}>
          <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
            <div className="max-w-3xl mx-auto text-center">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: outroText }} style={{ color: accentTextColor }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
