import { WebsiteData } from '@/lib/services/website';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 1: Simple Centered Content
export default function Page1({ websiteData, title, content }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-5xl font-bold mb-8" style={{ color: websiteData.primary_color }}>
        {title}
      </h1>
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
