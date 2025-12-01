import { WebsiteData } from '@/lib/services/website';
import { getLanguageConfig } from '@/lib/languages';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 2: Sidebar Title - Sticky title sidebar with main content
export default function Page2({ websiteData, title, content }: PageProps) {
  const lang = getLanguageConfig(websiteData.language);
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sidebar with title */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <div className="border-l-4 pl-6 py-2" style={{ borderColor: websiteData.accent_color }}>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: websiteData.primary_color }}>
                {title}
              </h1>
              <p className="text-sm text-gray-500">
                {websiteData.website_name}
              </p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-8">
          <div
            className="prose prose-lg max-w-none"
            style={{ color: websiteData.text_color }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
