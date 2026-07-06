/**
 * Geofencing detection using 3 methods:
 * 1. Vercel x-vercel-ip-country header (IP-based, most reliable)
 * 2. Accept-Language primary language (language → country mapping)
 * 3. Accept-Language locale region codes (e.g., sv-SE → SE)
 */

// Map country codes to their primary languages
const COUNTRY_TO_LANGUAGES: Record<string, string[]> = {
  se: ['sv'],           // Sweden → Swedish
  fi: ['fi'],           // Finland → Finnish
  no: ['no', 'nb', 'nn'], // Norway → Norwegian (Bokmål, Nynorsk)
  dk: ['da'],           // Denmark → Danish
  de: ['de'],           // Germany → German
  fr: ['fr'],           // France → French
  es: ['es'],           // Spain → Spanish
  it: ['it'],           // Italy → Italian
  pt: ['pt'],           // Portugal → Portuguese
  nl: ['nl'],           // Netherlands → Dutch
  pl: ['pl'],           // Poland → Polish
  cz: ['cs'],           // Czech Republic → Czech
  at: ['de'],           // Austria → German
  ch: ['de', 'fr', 'it'], // Switzerland
  be: ['nl', 'fr', 'de'], // Belgium
  gb: ['en'],           // UK → English
  us: ['en'],           // US → English
  ie: ['en', 'ga'],     // Ireland → English, Irish
  ru: ['ru'],           // Russia → Russian
  jp: ['ja'],           // Japan → Japanese
  cn: ['zh'],           // China → Chinese
  kr: ['ko'],           // South Korea → Korean
  br: ['pt'],           // Brazil → Portuguese
  in: ['hi', 'en'],    // India → Hindi, English
};

/**
 * Parse the geofenced column value into an array of lowercase country codes.
 * Handles formats like "se", "se, fi", "SE,FI", etc.
 */
function parseGeofencedCountries(geofenced: string | null): string[] {
  if (!geofenced || geofenced.trim() === '') return [];
  return geofenced.split(',').map(c => c.trim().toLowerCase()).filter(Boolean);
}

/**
 * Method 1: Check Vercel's IP-based country header.
 * This is set automatically by Vercel's CDN on every request.
 * Returns ISO 3166-1 alpha-2 country code (e.g., "SE", "FI").
 */
function checkVercelCountryHeader(headers: Headers, blockedCountries: string[]): boolean {
  const country = headers.get('x-vercel-ip-country')?.toLowerCase();
  if (!country) return false;
  return blockedCountries.includes(country);
}

/**
 * Method 2: Check Accept-Language primary language.
 * Maps the user's preferred language to likely country of origin.
 * e.g., Accept-Language: sv → likely Swedish user
 */
function checkAcceptLanguagePrimary(headers: Headers, blockedCountries: string[]): boolean {
  const acceptLang = headers.get('accept-language');
  if (!acceptLang) return false;

  // Extract primary language codes (before any quality values)
  // e.g., "sv-SE,sv;q=0.9,en;q=0.8" → ["sv", "en"]
  const langs = acceptLang
    .split(',')
    .map(part => part.split(';')[0].trim().split('-')[0].toLowerCase())
    .filter(Boolean);

  // Check if the user's PRIMARY language (first entry) maps to a blocked country
  const primaryLang = langs[0];
  if (!primaryLang) return false;

  for (const country of blockedCountries) {
    const countryLangs = COUNTRY_TO_LANGUAGES[country] || [];
    if (countryLangs.includes(primaryLang)) {
      return true;
    }
  }

  return false;
}

/**
 * Method 3: Check Accept-Language locale region codes.
 * e.g., "sv-SE" contains region "SE", "fi-FI" contains "FI".
 * This catches cases where the language alone is ambiguous (e.g., German → DE/AT/CH).
 */
function checkAcceptLanguageRegion(headers: Headers, blockedCountries: string[]): boolean {
  const acceptLang = headers.get('accept-language');
  if (!acceptLang) return false;

  // Extract region codes from locale tags
  // e.g., "sv-SE,sv;q=0.9" → ["se"]
  const regions = acceptLang
    .split(',')
    .map(part => {
      const tag = part.split(';')[0].trim();
      const parts = tag.split('-');
      return parts.length >= 2 ? parts[1].toLowerCase() : null;
    })
    .filter((r): r is string => r !== null);

  // Check if any locale region matches a blocked country
  for (const region of regions) {
    if (blockedCountries.includes(region)) {
      return true;
    }
  }

  return false;
}

/**
 * Check if a request should be geofenced based on the post's geofenced value.
 * Uses a 2-of-3 consensus approach when Vercel header isn't available,
 * or trusts Vercel header alone (it's IP-based and highly accurate).
 *
 * Returns true if the user should be blocked/redirected.
 */
export function shouldBlockRequest(headers: Headers, geofenced: string | null | undefined): boolean {
  const blockedCountries = parseGeofencedCountries(geofenced ?? null);
  if (blockedCountries.length === 0) return false;

  // Method 1: Vercel IP-based country (most reliable — trust it alone)
  const vercelBlocked = checkVercelCountryHeader(headers, blockedCountries);
  if (vercelBlocked) return true;

  // If Vercel header is present and says NOT blocked, trust it
  const hasVercelHeader = headers.get('x-vercel-ip-country') !== null;
  if (hasVercelHeader) return false;

  // Fallback: no Vercel header (local dev, non-Vercel hosting)
  // Require both language methods to agree (reduces false positives)
  const langBlocked = checkAcceptLanguagePrimary(headers, blockedCountries);
  const regionBlocked = checkAcceptLanguageRegion(headers, blockedCountries);

  return langBlocked && regionBlocked;
}

/**
 * True if the post has any geofence restriction at all, regardless of viewer.
 * Used for globally-cached/crawled surfaces (sitemap, RSS feed) where
 * per-visitor filtering would poison shared caches.
 */
export function hasGeofence(geofenced: string | null | undefined): boolean {
  return parseGeofencedCountries(geofenced ?? null).length > 0;
}

/**
 * Remove posts the current visitor is geofenced out of.
 * Apply at render time (after cached fetches) — the fetch layer is shared
 * across all visitors and must stay country-agnostic.
 */
export function filterGeofencedPosts<T extends { geofenced?: string | null }>(
  headers: Headers,
  posts: T[]
): T[] {
  return posts.filter(post => !shouldBlockRequest(headers, post.geofenced));
}
