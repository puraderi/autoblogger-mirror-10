import { WebsiteData } from '@/lib/services/website';
import Image from 'next/image';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 1: Classic with Image - Content left, optional portrait image right
export default function Page1({ websiteData, title, content }: PageProps) {
  const hasImage = websiteData.topic_image_portrait_2_3;

  return (
    <div className={`container mx-auto px-4 py-10 md:py-16 ${hasImage ? 'max-w-6xl' : 'max-w-4xl'}`}>
      {/* Header */}
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: websiteData.primary_color }}>
          {title}
        </h1>
        <div className="mt-4 h-1 w-20" style={{ backgroundColor: websiteData.accent_color }} />
      </header>

      {hasImage && websiteData.topic_image_portrait_2_3 ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <div
              className="prose prose-lg max-w-none"
              style={{ color: websiteData.text_color }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <Image
                src={websiteData.topic_image_portrait_2_3}
                alt={title}
                width={400}
                height={600}
                className={`w-full h-auto shadow-xl ${websiteData.border_radius}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="prose prose-lg max-w-none"
          style={{ color: websiteData.text_color }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
