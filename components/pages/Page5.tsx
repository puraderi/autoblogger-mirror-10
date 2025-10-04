import { WebsiteData } from '@/lib/services/website';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 5: Two Column Magazine Style
export default function Page5({ websiteData, title, content }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <header className="mb-12 text-center">
        <div className="inline-block px-6 py-2 rounded-full mb-4 text-sm font-semibold" style={{ backgroundColor: websiteData.accent_color, color: 'white' }}>
          {title}
        </div>
        <h1 className="text-6xl font-bold" style={{ color: websiteData.primary_color }}>
          {title}
        </h1>
      </header>
      <div className="columns-1 md:columns-2 gap-12 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
