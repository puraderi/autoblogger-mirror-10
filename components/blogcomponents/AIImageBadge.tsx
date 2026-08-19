import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import { getImageBadgeLabel } from '@/lib/disclaimerVariations';
import { showAIDisclosure } from '@/lib/aiDisclosure';

interface AIImageBadgeProps {
  websiteData: WebsiteData;
  post: Pick<BlogPost, 'ai_tag' | 'post_type'> | null;
  // Overrides the default bottom-right placement for templates where that
  // corner is already occupied (e.g. the full-bleed hero in BlogPost4).
  position?: 'bottom-right' | 'top-right';
}

const positions = {
  'bottom-right': 'bottom-2 right-2 md:bottom-3 md:right-3',
  'top-right': 'top-2 right-2 md:top-3 md:right-3',
};

/**
 * Corner label marking an article image as AI-generated.
 * Requires a positioned ancestor.
 */
export default function AIImageBadge({ websiteData, post, position = 'bottom-right' }: AIImageBadgeProps) {
  if (!showAIDisclosure(websiteData, post)) return null;

  return (
    <span
      className={`pointer-events-none absolute ${positions[position]} z-20 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[10px] md:text-[11px] font-medium leading-none text-white backdrop-blur-sm`}
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
      {getImageBadgeLabel(websiteData.language)}
    </span>
  );
}
