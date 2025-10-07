# AutoBloggerX Architecture

## Two Separate Apps

### 1. **Main Website App** (this folder)
- **Purpose**: Hosts all blog websites
- **Location**: Root of this repo
- **Deploy**: One Vercel project for all websites (multi-tenant)
- **How it works**:
  - Reads hostname from request
  - Queries Supabase for that hostname
  - Renders with website-specific content/colors

**Files**:
```
├── app/
│   ├── page.tsx              # Homepage
│   ├── blogg/[slug]/         # Blog posts
│   ├── om-oss/               # About page
│   └── kontakt/              # Contact page
├── components/               # Reusable components
├── lib/                      # Database & utilities
└── ...
```

### 2. **Admin App** (`admin-app/` folder)
- **Purpose**: Create and manage websites
- **Location**: `admin-app/` subfolder
- **Deploy**: Separate Vercel project
- **How it works**:
  - Admin logs in
  - Creates website config
  - Saves to Supabase
  - Main app reads this config

**Files**:
```
admin-app/
├── app/
│   ├── page.tsx              # Login
│   ├── launch/               # Create websites
│   └── websites/             # Manage websites
├── package.json
├── README.md
└── ...
```

## Workflow

### Creating a New Website

1. **Admin App** (`localhost:3001`):
   ```
   Login → Create Website Form
   - Name: "Fiskeguiden"
   - Topic: "Fiske och friluftsliv"
   - Hostname: "fiskeguiden.se"
   → Generates content → Saves to Supabase
   ```

2. **Deploy Main App** (if not already deployed):
   ```bash
   # From root folder (not admin-app)
   vercel --prod
   ```

3. **Add Domain in Vercel**:
   - Go to main app's Vercel project
   - Settings → Domains
   - Add "fiskeguiden.se"
   - Point DNS to Vercel

4. **Done!** Visit `fiskeguiden.se`:
   - App checks hostname = "fiskeguiden.se"
   - Queries Supabase
   - Renders Fiskeguiden's content

### Creating Another Website

1. **Admin App**: Create "Matbloggen"
2. **Same Vercel Project**: Add domain "matbloggen.se"
3. **Done!** No new deployment needed

## Database Structure

**Supabase Table: `website_data`**

Each row = one website

```sql
- id (uuid)
- host_name (unique) "fiskeguiden.se"
- website_name "Fiskeguiden"
- topic "Fiske och friluftsliv"
- about_us (HTML content)
- contact_us (HTML content)
- primary_color "#2563eb"
- ... (all design/content fields)
```

Main app queries by `host_name` to get configuration.

## Deployment Options

### Option A: Multi-Tenant (Recommended)
✅ **One Vercel deployment** for ALL websites
✅ Cheaper (one project)
✅ Easier to manage
❌ Shared IP address
❌ All sites on same infrastructure

**Setup**:
1. Deploy main app once
2. Add all domains to that project
3. Use admin to create configs

### Option B: Separate Deployments
✅ **Each website** gets own Vercel project
✅ Separate IPs
✅ Isolated infrastructure
❌ More expensive
❌ More deployments to manage

**Setup**:
1. For each website, deploy main app as new Vercel project
2. Add only that domain to that project
3. Each reads its own hostname from Supabase

## Security

- **Admin App**: Password protected, deployed separately
- **Main App**: Public, reads data from Supabase
- **Database**: Row-level security can be added to Supabase

## Local Development

### Main Website App
```bash
# Root folder
npm run dev
# Visit: http://localhost:3000
```

### Admin App
```bash
cd admin-app
npm install
npm run dev
# Visit: http://localhost:3001
```

## Environment Variables

### Main App (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Admin App (`admin-app/.env.local`)
```env
ANTHROPIC_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ADMIN_PASSWORD=...
```

## Next Steps

Choose your deployment strategy:
- **Multi-tenant**: Deploy main app once, add all domains
- **Separate**: Deploy main app per website
