'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { useState } from 'react';
import { iconToUrl, getContrastTextColor } from '@/lib/utils';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 7: Accent Gradient - Clean gradient with subtle glow
export default function Header7({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textColor = getContrastTextColor(websiteData.accent_color);

  return (
    <header
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${websiteData.accent_color} 0%, ${websiteData.primary_color} 100%)`
      }}
    >
      {/* Subtle glow effect */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: textColor }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
              <img
                src={iconToUrl(websiteData.icon_identifier)!}
                alt=""
                className={`w-9 h-9 md:w-10 md:h-10 transition-transform group-hover:scale-110 ${textColor === 'white' ? 'brightness-0 invert' : ''}`}
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
            <span className="text-lg md:text-xl font-bold" style={{ color: textColor }}>
              {websiteData.website_name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-all hover:opacity-80 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full"
              style={{ color: textColor, '--after-bg': textColor } as React.CSSProperties}
            >
              Hem
            </Link>
            <Link
              href="/blogg"
              className="text-sm font-medium transition-all hover:opacity-80"
              style={{ color: textColor }}
            >
              Blogg
            </Link>
            <Link
              href="/om-oss"
              className="text-sm font-medium transition-all hover:opacity-80"
              style={{ color: textColor }}
            >
              Om oss
            </Link>
            <Link
              href="/kontakt"
              className="text-sm font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: textColor === 'white' ? 'white' : 'black',
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
          <nav className="flex flex-col gap-1 pt-2">
            <Link
              href="/"
              className="py-3 px-3 rounded-lg text-base font-medium transition-colors"
              style={{ color: textColor }}
              onClick={() => setIsMenuOpen(false)}
            >
              Hem
            </Link>
            <Link
              href="/blogg"
              className="py-3 px-3 rounded-lg text-base font-medium transition-colors"
              style={{ color: textColor }}
              onClick={() => setIsMenuOpen(false)}
            >
              Blogg
            </Link>
            <Link
              href="/om-oss"
              className="py-3 px-3 rounded-lg text-base font-medium transition-colors"
              style={{ color: textColor }}
              onClick={() => setIsMenuOpen(false)}
            >
              Om oss
            </Link>
            <Link
              href="/kontakt"
              className="py-3 px-3 rounded-lg text-base font-medium transition-colors"
              style={{ color: textColor }}
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
