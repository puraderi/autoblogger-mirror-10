import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';

interface FooterProps {
  websiteData: WebsiteData;
}

// Footer 1: Simple Three Column Layout
export default function Footer1({ websiteData }: FooterProps) {
  return (
    <footer className="mt-auto border-t py-12" style={{ borderColor: websiteData.secondary_color }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: websiteData.primary_color }}>
              {websiteData.website_name}
            </h3>
            <p className="text-sm text-gray-600">{websiteData.topic}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: websiteData.primary_color }}>Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Hem</Link>
              <Link href="/blogg" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Blogg</Link>
              <Link href="/om-oss" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Om oss</Link>
              <Link href="/kontakt" className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Kontakt</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: websiteData.primary_color }}>Follow Us</h4>
            <div className="flex flex-col gap-2 text-sm">
              {websiteData.social_twitter && <a href={websiteData.social_twitter} className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Twitter</a>}
              {websiteData.social_facebook && <a href={websiteData.social_facebook} className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Facebook</a>}
              {websiteData.social_instagram && <a href={websiteData.social_instagram} className="hover:opacity-80" style={{ color: websiteData.primary_color }}>Instagram</a>}
              {websiteData.social_linkedin && <a href={websiteData.social_linkedin} className="hover:opacity-80" style={{ color: websiteData.primary_color }}>LinkedIn</a>}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600" style={{ borderColor: websiteData.secondary_color }}>
          © {new Date().getFullYear()} {websiteData.website_name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
