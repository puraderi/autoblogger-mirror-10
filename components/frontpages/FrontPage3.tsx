import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import { getLanguageConfig } from '@/lib/languages';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

// FrontPage 3: Magazine Style Layout
export default function FrontPage3({ websiteData, blogPosts }: FrontPageProps) {
  const lang = getLanguageConfig(websiteData.language);
  return (
    <>
      {/* Hero Section - Always present */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-12`}>
        <div className="mb-12 border-b-4 pb-8" style={{ borderColor: websiteData.primary_color }}>
          {websiteData.frontpage_hero_title && (
            <h1 className="text-4xl md:text-6xl font-bold mb-4 break-words max-w-full" style={{ color: websiteData.primary_color }}>
              {websiteData.frontpage_hero_title}
            </h1>
          )}
          {websiteData.frontpage_hero_text && (
            <p className="text-lg mt-2" style={{ color: websiteData.text_color }}>
              {websiteData.frontpage_hero_text}
            </p>
          )}
        </div>

        {/* Topic Image Below Text */}
        {websiteData.topic_image_landscape_16_9 && (
          <div className="mb-12 max-w-4xl mx-auto">
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

      <div className={`${websiteData.container_width} mx-auto px-4 py-12`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: websiteData.primary_color }}>{lang.labels.latestPosts}</h2>
          <Link href={`/${lang.slugs.blog}`} className="text-sm font-medium hover:underline" style={{ color: websiteData.accent_color }}>
            {lang.labels.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.slice(0, 2).map((post) => (
            <Link key={post.id} href={`/${lang.slugs.blog}/${post.slug}`} className="group">
              <div className={`relative h-96 overflow-hidden ${websiteData.border_radius}`}>
                {post.image_url && (
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    {post.tags && post.tags[0] && (
                      <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm rounded mb-3">
                        {post.tags[0]}
                      </span>
                    )}
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <p className="text-sm opacity-90 line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {blogPosts.slice(2, 6).map((post) => (
            <Link key={post.id} href={`/${lang.slugs.blog}/${post.slug}`} className="group">
              <div className="border-t-4 pt-4 transition-all duration-200 hover:-translate-y-1" style={{ borderColor: websiteData.accent_color }}>
                {post.image_url && (
                  <div className="overflow-hidden mb-3">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={300}
                      height={200}
                      className={`w-full h-32 object-cover ${websiteData.border_radius} transition-transform duration-300 group-hover:scale-105`}
                    />
                  </div>
                )}
                <h3 className="font-bold mb-2 line-clamp-2 transition-colors group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-xs" style={{ color: websiteData.text_color }}>
                  <span className="opacity-70">{websiteData.author_name}</span>
                  {post.published_at && (
                    <>
                      <span className="opacity-50">·</span>
                      <span className="opacity-70">{new Date(post.published_at).toLocaleDateString(lang.locale)}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Outro Section */}
      {websiteData.frontpage_outro_text && (
        <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
          <div className={`max-w-4xl mx-auto p-10 ${websiteData.border_radius}`} style={{ backgroundColor: websiteData.secondary_color }}>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: websiteData.frontpage_outro_text }} style={{ color: websiteData.text_color }} />
          </div>
        </div>
      )}
    </>
  );
}
