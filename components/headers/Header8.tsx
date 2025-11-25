'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { useState } from 'react';
import { iconToUrl, getContrastTextColor } from '@/lib/utils';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 8: Split Tone - Two-tone header with diagonal split
export default function Header8({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const primaryTextColor = getContrastTextColor(websiteData.primary_color);
  const accentTextColor = getContrastTextColor(websiteData.accent_color);

  return (
    <header className="relative overflow-hidden">
      {/* Background with diagonal split */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ backgroundColor: websiteData.primary_color }} />
        <div
          className="absolute top-0 right-0 w-1/2 h-full hidden md:block"
          style={{
            backgroundColor: websiteData.accent_color,
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
              <img
                src={iconToUrl(websiteData.icon_identifier)!}
                alt=""
                className={`w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110 ${primaryTextColor === 'white' ? 'brightness-0 invert' : ''}`}
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
            <span className="text-lg md:text-xl font-bold" style={{ color: primaryTextColor }}>
              {websiteData.website_name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-all hover:opacity-80"
              style={{ color: primaryTextColor }}
            >
              Hem
            </Link>
            <Link
              href="/blogg"
              className="text-sm font-medium transition-all hover:opacity-80"
              style={{ color: primaryTextColor }}
            >
              Blogg
            </Link>
            {/* These are on the accent side */}
            <Link
              href="/om-oss"
              className="text-sm font-medium transition-all hover:opacity-80"
              style={{ color: accentTextColor }}
            >
              Om oss
            </Link>
            <Link
              href="/kontakt"
              className="text-sm font-medium rounded-lg transition-all hover:shadow-lg"
              style={{
                backgroundColor: accentTextColor === 'white' ? 'white' : 'black',
                color: websiteData.accent_color,
                padding: '0.5rem 1.25rem'
              }}
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: primaryTextColor }}
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
          <nav className="flex flex-col gap-1 pt-2 border-t" style={{ borderColor: `${primaryTextColor === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}` }}>
            <Link
              href="/"
              className="rounded-lg text-base font-medium transition-colors"
              style={{ color: primaryTextColor, padding: '0.75rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Hem
            </Link>
            <Link
              href="/blogg"
              className="rounded-lg text-base font-medium transition-colors"
              style={{ color: primaryTextColor, padding: '0.75rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Blogg
            </Link>
            <Link
              href="/om-oss"
              className="rounded-lg text-base font-medium transition-colors"
              style={{ color: primaryTextColor, padding: '0.75rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Om oss
            </Link>
            <Link
              href="/kontakt"
              className="rounded-lg text-base font-medium transition-colors"
              style={{ color: primaryTextColor, padding: '0.75rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
