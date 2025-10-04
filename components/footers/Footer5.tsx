import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';

interface FooterProps {
  websiteData: WebsiteData;
}

// Footer 5: Sidebar Style with Accent
export default function Footer5({ websiteData }: FooterProps) {
  return (
    <footer className="mt-auto py-10 border-t-4" style={{ borderColor: websiteData.accent_color }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="border-l-4 pl-4" style={{ borderColor: websiteData.accent_color }}>
            <h3 className="font-bold text-xl mb-2" style={{ color: websiteData.primary_color }}>
              {websiteData.website_name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{websiteData.topic}</p>
            <div className="flex items-center gap-4">
              {websiteData.social_twitter && <a href={websiteData.social_twitter} className="hover:opacity-80" style={{ color: websiteData.accent_color }}>Twitter</a>}
              {websiteData.social_facebook && <a href={websiteData.social_facebook} className="hover:opacity-80" style={{ color: websiteData.accent_color }}>Facebook</a>}
              {websiteData.social_instagram && <a href={websiteData.social_instagram} className="hover:opacity-80" style={{ color: websiteData.accent_color }}>Instagram</a>}
              {websiteData.social_linkedin && <a href={websiteData.social_linkedin} className="hover:opacity-80" style={{ color: websiteData.accent_color }}>LinkedIn</a>}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: websiteData.primary_color }}>Site Map</h4>
            <nav className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Hem</Link>
              <Link href="/blogg" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Blogg</Link>
              <Link href="/om-oss" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Om oss</Link>
              <Link href="/kontakt" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Kontakt</Link>
            </nav>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} {websiteData.website_name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
