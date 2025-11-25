import { WebsiteData } from '@/lib/services/website';
import { getContrastTextColor } from '@/lib/utils';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 7: Gradient Hero - Clean gradient background
export default function Page7({ websiteData, title, content }: PageProps) {
  const heroTextColor = getContrastTextColor(websiteData.accent_color);

  return (
    <>
      {/* Gradient header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${websiteData.accent_color} 0%, ${websiteData.primary_color} 100%)`
        }}
      >
        {/* Soft decorative blurs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: heroTextColor, transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: heroTextColor, transform: 'translate(-30%, 30%)' }} />

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: heroTextColor }}>
              {title}
            </h1>
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
