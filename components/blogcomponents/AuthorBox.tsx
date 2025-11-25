import Image from 'next/image';
import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';

interface AuthorBoxProps {
  websiteData: WebsiteData;
  authorName: string | null;
  authorAvatar?: string | null;
  authorBio?: string;
}

export default function AuthorBox({ websiteData, authorName, authorAvatar, authorBio }: AuthorBoxProps) {
  if (!authorName) return null;

  const defaultBio = `${authorName} är en skribent för ${websiteData.website_name}.`;
  const authorSlug = websiteData.author_slug;

  const content = (
    <div className={`p-4 md:p-8 ${websiteData.border_radius} flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start transition-all duration-200 ${authorSlug ? 'hover:shadow-md' : ''}`} style={{ backgroundColor: websiteData.secondary_color }}>
      {authorAvatar && (
        <div className="flex-shrink-0">
          <Image
            src={authorAvatar}
            alt={authorName}
            width={80}
            height={80}
            className="rounded-full w-20 h-20 object-cover"
          />
        </div>
      )}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: websiteData.primary_color }}>
          Om {authorName}
        </h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: websiteData.text_color }}>
          {authorBio || defaultBio}
        </p>
        {authorSlug && (
          <span className="text-sm font-medium hover:underline" style={{ color: websiteData.accent_color }}>
            Läs mer om {authorName} →
          </span>
        )}
      </div>
    </div>
  );

  if (authorSlug) {
    return <Link href={`/${authorSlug}`}>{content}</Link>;
  }

  return content;
}
