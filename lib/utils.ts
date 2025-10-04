/**
 * Format date to Swedish locale
 * @param date - Date string or Date object
 * @param format - 'long' for "1 januari 2025" or 'short' for "2025-01-01"
 */
export function formatSwedishDate(date: string | Date, format: 'long' | 'short' = 'long'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'short') {
    return dateObj.toLocaleDateString('sv-SE');
  }

  return dateObj.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Calculate reading time for content
 * @param content - HTML or text content
 * @param wordsPerMinute - Average reading speed (default 200)
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default '...')
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length).trim() + suffix;
}

/**
 * Generate slug from title
 * @param title - Title to convert to slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Simple in-memory cache for database queries
 * Disabled for localhost development
 */
interface CacheEntry<T> {
  data: T;
  expires: number;
}

class SimpleCache {
  private cache = new Map<string, CacheEntry<any>>();

  /**
   * Get or fetch data with caching (disabled for localhost)
   * @param key - Unique cache key
   * @param ttl - Time to live in seconds
   * @param fetcher - Function to fetch data if not cached
   * @param hostname - Current hostname (skip cache if localhost)
   */
  async get<T>(
    key: string,
    ttl: number,
    fetcher: () => Promise<T>,
    hostname?: string
  ): Promise<T> {
    // Skip cache for localhost
    if (hostname?.includes('localhost') || hostname?.includes('127.0.0.1')) {
      return fetcher();
    }

    const cached = this.cache.get(key);
    const now = Date.now();

    // Return cached data if still valid
    if (cached && cached.expires > now) {
      return cached.data as T;
    }

    // Fetch fresh data
    const data = await fetcher();
    this.cache.set(key, { data, expires: now + ttl * 1000 });

    // Clean up expired entries periodically (every 100 cache sets)
    if (Math.random() < 0.01) {
      this.cleanup();
    }

    return data;
  }

  /**
   * Clear specific cache entry
   */
  clear(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Remove expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expires <= now) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = new SimpleCache();
