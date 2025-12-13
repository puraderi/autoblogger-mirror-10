import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import { getLanguageConfig } from '@/lib/languages';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

// FrontPage 2: Featured Post with Sidebar (uses serif heading font & light background)
export default function FrontPage2({ websiteData, blogPosts }: FrontPageProps) {
  const lang = getLanguageConfig(websiteData.language);
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* Hero Section - Always present */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
        <div className={`text-center p-12 ${websiteData.border_radius}`} style={{ backgroundColor: websiteData.secondary_color }}>
          {websiteData.frontpage_hero_title && (
            <h1 className="text-4xl md:text-5xl font-bold mb-6 break-words max-w-full" style={{ color: websiteData.primary_color }}>
              {websiteData.frontpage_hero_title}
            </h1>
          )}
          {websiteData.frontpage_hero_text && (
            <p className="text-xl max-w-3xl mx-auto" style={{ color: websiteData.text_color }}>
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

      <div className={`${websiteData.container_width} mx-auto px-4 py-12`}>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {featured && (
            <Link href={`/${lang.slugs.blog}/${featured.slug}`} className="group block mb-8">
              <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: websiteData.accent_color }}>
                {featured.image_url && (
                  <Image
                    src={featured.image_url}
                    alt={featured.title}
                    width={800}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                )}
                <div className="p-8">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: websiteData.accent_color }}>{lang.labels.featuredPost}</div>
                  <h2 className="text-3xl font-bold mb-3 transition-colors group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                    {featured.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{featured.excerpt}</p>
                  <div className="text-sm text-gray-500">Av {websiteData.author_name}</div>
                </div>
              </div>
            </Link>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold" style={{ color: websiteData.primary_color }}>{lang.labels.latestPosts}</h3>
            <Link href={`/${lang.slugs.blog}`} className="text-sm font-medium hover:underline" style={{ color: websiteData.accent_color }}>
              {lang.labels.viewAll}
            </Link>
          </div>
          {rest.slice(0, 5).map((post) => (
            <Link key={post.id} href={`/${lang.slugs.blog}/${post.slug}`} className="group block">
              <div className="border-l-4 pl-4 hover:bg-gray-50 transition-all duration-200 py-2 hover:pl-5" style={{ borderColor: websiteData.secondary_color }}>
                <h4 className="font-semibold mb-1 transition-colors group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{websiteData.author_name}</span>
                  {post.published_at && (
                    <>
                      <span>·</span>
                      <span>{new Date(post.published_at).toLocaleDateString(lang.locale)}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>

      {/* Outro Section */}
      {websiteData.frontpage_outro_text && (
        <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
          <div className={`text-center max-w-3xl mx-auto p-8 ${websiteData.border_radius} border-2`} style={{ borderColor: websiteData.accent_color }}>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: websiteData.frontpage_outro_text }} style={{ color: websiteData.text_color }} />
          </div>
        </div>
      )}
    </>
  );
}
