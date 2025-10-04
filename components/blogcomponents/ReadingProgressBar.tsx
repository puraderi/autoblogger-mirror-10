'use client';

import { useEffect, useState } from 'react';
import { WebsiteData } from '@/lib/services/website';

interface ReadingProgressBarProps {
  websiteData: WebsiteData;
}

export default function ReadingProgressBar({ websiteData }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollProgress = (scrollTop / documentHeight) * 100;
      setProgress(Math.min(scrollProgress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1" style={{ backgroundColor: websiteData.secondary_color }}>
      <div
        className="h-full transition-all duration-150"
        style={{
          width: `${progress}%`,
          backgroundColor: websiteData.primary_color,
        }}
      />
    </div>
  );
}
