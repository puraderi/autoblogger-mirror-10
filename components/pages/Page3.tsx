import { WebsiteData } from '@/lib/services/website';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 3: Full Width with Background
export default function Page3({ websiteData, title, content }: PageProps) {
  return (
    <div className="py-16" style={{ backgroundColor: websiteData.secondary_color }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <h1 className="text-6xl font-bold mb-8 pb-6 border-b-4" style={{ color: websiteData.primary_color, borderColor: websiteData.accent_color }}>
            {title}
          </h1>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
}
