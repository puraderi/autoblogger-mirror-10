import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 2: Logo Center, Stacked Menu
export default function Header2({ websiteData }: HeaderProps) {
  return (
    <header className="border-b" style={{ borderColor: websiteData.secondary_color }}>
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="flex flex-col items-center gap-3 mb-4">
          {websiteData.logo_url && (
            <Image
              src={websiteData.logo_url}
              alt={websiteData.website_name}
              width={60}
              height={60}
              className="object-contain"
            />
          )}
          <span className="text-2xl font-bold" style={{ color: websiteData.primary_color }}>
            {websiteData.website_name}
          </span>
        </Link>
        <nav className="flex items-center justify-center gap-8 pt-4 border-t" style={{ borderColor: websiteData.secondary_color }}>
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
    </header>
  );
}
