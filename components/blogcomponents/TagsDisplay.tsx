import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';

interface TagsDisplayProps {
  websiteData: WebsiteData;
  tags: string[];
}

export default function TagsDisplay({ websiteData, tags }: TagsDisplayProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <span className="text-xs md:text-sm font-semibold whitespace-nowrap" style={{ color: websiteData.text_color }}>
        Taggar:
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blogg?tag=${encodeURIComponent(tag)}`}
            className={`px-2.5 md:px-3 py-1 ${websiteData.border_radius} text-xs font-medium transition-opacity hover:opacity-80`}
            style={{ backgroundColor: websiteData.accent_color, color: 'white' }}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
