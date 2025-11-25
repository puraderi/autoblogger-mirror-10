import { WebsiteData } from '@/lib/services/website';
import { getContrastTextColor } from '@/lib/utils';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 6: Bold Header - Primary color header with content below
export default function Page6({ websiteData, title, content }: PageProps) {
  const headerTextColor = getContrastTextColor(websiteData.primary_color);

  return (
    <>
      {/* Colored header */}
      <div style={{ backgroundColor: websiteData.primary_color }}>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: headerTextColor }}>
              {title}
            </h1>
            <div className="mt-6 h-1 w-24 mx-auto rounded-full" style={{ backgroundColor: `${headerTextColor === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}` }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none"
            style={{ color: websiteData.text_color }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </>
  );
}
