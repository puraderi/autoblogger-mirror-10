'use client';

import { useEffect, useState } from 'react';
import { WebsiteData } from '@/lib/services/website';
import { getLanguageConfig } from '@/lib/languages';

interface TableOfContentsProps {
  websiteData: WebsiteData;
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ websiteData, content }: TableOfContentsProps) {
  const lang = getLanguageConfig(websiteData.language);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1));
      return { id, text, level };
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className={`p-6 ${websiteData.border_radius} sticky top-4`} style={{ backgroundColor: websiteData.secondary_color }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: websiteData.primary_color }}>
        {lang.labels.tableOfContents}
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: `${(heading.level - 2) * 1}rem` }}>
            <a
              href={`#${heading.id}`}
              className={`text-sm transition-colors hover:underline ${
                activeId === heading.id ? 'font-bold' : ''
              }`}
              style={{
                color: activeId === heading.id ? websiteData.primary_color : websiteData.text_color,
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
