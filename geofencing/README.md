# Geofencing

Per-post country blocking for blog posts. A post can be hidden from visitors in
specific countries; blocked visitors are redirected to the homepage and the post
is filtered out of listings, related posts, prev/next navigation, the sitemap,
and the RSS feed.

## How a post gets geofenced

The `blog_post.geofenced` column (text, nullable) holds a comma-separated list
of lowercase ISO 3166-1 alpha-2 country codes to **block**:

| `geofenced` value | Effect |
|---|---|
| `NULL` or empty | No restriction — visible everywhere |
| `se` | Hidden from visitors in Sweden |
| `se, fi` | Hidden from visitors in Sweden and Finland |

Formatting is forgiving: `SE,FI`, `se, fi`, and `se,fi` all parse the same.
Only `status/published` posts are served at all; geofencing is an additional
per-visitor filter on top.

## Where the check happens

All logic lives in [`lib/geofence.ts`](../lib/geofence.ts):

- `shouldBlockRequest(headers, geofenced)` — the core decision for one visitor + one post.
- `filterGeofencedPosts(headers, posts)` — strips blocked posts from lists at **render time**.
- `hasGeofence(geofenced)` — visitor-independent check used by globally cached/crawled
  surfaces (sitemap, RSS feed) where per-visitor filtering would poison shared caches.

Call sites: `app/blogg/[slug]/page.tsx` (redirects blocked visitors to `/` before
rendering), `app/blogg/page.tsx`, `app/page.tsx`, `app/[author-slug]/page.tsx`,
`app/sitemap.ts`, `app/feed.xml/route.ts`.

Important: data fetches in `lib/services/blog.ts` use `'use cache'` and are shared
across all visitors, so they must stay country-agnostic. Geofence filtering is
applied **after** the cached fetch, in the request-scoped render pass. Never move
the filter into the fetch layer.

## How the visitor's country is detected

Our sites sit behind **Cloudflare's proxy** (orange cloud) in front of Vercel.
That makes Vercel's own IP-derived headers unreliable: Vercel geolocates the IP
that connects to it — which is a Cloudflare edge datacenter, not the visitor.
Vercel also deliberately overwrites `x-forwarded-for` from proxies (anti-spoofing),
so the real client IP never reaches Vercel. (Real-IP passthrough is a Vercel
Enterprise "Trusted Proxy" feature.)

`shouldBlockRequest` therefore uses this trust order:

1. **`cf-ipcountry`** (Cloudflare, from the real visitor IP) — trusted fully when
   present. Requires the zone's **IP Geolocation** setting (Cloudflare → Network)
   or the "Add visitor location headers" Managed Transform. Special values
   `XX` (unknown) and `T1` (Tor) are treated as "no answer", not "not blocked".
2. **`x-vercel-ip-country`** — a *match* blocks (a match means the connecting
   edge really is in a blocked country), but a *non-match never unblocks*,
   because behind Cloudflare it reflects the edge POP's country.
3. **Accept-Language consensus** — blocks only when both agree:
   - primary browser language maps to a blocked country (e.g. `sv` → `se`), and
   - a locale region tag matches (e.g. `sv-SE` → `se`).

   This catches most real visitors when no trustworthy IP header exists
   (local dev, geolocation disabled on a zone), at the cost of edge cases:
   a Swede browsing in English slips through; a Swedish-language browser
   abroad gets blocked.

## History: the July 2026 incident

Geofencing silently stopped working on all Vercel sites at once while WordPress
sites kept blocking fine. Root cause: the code at the time trusted
`x-vercel-ip-country` alone. It had only ever worked *by accident* — Cloudflare
was routing Swedish traffic through its Stockholm POP, so Vercel happened to see
`SE`. When Cloudflare reshuffled routing to Copenhagen, Vercel started seeing
`DK` for Swedish visitors and every `geofenced='se'` check passed. No code or
deploy change was involved. The trust-order logic above is the fix.

## Testing gotchas

- **curl gets a 429** (`x-vercel-mitigated: challenge`) — Vercel bot protection
  challenges non-browser clients, so you can't reproduce page behavior with curl.
  Test in a real browser, or check `cf-ray`/`server` headers to inspect routing.
- To simulate countries locally (no IP headers present), set the browser's
  Accept-Language (e.g. `sv-SE,sv;q=0.9`) — the consensus fallback will trigger.
- If geofencing fails on a specific site, first verify that zone sends
  `cf-ipcountry` (Cloudflare IP Geolocation enabled).
