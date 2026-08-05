/**
 * Crawler detection for experiment mode.
 *
 * User-agent string matching only — deliberately not reverse-DNS verified.
 * Verification would stop a human spoofing a crawler UA, but costs a DNS lookup
 * per request and cannot verify Ahrefs or Semrush at all, so the coverage would
 * be partial either way.
 *
 * A missing user-agent counts as "not a crawler", so anonymous clients are
 * redirected rather than let through.
 */
const CRAWLER_UA =
  /(googlebot|google-inspectiontool|googleother|storebot-google|adsbot-google|mediapartners-google|apis-google|feedfetcher-google|bingbot|bingpreview|adidxbot|msnbot|slurp|duckduckbot|yandex(bot|images)|baiduspider|applebot|ahrefsbot|ahrefssiteaudit|semrushbot|siteauditbot|mj12bot|dotbot|dataforseobot|petalbot|seznambot|sogou|exabot|screaming frog)/i;

export function isCrawler(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return CRAWLER_UA.test(userAgent);
}
