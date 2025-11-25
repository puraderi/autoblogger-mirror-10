import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import FrontPage1 from './FrontPage1';
import FrontPage2 from './FrontPage2';
import FrontPage3 from './FrontPage3';
import FrontPage4 from './FrontPage4';
import FrontPage5 from './FrontPage5';
import FrontPage6 from './FrontPage6';
import FrontPage7 from './FrontPage7';
import FrontPage8 from './FrontPage8';

interface FrontPageProps {
  websiteData: WebsiteData;
  blogPosts: BlogPost[];
}

export default function FrontPage({ websiteData, blogPosts }: FrontPageProps) {
  const templates = [FrontPage1, FrontPage2, FrontPage3, FrontPage4, FrontPage5, FrontPage6, FrontPage7, FrontPage8];
  const FrontPageComponent = templates[websiteData.template_front_page - 1] || FrontPage1;

  return <FrontPageComponent websiteData={websiteData} blogPosts={blogPosts} />;
}
