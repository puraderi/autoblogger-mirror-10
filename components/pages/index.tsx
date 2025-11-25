import { WebsiteData } from '@/lib/services/website';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Page6 from './Page6';
import Page7 from './Page7';
import Page8 from './Page8';

interface PageTemplateProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

export default function PageTemplate({ websiteData, title, content }: PageTemplateProps) {
  const templates = [Page1, Page2, Page3, Page4, Page5, Page6, Page7, Page8];
  const PageComponent = templates[websiteData.template_page - 1] || Page1;

  return <PageComponent websiteData={websiteData} title={title} content={content} />;
}
