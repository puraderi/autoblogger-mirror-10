import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { languages, getLanguageConfig } from '@/lib/languages';

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

// Lightweight function to get just the language for a hostname
async function getLanguageForHostname(hostname: string): Promise<string | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return null;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase
    .from('website_data')
    .select('language')
    .eq('host_name', hostname)
    .single();

  return data?.language || null;
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
  const hostname = normalizeHostname(request.headers.get('host') || 'localhost');

  // Check if user is visiting a Swedish slug directly
  const isSwedishAbout = pathname === '/om-oss';
  const isSwedishContact = pathname === '/kontakt';
  const isSwedishBlog = pathname === '/blogg' || pathname.startsWith('/blogg/');

  // If visiting a Swedish slug, check if we need to redirect
  if (isSwedishAbout || isSwedishContact || isSwedishBlog) {
    const language = await getLanguageForHostname(hostname);
    const lang = getLanguageConfig(language);

    // If the site is NOT Swedish, redirect to the localized slug
    if (language && language !== 'Swedish') {
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
  }

  // Rewrite localized slugs to Swedish (internal routing)
  if (slugRewrites[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = slugRewrites[pathname];
    return NextResponse.rewrite(url);
  }

  // Handle blog post paths: /blog/some-post -> /blogg/some-post
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
