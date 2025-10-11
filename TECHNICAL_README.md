# AutoBloggerX - Technical Reference

**Engineer-to-Engineer Documentation**

Last Updated: 2025-10-11

---

## System Overview

Multi-tenant blog platform. Single Next.js deployment serves unlimited websites via hostname-based routing. Separate admin app for website/content management. All content AI-generated (Claude Sonnet 4.5), Swedish-localized.

**Architecture:** Next.js 15 App Router + Supabase PostgreSQL + AI content pipeline

---

## Project Structure

```
autobloggerx/
├── app/                    # Main website routes (Next.js App Router)
├── components/             # 41 React components (5 template variants each)
├── lib/                    # Services, types, utils, Supabase client
├── supabase/migrations/    # SQL migrations
├── admin-app/              # Separate Next.js app (port 3001)
└── populater.py            # Legacy CLI tool (Python)
```

### Key Directories

| Path | Purpose |
|------|---------|
| `app/` | Route handlers (ISR-enabled pages) |
| `components/blogcomponents/` | 10 conditional blog features |
| `components/blogposts/` | 5 blog post layout templates |
| `components/frontpages/` | 5 homepage layout templates |
| `lib/services/` | Data access layer (website, blog) |
| `admin-app/app/` | Admin routes (launch, manage, generate) |
| `admin-app/lib/` | AI generation pipeline, image upload |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 15.5.4 |
| React | React | 19.1.0 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| Database | Supabase (PostgreSQL) | Latest |
| AI - Content | Anthropic Claude Sonnet 4.5 | `@anthropic-ai/sdk ^0.65.0` |
| AI - Research | Perplexity API | (admin-app) |
| AI - Images | FAL/Flux | (admin-app) |
| Images | Sharp | (admin-app, WebP compression) |
| Build | Turbopack | Enabled via `--turbopack` |

### Dependencies (Main App)

```json
{
  "next": "15.5.4",
  "react": "19.1.0",
  "@supabase/supabase-js": "^2.58.0",
  "tailwindcss": "^4.0.0"
}
```

### Dependencies (Admin App)

```json
{
  "@anthropic-ai/sdk": "^0.65.0",
  "sharp": "^0.33.5"
}
```

---

## Data Models

### Database Schema (Supabase)

#### `website_data` (Multi-Tenant Core)

```typescript
{
  id: string (uuid, pk)
  host_name: string (unique)    // "localhost", "myblog.com"
  website_name: string           // Display name
  topic: string                  // Niche/focus

  // Content Pages
  about_us: string (HTML)
  contact_us: string (HTML)
  frontpage_hero_title: string | null
  frontpage_hero_text: string | null
  frontpage_outro_text: string | null

  // Template Selection (1-5 each)
  template_header: number
  template_footer: number
  template_blog_post: number
  template_page: number
  template_front_page: number

  // Design System
  primary_color: string          // #hex
  secondary_color: string
  accent_color: string
  background_color: string
  text_color: string
  font_heading: string           // "Inter", "Lora", etc.
  font_body: string
  container_width: string        // "max-w-7xl"
  border_radius: string          // "rounded-lg"

  // Assets
  logo_url: string | null
  favicon_url: string | null

  // SEO
  meta_description: string | null

  // Social Links
  social_twitter: string | null
  social_facebook: string | null
  social_instagram: string | null
  social_linkedin: string | null

  // Author (Site-Wide)
  author_name: string | null
  author_bio: string | null
  author_image_url: string | null
  author_slug: string | null     // For /[author-slug] route

  // Feature Flags (Boolean Toggles)
  show_breadcrumbs: boolean
  show_related_posts: boolean
  show_search_bar: boolean
  show_share_buttons: boolean
  show_table_of_contents: boolean
  show_author_box: boolean
  show_tags_display: boolean
  show_reading_time: boolean
  show_post_navigation: boolean
  show_reading_progress_bar: boolean

  created_at: string
}
```

#### `blog_post`

```typescript
{
  id: string (uuid, pk)
  website_id: string (fk → website_data.id, cascade delete)
  slug: string                   // URL-friendly
  title: string
  excerpt: string                // Short summary
  content: string                // Full HTML (no H1)
  image_url: string | null       // Featured image (Supabase Storage)
  author_name: string
  author_avatar: string | null
  published: boolean
  published_at: string | null
  tags: string[] | null          // PostgreSQL array
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string

  UNIQUE(website_id, slug)       // Slug unique per website
}
```

**Indexes:**
```sql
CREATE INDEX idx_blog_post_website_id ON blog_post(website_id);
CREATE INDEX idx_blog_post_slug ON blog_post(slug);
CREATE INDEX idx_blog_post_published ON blog_post(published);
```

#### `blog_generation_jobs` (Queue System)

```typescript
{
  id: string (uuid, pk)
  website_id: string (fk → website_data.id)
  keyword: string                // Target keyword
  status: 'pending' | 'processing' | 'complete' | 'failed'
  progress_step: string | null   // e.g., "Step 3/12: Writing content"
  result_post_id: string | null  // Created blog_post.id
  error_message: string | null
  created_at: string
  updated_at: string             // Auto via trigger
  completed_at: string | null
}
```

**Index:**
```sql
CREATE INDEX idx_blog_jobs_status ON blog_generation_jobs(status);
```

---

## Multi-Tenancy Architecture

### Hostname-Based Routing

**Flow:**
1. Request hits deployment (e.g., `myblog.com`)
2. Extract hostname from headers (`headers().get("host")`)
3. Strip port: `hostname.split(':')[0]` (critical for localhost:3000)
4. Query: `SELECT * FROM website_data WHERE host_name = ?`
5. Render with website-specific data (colors, templates, content)
6. If no match → "Website not found" error page

**Code Example:**
```typescript
// app/page.tsx
const headersList = await headers();
const hostname = (headersList.get("host") || "localhost").split(':')[0];
const websiteData = await getWebsiteDataByHostname(hostname);
if (!websiteData) notFound();
```

**Deployment Options:**

| Option | Description | Cost | Management |
|--------|-------------|------|------------|
| Multi-Tenant (Recommended) | Single Vercel deployment, multiple domains in dashboard | Low | Easy |
| Separate Deployments | Each website = separate Vercel project | High | Complex |

---

## Routing & ISR Strategy

### Routes (App Router)

| Route | ISR Revalidate | Type | Description |
|-------|----------------|------|-------------|
| `/` | 60s | Page | Homepage (hero + recent posts) |
| `/blogg` | 60s | Page | All blog posts list |
| `/blogg/[slug]` | 24h | Dynamic | Individual blog post |
| `/om-oss` | 1h | Page | About page |
| `/kontakt` | 1h | Page | Contact page |
| `/[author-slug]` | N/A | Dynamic | Author profile (all posts) |
| `/sitemap.xml` | N/A | Route | Dynamic sitemap |
| `/robots.txt` | N/A | Route | SEO robots file |

**Swedish Route Names:**
- `/blogg/` (not `/blog/`)
- `/om-oss/` (about)
- `/kontakt/` (contact)

### ISR Configuration

```typescript
// app/blogg/[slug]/page.tsx
export const revalidate = 86400; // 24 hours
export const dynamicParams = true; // Allow new slugs
```

**Why These Intervals:**
- Homepage/List (60s): Balance freshness and build load
- Blog Posts (24h): Content rarely changes after publish
- Static Pages (1h): Occasional edits

### Caching Strategy

**In-Memory Cache (`lib/utils.ts`):**
```typescript
cache.get(key, ttl, async () => { /* fetch */ }, cacheKey)
```

| Data | TTL | Cache Key |
|------|-----|-----------|
| Website data | 1h | `website:${hostname}` |
| Blog posts list | 5m | `posts:${websiteId}` |
| Single post | 6h | `post:${websiteId}:${slug}` |

**Disabled for Localhost:**
```typescript
if (hostname === 'localhost') return await fetchFn();
```

---

## Template System

### Component Templates (5 Variants Each)

```
components/
├── headers/         (Header1 - Header5)
├── footers/         (Footer1 - Footer5)
├── blogposts/       (BlogPost1 - BlogPost5)
├── pages/           (PageTemplate1 - PageTemplate5)
└── frontpages/      (FrontPage1 - FrontPage5)
```

**Selection Logic:**
```typescript
// components/headers/index.tsx
const templates = [Header1, Header2, Header3, Header4, Header5];
const HeaderComponent = templates[websiteData.template_header - 1] || Header1;
return <HeaderComponent websiteData={websiteData} />;
```

**Database Value:** Integer 1-5 in `website_data.template_*`

### Blog Components (Conditional Features)

10 components controlled by `show_*` boolean flags:

| Component | Flag | Description |
|-----------|------|-------------|
| Breadcrumbs | `show_breadcrumbs` | Navigation trail |
| ShareButtons | `show_share_buttons` | Social sharing (Twitter, Facebook, LinkedIn) |
| TagsDisplay | `show_tags_display` | Post tags |
| ReadingTime | `show_reading_time` | Estimated reading time |
| AuthorBox | `show_author_box` | Author bio below post |
| PostNavigation | `show_post_navigation` | Prev/Next post links |
| RelatedPosts | `show_related_posts` | Tag-based similar posts (3 max) |
| ReadingProgressBar | `show_reading_progress_bar` | Scroll progress indicator |
| TableOfContents | `show_table_of_contents` | (exists but not implemented) |
| SearchBar | `show_search_bar` | (exists but not implemented) |

**Usage Example:**
```typescript
{websiteData.show_author_box && <AuthorBox websiteData={websiteData} />}
```

---

## Dynamic Theming

### CSS Variables Injection

**Root Layout (`app/layout.tsx`):**
```typescript
<style dangerouslySetInnerHTML={{
  __html: `
    :root {
      --color-primary: ${websiteData.primary_color};
      --color-secondary: ${websiteData.secondary_color};
      --color-accent: ${websiteData.accent_color};
      --color-background: ${websiteData.background_color};
      --color-text: ${websiteData.text_color};
    }
    body {
      background-color: ${websiteData.background_color};
      color: ${websiteData.text_color};
      font-family: ${getCSSFontFamily(websiteData.font_body)};
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: ${getCSSFontFamily(websiteData.font_heading)};
    }
  `
}} />
```

### Google Fonts (9 Options)

| Font | Category | Usage |
|------|----------|-------|
| Inter | Sans-serif | Modern, clean |
| Roboto | Sans-serif | Google default |
| Montserrat | Sans-serif | Bold, geometric |
| Open Sans | Sans-serif | Readable |
| Raleway | Sans-serif | Elegant |
| Poppins | Sans-serif | Rounded |
| Lora | Serif | Classic blog |
| Playfair Display | Serif | Luxury |
| Merriweather | Serif | Traditional |

**Loading (`lib/fonts.ts`):**
```typescript
import { Inter, Lora, Playfair_Display, ... } from 'next/font/google';
```

### Color Scheme

**WCAG AA Compliant:**
- Text: 4.5:1 contrast ratio minimum
- Large text/headings: 3:1 minimum
- Generated by Claude with accessibility checks

**Example Palette:**
```typescript
{
  primary_color: "#2563eb",      // Blue
  secondary_color: "#f3f4f6",    // Light gray
  accent_color: "#10b981",       // Green
  background_color: "#ffffff",   // White
  text_color: "#1f2937"          // Dark gray
}
```

---

## SEO Implementation

### Metadata Generation

**Every Route:**
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const websiteData = await getWebsiteDataByHostname(hostname);
  return {
    title: websiteData.website_name,
    description: websiteData.meta_description,
    openGraph: {
      title: websiteData.website_name,
      description: websiteData.meta_description,
      type: 'website',
      locale: 'sv_SE'
    },
    twitter: {
      card: 'summary_large_image',
      title: websiteData.website_name,
      description: websiteData.meta_description
    }
  };
}
```

### Structured Data (JSON-LD)

**Blog Posts:**
```typescript
<StructuredData
  type="BlogPosting"
  data={{
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.image_url,
    author: { "@type": "Person", name: websiteData.author_name },
    publisher: {
      "@type": "Organization",
      name: websiteData.website_name,
      logo: { "@type": "ImageObject", url: websiteData.logo_url }
    },
    datePublished: post.published_at,
    dateModified: post.updated_at
  }}
/>
```

### Dynamic Sitemap

**`app/sitemap.ts`:**
```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hostname = await getHostname();
  const websiteData = await getWebsiteDataByHostname(hostname);
  const posts = await getBlogPostsByWebsiteId(websiteData.id);

  return [
    { url: `https://${hostname}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `https://${hostname}/blogg`, changeFrequency: 'daily', priority: 0.8 },
    ...posts.map(post => ({
      url: `https://${hostname}/blogg/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'monthly',
      priority: 0.6
    }))
  ];
}
```

---

## Data Access Layer

### Service Pattern (`lib/services/`)

**website.ts:**
```typescript
export async function getWebsiteDataByHostname(hostname: string): Promise<WebsiteData | null> {
  return cache.get(`website:${hostname}`, 3600, async () => {
    const { data, error } = await supabase
      .from('website_data')
      .select('*')
      .eq('host_name', hostname)
      .single();
    return error ? null : data;
  }, hostname);
}
```

**blog.ts:**
```typescript
export async function getBlogPostsByWebsiteId(websiteId: string): Promise<BlogPost[]> {
  return cache.get(`posts:${websiteId}`, 300, async () => {
    const { data, error } = await supabase
      .from('blog_post')
      .select('*')
      .eq('website_id', websiteId)
      .eq('published', true)
      .order('published_at', { ascending: false });
    return error ? [] : data;
  }, websiteId);
}
```

**Key Functions:**
- `getWebsiteDataByHostname(hostname)`
- `getBlogPostsByWebsiteId(websiteId)`
- `getBlogPostBySlug(websiteId, slug)`
- `getRelatedBlogPosts(websiteId, tags, currentPostId)`

---

## Admin App Architecture

### Separate Next.js Application

**Location:** `admin-app/`

**Purpose:**
- Website creation
- Website management
- Bulk blog post generation

**Port:** 3001 (dev), configurable (prod)

**Authentication:** Password-protected (sessionStorage)

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Login page |
| `/launch` | Create new website |
| `/websites` | Manage existing websites |
| `/generate` | Bulk blog post generation |
| `/api/admin/verify` | Password verification |
| `/api/websites` | Websites CRUD |
| `/api/process-jobs` | Background job processor |

### Website Creation Flow

**`/launch` → Claude Sonnet 4.5 → Database**

**Input:**
- Website name
- Topic/niche
- Hostname

**AI-Generated Output:**
1. **About Us Page** (150-250 words, Swedish, HTML)
2. **Contact Us Page** (100-150 words, Swedish, HTML)
3. **Hero Section** (title, text, outro)
4. **Color Scheme** (5 colors, WCAG AA compliant)
5. **Meta Description** (140-160 chars)

**Random Assignments:**
- Template selections (1-5 for each component type)
- Feature flags (Boolean toggles)
- Fonts (heading + body from 9 options)

**Writing Rules Applied:**
```
- 8th-grade reading level
- Dependency grammar
- Factual, neutral tone
- Avoid clichés ("i dagens snabbrörliga värld")
- No "denna" - rewrite instead
- No mini-summaries at paragraph ends
- Varied sentence/paragraph length
- No summary/conclusion sections
```

**Code Example:**
```typescript
// admin-app/app/launch/page.tsx
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-5-20250929",
  messages: [{ role: "user", content: prompt }],
  max_tokens: 4000
});

const result = JSON.parse(response.content[0].text);

await supabase.from('website_data').insert({
  host_name: hostname,
  website_name: websiteName,
  topic,
  about_us: result.about_us,
  contact_us: result.contact_us,
  // ... all fields
});
```

---

## Blog Post Generation Pipeline

### 12-Step AI Process

**Triggered By:** Keywords submitted to `/generate`

**Queue System:** `blog_generation_jobs` table

**Processor:** `/api/process-jobs` (called on-demand, no cron)

### Step-by-Step Breakdown

| Step | Tool | Purpose | Output |
|------|------|---------|--------|
| 1 | Perplexity API | Research keyword | Factual information, sources |
| 2 | Claude Sonnet 4.5 | Generate outline | H2 section structure (4-6 sections) |
| 3 | Claude Sonnet 4.5 | Write full article | HTML content (no H1, 1000-1500 words) |
| 4 | Claude Sonnet 4.5 | Humanize | Add natural variations, "errors" |
| 5 | Claude Sonnet 4.5 | Generate title | SEO title (50-60 chars) |
| 6 | Claude Sonnet 4.5 | Meta description | SEO description (150-160 chars) |
| 7 | Claude Sonnet 4.5 | Write excerpt | Short summary (max 200 chars) |
| 8 | Claude Sonnet 4.5 | Generate tags | 3-5 relevant tags |
| 9 | Utility function | Create slug | URL-friendly from title |
| 10 | Claude Sonnet 4.5 | Image prompt | Describe image scene |
| 11 | FAL/Flux | Generate image | 1024x1024 PNG |
| 12 | Sharp + Supabase | Compress & upload | WebP (85% quality) → Storage |

### Code Flow

**admin-app/lib/blog-generator.ts:**
```typescript
export async function generateBlogPost(websiteId: string, keyword: string) {
  // Step 1: Research
  const research = await perplexity.chat.completions.create({
    model: "llama-3.1-sonar-large-128k-online",
    messages: [{ role: "user", content: `Research: ${keyword}` }]
  });

  // Steps 2-8: Claude calls
  const outline = await anthropic.messages.create({ ... });
  const content = await anthropic.messages.create({ ... });
  // ... etc

  // Step 11: Image generation
  const imageResult = await fal.subscribe("fal-ai/flux/dev", {
    input: { prompt: imagePrompt }
  });

  // Step 12: Compress and upload
  const webpBuffer = await sharp(Buffer.from(imageBytes))
    .webp({ quality: 85 })
    .toBuffer();

  const { data: uploadData } = await supabase.storage
    .from('blog-images')
    .upload(filename, webpBuffer);

  // Insert blog post
  await supabase.from('blog_post').insert({ ... });
}
```

### Writing Rules (Enforced)

```
STRICT WRITING GUIDELINES:
- Dependency grammar for readability
- 8th-grade reading level
- Factual descriptions (no symbolic framing)
- Neutral, measurable language
- Minimize connector overuse ("Dessutom", "Vidare", "Därför")
- NO mini-summaries at paragraph ends
- NO cliché phrases ("i dagens snabbrörliga värld", "Det är viktigt att notera")
- NO "denna" - rewrite the sentence
- Vary sentence and paragraph length (mix short and long)
- Use commas instead of dashes where appropriate
- DO NOT end with summary/conclusion section
- Content in Swedish
```

### Job Processing

**Manual Trigger (No Cron):**
```typescript
// After keywords submitted:
await fetch('/api/process-jobs', { method: 'POST' });

// /api/process-jobs endpoint:
export async function POST() {
  const jobs = await supabase
    .from('blog_generation_jobs')
    .select('*')
    .eq('status', 'pending');

  for (const job of jobs) {
    await supabase
      .from('blog_generation_jobs')
      .update({ status: 'processing' })
      .eq('id', job.id);

    try {
      const postId = await generateBlogPost(job.website_id, job.keyword);
      await supabase
        .from('blog_generation_jobs')
        .update({ status: 'complete', result_post_id: postId })
        .eq('id', job.id);
    } catch (error) {
      await supabase
        .from('blog_generation_jobs')
        .update({ status: 'failed', error_message: error.message })
        .eq('id', job.id);
    }
  }

  return Response.json({ success: true });
}
```

---

## Image Management

### Supabase Storage

**Buckets:**
- `blog-images` (public)
- `author-images` (public)

**Compression Pipeline:**
```typescript
const webpBuffer = await sharp(Buffer.from(imageBytes))
  .resize(1200, 800, { fit: 'cover' })
  .webp({ quality: 85 })
  .toBuffer();
```

**Upload:**
```typescript
const filename = `${slug}-${Date.now()}.webp`;
const { data, error } = await supabase.storage
  .from('blog-images')
  .upload(filename, webpBuffer, {
    contentType: 'image/webp',
    cacheControl: '31536000' // 1 year
  });

const publicUrl = supabase.storage
  .from('blog-images')
  .getPublicUrl(filename).data.publicUrl;
```

**CDN URLs:**
```
https://[project].supabase.co/storage/v1/object/public/blog-images/[filename].webp
```

### Next.js Image Configuration

**next.config.ts:**
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**.supabase.co' },
    { protocol: 'https', hostname: 'via.placeholder.com' },
    { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }
  ]
}
```

---

## Utility Functions

### lib/utils.ts

**Reading Time Calculator:**
```typescript
export function calculateReadingTime(content: string, wpm: number = 200): number {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wpm);
}
```

**Slug Generator (Swedish-Aware):**
```typescript
export function generateSlug(title: string): string {
  return title.toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

**Swedish Date Formatting:**
```typescript
export function formatSwedishDate(date: string | Date, format: 'long' | 'short' = 'long'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: format === 'long' ? 'long' : 'numeric',
    day: 'numeric'
  });
}
```

**Cache Wrapper:**
```typescript
class SimpleCache {
  async get<T>(key: string, ttl: number, fetchFn: () => Promise<T>, hostname?: string): Promise<T> {
    if (hostname === 'localhost') return await fetchFn();

    if (this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (Date.now() < cached.expiry) return cached.value;
    }

    const value = await fetchFn();
    this.cache.set(key, { value, expiry: Date.now() + (ttl * 1000) });
    this.cleanup();
    return value;
  }
}
```

---

## Environment Setup

### Environment Variables

**Main App (`.env.local`):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Admin App (`admin-app/.env.local`):**
```env
# AI Services
ANTHROPIC_API_KEY=sk-ant-api03-...
PERPLEXITY_API_KEY=pplx-...
FAL_API_KEY=your-fal-key

# Database (same as main app)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin Authentication
ADMIN_PASSWORD=your-secure-password
```

### Local Development

**Main App:**
```bash
npm run dev         # Port 3000
npm run build       # Production build with Turbopack
npm start           # Production server
```

**Admin App:**
```bash
cd admin-app
npm run dev         # Port 3001
npm run build       # Production build
npm start           # Production server (port 3001)
```

### Database Setup

**Migrations:**
```bash
# Located in supabase/migrations/
# Apply via Supabase Dashboard SQL Editor or CLI

supabase db push
```

**Key Migrations:**
1. `create_blog_generation_jobs.sql` - Job queue table
2. `add_author_fields.sql` - Author metadata

**Storage Buckets (Manual Setup):**
```sql
-- Create via Supabase Dashboard > Storage
-- Set both buckets to "public"
```

---

## Deployment

### Vercel (Recommended)

**Main App:**
1. Connect GitHub repo
2. Framework preset: Next.js
3. Build command: `npm run build`
4. Output directory: `.next`
5. Environment variables: Add `NEXT_PUBLIC_SUPABASE_*`

**Admin App:**
1. Separate Vercel project
2. Root directory: `admin-app`
3. Environment variables: Add all `admin-app/.env.local` vars
4. Optionally password-protect entire project via Vercel settings

**Domain Configuration:**
- Add all client domains to main app project
- Each domain → same deployment
- No code changes needed for new domains

### Multi-Tenant Checklist

1. Add hostname to Vercel project domains
2. Create `website_data` record with matching `host_name`
3. Test: Visit domain, should render website
4. If "Website not found" → check `host_name` matches exactly (no port, no protocol)

---

## Key Implementation Details

### Server vs Client Components

**Server Components (default):**
- All pages (`app/**/*.tsx`)
- Data fetching with async/await
- Direct Supabase queries
- SEO metadata generation

**Client Components (`'use client'`):**
- Headers (interactive navigation)
- Forms (admin app)
- Browser API usage (sessionStorage, window)

### Related Posts Algorithm

**Tag-Based Matching:**
```typescript
// lib/services/blog.ts
export async function getRelatedBlogPosts(
  websiteId: string,
  tags: string[],
  currentPostId: string
): Promise<BlogPost[]> {
  const { data } = await supabase
    .from('blog_post')
    .select('*')
    .eq('website_id', websiteId)
    .eq('published', true)
    .neq('id', currentPostId)
    .contains('tags', tags) // PostgreSQL array contains
    .limit(3);

  // If less than 3, fill with recent posts
  if (data.length < 3) {
    const additional = await supabase
      .from('blog_post')
      .select('*')
      .eq('website_id', websiteId)
      .eq('published', true)
      .neq('id', currentPostId)
      .not('id', 'in', `(${data.map(p => p.id).join(',')})`)
      .order('published_at', { ascending: false })
      .limit(3 - data.length);

    return [...data, ...additional.data];
  }

  return data;
}
```

### Blog Post Content Format

**HTML Structure:**
```html
<!-- NO H1 (title rendered separately) -->
<h2>Section Heading</h2>
<p>Paragraph text with <strong>bold</strong> and <em>italic</em>.</p>
<ul>
  <li>List item</li>
</ul>
<h2>Next Section</h2>
<p>More content...</p>
```

**Rendering:**
```typescript
<div
  className="prose prose-lg"
  dangerouslySetInnerHTML={{ __html: post.content }}
  style={{ color: websiteData.text_color }}
/>
```

### Prose Styling (Tailwind)

**Global styles (`app/globals.css`):**
```css
.prose {
  max-width: 65ch;
  color: var(--color-text);
}

.prose p {
  margin-bottom: 1.25em;
  line-height: 1.75;
}

.prose h2 {
  margin-top: 2em;
  margin-bottom: 1em;
  font-size: 1.5em;
  font-weight: 700;
  line-height: 1.3333;
}

.prose h3 {
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  font-size: 1.25em;
  font-weight: 600;
}

.prose ul {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  list-style-type: disc;
  padding-left: 1.625em;
}

.prose li {
  margin-bottom: 0.5em;
}

.prose strong {
  font-weight: 600;
}

.prose a {
  color: var(--color-primary);
  text-decoration: underline;
}
```

---

## Security Notes

### Row Level Security (RLS)

**Current Status:** DISABLED

**Rationale:** All content public (blog scenario), no user auth needed

**Future Consideration:**
```sql
-- If implementing RLS later:
ALTER TABLE website_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post ENABLE ROW LEVEL SECURITY;

-- Example policy:
CREATE POLICY "Public read access"
ON blog_post FOR SELECT
USING (published = true);
```

### Admin Authentication

**Session-Based (sessionStorage):**
```typescript
// admin-app/app/page.tsx
const handleLogin = async () => {
  const res = await fetch('/api/admin/verify', {
    method: 'POST',
    body: JSON.stringify({ password })
  });

  if (res.ok) {
    sessionStorage.setItem('admin_authenticated', 'true');
    router.push('/websites');
  }
};

// Middleware check:
useEffect(() => {
  if (!sessionStorage.getItem('admin_authenticated')) {
    router.push('/');
  }
}, []);
```

**Password Storage:**
- Stored in `ADMIN_PASSWORD` environment variable
- No hashing (acceptable for single admin, non-public app)
- For production: Use proper auth (NextAuth, Clerk, etc.)

### Sensitive Data

**API Keys:** Never commit to Git
- `.env.local` in `.gitignore`
- Use Vercel environment variables for production

**Supabase Anon Key:** Safe to expose (RLS controls access)

---

## Common Issues & Solutions

### Issue: "Website not found"

**Cause:** `host_name` doesn't match request hostname

**Debug:**
```typescript
console.log('Request hostname:', hostname);
console.log('Database host_name:', websiteData?.host_name);
```

**Solutions:**
- Ensure `host_name` has no port (`:3000`)
- No protocol (`https://`)
- Exact match (case-sensitive)
- For localhost, use `"localhost"` not `"127.0.0.1"`

### Issue: Images not loading

**Cause:** Remote hostname not allowed

**Solution:**
Add to `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'your-bucket.supabase.co' }
  ]
}
```

### Issue: Blog post generation fails

**Debug:**
Check `blog_generation_jobs` table:
```sql
SELECT * FROM blog_generation_jobs
WHERE status = 'failed'
ORDER BY created_at DESC;
```

**Common Causes:**
- Invalid API keys
- Rate limits (Claude, Perplexity, FAL)
- Image generation timeout
- Network errors

**Solution:**
Re-queue job (set `status = 'pending'`)

### Issue: Build fails with TypeScript errors

**Cause:** Admin app included in main app compilation

**Solution:**
Verify `tsconfig.json`:
```json
{
  "exclude": ["node_modules", "admin-app"]
}
```

### Issue: ISR not updating

**Force revalidation:**
```typescript
// Add to route:
export const revalidate = 0; // Always fresh (dev only)

// Or use On-Demand Revalidation:
import { revalidatePath } from 'next/cache';
revalidatePath('/blogg/[slug]');
```

---

## Performance Optimizations

### Database Indexes (Already Applied)

```sql
-- Query by hostname (most common)
CREATE INDEX idx_website_host ON website_data(host_name);

-- Query posts by website
CREATE INDEX idx_blog_post_website_id ON blog_post(website_id);

-- Query by slug (per-website unique)
CREATE INDEX idx_blog_post_slug ON blog_post(slug);

-- Filter published posts
CREATE INDEX idx_blog_post_published ON blog_post(published);

-- Job queue processing
CREATE INDEX idx_blog_jobs_status ON blog_generation_jobs(status);
```

### Caching Layers

1. **Next.js ISR** (build-time static pages)
2. **In-memory cache** (runtime data)
3. **CDN** (Vercel Edge Network)
4. **Browser cache** (static assets)

### Image Optimization

1. **Next.js Image Component** (lazy loading, responsive)
2. **WebP format** (smaller file sizes)
3. **Sharp compression** (85% quality)
4. **CDN delivery** (Supabase Storage)

### Bundle Size

**Separate Admin App:**
- Reduces main app bundle (no AI SDKs)
- Admin dependencies isolated
- Faster main app builds

---

## Future Enhancements

### Potential Features

1. **Multi-language support** (currently Swedish-only)
2. **Custom domains per website** (currently multi-tenant)
3. **Draft previews** (currently binary published flag)
4. **Comment system** (no comments currently)
5. **Newsletter integration** (no email capture)
6. **Analytics dashboard** (no tracking)
7. **Scheduled publishing** (manual publish_at date)
8. **Content versioning** (no history tracking)
9. **Bulk edit** (one-by-one currently)
10. **API for external access** (no REST API)

### Scaling Considerations

**Current Limits:**
- Supabase free tier: 500MB database, 1GB storage
- Vercel free tier: 100GB bandwidth, 6000 build minutes/month
- API rate limits: Claude (50 req/min), Perplexity, FAL

**Scaling Path:**
1. **Upgrade Supabase plan** (more storage, connections)
2. **Upgrade Vercel plan** (more bandwidth, no cold starts)
3. **Add Redis cache** (replace in-memory cache)
4. **Queue system** (Bull, BullMQ for job processing)
5. **CDN for static assets** (Cloudflare, Bunny)
6. **Read replicas** (Supabase postgres replicas)

---

## Code Patterns to Follow

### 1. Server Component Data Fetching

```typescript
// Good: Direct service call
export default async function Page() {
  const websiteData = await getWebsiteDataByHostname(hostname);
  return <div>{websiteData.website_name}</div>;
}

// Bad: useEffect + fetch
'use client';
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch(...) }, []);
  // ...
}
```

### 2. Component Template Selection

```typescript
// Good: Array indexing
const templates = [Comp1, Comp2, Comp3, Comp4, Comp5];
const Component = templates[websiteData.template_x - 1] || Comp1;
return <Component {...props} />;

// Bad: Switch statement
switch (websiteData.template_x) {
  case 1: return <Comp1 />;
  case 2: return <Comp2 />;
  // ...
}
```

### 3. Conditional Rendering (Features)

```typescript
// Good: Short-circuit evaluation
{websiteData.show_feature && <FeatureComponent />}

// Bad: Ternary with null
{websiteData.show_feature ? <FeatureComponent /> : null}
```

### 4. Error Handling (Database)

```typescript
// Good: Early return
const { data, error } = await supabase.from('table').select('*');
if (error) return null;
return data;

// Bad: Try-catch for expected failures
try {
  const data = await supabase.from('table').select('*');
  return data;
} catch (error) {
  return null;
}
```

### 5. Dynamic Styling

```typescript
// Good: Inline styles for user-defined colors
<h1 style={{ color: websiteData.primary_color }}>Title</h1>

// Bad: Tailwind classes (can't be dynamic)
<h1 className={`text-[${websiteData.primary_color}]`}>Title</h1>
```

---

## Testing Notes

### Manual Testing Checklist

**New Website:**
1. Create via admin app `/launch`
2. Verify database record created
3. Visit hostname (add to `/etc/hosts` if local)
4. Check homepage renders with correct colors
5. Navigate to `/blogg`, `/om-oss`, `/kontakt`
6. Verify header/footer templates match database values

**Blog Post Generation:**
1. Submit keywords via admin `/generate`
2. Check `blog_generation_jobs` table for pending status
3. Monitor progress (refresh page)
4. Verify post created with `published = true`
5. Visit `/blogg/[slug]` to see post
6. Check image loaded correctly
7. Verify tags, excerpt, metadata

**Multi-Tenancy:**
1. Create two websites with different hostnames
2. Visit each hostname
3. Verify completely different content/styling
4. Check database queries only return correct website_id

### Debugging Tools

**Database Queries:**
```sql
-- Find website by hostname
SELECT * FROM website_data WHERE host_name = 'localhost';

-- Find posts for website
SELECT id, title, slug, published
FROM blog_post
WHERE website_id = 'uuid-here';

-- Check job status
SELECT keyword, status, progress_step, error_message
FROM blog_generation_jobs
WHERE status = 'failed';
```

**Next.js Debug:**
```bash
# Enable verbose logging
DEBUG=* npm run dev

# Build analysis
npm run build -- --debug
```

---

## Quick Reference

### File Locations

| Need to... | File |
|------------|------|
| Add new route | `app/[route]/page.tsx` |
| Modify homepage | `app/page.tsx` |
| Add blog component | `components/blogcomponents/NewComponent.tsx` |
| Change data fetching | `lib/services/website.ts` or `blog.ts` |
| Modify database types | `lib/database.types.ts` (regenerate from Supabase) |
| Change writing rules | `admin-app/lib/blog-generator.ts` (prompt) |
| Add font | `lib/fonts.ts` (import from next/font) |
| Modify global styles | `app/globals.css` |
| Change ISR timing | Page-level `export const revalidate = X` |

### Commands

```bash
# Development
npm run dev                        # Main app (port 3000)
cd admin-app && npm run dev       # Admin app (port 3001)

# Build
npm run build                      # Main app (Turbopack)
cd admin-app && npm run build     # Admin app

# Database
supabase db push                   # Apply migrations
supabase gen types typescript      # Generate types

# Deployment (Vercel CLI)
vercel                             # Deploy
vercel --prod                      # Deploy to production
```

### Environment Variables Quick Copy

```env
# Main App
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Admin App (add to above)
ANTHROPIC_API_KEY=
PERPLEXITY_API_KEY=
FAL_API_KEY=
ADMIN_PASSWORD=
```

---

## Contact & Maintenance

**Last Reviewed:** 2025-10-11
**Next.js Version:** 15.5.4
**Primary AI Model:** Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

**When Updating:**
- Regenerate this document if major architecture changes
- Update version numbers when upgrading dependencies
- Add new patterns/conventions as they emerge
- Document any breaking changes to database schema

---

**End of Technical Reference**
