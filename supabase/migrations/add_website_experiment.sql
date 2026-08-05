-- Experiment mode: send human visitors to the front page while leaving crawlers
-- on whatever page they requested.
-- true  = every request whose user-agent is not a known crawler is 302'd to /
-- false / null = normal behaviour for everyone
--
-- The redirect is 302 and not 301 on purpose. A permanent redirect is cached by
-- browsers indefinitely, so switching the experiment off would not release
-- visitors who were redirected while it was on.
ALTER TABLE website_data
ADD COLUMN IF NOT EXISTS experiment BOOLEAN DEFAULT false;

COMMENT ON COLUMN website_data.experiment IS 'Experiment mode. true redirects non-crawler traffic to / with a 302 on every path except the front page itself; crawlers (matched on user-agent) are unaffected. false/null behaves normally.';
