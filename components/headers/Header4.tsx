'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';
import { useState, useEffect } from 'react';
import { iconToUrl, getContrastTextColor } from '@/lib/utils';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 4: Sticky Compact - Compact sticky header with side drawer menu
export default function Header4({ websiteData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // Check initial scroll position
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Use mounted check to avoid hydration mismatch
  const showScrollStyles = mounted && isScrolled;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          showScrollStyles ? 'shadow-md' : ''
        }`}
        style={{
          backgroundColor: showScrollStyles ? websiteData.background_color || '#fff' : websiteData.background_color || '#fff',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
                <img
                  src={iconToUrl(websiteData.icon_identifier)!}
                  alt=""
                  className="w-8 h-8 transition-transform group-hover:scale-110"
                />
              ) : websiteData.logo_url ? (
                <Image
                  src={websiteData.logo_url}
                  alt={websiteData.website_name}
                  width={32}
                  height={32}
                  className="object-contain transition-transform group-hover:scale-110"
                />
              ) : null}
              <span className="text-lg font-bold" style={{ color: websiteData.primary_color }}>
                {websiteData.website_name}
              </span>
            </Link>

            {/* Desktop nav - inline buttons */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="text-sm font-medium rounded-lg transition-all hover:bg-gray-100"
                style={{ color: websiteData.primary_color, padding: '0.5rem 1rem' }}
              >
                Hem
              </Link>
              <Link
                href="/blogg"
                className="text-sm font-medium rounded-lg transition-all hover:bg-gray-100"
                style={{ color: websiteData.primary_color, padding: '0.5rem 1rem' }}
              >
                Blogg
              </Link>
              <Link
                href="/om-oss"
                className="text-sm font-medium rounded-lg transition-all hover:bg-gray-100"
                style={{ color: websiteData.primary_color, padding: '0.5rem 1rem' }}
              >
                Om oss
              </Link>
              <Link
                href="/kontakt"
                className="ml-2 text-sm font-medium rounded-lg transition-all hover:opacity-90 hover:shadow-md"
                style={{ backgroundColor: websiteData.accent_color, color: getContrastTextColor(websiteData.accent_color), padding: '0.5rem 1.25rem' }}
              >
                Kontakt
              </Link>
            </nav>

            {/* Menu toggle button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: websiteData.primary_color }}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Side drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: websiteData.background_color || '#fff' }}
      >
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: websiteData.primary_color }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo in drawer */}
          <div className="mt-8 mb-8">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
              {websiteData.icon_identifier && iconToUrl(websiteData.icon_identifier) ? (
                <img src={iconToUrl(websiteData.icon_identifier)!} alt="" className="w-10 h-10" />
              ) : websiteData.logo_url ? (
                <Image src={websiteData.logo_url} alt={websiteData.website_name} width={40} height={40} className="object-contain" />
              ) : null}
              <span className="text-xl font-bold" style={{ color: websiteData.primary_color }}>
                {websiteData.website_name}
              </span>
            </Link>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="rounded-lg text-base font-medium transition-all hover:bg-gray-100"
              style={{ color: websiteData.primary_color, padding: '0.75rem 1rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Hem
            </Link>
            <Link
              href="/blogg"
              className="rounded-lg text-base font-medium transition-all hover:bg-gray-100"
              style={{ color: websiteData.primary_color, padding: '0.75rem 1rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Blogg
            </Link>
            <Link
              href="/om-oss"
              className="rounded-lg text-base font-medium transition-all hover:bg-gray-100"
              style={{ color: websiteData.primary_color, padding: '0.75rem 1rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Om oss
            </Link>
            <Link
              href="/kontakt"
              className="mt-4 rounded-lg text-base font-medium text-center transition-all hover:opacity-90"
              style={{ backgroundColor: websiteData.accent_color, color: getContrastTextColor(websiteData.accent_color), padding: '0.75rem 1rem' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
