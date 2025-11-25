import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import { getContrastTextColor } from '@/lib/utils';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

// FrontPage 5: Card Masonry Style
export default function FrontPage5({ websiteData, blogPosts }: FrontPageProps) {
  return (
    <>
      {/* Hero Section */}
      <div className={`${websiteData.container_width} mx-auto px-4 py-16`}>
        <div className="text-center max-w-4xl mx-auto">
          {websiteData.frontpage_hero_title && (
            <h1 className="text-4xl md:text-6xl font-bold mb-6 break-words max-w-full" style={{ color: websiteData.primary_color }}>
              {websiteData.frontpage_hero_title}
            </h1>
          )}
          {websiteData.frontpage_hero_text && (
            <p className="text-xl mb-8" style={{ color: websiteData.text_color }}>
              {websiteData.frontpage_hero_text}
            </p>
          )}
        </div>
      </div>

      <div className="py-12" style={{ backgroundColor: websiteData.secondary_color }}>
        <div className={`${websiteData.container_width} mx-auto px-4`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: websiteData.primary_color }}>Senaste inläggen</h2>
            <Link href="/blogg" className="text-sm font-medium hover:underline" style={{ color: websiteData.accent_color }}>
              Visa alla →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <Link key={post.id} href={`/blogg/${post.slug}`} className={`group ${idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  {post.image_url && (
                    <div className="overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        width={600}
                        height={idx === 0 ? 400 : 300}
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${idx === 0 ? 'h-64' : 'h-48'}`}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: websiteData.accent_color, color: getContrastTextColor(websiteData.accent_color) }}>
                      {post.tags?.[0] || 'Inlägg'}
                    </div>
                    <h2 className={`font-bold mb-2 transition-colors group-hover:opacity-80 line-clamp-2 ${idx === 0 ? 'text-2xl' : 'text-xl'}`} style={{ color: websiteData.primary_color }}>
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3">
                      {websiteData.author_image_url && (
                        <Image
                          src={websiteData.author_image_url}
                          alt={websiteData.author_name || 'Författare'}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <div className="text-sm">
                        <div className="font-semibold" style={{ color: websiteData.primary_color }}>{websiteData.author_name}</div>
                        {post.published_at && (
                          <div className="text-gray-500 text-xs">
                            {new Date(post.published_at).toLocaleDateString('sv-SE', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </div>
                        )}
                      </div>
                    </div>
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
          <div className="text-center max-w-3xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: websiteData.frontpage_outro_text }} style={{ color: websiteData.text_color }} />
          </div>
        </div>
      )}
    </>
  );
}
