import { WebsiteData } from '@/lib/services/website';
import { getLanguageConfig } from '@/lib/languages';
import { getContrastTextColor } from '@/lib/utils';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 8: Dotted Pattern - Secondary color background with dotted overlay
export default function Page8({ websiteData, title, content }: PageProps) {
  const lang = getLanguageConfig(websiteData.language);
  const headerTextColor = getContrastTextColor(websiteData.secondary_color);
  const accentTextColor = getContrastTextColor(websiteData.accent_color);

  return (
    <>
      {/* Header with dotted pattern */}
      <div className="relative overflow-hidden" style={{ backgroundColor: websiteData.secondary_color }}>
        {/* Dotted pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(${headerTextColor === 'white' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'} 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Accent bar */}
            <div className="w-16 h-1 rounded-full mb-6" style={{ backgroundColor: websiteData.accent_color }} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: headerTextColor }}>
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content with accent sidebar */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content */}
            <div className="lg:col-span-9">
              <div
                className="prose prose-lg max-w-none"
                style={{ color: websiteData.text_color }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Accent sidebar */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-8">
                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: websiteData.accent_color }}
                >
                  <h3 className="font-bold text-lg mb-3" style={{ color: accentTextColor }}>
                    {websiteData.website_name}
                  </h3>
                  <p className="text-sm" style={{ color: accentTextColor, opacity: 0.8 }}>
                    {websiteData.topic}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
