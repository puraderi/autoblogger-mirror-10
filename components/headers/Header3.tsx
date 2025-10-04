import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 3: Logo Right, Sticky Header
export default function Header3({ websiteData }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 shadow-md"
      style={{ backgroundColor: websiteData.secondary_color }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center gap-6">
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
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-bold" style={{ color: websiteData.primary_color }}>
            {websiteData.website_name}
          </span>
          {websiteData.logo_url && (
            <Image
              src={websiteData.logo_url}
              alt={websiteData.website_name}
              width={40}
              height={40}
              className="object-contain"
            />
          )}
        </Link>
      </div>
    </header>
  );
}
