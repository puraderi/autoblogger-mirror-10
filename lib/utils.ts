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
 * Normalize hostname for database lookup
 * For localhost: keep the port (localhost:3000)
 * For production domains: strip the port
 * @param hostname - Raw hostname from headers (e.g., "localhost:3000" or "example.com:443")
 */
export function normalizeHostname(hostname: string): string {
  // If it's localhost, keep the full hostname with port
  if (hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1')) {
    return hostname;
  }

  // For production domains, strip the port
  return hostname.split(':')[0];
}

/**
 * Convert Iconify icon identifier to SVG URL
 * @param iconIdentifier - Icon identifier in format "collection:name" (e.g., "mdi:coffee")
 * @returns SVG URL from Iconify API
 */
export function iconToUrl(iconIdentifier: string | null | undefined): string | null {
  if (!iconIdentifier) return null;

  // Convert "mdi:coffee" to "mdi/coffee"
  const iconPath = iconIdentifier.replace(':', '/');
  return `https://api.iconify.design/${iconPath}.svg`;
}

/**
 * Get contrasting text color (black or white) based on background color luminance
 * @param hexColor - Hex color string (e.g., "#FF5733" or "FF5733")
 * @returns 'white' or 'black' for optimal readability
 */
export function getContrastTextColor(hexColor: string): 'white' | 'black' {
  // Remove # if present
  const hex = hexColor.replace('#', '');

  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate relative luminance using WCAG formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light backgrounds, white for dark backgrounds
  return luminance > 0.5 ? 'black' : 'white';
}

/**
 * Adjust color brightness
 * @param hexColor - Hex color string
 * @param percent - Positive to lighten, negative to darken (-100 to 100)
 */
export function adjustColorBrightness(hexColor: string, percent: number): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const adjust = (color: number) => {
    const adjusted = percent > 0
      ? color + (255 - color) * (percent / 100)
      : color + color * (percent / 100);
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  };

  const rNew = adjust(r).toString(16).padStart(2, '0');
  const gNew = adjust(g).toString(16).padStart(2, '0');
  const bNew = adjust(b).toString(16).padStart(2, '0');

  return `#${rNew}${gNew}${bNew}`;
}
