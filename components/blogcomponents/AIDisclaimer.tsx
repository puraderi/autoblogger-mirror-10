import { WebsiteData } from '@/lib/services/website';
import { getDisclaimerText } from '@/lib/disclaimerVariations';

interface AIDisclaimerProps {
  websiteData: WebsiteData;
}

export default function AIDisclaimer({ websiteData }: AIDisclaimerProps) {
  // Check ai_tag - default to true if null/undefined
  const showDisclaimer = websiteData.ai_tag !== false;
  if (!showDisclaimer) return null;

  const { disclaimerText, hasEmail, email } = getDisclaimerText(
    websiteData.id,
    websiteData.language,
    websiteData.website_name,
    websiteData.contact_email
  );

  // Split text to make email a clickable link if present
  let content: React.ReactNode = disclaimerText;

  if (hasEmail && email) {
    const parts = disclaimerText.split(email);
    if (parts.length === 2) {
      content = (
        <>
          {parts[0]}
          <a
            href={`mailto:${email}`}
            className="underline hover:opacity-80"
            style={{ color: websiteData.accent_color }}
          >
            {email}
          </a>
          {parts[1]}
        </>
      );
    }
  }

  return (
    <div
      id="ai-disclaimer"
      className={`p-4 md:p-5 ${websiteData.border_radius} flex items-start gap-3`}
      style={{
        backgroundColor: `${websiteData.secondary_color}40`,
        borderLeft: `3px solid ${websiteData.accent_color}`,
      }}
    >
      <svg
        className="w-5 h-5 flex-shrink-0 mt-0.5"
        style={{ color: websiteData.accent_color }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
      <p className="text-sm leading-relaxed" style={{ color: websiteData.text_color }}>
        {content}
      </p>
    </div>
  );
}
