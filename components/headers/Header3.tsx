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

// Header 3: Split Nav - Nav left, logo center, CTA right, sticky with blur
export default function Header3({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = getLanguageConfig(websiteData.language);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ backgroundColor: `${websiteData.background_color || '#ffffff'}ee`, borderColor: websiteData.secondary_color }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left nav (desktop) */}
          <nav className="hidden md:flex items-center gap-6 flex-1">
            <Link href="/" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: websiteData.primary_color }}>
              {lang.labels.home}
            </Link>
            <Link href={`/${lang.slugs.blog}`} className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: websiteData.primary_color }}>
              {lang.labels.blog}
            </Link>
          </nav>

          {/* Center logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
              <img src={iconToUrl(websiteData.icon_identifier)!} alt="" className="w-8 h-8 transition-transform group-hover:rotate-6" />
            ) : websiteData.logo_url ? (
              <Image src={websiteData.logo_url} alt={websiteData.website_name} width={32} height={32} className="object-contain transition-transform group-hover:rotate-6" />
            ) : null}
            <span className="text-lg font-bold" style={{ color: websiteData.primary_color }}>
              {websiteData.website_name}
            </span>
          </Link>

          {/* Right nav + CTA (desktop) */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            <Link href={`/${lang.slugs.about}`} className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: websiteData.primary_color }}>
              {lang.labels.about}
            </Link>
            <Link
              href={`/${lang.slugs.contact}`}
              className="text-sm font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: websiteData.accent_color, color: getContrastTextColor(websiteData.accent_color), padding: '0.5rem 1rem' }}
            >
              {lang.labels.contact}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: websiteData.primary_color }}
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

        {/* Mobile nav - slide down with backdrop */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col gap-2 pt-4 mt-3 border-t" style={{ borderColor: websiteData.secondary_color }}>
            <Link href="/" className="rounded-lg font-medium transition-colors hover:bg-black/5" style={{ color: websiteData.primary_color, padding: '0.75rem' }} onClick={() => setIsMenuOpen(false)}>
              {lang.labels.home}
            </Link>
            <Link href={`/${lang.slugs.blog}`} className="rounded-lg font-medium transition-colors hover:bg-black/5" style={{ color: websiteData.primary_color, padding: '0.75rem' }} onClick={() => setIsMenuOpen(false)}>
              {lang.labels.blog}
            </Link>
            <Link href={`/${lang.slugs.about}`} className="rounded-lg font-medium transition-colors hover:bg-black/5" style={{ color: websiteData.primary_color, padding: '0.75rem' }} onClick={() => setIsMenuOpen(false)}>
              {lang.labels.about}
            </Link>
            <Link
              href={`/${lang.slugs.contact}`}
              className="rounded-lg font-medium text-center mt-2"
              style={{ backgroundColor: websiteData.accent_color, color: getContrastTextColor(websiteData.accent_color), padding: '0.75rem' }}
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
