import { WebsiteData } from '@/lib/services/website';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 3: Card Elevated - White card on colored background
export default function Page3({ websiteData, title, content }: PageProps) {
  return (
    <div className="py-10 md:py-16 min-h-screen" style={{ backgroundColor: `${websiteData.secondary_color}50` }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`bg-white shadow-2xl p-6 md:p-10 lg:p-14 ${websiteData.border_radius}`}>
          <header className="mb-8 pb-6 border-b" style={{ borderColor: websiteData.secondary_color }}>
            <div className="w-12 h-1 mb-6" style={{ backgroundColor: websiteData.accent_color }} />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: websiteData.primary_color }}>
              {title}
            </h1>
          </header>
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
