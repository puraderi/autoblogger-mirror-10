import Image from 'next/image';
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

  return (
    <div className={`p-4 md:p-8 ${websiteData.border_radius} flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start`} style={{ backgroundColor: websiteData.secondary_color }}>
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
        <p className="text-sm leading-relaxed" style={{ color: websiteData.text_color }}>
          {authorBio || defaultBio}
        </p>
      </div>
    </div>
  );
}
