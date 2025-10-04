import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';

interface FooterProps {
  websiteData: WebsiteData;
}

// Footer 4: Four Column with Newsletter
export default function Footer4({ websiteData }: FooterProps) {
  return (
    <footer className="mt-auto py-12" style={{ backgroundColor: websiteData.secondary_color }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: websiteData.primary_color }}>
              {websiteData.website_name}
            </h3>
            <p className="text-sm text-gray-700">{websiteData.topic}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: websiteData.primary_color }}>Navigation</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:opacity-80 text-gray-700">Hem</Link>
              <Link href="/blogg" className="hover:opacity-80 text-gray-700">Blogg</Link>
              <Link href="/om-oss" className="hover:opacity-80 text-gray-700">Om oss</Link>
              <Link href="/kontakt" className="hover:opacity-80 text-gray-700">Kontakt</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: websiteData.primary_color }}>Social</h4>
            <div className="flex flex-col gap-2 text-sm">
              {websiteData.social_twitter && <a href={websiteData.social_twitter} className="hover:opacity-80 text-gray-700">Twitter</a>}
              {websiteData.social_facebook && <a href={websiteData.social_facebook} className="hover:opacity-80 text-gray-700">Facebook</a>}
              {websiteData.social_instagram && <a href={websiteData.social_instagram} className="hover:opacity-80 text-gray-700">Instagram</a>}
              {websiteData.social_linkedin && <a href={websiteData.social_linkedin} className="hover:opacity-80 text-gray-700">LinkedIn</a>}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: websiteData.primary_color }}>Newsletter</h4>
            <p className="text-sm text-gray-700 mb-3">Stay updated with our latest posts</p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm border rounded"
              style={{ borderColor: websiteData.primary_color }}
            />
          </div>
        </div>
        <div className="pt-8 border-t text-center text-sm text-gray-600" style={{ borderColor: websiteData.primary_color }}>
          © {new Date().getFullYear()} {websiteData.website_name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
