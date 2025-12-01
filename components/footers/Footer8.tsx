import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';
import { getContrastTextColor } from '@/lib/utils';
import { getLanguageConfig } from '@/lib/languages';

interface FooterProps {
  websiteData: WebsiteData;
}

// Footer 8: Dotted Pattern - Secondary color with dotted pattern overlay
export default function Footer8({ websiteData }: FooterProps) {
  const lang = getLanguageConfig(websiteData.language);
  const textColor = getContrastTextColor(websiteData.secondary_color);
  const mutedText = textColor === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';
  const accentTextColor = getContrastTextColor(websiteData.accent_color);

  return (
    <footer className="mt-auto relative overflow-hidden" style={{ backgroundColor: websiteData.secondary_color }}>
      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(${textColor === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)'} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="container mx-auto px-4 py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Brand - Large */}
          <div className="lg:col-span-5">
            <h3 className="font-bold text-3xl mb-4" style={{ color: textColor }}>
              {websiteData.website_name}
            </h3>
            <p className="text-base leading-relaxed mb-6 max-w-md" style={{ color: mutedText }}>
              {websiteData.topic}
            </p>

            {/* Social row */}
            <div className="flex items-center gap-3">
              {websiteData.social_twitter && (
                <a href={websiteData.social_twitter} className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: websiteData.accent_color }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: accentTextColor }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
              {websiteData.social_facebook && (
                <a href={websiteData.social_facebook} className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: websiteData.accent_color }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: accentTextColor }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {websiteData.social_instagram && (
                <a href={websiteData.social_instagram} className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: websiteData.accent_color }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: accentTextColor }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {websiteData.social_linkedin && (
                <a href={websiteData.social_linkedin} className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: websiteData.accent_color }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: accentTextColor }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: textColor }}>{lang.labels.pages}</h4>
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/" className="transition-opacity hover:opacity-80" style={{ color: mutedText }}>{lang.labels.home}</Link>
              <Link href={`/${lang.slugs.blog}`} className="transition-opacity hover:opacity-80" style={{ color: mutedText }}>{lang.labels.blog}</Link>
              <Link href={`/${lang.slugs.about}`} className="transition-opacity hover:opacity-80" style={{ color: mutedText }}>{lang.labels.about}</Link>
              <Link href={`/${lang.slugs.contact}`} className="transition-opacity hover:opacity-80" style={{ color: mutedText }}>{lang.labels.contact}</Link>
            </nav>
          </div>

          {/* CTA Card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-xl" style={{ backgroundColor: websiteData.primary_color }}>
              <h4 className="font-bold text-lg mb-2" style={{ color: getContrastTextColor(websiteData.primary_color) }}>
                {lang.labels.stayInTouch}
              </h4>
              <p className="text-sm mb-4" style={{ color: getContrastTextColor(websiteData.primary_color) === 'white' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>
                {lang.labels.haveQuestions} {lang.labels.hereToHelp}
              </p>
              <Link
                href={`/${lang.slugs.contact}`}
                className="inline-block text-sm font-medium rounded-lg transition-all hover:scale-105"
                style={{
                  backgroundColor: getContrastTextColor(websiteData.primary_color) === 'white' ? 'white' : 'black',
                  color: websiteData.primary_color,
                  padding: '0.625rem 1.25rem'
                }}
              >
                {lang.labels.contact} →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ borderColor: `${textColor === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`, color: mutedText }}>
          <p>© {new Date().getFullYear()} {websiteData.website_name}</p>
          <Link href="/sitemap.xml" className="transition-opacity hover:opacity-80">{lang.labels.sitemap}</Link>
        </div>
      </div>
    </footer>
  );
}
