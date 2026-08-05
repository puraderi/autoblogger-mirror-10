import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { languages, getLanguageConfig } from '@/lib/languages';
import { isCrawler } from '@/lib/bots';

// Swedish slugs (our internal routes)
const SWEDISH_SLUGS = {
  about: 'om-oss',
  contact: 'kontakt',
  blog: 'blogg',
};

// Build a map of all localized slugs to internal Swedish slugs
const slugRewrites: Record<string, string> = {};
for (const config of Object.values(languages)) {
  if (config.slugs.blog !== 'blogg') slugRewrites[`/${config.slugs.blog}`] = '/blogg';
  if (config.slugs.about !== 'om-oss') slugRewrites[`/${config.slugs.about}`] = '/om-oss';
  if (config.slugs.contact !== 'kontakt') slugRewrites[`/${config.slugs.contact}`] = '/kontakt';
}

// Non-Swedish blog prefixes for rewriting /blog/post -> /blogg/post
const blogPrefixes = new Set<string>();
for (const config of Object.values(languages)) {
  if (config.slugs.blog !== 'blogg') blogPrefixes.add(config.slugs.blog);
}

// In-memory cache for hostname → site config (persists within Edge function instance)
type SiteConfig = { language: string | null; experiment: boolean };
const siteConfigCache = new Map<string, { config: SiteConfig; expires: number }>();
const SITE_CONFIG_CACHE_TTL = 3600_000; // 1 hour in ms

// Lightweight lookup of the only two columns the middleware needs.
// Both are read in one query so experiment mode costs no extra round-trip.
async function getSiteConfig(hostname: string): Promise<SiteConfig> {
  const cached = siteConfigCache.get(hostname);
  if (cached && cached.expires > Date.now()) return cached.config;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return { language: null, experiment: false };

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from('website_data')
    .select('language, experiment')
    .eq('host_name', hostname)
    .single();

  let config: SiteConfig;
  if (error) {
    // The experiment column may not exist yet if this deploys before the
    // migration runs. Retry without it so localized slug redirects keep working.
    const { data: fallback } = await supabase
      .from('website_data')
      .select('language')
      .eq('host_name', hostname)
      .single();
    config = { language: fallback?.language || null, experiment: false };
  } else {
    config = { language: data?.language || null, experiment: data?.experiment === true };
  }

  siteConfigCache.set(hostname, { config, expires: Date.now() + SITE_CONFIG_CACHE_TTL });
  return config;
}

// Normalize hostname - keep port for localhost, strip for production
function normalizeHostname(host: string): string {
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return host;
  }
  return host.split(':')[0];
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fast path: check if this request needs any rewriting at all.
  // Only localized slug rewrites and Swedish→localized redirects need the middleware.
  const needsSlugRewrite = slugRewrites[pathname] !== undefined;
  const needsBlogRewrite = Array.from(blogPrefixes).some(
    prefix => pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)
  );
  const isSwedishAbout = pathname === '/om-oss';
  const isSwedishContact = pathname === '/kontakt';
  const isSwedishBlog = pathname === '/blogg' || pathname.startsWith('/blogg/');
  const needsSwedishRedirect = isSwedishAbout || isSwedishContact || isSwedishBlog;

  // Experiment mode has to be evaluated on every path, so the config lookup can
  // no longer be skipped the way it was when only slug rewrites needed it. The
  // in-memory cache keeps this to a Map read after the first request per edge
  // instance; only a cold instance pays a Supabase round-trip.
  const hostname = normalizeHostname(request.headers.get('host') || 'localhost');
  const { language, experiment } = await getSiteConfig(hostname);

  // Experiment mode: non-crawler traffic goes to the front page. Checked before
  // any rewrite so it covers every path. '/' is exempt or this loops forever,
  // and /api is exempt so future route handlers keep working.
  if (
    experiment &&
    pathname !== '/' &&
    !pathname.startsWith('/api/') &&
    !isCrawler(request.headers.get('user-agent'))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    const response = NextResponse.redirect(url, 302);
    // Stops Cloudflare or any intermediary caching this redirect and later
    // replaying it to a crawler, which would defeat the whole arrangement.
    response.headers.set('Cache-Control', 'no-store, private');
    return response;
  }

  // If no rewriting needed, skip entirely
  if (!needsSlugRewrite && !needsBlogRewrite && !needsSwedishRedirect) {
    return NextResponse.next();
  }

  // Rewrite localized slugs to Swedish (internal routing) — no DB call needed
  if (needsSlugRewrite) {
    const url = request.nextUrl.clone();
    url.pathname = slugRewrites[pathname];
    return NextResponse.rewrite(url);
  }

  // Handle blog post paths: /blog/some-post -> /blogg/some-post — no DB call needed
  if (needsBlogRewrite) {
    for (const prefix of blogPrefixes) {
      if (pathname.startsWith(`/${prefix}/`)) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.replace(`/${prefix}/`, '/blogg/');
        return NextResponse.rewrite(url);
      }
      if (pathname === `/${prefix}`) {
        const url = request.nextUrl.clone();
        url.pathname = '/blogg';
        return NextResponse.rewrite(url);
      }
    }
  }

  // Redirect Swedish slugs to the site's own localized slugs
  if (needsSwedishRedirect) {
    // If the site IS Swedish (or unknown), no redirect needed
    if (!language || language === 'Swedish') {
      return NextResponse.next();
    }

    const lang = getLanguageConfig(language);
    const url = request.nextUrl.clone();

    if (isSwedishAbout && lang.slugs.about !== 'om-oss') {
      url.pathname = `/${lang.slugs.about}`;
      return NextResponse.redirect(url, 301);
    }
    if (isSwedishContact && lang.slugs.contact !== 'kontakt') {
      url.pathname = `/${lang.slugs.contact}`;
      return NextResponse.redirect(url, 301);
    }
    if (isSwedishBlog && lang.slugs.blog !== 'blogg') {
      url.pathname = pathname.replace('/blogg', `/${lang.slugs.blog}`);
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
