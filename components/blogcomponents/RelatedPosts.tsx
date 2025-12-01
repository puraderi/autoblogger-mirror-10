import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import { getLanguageConfig } from '@/lib/languages';

interface RelatedPostsProps {
  websiteData: WebsiteData;
  posts: BlogPost[];
}

export default function RelatedPosts({ websiteData, posts }: RelatedPostsProps) {
  const lang = getLanguageConfig(websiteData.language);
  if (!posts || posts.length === 0) return null;

  return (
    <div className="py-8 md:py-12 px-4" style={{ backgroundColor: websiteData.secondary_color }}>
      <div className={`${websiteData.container_width} mx-auto`}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8" style={{ color: websiteData.primary_color }}>
          {lang.labels.relatedPosts}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/${lang.slugs.blog}/${post.slug}`} className="group">
              <div className={`bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${websiteData.border_radius}`}>
                {post.image_url && (
                  <div className="overflow-hidden">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4 md:p-5">
                  <h3 className="font-bold text-base md:text-lg mb-2 transition-colors group-hover:opacity-80 line-clamp-2" style={{ color: websiteData.primary_color }}>
                    {post.title}
                  </h3>
                  <p className="text-xs md:text-sm mb-3 line-clamp-3" style={{ color: websiteData.text_color }}>
                    {post.excerpt}
                  </p>
                  {post.published_at && (
                    <div className="text-xs opacity-70" style={{ color: websiteData.text_color }}>
                      {new Date(post.published_at).toLocaleDateString(lang.locale, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
