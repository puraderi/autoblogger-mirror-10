# Supabase Setup Guide

## 1. Create Storage Buckets

### Blog Images Bucket

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Click **Storage** in left sidebar
3. Click **New bucket**
4. Settings:
   - **Name**: `blog-images`
   - **Public bucket**: ✅ **Yes** (images need to be publicly accessible)
   - **File size limit**: 5 MB (optional)
   - **Allowed MIME types**: `image/*` (optional)
5. Click **Create bucket**
6. Add RLS policy (see step 3 below)

### Author Images Bucket

1. Click **New bucket** again
2. Settings:
   - **Name**: `author-images`
   - **Public bucket**: ✅ **Yes** (author photos need to be publicly accessible)
   - **File size limit**: 1 MB (optional)
   - **Allowed MIME types**: `image/*` (optional)
3. Click **Create bucket**
4. Add RLS policy (see step 3 below)

## 2. Run Database Migrations

Two migrations need to be run:

### Migration 1: Blog Generation Jobs Table

1. Go to **SQL Editor** in left sidebar
2. Click **New query**
3. Copy/paste contents of `supabase/migrations/create_blog_generation_jobs.sql`
4. Click **Run**

### Migration 2: Author Fields

1. Click **New query**
2. Copy/paste contents of `supabase/migrations/add_author_fields.sql`
3. Click **Run**

### Option B: Supabase CLI

```bash
cd C:\Users\Dator\Documents\autobloggerx\autobloggerx
supabase db push
```

## 3. Add Storage RLS Policies

For both `blog-images` and `author-images` buckets, run this SQL:

```sql
-- Policy for blog-images
CREATE POLICY "Allow anon access to blog-images"
ON storage.objects FOR ALL
TO anon
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');

-- Policy for author-images
CREATE POLICY "Allow anon access to author-images"
ON storage.objects FOR ALL
TO anon
USING (bucket_id = 'author-images')
WITH CHECK (bucket_id = 'author-images');
```

This allows the admin app (using anon key) to upload/read images.

## 4. Verify Setup

### Check Storage Bucket

1. Go to **Storage** → `blog-images`
2. Bucket should be listed and marked as **Public**

### Check Database Table

1. Go to **Table Editor**
2. You should see `blog_generation_jobs` table with columns:
   - `id` (uuid)
   - `website_id` (uuid)
   - `keyword` (text)
   - `status` (text)
   - `progress_step` (text)
   - `result_post_id` (uuid)
   - `error_message` (text)
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)
   - `completed_at` (timestamptz)

## 4. How It Works

### Image Upload Flow

1. **Flux generates image** → temporary URL
2. **Image is downloaded** from Flux URL
3. **Sharp compresses** → WebP format, 85% quality
4. **Uploads to Supabase Storage** → `blog-images` bucket
5. **Returns public URL** → stored in `blog_post.image_url`

### Benefits

- ✅ **WebP compression**: Smaller file sizes (typically 50-80% smaller)
- ✅ **85% quality**: Good balance of quality and size
- ✅ **Permanent storage**: Images don't expire (unlike temporary Flux URLs)
- ✅ **CDN delivery**: Supabase Storage uses CDN for fast loading
- ✅ **Cost effective**: Supabase free tier includes 1GB storage

## 5. Storage Bucket URL Format

Images will be accessible at:

```
https://kokadfsthuawuzdswncs.supabase.co/storage/v1/object/public/blog-images/[filename].webp
```

Example:
```
https://kokadfsthuawuzdswncs.supabase.co/storage/v1/object/public/blog-images/basta-kaffebryggare-2025-1704123456789.webp
```

## 6. Troubleshooting

### "Bucket not found" error

- Make sure you created the bucket named exactly `blog-images`
- Ensure it's marked as **Public**

### Permission errors

- Check that anonymous access is enabled for the bucket
- The bucket must be public for images to be accessible on the frontend

### Images not loading on frontend

- Verify the bucket is set to **Public**
- Check the returned URL format is correct
- Test the URL directly in browser
