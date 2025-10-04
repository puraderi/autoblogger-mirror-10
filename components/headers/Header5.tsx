import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 5: Minimal Thin Header with Underline
export default function Header5({ websiteData }: HeaderProps) {
  return (
    <header className="border-b-2" style={{ borderColor: websiteData.accent_color }}>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
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
          <span className="text-lg font-semibold" style={{ color: websiteData.primary_color }}>
            {websiteData.website_name}
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
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
