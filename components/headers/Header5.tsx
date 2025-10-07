'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { useState } from 'react';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 5: Minimal Thin Header with Underline
export default function Header5({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b-2" style={{ borderColor: websiteData.accent_color }}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {websiteData.logo_url && (
              <Image
                src={websiteData.logo_url}
                alt={websiteData.website_name}
                width={30}
                height={30}
                className="object-contain"
              />
            )}
            <span className="text-base md:text-lg font-semibold" style={{ color: websiteData.primary_color }}>
              {websiteData.website_name}
            </span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            style={{ color: websiteData.primary_color }}
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>
              Hem
            </Link>
            <Link href="/blogg" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>
              Blogg
            </Link>
            <Link href="/om-oss" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>
              Om oss
            </Link>
            <Link href="/kontakt" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>
              Kontakt
            </Link>
          </nav>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-3 pt-3 mt-3 text-sm">
            <Link href="/" className="hover:opacity-80 py-2" style={{ color: websiteData.primary_color }} onClick={() => setIsMenuOpen(false)}>
              Hem
            </Link>
            <Link href="/blogg" className="hover:opacity-80 py-2" style={{ color: websiteData.primary_color }} onClick={() => setIsMenuOpen(false)}>
              Blogg
            </Link>
            <Link href="/om-oss" className="hover:opacity-80 py-2" style={{ color: websiteData.primary_color }} onClick={() => setIsMenuOpen(false)}>
              Om oss
            </Link>
            <Link href="/kontakt" className="hover:opacity-80 py-2" style={{ color: websiteData.primary_color }} onClick={() => setIsMenuOpen(false)}>
              Kontakt
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
