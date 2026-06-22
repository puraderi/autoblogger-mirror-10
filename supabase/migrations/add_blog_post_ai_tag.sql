-- Per-article AI disclosure toggle.
-- When false, the AI disclaimer box and badge are hidden for that article.
-- Nullable with default true so existing articles keep showing the disclosure (null/true = shown).
ALTER TABLE blog_post
ADD COLUMN IF NOT EXISTS ai_tag BOOLEAN DEFAULT true;

COMMENT ON COLUMN blog_post.ai_tag IS 'Per-article AI disclosure toggle. false hides all AI mentions (disclaimer box + badge) on the article. Combined with website_data.ai_tag — either being false hides the disclosure.';
