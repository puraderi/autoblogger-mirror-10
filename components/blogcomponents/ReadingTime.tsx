import { WebsiteData } from '@/lib/services/website';

interface ReadingTimeProps {
  websiteData: WebsiteData;
  content: string;
}

export default function ReadingTime({ websiteData, content }: ReadingTimeProps) {
  // Calculate reading time (average 200 words per minute)
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="flex items-center gap-2 text-sm">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ color: websiteData.primary_color }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span style={{ color: websiteData.text_color }}>
        {readingTime} min läsning
      </span>
    </div>
  );
}
