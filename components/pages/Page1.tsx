import { WebsiteData } from '@/lib/services/website';
import Image from 'next/image';

interface PageProps {
  websiteData: WebsiteData;
  title: string;
  content: string;
}

// Page 1: Simple Centered Content with Portrait Image
export default function Page1({ websiteData, title, content }: PageProps) {
  const hasImage = websiteData.topic_image_portrait_2_3;

  return (
    <div className={`container mx-auto px-4 py-12 ${hasImage ? 'max-w-5xl' : 'max-w-4xl'}`}>
      <h1 className="text-5xl font-bold mb-8" style={{ color: websiteData.primary_color }}>
        {title}
      </h1>

      {hasImage ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-4">
              <Image
                src={websiteData.topic_image_portrait_2_3}
                alt={title}
                width={400}
                height={600}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
}
