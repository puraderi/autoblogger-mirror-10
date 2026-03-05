import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase';
import { Database } from '../database.types';

export type BlogPost = Database['public']['Tables']['blog_post']['Row'];

// Columns needed for list views (excludes heavy content field)
const LIST_COLUMNS = 'id, website_id, title, slug, excerpt, image_url, tags, author_name, published_at, created_at, updated_at, published, meta_title, meta_description';

// Fetch blog posts with limit
async function fetchBlogPosts(websiteId: string, limit: number): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_post')
    .select(LIST_COLUMNS)
    .eq('website_id', websiteId)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return (data || []) as BlogPost[];
}

// Fetch single blog post by slug (includes content)
async function fetchBlogPostBySlug(websiteId: string, slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_post')
    .select('*')
    .eq('website_id', websiteId)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
}

// Fetch all blog posts for a website
async function fetchAllBlogPosts(websiteId: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_post')
    .select(LIST_COLUMNS)
    .eq('website_id', websiteId)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }

  return (data || []) as BlogPost[];
}

// Fetch related posts by matching tags (excludes current post, limit 3)
async function fetchRelatedPosts(websiteId: string, currentPostId: string, tags: string[], limit: number = 3): Promise<BlogPost[]> {
  if (!tags || tags.length === 0) {
    // No tags to match — just return recent posts excluding current
    const { data, error } = await supabase
      .from('blog_post')
      .select(LIST_COLUMNS)
      .eq('website_id', websiteId)
      .eq('published', true)
      .neq('id', currentPostId)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
    return (data || []) as BlogPost[];
  }

  // First try posts with overlapping tags
  const { data: tagMatches, error: tagError } = await supabase
    .from('blog_post')
    .select(LIST_COLUMNS)
    .eq('website_id', websiteId)
    .eq('published', true)
    .neq('id', currentPostId)
    .overlaps('tags', tags)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (tagError) {
    console.error('Error fetching related posts by tags:', tagError);
    return [];
  }

  const results = (tagMatches || []) as BlogPost[];

  // Fill remaining slots with other recent posts if needed
  if (results.length < limit) {
    const excludeIds = [currentPostId, ...results.map(p => p.id)];
    const { data: fillers } = await supabase
      .from('blog_post')
      .select(LIST_COLUMNS)
      .eq('website_id', websiteId)
      .eq('published', true)
      .not('id', 'in', `(${excludeIds.join(',')})`)
      .order('published_at', { ascending: false })
      .limit(limit - results.length);

    if (fillers) {
      results.push(...(fillers as BlogPost[]));
    }
  }

  return results;
}

// Fetch previous and next posts relative to a given published_at date
async function fetchSurroundingPosts(websiteId: string, publishedAt: string): Promise<{ previous: BlogPost | null; next: BlogPost | null }> {
  // Previous = most recent post published BEFORE this one
  const prevPromise = supabase
    .from('blog_post')
    .select(LIST_COLUMNS)
    .eq('website_id', websiteId)
    .eq('published', true)
    .lt('published_at', publishedAt)
    .order('published_at', { ascending: false })
    .limit(1);

  // Next = oldest post published AFTER this one
  const nextPromise = supabase
    .from('blog_post')
    .select(LIST_COLUMNS)
    .eq('website_id', websiteId)
    .eq('published', true)
    .gt('published_at', publishedAt)
    .order('published_at', { ascending: true })
    .limit(1);

  const [prevResult, nextResult] = await Promise.all([prevPromise, nextPromise]);

  return {
    previous: (prevResult.data?.[0] as BlogPost | undefined) ?? null,
    next: (nextResult.data?.[0] as BlogPost | undefined) ?? null,
  };
}

// Cached versions with appropriate TTLs and tags for on-demand revalidation
const cachedGetBlogPosts = unstable_cache(
  fetchBlogPosts,
  ['blog-posts'],
  {
    revalidate: 300, // 5 minutes
    tags: ['posts'],
  }
);

const cachedGetBlogPostBySlug = unstable_cache(
  fetchBlogPostBySlug,
  ['blog-post-by-slug'],
  {
    revalidate: 21600, // 6 hours (posts rarely change after publishing)
    tags: ['posts'],
  }
);

const cachedGetAllBlogPosts = unstable_cache(
  fetchAllBlogPosts,
  ['all-blog-posts'],
  {
    revalidate: 300, // 5 minutes
    tags: ['posts'],
  }
);

const cachedGetRelatedPosts = unstable_cache(
  fetchRelatedPosts,
  ['related-posts'],
  {
    revalidate: 3600, // 1 hour
    tags: ['posts'],
  }
);

const cachedGetSurroundingPosts = unstable_cache(
  fetchSurroundingPosts,
  ['surrounding-posts'],
  {
    revalidate: 3600, // 1 hour
    tags: ['posts'],
  }
);

// In development, bypass cache for instant updates
const isDev = process.env.NODE_ENV === 'development';

export const getBlogPosts = isDev ? fetchBlogPosts : cachedGetBlogPosts;
export const getBlogPostBySlug = isDev ? fetchBlogPostBySlug : cachedGetBlogPostBySlug;
export const getAllBlogPosts = isDev ? fetchAllBlogPosts : cachedGetAllBlogPosts;
export const getRelatedPosts = isDev ? fetchRelatedPosts : cachedGetRelatedPosts;
export const getSurroundingPosts = isDev ? fetchSurroundingPosts : cachedGetSurroundingPosts;
