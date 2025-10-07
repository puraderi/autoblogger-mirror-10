-- Add author fields to website_data table
ALTER TABLE website_data
ADD COLUMN IF NOT EXISTS author_name TEXT,
ADD COLUMN IF NOT EXISTS author_bio TEXT,
ADD COLUMN IF NOT EXISTS author_image_url TEXT,
ADD COLUMN IF NOT EXISTS author_slug TEXT;
