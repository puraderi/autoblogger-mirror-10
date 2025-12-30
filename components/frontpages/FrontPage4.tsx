import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import { getLanguageConfig } from '@/lib/languages';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

// FrontPage 4: Minimal List Style
export default function FrontPage4({ websiteData, blogPosts }: FrontPageProps) {
  const lang = getLanguageConfig(websiteData.language);
  const contactEmail = websiteData.contact_email || 'nordicblogs@gmail.com';
  const outroText = websiteData.frontpage_outro_text?.replace(/\{\{CONTACT_EMAIL\}\}/g, contactEmail);
  return (
    <>
      {/* Hero Section */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-20`}>
        <div className="text-center">
          {websiteData.frontpage_hero_title && (
            <h1 className="text-4xl md:text-7xl font-bold mb-8 break-words max-w-full" style={{ color: websiteData.primary_color }}>
              {websiteData.frontpage_hero_title}
            </h1>
          )}
          {websiteData.frontpage_hero_text && (
            <p className="text-2xl max-w-3xl mx-auto" style={{ color: websiteData.text_color }}>
              {websiteData.frontpage_hero_text}
            </p>
          )}
        </div>
      </div>

      <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-medium uppercase tracking-wider" style={{ color: websiteData.text_color }}>{lang.labels.latestPosts}</h2>
          <Link href={`/${lang.slugs.blog}`} className="text-sm font-medium hover:underline" style={{ color: websiteData.accent_color }}>
            {lang.labels.viewAll}
          </Link>
        </div>
        <div className="space-y-0 mb-16">
          {blogPosts.map((post, idx) => (
            <Link key={post.id} href={`/${lang.slugs.blog}/${post.slug}`} className="group block">
              <article className="border-b py-8 transition-all duration-200 hover:bg-gray-50/50 -mx-4 px-4" style={{ borderColor: websiteData.secondary_color }}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-1 text-4xl font-bold opacity-20" style={{ color: websiteData.primary_color }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  {post.image_url && (
                    <div className="md:col-span-3">
                      <div className="overflow-hidden">
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          width={300}
                          height={200}
                          className={`w-full h-40 object-cover ${websiteData.border_radius} transition-transform duration-300 group-hover:scale-105`}
                        />
                      </div>
                    </div>
                  )}
                  <div className={post.image_url ? 'md:col-span-8' : 'md:col-span-11'}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 transition-colors group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                      {post.title}
                    </h2>
                    <p className="mb-4 text-base line-clamp-2" style={{ color: websiteData.text_color }}>{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm opacity-70" style={{ color: websiteData.text_color }}>
                      <span>{websiteData.author_name}</span>
                      {post.published_at && (
                        <>
                          <span>·</span>
                          <span>{new Date(post.published_at).toLocaleDateString(lang.locale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Outro Section */}
      {outroText && (
        <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
          <div className="text-center max-w-2xl mx-auto">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: outroText }} style={{ color: websiteData.text_color }} />
          </div>
        </div>
      )}
    </>
  );
}
