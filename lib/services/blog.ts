import { cache } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { supabase } from '../supabase';
import { Database } from '../database.types';

export type BlogPost = Database['public']['Tables']['blog_post']['Row'];

// Columns needed for list views (excludes heavy content field)
const LIST_COLUMNS = 'id, website_id, title, slug, excerpt, image_url, tags, author_name, published_at, created_at, updated_at, published, meta_title, meta_description, ai_tag, geofenced';

// --- Core fetch functions with 'use cache' for cross-request caching ---

async function fetchBlogPosts(websiteId: string, limit: number): Promise<BlogPost[]> {
  'use cache';
  cacheLife({ revalidate: 300 }); // 5 minutes
  cacheTag('posts', `posts-${websiteId}`);

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

async function fetchBlogPostBySlug(websiteId: string, slug: string): Promise<BlogPost | null> {
  'use cache';
  cacheLife({ revalidate: 86400 }); // 24 hours — posts rarely change
  cacheTag('posts', `post-${websiteId}-${slug}`);

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

async function fetchAllBlogPosts(websiteId: string): Promise<BlogPost[]> {
  'use cache';
  cacheLife({ revalidate: 300 }); // 5 minutes
  cacheTag('posts', `posts-${websiteId}`);

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

async function fetchRelatedPosts(websiteId: string, currentPostId: string, tags: string[], limit: number = 3): Promise<BlogPost[]> {
  'use cache';
  cacheLife({ revalidate: 3600 }); // 1 hour
  cacheTag('posts', `related-${websiteId}-${currentPostId}`);

  if (!tags || tags.length === 0) {
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

async function fetchSurroundingPosts(websiteId: string, publishedAt: string): Promise<{ previous: BlogPost | null; next: BlogPost | null }> {
  'use cache';
  cacheLife({ revalidate: 3600 }); // 1 hour
  cacheTag('posts', `surrounding-${websiteId}-${publishedAt}`);

  const prevPromise = supabase
    .from('blog_post')
    .select(LIST_COLUMNS)
    .eq('website_id', websiteId)
    .eq('published', true)
    .lt('published_at', publishedAt)
    .order('published_at', { ascending: false })
    .limit(1);

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

// React cache() deduplicates calls within a single request render pass
// (e.g. generateMetadata + page component calling the same function)
export const getBlogPosts = cache(fetchBlogPosts);
export const getBlogPostBySlug = cache(fetchBlogPostBySlug);
export const getAllBlogPosts = cache(fetchAllBlogPosts);
export const getRelatedPosts = cache(fetchRelatedPosts);
export const getSurroundingPosts = cache(fetchSurroundingPosts);
