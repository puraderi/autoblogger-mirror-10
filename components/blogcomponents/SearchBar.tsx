'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WebsiteData } from '@/lib/services/website';

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
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 md:px-4 py-2 md:py-3 pr-20 md:pr-24 text-sm md:text-base ${websiteData.border_radius} border-2 transition-colors focus:outline-none focus:ring-2`}
          style={{
            borderColor: websiteData.secondary_color,
            color: websiteData.text_color,
          }}
        />
        <button
          type="submit"
          className={`absolute right-1 md:right-2 top-1/2 -translate-y-1/2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm ${websiteData.border_radius} transition-opacity hover:opacity-80 whitespace-nowrap`}
          style={{ backgroundColor: websiteData.primary_color, color: 'white' }}
        >
          Sök
        </button>
      </div>
    </form>
  );
}
