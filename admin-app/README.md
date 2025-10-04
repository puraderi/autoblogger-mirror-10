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
│   ├── page.tsx              # Login page
│   ├── launch/
│   │   ├── page.tsx         # Create website form
│   │   └── actions.ts       # Generation logic
│   ├── websites/
│   │   ├── page.tsx         # List websites
│   │   └── actions.ts       # Manage websites
│   └── api/admin/verify/
│       └── route.ts         # Password check
├── package.json
└── .env.local.example
```

## Security

- Password protected (session-based)
- Only you can access
- No public routes
- Deploy to private Vercel team if needed

## Features

✅ Generate Swedish blog content with Claude Sonnet 4.5
✅ WCAG AA contrast compliance
✅ Writing rules enforcement
✅ Random template variations
✅ Live progress feedback
✅ Website management

## Notes

- This app does **NOT** host websites
- It only creates Supabase database entries
- Each website needs separate Vercel deployment of main app
- Or use multi-tenant approach (all sites on one deployment)
