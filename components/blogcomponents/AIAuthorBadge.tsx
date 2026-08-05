import { WebsiteData } from '@/lib/services/website';
import { getAuthorBadgeLabel, getAuthorDisclosure } from '@/lib/disclaimerVariations';

interface AIAuthorBadgeProps {
  websiteData: WebsiteData;
  // Renders light-on-dark for bylines sitting on top of a hero image.
  onDark?: boolean;
}

/**
 * Chip next to the byline making it explicit that the author is an AI persona
 * rather than a real person. The full sentence rides along as a title/aria
 * label so the disclosure is available to screen readers and on hover.
 */
export default function AIAuthorBadge({ websiteData, onDark = false }: AIAuthorBadgeProps) {
  if (!websiteData.author_name) return null;

  const disclosure = getAuthorDisclosure(
    websiteData.language,
    websiteData.author_name,
    websiteData.website_name
  );

  return (
    <span
      title={disclosure}
      aria-label={disclosure}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] md:text-[11px] font-medium leading-none whitespace-nowrap ${
        onDark ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-gray-900/8 text-gray-600'
      }`}
    >
      <svg
        className="w-2.5 h-2.5 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
      {getAuthorBadgeLabel(websiteData.language)}
    </span>
  );
}
