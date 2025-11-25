import { WebsiteData } from '@/lib/services/website';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 5: Centered Hero - Large centered header with full-width content
export default function Page5({ websiteData, title, content }: PageProps) {
  return (
    <div className="py-10 md:py-16">
      {/* Hero header */}
      <header className="text-center mb-10 md:mb-14 px-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-8 md:w-16" style={{ backgroundColor: websiteData.secondary_color }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: websiteData.accent_color }} />
          <div className="h-px w-8 md:w-16" style={{ backgroundColor: websiteData.secondary_color }} />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight max-w-4xl mx-auto" style={{ color: websiteData.primary_color }}>
          {title}
        </h1>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl">
        <div
          className="prose prose-lg max-w-none"
          style={{ color: websiteData.text_color }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
