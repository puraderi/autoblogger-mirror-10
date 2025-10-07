# AutoBloggerX Admin

Standalone admin interface for creating and managing multi-tenant blog websites.

## Architecture

This is a **separate** Next.js app from the main website app. It:
- Creates website configurations in Supabase
- Does NOT host the actual websites
- Runs on a different Vercel deployment

## Local Development

### 1. Install Dependencies

```bash
cd admin-app
npm install
```

### 2. Configure Environment

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your values:
```env
ANTHROPIC_API_KEY=sk-ant-api03-...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_PASSWORD=your-secure-password
PERPLEXITY_API_KEY=pplx-...
FAL_API_KEY=your-fal-key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3001`

## Deploy to Vercel

### 1. Create New Vercel Project

```bash
cd admin-app
vercel
```

Or via Vercel dashboard:
1. Import this `admin-app` folder as a new project
2. **Not the main app!** This is separate.

### 2. Add Environment Variables

In Vercel dashboard for THIS project:
- `ANTHROPIC_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_PASSWORD`
- `PERPLEXITY_API_KEY`
- `FAL_API_KEY`

### 3. Deploy

```bash
vercel --prod
```

Your admin will be at: `admin.yourcompany.com` or `autobloggerx-admin.vercel.app`

## How It Works

### Create a Website

1. Login at `/` with your admin password
2. Click "Skapa ny webbplats"
3. Fill in:
   - **Website Name**: "Fiskeguiden"
   - **Topic**: "Fiske och friluftsliv"
   - **Hostname**: "fiskeguiden.se"
4. Click "Skapa webbplats"
5. Generates:
   - Swedish about/contact pages
   - Hero content
   - Color scheme (WCAG compliant)
   - SEO meta description
6. Saves to Supabase

### Generate Blog Posts

1. Click "Generera Inlägg" in navigation
2. Select a website from dropdown
3. Enter keywords (one per line):
   ```
   bästa kaffebryggare 2025
   hur välja rätt laptop
   tips för hemmaträning
   ```
4. Click "Starta Generering"
5. Jobs are queued and process automatically:
   - Research with Perplexity API
   - Generate article with Claude Sonnet 4.5
   - Humanize content
   - Expand sections with detailed research
   - Generate meta title & description
   - Generate image with Flux
   - Save to blog_post table
6. **You can leave the page** - jobs continue in background via cron

### Manage Websites

- Click "Se alla webbplatser"
- View all created websites
- See colors, fonts, hostname
- Delete websites

### Deploy Each Website

For each website created:

1. **Deploy main website app** (the other Next.js app) to Vercel
2. **Add domain** in Vercel: Settings → Domains → Add "fiskeguiden.se"
3. **Point DNS** to Vercel
4. **Done!** The website reads its config from Supabase by hostname

## Key Files

```
admin-app/
├── app/
│   ├── page.tsx                    # Login page
│   ├── launch/
│   │   ├── page.tsx               # Create website form
│   │   └── actions.ts             # Website generation logic
│   ├── generate/
│   │   ├── page.tsx               # Blog post generator UI
│   │   └── actions.ts             # Job queue actions
│   ├── websites/
│   │   ├── page.tsx               # List websites
│   │   └── actions.ts             # Manage websites
│   └── api/
│       ├── admin/verify/route.ts  # Password check
│       ├── websites/route.ts      # Websites API
│       └── process-jobs/route.ts  # Background job processor (cron)
├── lib/
│   └── blog-generator.ts          # Core blog generation with Perplexity & Flux
├── vercel.json                     # Cron configuration
├── package.json
└── .env.local.example
```

## Security

- Password protected (session-based)
- Only you can access
- No public routes
- Deploy to private Vercel team if needed

## Features

### Website Generation
✅ Generate Swedish blog content with Claude Sonnet 4.5
✅ WCAG AA contrast compliance
✅ Writing rules enforcement
✅ Random template variations
✅ Live progress feedback
✅ Website management

### Blog Post Generation
✅ Bulk keyword processing
✅ Perplexity API research
✅ Claude Sonnet 4.5 article generation
✅ Content humanization (natural errors, varied language)
✅ Section-by-section expansion with detailed research
✅ SEO meta title/description (strict character limits)
✅ Flux image generation via FAL
✅ Background job processing via cron
✅ Can leave page while jobs continue
✅ Real-time progress tracking

## Supabase Setup

**Required before first use!** See [SUPABASE_SETUP.md](../SUPABASE_SETUP.md) for detailed instructions.

Quick setup:
1. Create storage bucket: `blog-images` (public)
2. Run migration: `supabase/migrations/create_blog_generation_jobs.sql` in SQL Editor

This creates:
- ✅ Storage bucket for compressed blog images (WebP, 85% quality)
- ✅ Job queue table for background processing

## Background Job Processing

Jobs are triggered automatically when you queue keywords:
1. You click "Starta Generering"
2. Keywords are added to `blog_generation_jobs` table
3. `/api/process-jobs` is called automatically
4. All pending jobs are processed sequentially until complete
5. No cron needed - triggered on-demand only

This means:
- ✅ No unnecessary Vercel function invocations
- ✅ Jobs start immediately when queued
- ✅ Processes all jobs in one batch
- ✅ Works in both local dev and production

## Notes

- This app does **NOT** host websites
- It only creates Supabase database entries
- Each website needs separate Vercel deployment of main app
- Or use multi-tenant approach (all sites on one deployment)
