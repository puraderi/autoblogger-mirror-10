# Deployment Guide - Admin Interface

## ✅ What's Been Built

A complete admin interface to launch new websites without using the command line:

- **Login**: `/admin` - Password protected
- **Launch Website**: `/admin/launch` - Form to create new websites
- **Manage**: `/admin/websites` - View and delete websites

## Local Testing

1. **Set admin password** in `.env.local`:
   ```bash
   ADMIN_PASSWORD=your-secure-password-here
   ```

2. **Run dev server**:
   ```bash
   npm run dev
   ```

3. **Visit**: `http://localhost:3000/admin`

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add admin interface for website creation"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. **Add Environment Variables**:
   - `ANTHROPIC_API_KEY` = Your Anthropic API key
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key
   - `ADMIN_PASSWORD` = Choose a secure password

5. Click **Deploy**

### Step 3: Access Admin

Once deployed, visit:
```
https://your-app.vercel.app/admin
```

Enter your `ADMIN_PASSWORD` to access the interface.

## How to Use

### Create a Website

1. Go to `/admin/launch`
2. Fill in:
   - **Website Name**: "Fiskeguiden"
   - **Topic**: "Fiske och friluftsliv"
   - **Hostname**: "fiskeguiden.se" or "localhost:3000"
3. Click **"Skapa webbplats"**
4. Wait for generation (About Us → Contact → Hero → Colors → SEO → Save)
5. View result with colors preview

### Manage Websites

1. Go to `/admin/websites`
2. View all created websites
3. See colors, fonts, hostname
4. Click **"Visa →"** to open website
5. Click **"Ta bort"** to delete

## Features

✅ **Password protected** - Only authenticated users can access
✅ **Live progress** - See generation steps in real-time
✅ **Color preview** - View generated color scheme before deployment
✅ **Website list** - Manage all created websites
✅ **Swedish content** - All generated content follows writing rules
✅ **WCAG contrast** - Ensures readable text/background combinations
✅ **Random templates** - Each website gets unique template variations

## Security Notes

- Admin password is stored in environment variables
- Session-based authentication (sessionStorage)
- No database storage of passwords
- Vercel automatically encrypts environment variables

## Architecture

- **Frontend**: Next.js App Router, React, TailwindCSS
- **Backend**: Server Actions (TypeScript)
- **AI**: Anthropic Claude Sonnet 4.5
- **Database**: Supabase PostgreSQL
- **Hosting**: Vercel (serverless)

## Files Created

```
app/admin/
  ├── page.tsx                    # Login page
  ├── launch/
  │   ├── page.tsx               # Launch form UI
  │   └── actions.ts             # Generation logic (replaces populater.py)
  └── websites/
      ├── page.tsx               # Website list
      └── actions.ts             # List/delete actions

app/api/admin/
  └── verify/
      └── route.ts               # Password verification API
```

## Troubleshooting

**"Invalid password"**
→ Check `ADMIN_PASSWORD` in Vercel environment variables

**"Failed to generate website"**
→ Check `ANTHROPIC_API_KEY` is valid
→ Check Supabase connection

**500 Error**
→ Check Vercel logs for details
→ Ensure all environment variables are set

## Next Steps

Want to add:
- [ ] Bulk website creation
- [ ] Edit existing websites
- [ ] Blog post generator
- [ ] Analytics dashboard
- [ ] Team member access controls

Let me know what you want to build next!
