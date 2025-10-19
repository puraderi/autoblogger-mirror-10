'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { useState } from 'react';

import { iconToUrl } from '@/lib/utils';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 4: Large Header with Background Color
export default function Header4({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="py-4 md:py-8"
      style={{ backgroundColor: websiteData.primary_color }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:hidden mb-4">
          <Link href="/" className="flex items-center gap-2">
            {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
              <img
                src={iconToUrl(websiteData.icon_identifier)!}
                alt=""
                className="w-10 h-10 brightness-0 invert"
              />
            ) : websiteData.logo_url ? (
              <Image
                src={websiteData.logo_url}
                alt={websiteData.website_name}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : null}
            <span className="text-lg font-bold text-white">
              {websiteData.website_name}
            </span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white"
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

        {/* Desktop logo */}
        <Link href="/" className="hidden md:flex items-center justify-center gap-4 mb-6">
          {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
            <img
              src={iconToUrl(websiteData.icon_identifier)!}
              alt=""
              className="w-[70px] h-[70px] brightness-0 invert"
            />
          ) : websiteData.logo_url ? (
            <Image
              src={websiteData.logo_url}
              alt={websiteData.website_name}
              width={70}
              height={70}
              className="object-contain"
            />
          ) : null}
          <span className="text-3xl font-bold text-white">
            {websiteData.website_name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center gap-10 text-white">
          <Link href="/" className="hover:opacity-80 text-lg">
            Hem
          </Link>
          <Link href="/blogg" className="hover:opacity-80 text-lg">
            Blogg
          </Link>
          <Link href="/om-oss" className="hover:opacity-80 text-lg">
            Om oss
          </Link>
          <Link href="/kontakt" className="hover:opacity-80 text-lg">
            Kontakt
          </Link>
        </nav>

        {/* Mobile nav */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 pt-4 text-white">
            <Link href="/" className="hover:opacity-80 py-2" onClick={() => setIsMenuOpen(false)}>
              Hem
            </Link>
            <Link href="/blogg" className="hover:opacity-80 py-2" onClick={() => setIsMenuOpen(false)}>
              Blogg
            </Link>
            <Link href="/om-oss" className="hover:opacity-80 py-2" onClick={() => setIsMenuOpen(false)}>
              Om oss
            </Link>
            <Link href="/kontakt" className="hover:opacity-80 py-2" onClick={() => setIsMenuOpen(false)}>
              Kontakt
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
