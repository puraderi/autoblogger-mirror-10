-- Create blog generation jobs table for background processing
CREATE TABLE IF NOT EXISTS blog_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES website_data(id) ON DELETE CASCADE,
  keyword TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'complete', 'failed')),
  progress_step TEXT,
  result_post_id UUID REFERENCES blog_post(id) ON DELETE SET NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Create index for efficient queryingg
CREATE INDEX idx_blog_jobs_status ON blog_generation_jobs(status);
CREATE INDEX idx_blog_jobs_website_id ON blog_generation_jobs(website_id);
CREATE INDEX idx_blog_jobs_created_at ON blog_generation_jobs(created_at DESC);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_job_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating updated_at
CREATE TRIGGER trigger_update_blog_job_timestamp
  BEFORE UPDATE ON blog_generation_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_job_updated_at();
