import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';

interface HeaderProps {
  websiteData: WebsiteData;
}

// Header 4: Large Header with Background Color
export default function Header4({ websiteData }: HeaderProps) {
  return (
    <header
      className="py-8"
      style={{ backgroundColor: websiteData.primary_color }}
    >
      <div className="container mx-auto px-4">
        <Link href="/" className="flex items-center justify-center gap-4 mb-6">
          {websiteData.logo_url && (
            <Image
              src={websiteData.logo_url}
              alt={websiteData.website_name}
              width={70}
              height={70}
              className="object-contain"
            />
          )}
          <span className="text-3xl font-bold text-white">
            {websiteData.website_name}
          </span>
        </Link>
        <nav className="flex items-center justify-center gap-10 text-white">
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
      </div>
    </header>
  );
}
