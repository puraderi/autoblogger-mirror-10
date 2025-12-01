import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';
import { getContrastTextColor } from '@/lib/utils';
import { getLanguageConfig } from '@/lib/languages';

interface FooterProps {
  websiteData: WebsiteData;
}

// Footer 2: Bold Centered - Full-width colored with stacked elements
export default function Footer2({ websiteData }: FooterProps) {
  const lang = getLanguageConfig(websiteData.language);
  const textColor = getContrastTextColor(websiteData.primary_color);
  const textMuted = textColor === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
  const textSubtle = textColor === 'white' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const textFaint = textColor === 'white' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const bgSubtle = textColor === 'white' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const bgSubtleHover = textColor === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  return (
    <footer className="mt-auto" style={{ backgroundColor: websiteData.primary_color }}>
      <div className="container mx-auto px-4 py-12 text-center" style={{ color: textColor }}>
        {/* Logo/Name */}
        <h3 className="font-bold text-2xl mb-2">{websiteData.website_name}</h3>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: textMuted }}>{websiteData.topic}</p>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8">
          <Link href="/" className="hover:underline underline-offset-4 transition-all">{lang.labels.home}</Link>
          <Link href={`/${lang.slugs.blog}`} className="hover:underline underline-offset-4 transition-all">{lang.labels.blog}</Link>
          <Link href={`/${lang.slugs.about}`} className="hover:underline underline-offset-4 transition-all">{lang.labels.about}</Link>
          <Link href={`/${lang.slugs.contact}`} className="hover:underline underline-offset-4 transition-all">{lang.labels.contact}</Link>
        </nav>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {websiteData.social_twitter && (
            <a href={websiteData.social_twitter} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: bgSubtle }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          )}
          {websiteData.social_facebook && (
            <a href={websiteData.social_facebook} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: bgSubtle }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          )}
          {websiteData.social_instagram && (
            <a href={websiteData.social_instagram} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: bgSubtle }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          )}
          {websiteData.social_linkedin && (
            <a href={websiteData.social_linkedin} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: bgSubtle }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="h-px max-w-xs mx-auto mb-6" style={{ backgroundColor: bgSubtleHover }} />

        {/* Copyright */}
        <p className="text-sm" style={{ color: textSubtle }}>© {new Date().getFullYear()} {websiteData.website_name}. {lang.labels.allRightsReserved}</p>
        <Link href="/sitemap.xml" className="text-xs mt-2 inline-block hover:opacity-80 transition-opacity" style={{ color: textFaint }}>{lang.labels.sitemap}</Link>
      </div>
    </footer>
  );
}
