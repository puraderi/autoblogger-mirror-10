import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

// FrontPage 3: Magazine Style Layout
export default function FrontPage3({ websiteData, blogPosts }: FrontPageProps) {
  return (
    <>
      {/* Hero Section */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-12`}>
        <div className="mb-12 border-b-4 pb-8" style={{ borderColor: websiteData.primary_color }}>
          {websiteData.frontpage_hero_title && (
            <h1 className="text-6xl font-bold mb-4" style={{ color: websiteData.primary_color }}>
              {websiteData.frontpage_hero_title}
            </h1>
          )}
          {websiteData.frontpage_hero_text && (
            <p className="text-lg mt-2" style={{ color: websiteData.text_color }}>
              {websiteData.frontpage_hero_text}
            </p>
          )}
        </div>
      </div>

      <div className={`${websiteData.container_width} mx-auto px-4 py-12`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.slice(0, 2).map((post, idx) => (
            <Link key={post.id} href={`/blogg/${post.slug}`} className="group">
              <div className={`relative h-96 overflow-hidden ${websiteData.border_radius}`}>
                {post.image_url && (
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <p className="text-sm opacity-90">{post.excerpt}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {blogPosts.slice(2, 6).map((post) => (
            <Link key={post.id} href={`/blogg/${post.slug}`} className="group">
              <div className="border-t-4 pt-4" style={{ borderColor: websiteData.accent_color }}>
                {post.image_url && (
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    width={300}
                    height={200}
                    className={`w-full h-32 object-cover ${websiteData.border_radius} mb-3`}
                  />
                )}
                <h3 className="font-bold mb-2 group-hover:opacity-80" style={{ color: websiteData.primary_color }}>
                  {post.title}
                </h3>
                <p className="text-xs opacity-70" style={{ color: websiteData.text_color }}>{websiteData.author_name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Outro Section */}
      {websiteData.frontpage_outro_text && (
        <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
          <div className={`max-w-4xl mx-auto p-10 ${websiteData.border_radius}`} style={{ backgroundColor: websiteData.secondary_color }}>
            <div dangerouslySetInnerHTML={{ __html: websiteData.frontpage_outro_text }} style={{ color: websiteData.text_color }} />
          </div>
        </div>
      )}
    </>
  );
}
