'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { useState } from 'react';
import { iconToUrl, getContrastTextColor } from '@/lib/utils';
import { getLanguageConfig } from '@/lib/languages';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 6: Bold Primary - Full primary color background with contrast text
export default function Header6({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textColor = getContrastTextColor(websiteData.primary_color);
  const hoverBg = textColor === 'white' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
  const lang = getLanguageConfig(websiteData.language);

  return (
    <header style={{ backgroundColor: websiteData.primary_color }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
              <img
                src={iconToUrl(websiteData.icon_identifier)!}
                alt=""
                className={`w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110 ${textColor === 'white' ? 'brightness-0 invert' : ''}`}
              />
            ) : websiteData.logo_url ? (
              <Image
                src={websiteData.logo_url}
                alt={websiteData.website_name}
                width={40}
                height={40}
                className="object-contain transition-transform group-hover:scale-110"
              />
            ) : null}
            <span className="text-lg md:text-xl font-bold tracking-tight" style={{ color: textColor }}>
              {websiteData.website_name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="text-sm font-medium rounded-lg transition-all"
              style={{ color: textColor, padding: '0.5rem 1rem' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {lang.labels.home}
            </Link>
            <Link
              href={`/${lang.slugs.blog}`}
              className="text-sm font-medium rounded-lg transition-all"
              style={{ color: textColor, padding: '0.5rem 1rem' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {lang.labels.blog}
            </Link>
            <Link
              href={`/${lang.slugs.about}`}
              className="text-sm font-medium rounded-lg transition-all"
              style={{ color: textColor, padding: '0.5rem 1rem' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {lang.labels.about}
            </Link>
            <Link
              href={`/${lang.slugs.contact}`}
              className="ml-2 text-sm font-medium rounded-lg transition-all hover:opacity-90 hover:shadow-md"
              style={{
                backgroundColor: textColor === 'white' ? 'white' : 'black',
                color: textColor === 'white' ? websiteData.primary_color : 'white',
                padding: '0.625rem 1.5rem'
              }}
            >
              {lang.labels.contact}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: textColor }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
          <nav className="flex flex-col gap-1 pt-2 border-t" style={{ borderColor: `${textColor === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}` }}>
            <Link
              href="/"
              className="rounded-lg text-base font-medium transition-colors"
              style={{ color: textColor, padding: '0.75rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {lang.labels.home}
            </Link>
            <Link
              href={`/${lang.slugs.blog}`}
              className="rounded-lg text-base font-medium transition-colors"
              style={{ color: textColor, padding: '0.75rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {lang.labels.blog}
            </Link>
            <Link
              href={`/${lang.slugs.about}`}
              className="rounded-lg text-base font-medium transition-colors"
              style={{ color: textColor, padding: '0.75rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {lang.labels.about}
            </Link>
            <Link
              href={`/${lang.slugs.contact}`}
              className="rounded-lg text-base font-medium transition-colors"
              style={{ color: textColor, padding: '0.75rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {lang.labels.contact}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
