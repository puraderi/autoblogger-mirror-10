import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';

interface FooterProps {
  websiteData: WebsiteData;
}

// Footer 2: Centered with Background Color
export default function Footer2({ websiteData }: FooterProps) {
  return (
    <footer className="mt-auto py-8" style={{ backgroundColor: websiteData.primary_color }}>
      <div className="container mx-auto px-4 text-center text-white">
        <h3 className="font-bold text-xl mb-4">{websiteData.website_name}</h3>
        <nav className="flex items-center justify-center gap-6 mb-6">
          <Link href="/" className="hover:opacity-80">Hem</Link>
          <Link href="/blogg" className="hover:opacity-80">Blogg</Link>
          <Link href="/om-oss" className="hover:opacity-80">Om oss</Link>
          <Link href="/kontakt" className="hover:opacity-80">Kontakt</Link>
          <Link href="/sitemap.xml" className="hover:opacity-80">Sitemap</Link>
        </nav>
        <div className="flex items-center justify-center gap-4 mb-6">
          {websiteData.social_twitter && <a href={websiteData.social_twitter} className="hover:opacity-80">Twitter</a>}
          {websiteData.social_facebook && <a href={websiteData.social_facebook} className="hover:opacity-80">Facebook</a>}
          {websiteData.social_instagram && <a href={websiteData.social_instagram} className="hover:opacity-80">Instagram</a>}
          {websiteData.social_linkedin && <a href={websiteData.social_linkedin} className="hover:opacity-80">LinkedIn</a>}
        </div>
        <p className="text-sm opacity-90">© {new Date().getFullYear()} {websiteData.website_name}. Alla rättigheter förbehållna.</p>
      </div>
    </footer>
  );
}
