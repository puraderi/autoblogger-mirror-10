import { WebsiteData } from '@/lib/services/website';
import Footer1 from './Footer1';
import Footer2 from './Footer2';
import Footer3 from './Footer3';
import Footer4 from './Footer4';
import Footer5 from './Footer5';

interface FooterProps {
  websiteData: WebsiteData;
}

export default function Footer({ websiteData }: FooterProps) {
  const templates = [Footer1, Footer2, Footer3, Footer4, Footer5];
  const FooterComponent = templates[websiteData.template_footer - 1] || Footer1;

  return <FooterComponent websiteData={websiteData} />;
}
