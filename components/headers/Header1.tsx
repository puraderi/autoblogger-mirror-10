'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { useState } from 'react';
import { iconToUrl } from '@/lib/utils';
import { getLanguageConfig } from '@/lib/languages';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 1: Classic - Logo left with underline hover nav
export default function Header1({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = getLanguageConfig(websiteData.language);

  const navLinkClass = "relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="border-b-2" style={{ borderColor: websiteData.secondary_color }}>
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
              <img
                src={iconToUrl(websiteData.icon_identifier)!}
                alt=""
                className="w-9 h-9 md:w-11 md:h-11 transition-transform group-hover:scale-105"
              />
            ) : websiteData.logo_url ? (
              <Image
                src={websiteData.logo_url}
                alt={websiteData.website_name}
                width={36}
                height={36}
                className="object-contain md:w-11 md:h-11 transition-transform group-hover:scale-105"
              />
            ) : null}
            <span className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: websiteData.primary_color }}>
              {websiteData.website_name}
            </span>
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={navLinkClass} style={{ color: websiteData.primary_color, '--tw-after-bg': websiteData.accent_color } as React.CSSProperties}>
              <span className="after:bg-current">{lang.labels.home}</span>
            </Link>
            <Link href={`/${lang.slugs.blog}`} className={navLinkClass} style={{ color: websiteData.primary_color }}>
              <span className="after:bg-current">{lang.labels.blog}</span>
            </Link>
            <Link href={`/${lang.slugs.about}`} className={navLinkClass} style={{ color: websiteData.primary_color }}>
              <span className="after:bg-current">{lang.labels.about}</span>
            </Link>
            <Link href={`/${lang.slugs.contact}`} className={navLinkClass} style={{ color: websiteData.primary_color }}>
              <span className="after:bg-current">{lang.labels.contact}</span>
            </Link>
          </nav>
        </div>

        {/* Mobile nav - slide down */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col gap-1 pt-4 mt-4 border-t" style={{ borderColor: websiteData.secondary_color }}>
            <Link href="/" className="rounded-lg transition-colors hover:bg-gray-50" style={{ color: websiteData.primary_color, padding: '0.75rem 0.5rem' }} onClick={() => setIsMenuOpen(false)}>
              {lang.labels.home}
            </Link>
            <Link href={`/${lang.slugs.blog}`} className="rounded-lg transition-colors hover:bg-gray-50" style={{ color: websiteData.primary_color, padding: '0.75rem 0.5rem' }} onClick={() => setIsMenuOpen(false)}>
              {lang.labels.blog}
            </Link>
            <Link href={`/${lang.slugs.about}`} className="rounded-lg transition-colors hover:bg-gray-50" style={{ color: websiteData.primary_color, padding: '0.75rem 0.5rem' }} onClick={() => setIsMenuOpen(false)}>
              {lang.labels.about}
            </Link>
            <Link href={`/${lang.slugs.contact}`} className="rounded-lg transition-colors hover:bg-gray-50" style={{ color: websiteData.primary_color, padding: '0.75rem 0.5rem' }} onClick={() => setIsMenuOpen(false)}>
              {lang.labels.contact}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
