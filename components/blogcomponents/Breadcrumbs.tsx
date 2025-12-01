import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';
import { getLanguageConfig } from '@/lib/languages';

interface BreadcrumbsProps {
  websiteData: WebsiteData;
  items: { label: string; href: string }[];
}

export default function Breadcrumbs({ websiteData, items }: BreadcrumbsProps) {
  const lang = getLanguageConfig(websiteData.language);
  return (
    <nav className="py-2 md:py-3 px-2 md:px-4 mb-4 md:mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs md:text-sm">
        <li>
          <Link
            href="/"
            className="hover:underline transition-colors"
            style={{ color: websiteData.text_color }}
          >
            {lang.labels.home}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-x-2">
            <span style={{ color: websiteData.text_color }} className="opacity-50">/</span>
            {index === items.length - 1 ? (
              <span style={{ color: websiteData.primary_color }} className="font-semibold truncate max-w-[200px] md:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:underline transition-colors"
                style={{ color: websiteData.text_color }}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
