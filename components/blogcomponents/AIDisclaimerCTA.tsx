'use client';

import { WebsiteData } from '@/lib/services/website';
import { getDisclaimerText } from '@/lib/disclaimerVariations';

interface AIDisclaimerCTAProps {
  websiteData: WebsiteData;
  // Per-article override. Hidden when either the site or the article opts out.
  aiTag?: boolean | null;
}

export default function AIDisclaimerCTA({ websiteData, aiTag }: AIDisclaimerCTAProps) {
  // Show only when neither the site nor the article has opted out (null/undefined = on).
  const showDisclaimer = websiteData.ai_tag !== false && aiTag !== false;
  if (!showDisclaimer) return null;

  const { ctaText } = getDisclaimerText(
    websiteData.id,
    websiteData.language,
    websiteData.website_name,
    websiteData.contact_email
  );

  const scrollToDisclaimer = () => {
    const element = document.getElementById('ai-disclaimer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add highlight animation
      element.style.transition = 'box-shadow 0.3s ease';
      element.style.boxShadow = `0 0 0 2px ${websiteData.accent_color}`;
      setTimeout(() => {
        element.style.boxShadow = 'none';
      }, 2000);
    }
  };

  return (
    <button
      onClick={scrollToDisclaimer}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${websiteData.border_radius} transition-opacity hover:opacity-80`}
      style={{
        backgroundColor: `${websiteData.accent_color}15`,
        color: websiteData.accent_color,
      }}
    >
      <svg
        className="w-3 h-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
      {ctaText}
    </button>
  );
}
