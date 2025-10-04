import { WebsiteData } from '@/lib/services/website';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 4: Minimal with Top Border
export default function Page4({ websiteData, title, content }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="border-t-8 pt-12 mb-12" style={{ borderColor: websiteData.primary_color }}>
        <h1 className="text-7xl font-bold mb-4" style={{ color: websiteData.primary_color }}>
          {title}
        </h1>
      </div>
      <div className="prose prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
