'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { useState } from 'react';
import { iconToUrl } from '@/lib/utils';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 2: Elegant Centered - Large logo with decorative dividers
export default function Header2({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Mobile header */}
        <div className="flex items-center justify-between md:hidden">
          <Link href="/" className="flex items-center gap-2">
            {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
              <img src={iconToUrl(websiteData.icon_identifier)!} alt="" className="w-10 h-10" />
            ) : websiteData.logo_url ? (
              <Image src={websiteData.logo_url} alt={websiteData.website_name} width={40} height={40} className="object-contain" />
            ) : null}
            <span className="text-lg font-serif font-bold" style={{ color: websiteData.primary_color }}>
              {websiteData.website_name}
            </span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
            style={{ color: websiteData.primary_color }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop header - elegant centered */}
        <div className="hidden md:block text-center">
          <Link href="/" className="inline-block group">
            {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
              <img src={iconToUrl(websiteData.icon_identifier)!} alt="" className="w-16 h-16 mx-auto mb-3 transition-transform group-hover:scale-105" />
            ) : websiteData.logo_url ? (
              <Image src={websiteData.logo_url} alt={websiteData.website_name} width={64} height={64} className="object-contain mx-auto mb-3 transition-transform group-hover:scale-105" />
            ) : null}
            <h1 className="text-3xl font-serif font-bold tracking-wide" style={{ color: websiteData.primary_color }}>
              {websiteData.website_name}
            </h1>
          </Link>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 my-5">
            <div className="h-px w-16" style={{ backgroundColor: websiteData.secondary_color }} />
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: websiteData.accent_color }} />
            <div className="h-px w-16" style={{ backgroundColor: websiteData.secondary_color }} />
          </div>

          {/* Desktop nav */}
          <nav className="flex items-center justify-center gap-10 text-sm uppercase tracking-widest">
            <Link href="/" className="py-2 transition-colors hover:opacity-70" style={{ color: websiteData.primary_color }}>
              Hem
            </Link>
            <Link href="/blogg" className="py-2 transition-colors hover:opacity-70" style={{ color: websiteData.primary_color }}>
              Blogg
            </Link>
            <Link href="/om-oss" className="py-2 transition-colors hover:opacity-70" style={{ color: websiteData.primary_color }}>
              Om oss
            </Link>
            <Link href="/kontakt" className="py-2 transition-colors hover:opacity-70" style={{ color: websiteData.primary_color }}>
              Kontakt
            </Link>
          </nav>
        </div>

        {/* Mobile nav - full screen overlay */}
        <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: websiteData.background_color || '#fff' }}>
          <div className="flex flex-col items-center justify-center h-full">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-4 p-2"
              style={{ color: websiteData.primary_color }}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col items-center gap-6 text-xl">
              <Link href="/" className="py-2 uppercase tracking-widest" style={{ color: websiteData.primary_color }} onClick={() => setIsMenuOpen(false)}>
                Hem
              </Link>
              <Link href="/blogg" className="py-2 uppercase tracking-widest" style={{ color: websiteData.primary_color }} onClick={() => setIsMenuOpen(false)}>
                Blogg
              </Link>
              <Link href="/om-oss" className="py-2 uppercase tracking-widest" style={{ color: websiteData.primary_color }} onClick={() => setIsMenuOpen(false)}>
                Om oss
              </Link>
              <Link href="/kontakt" className="py-2 uppercase tracking-widest" style={{ color: websiteData.primary_color }} onClick={() => setIsMenuOpen(false)}>
                Kontakt
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
