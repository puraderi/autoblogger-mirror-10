'use client';

import { WebsiteData } from '@/lib/services/website';

interface ShareButtonsProps {
  websiteData: WebsiteData;
  title: string;
  url: string;
}

export default function ShareButtons({ websiteData, title, url }: ShareButtonsProps) {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Länk kopierad till urklipp!');
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
      <span className="text-sm font-semibold whitespace-nowrap" style={{ color: websiteData.text_color }}>
        Dela:
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 md:px-4 py-2 ${websiteData.border_radius} text-white text-xs md:text-sm font-medium transition-opacity hover:opacity-80`}
          style={{ backgroundColor: websiteData.primary_color }}
        >
          Twitter
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 md:px-4 py-2 ${websiteData.border_radius} text-white text-xs md:text-sm font-medium transition-opacity hover:opacity-80`}
          style={{ backgroundColor: websiteData.primary_color }}
        >
          Facebook
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 md:px-4 py-2 ${websiteData.border_radius} text-white text-xs md:text-sm font-medium transition-opacity hover:opacity-80`}
          style={{ backgroundColor: websiteData.primary_color }}
        >
          LinkedIn
        </a>
        <button
          onClick={copyToClipboard}
          className={`px-3 md:px-4 py-2 ${websiteData.border_radius} text-xs md:text-sm font-medium transition-opacity hover:opacity-80`}
          style={{ backgroundColor: websiteData.secondary_color, color: websiteData.text_color }}
        >
          Kopiera länk
        </button>
      </div>
    </div>
  );
}
