'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WebsiteData } from '@/lib/services/website';
import { getContrastTextColor } from '@/lib/utils';

interface SearchBarProps {
  websiteData: WebsiteData;
  placeholder?: string;
}

export default function SearchBar({ websiteData, placeholder = 'Sök artiklar...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blogg?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: websiteData.text_color }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-20 md:pr-24 py-2 md:py-3 text-sm md:text-base ${websiteData.border_radius} border-2 transition-all duration-200 focus:outline-none`}
          style={{
            borderColor: websiteData.secondary_color,
            color: websiteData.text_color,
          }}
          onFocus={(e) => e.target.style.borderColor = websiteData.accent_color}
          onBlur={(e) => e.target.style.borderColor = websiteData.secondary_color}
        />
        <button
          type="submit"
          className={`absolute right-1 md:right-2 top-1/2 -translate-y-1/2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm ${websiteData.border_radius} transition-all duration-200 hover:opacity-80 hover:scale-105 whitespace-nowrap`}
          style={{ backgroundColor: websiteData.primary_color, color: getContrastTextColor(websiteData.primary_color) }}
        >
          Sök
        </button>
      </div>
    </form>
  );
}
