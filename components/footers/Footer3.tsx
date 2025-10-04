import Link from 'next/link';
import Image from 'next/image';
import { WebsiteData } from '@/lib/services/website';

interface FooterProps {
  websiteData: WebsiteData;
}

// Footer 3: Minimal Single Line
export default function Footer3({ websiteData }: FooterProps) {
  return (
    <footer className="mt-auto border-t py-6" style={{ borderColor: websiteData.secondary_color }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {websiteData.logo_url && (
              <Image
                src={websiteData.logo_url}
                alt={websiteData.website_name}
                width={24}
                height={24}
                className="object-contain"
              />
            )}
            <span className="text-sm" style={{ color: websiteData.primary_color }}>
              © {new Date().getFullYear()} {websiteData.website_name}
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Hem</Link>
            <Link href="/blogg" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Blogg</Link>
            <Link href="/om-oss" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Om oss</Link>
            <Link href="/kontakt" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Kontakt</Link>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            {websiteData.social_twitter && <a href={websiteData.social_twitter} className="hover:opacity-80" style={{ color: websiteData.primary_color }}>TW</a>}
            {websiteData.social_facebook && <a href={websiteData.social_facebook} className="hover:opacity-80" style={{ color: websiteData.primary_color }}>FB</a>}
            {websiteData.social_instagram && <a href={websiteData.social_instagram} className="hover:opacity-80" style={{ color: websiteData.primary_color }}>IG</a>}
            {websiteData.social_linkedin && <a href={websiteData.social_linkedin} className="hover:opacity-80" style={{ color: websiteData.primary_color }}>LI</a>}
          </div>
        </div>
      </div>
    </footer>
  );
}
