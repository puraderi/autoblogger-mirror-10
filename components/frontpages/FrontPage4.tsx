import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

// FrontPage 4: Minimal List Style
export default function FrontPage4({ websiteData, blogPosts }: FrontPageProps) {
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
        <div className="space-y-12 mb-16">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blogg/${post.slug}`} className="group block">
              <article className="border-b pb-8" style={{ borderColor: websiteData.secondary_color }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {post.image_url && (
                    <div className="md:col-span-1">
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        width={300}
                        height={200}
                        className={`w-full h-48 object-cover ${websiteData.border_radius}`}
                      />
                    </div>
                  )}
                  <div className={post.image_url ? 'md:col-span-2' : 'md:col-span-3'}>
                    <h2 className="text-3xl font-bold mb-3 group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                      {post.title}
                    </h2>
                    <p className="mb-4 text-lg" style={{ color: websiteData.text_color }}>{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm opacity-70" style={{ color: websiteData.text_color }}>
                      <span>{websiteData.author_name}</span>
                      {post.published_at && (
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
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
      {websiteData.frontpage_outro_text && (
        <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
          <div className="text-center max-w-2xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: websiteData.frontpage_outro_text }} style={{ color: websiteData.text_color }} />
          </div>
        </div>
      )}
    </>
  );
}
