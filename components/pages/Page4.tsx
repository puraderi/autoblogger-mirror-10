import { WebsiteData } from '@/lib/services/website';
import { getLanguageConfig } from '@/lib/languages';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 4: Minimal Bold - Clean design with bold top accent
export default function Page4({ websiteData, title, content }: PageProps) {
  const lang = getLanguageConfig(websiteData.language);
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      <header className="mb-10 md:mb-14">
        <div className="h-2 w-24 mb-8" style={{ backgroundColor: websiteData.accent_color }} />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: websiteData.primary_color }}>
          {title}
        </h1>
      </header>
      <div
        className="prose prose-lg md:prose-xl max-w-none"
        style={{ color: websiteData.text_color }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
