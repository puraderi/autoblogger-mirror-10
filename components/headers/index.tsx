import { WebsiteData } from '@/lib/services/website';
import Header1 from './Header1';
import Header2 from './Header2';
import Header3 from './Header3';
import Header4 from './Header4';
import Header5 from './Header5';

interface HeaderProps {
  websiteData: WebsiteData;
}

export default function Header({ websiteData }: HeaderProps) {
  const templates = [Header1, Header2, Header3, Header4, Header5];
  const HeaderComponent = templates[websiteData.template_header - 1] || Header1;

  return <HeaderComponent websiteData={websiteData} />;
}
