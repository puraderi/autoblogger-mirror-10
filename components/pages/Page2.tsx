import { WebsiteData } from '@/lib/services/website';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 2: Split Layout with Accent Sidebar
export default function Page2({ websiteData, title, content }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 border-l-4 pl-6" style={{ borderColor: websiteData.accent_color }}>
          <h1 className="text-3xl font-bold sticky top-4" style={{ color: websiteData.primary_color }}>
            {title}
          </h1>
        </aside>
        <div className="lg:col-span-3">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
}
