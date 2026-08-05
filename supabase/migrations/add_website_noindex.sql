-- Google-only indexing killswitch for a whole site.
-- true  = every page emits <meta name="googlebot" content="noindex"> and the
--         sitemap is served empty.
-- false / null = normal indexing.
--
-- Deliberately targets the `googlebot` meta name rather than `robots`, so only
-- Google is told to drop the site. Ahrefs, Bing and every other crawler are
-- unaffected. robots.txt is intentionally NOT changed — blocking Googlebot
-- there would stop it fetching the page, and a page Google cannot crawl is a
-- page whose noindex tag Google never sees.
ALTER TABLE website_data
ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT false;

COMMENT ON COLUMN website_data.noindex IS 'Google-only indexing killswitch. true emits <meta name="googlebot" content="noindex"> site-wide and empties the sitemap. false/null indexes normally. Does not affect robots.txt or non-Google crawlers.';
