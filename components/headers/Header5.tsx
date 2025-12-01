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

// Header 5: Minimal Pill Nav - Ultra-clean with pill-style nav and fullscreen mobile menu
export default function Header5({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = getLanguageConfig(websiteData.language);

  return (
    <>
      <header className="py-4 relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
                <img src={iconToUrl(websiteData.icon_identifier)!} alt="" className="w-7 h-7 transition-transform group-hover:scale-110" />
              ) : websiteData.logo_url ? (
                <Image src={websiteData.logo_url} alt={websiteData.website_name} width={28} height={28} className="object-contain transition-transform group-hover:scale-110" />
              ) : null}
              <span className="text-base font-semibold" style={{ color: websiteData.primary_color }}>
                {websiteData.website_name}
              </span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full transition-colors relative z-50"
              style={{ color: isMenuOpen ? 'white' : websiteData.primary_color, backgroundColor: isMenuOpen ? 'transparent' : `${websiteData.secondary_color}50` }}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop nav - pill style */}
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-full" style={{ backgroundColor: `${websiteData.secondary_color}30` }}>
              <Link href="/" className="rounded-full text-sm font-medium transition-all hover:bg-white hover:shadow-sm" style={{ color: websiteData.primary_color, padding: '0.375rem 1rem' }}>
                {lang.labels.home}
              </Link>
              <Link href={`/${lang.slugs.blog}`} className="rounded-full text-sm font-medium transition-all hover:bg-white hover:shadow-sm" style={{ color: websiteData.primary_color, padding: '0.375rem 1rem' }}>
                {lang.labels.blog}
              </Link>
              <Link href={`/${lang.slugs.about}`} className="rounded-full text-sm font-medium transition-all hover:bg-white hover:shadow-sm" style={{ color: websiteData.primary_color, padding: '0.375rem 1rem' }}>
                {lang.labels.about}
              </Link>
              <Link href={`/${lang.slugs.contact}`} className="rounded-full text-sm font-medium transition-all hover:bg-white hover:shadow-sm" style={{ color: websiteData.primary_color, padding: '0.375rem 1rem' }}>
                {lang.labels.contact}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ backgroundColor: websiteData.primary_color }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6">
          <Link
            href="/"
            className="text-3xl font-bold text-white opacity-90 hover:opacity-100 transition-all hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
          >
            {lang.labels.home}
          </Link>
          <Link
            href={`/${lang.slugs.blog}`}
            className="text-3xl font-bold text-white opacity-90 hover:opacity-100 transition-all hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
          >
            {lang.labels.blog}
          </Link>
          <Link
            href={`/${lang.slugs.about}`}
            className="text-3xl font-bold text-white opacity-90 hover:opacity-100 transition-all hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
          >
            {lang.labels.about}
          </Link>
          <Link
            href={`/${lang.slugs.contact}`}
            className="text-3xl font-bold text-white opacity-90 hover:opacity-100 transition-all hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
          >
            {lang.labels.contact}
          </Link>
        </nav>
      </div>
    </>
  );
}
