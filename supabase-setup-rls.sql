-- Disable Row Level Security to allow public access
-- This is fine for a blog website where content is meant to be public

ALTER TABLE website_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post DISABLE ROW LEVEL SECURITY;

-- Alternatively, if you want RLS enabled with public read access, use this instead:
-- (Comment out the DISABLE commands above and uncomment below)

-- ALTER TABLE website_data ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_post ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Allow public read access" ON website_data FOR SELECT USING (true);
-- CREATE POLICY "Allow public read access" ON blog_post FOR SELECT USING (true);
