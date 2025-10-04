import { supabase } from '../supabase';
import { Database } from '../database.types';
import { cache } from '../utils';

export type BlogPost = Database['public']['Tables']['blog_post']['Row'];

export async function getBlogPosts(websiteId: string, limit = 10): Promise<BlogPost[]> {
  // Use cache with 5 minute TTL
  return cache.get(
    `posts:${websiteId}:limit:${limit}`,
    300,
    async () => {
      const { data, error } = await supabase
        .from('blog_post')
        .select('*')
        .eq('website_id', websiteId)
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
      }

      return data || [];
    }
  );
}

export async function getBlogPostBySlug(websiteId: string, slug: string): Promise<BlogPost | null> {
  // Use cache with 6 hour TTL (blog posts rarely change after publishing)
  return cache.get(
    `post:${websiteId}:${slug}`,
    21600,
    async () => {
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
  );
}

export async function getAllBlogPosts(websiteId: string): Promise<BlogPost[]> {
  // Use cache with 5 minute TTL
  return cache.get(
    `posts:all:${websiteId}`,
    300,
    async () => {
      const { data, error } = await supabase
        .from('blog_post')
        .select('*')
        .eq('website_id', websiteId)
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching all blog posts:', error);
        return [];
      }

      return data || [];
    }
  );
}
