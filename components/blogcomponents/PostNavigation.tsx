import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';

interface PostNavigationProps {
  websiteData: WebsiteData;
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

export default function PostNavigation({ websiteData, previousPost, nextPost }: PostNavigationProps) {
  if (!previousPost && !nextPost) return null;

  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-6 md:py-8">
      {previousPost ? (
        <Link
          href={`/blogg/${previousPost.slug}`}
          className={`p-4 md:p-6 ${websiteData.border_radius} border-2 transition-all hover:shadow-lg group`}
          style={{ borderColor: websiteData.secondary_color }}
        >
          <div className="text-xs md:text-sm mb-2 opacity-70" style={{ color: websiteData.text_color }}>
            ← Föregående inlägg
          </div>
          <div className="font-bold text-sm md:text-base group-hover:opacity-80 line-clamp-2" style={{ color: websiteData.primary_color }}>
            {previousPost.title}
          </div>
        </Link>
      ) : (
        <div></div>
      )}

      {nextPost ? (
        <Link
          href={`/blogg/${nextPost.slug}`}
          className={`p-4 md:p-6 ${websiteData.border_radius} border-2 transition-all hover:shadow-lg group text-right`}
          style={{ borderColor: websiteData.secondary_color }}
        >
          <div className="text-xs md:text-sm mb-2 opacity-70" style={{ color: websiteData.text_color }}>
            Nästa inlägg →
          </div>
          <div className="font-bold text-sm md:text-base group-hover:opacity-80 line-clamp-2" style={{ color: websiteData.primary_color }}>
            {nextPost.title}
          </div>
        </Link>
      ) : null}
    </nav>
  );
}
