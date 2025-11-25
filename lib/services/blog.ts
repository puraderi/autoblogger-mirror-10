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

// Cached versions with appropriate TTLs and tags for on-demand revalidation
export const getBlogPosts = unstable_cache(
  fetchBlogPosts,
  ['blog-posts'],
  {
    revalidate: 300, // 5 minutes
    tags: ['posts'],
  }
);

export const getBlogPostBySlug = unstable_cache(
  fetchBlogPostBySlug,
  ['blog-post-by-slug'],
  {
    revalidate: 21600, // 6 hours (posts rarely change after publishing)
    tags: ['posts'],
  }
);

export const getAllBlogPosts = unstable_cache(
  fetchAllBlogPosts,
  ['all-blog-posts'],
  {
    revalidate: 300, // 5 minutes
    tags: ['posts'],
  }
);
