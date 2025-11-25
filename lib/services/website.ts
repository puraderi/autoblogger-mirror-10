import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase';
import { Database } from '../database.types';

export type WebsiteData = Database['public']['Tables']['website_data']['Row'];

// Fetch website data by hostname - cached for 1 hour
async function fetchWebsiteDataByHostname(hostname: string): Promise<WebsiteData | null> {
  const { data, error } = await supabase
    .from('website_data')
    .select('*')
    .eq('host_name', hostname)
    .single();

  if (error) {
    console.error('Error fetching website data:', error);
    return null;
  }

  return data;
}

// Fetch website data by ID - cached for 1 hour
async function fetchWebsiteDataById(id: string): Promise<WebsiteData | null> {
  const { data, error } = await supabase
    .from('website_data')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching website data:', error);
    return null;
  }

  return data;
}

// Cached version - revalidates every hour, tagged for on-demand revalidation
export const getWebsiteDataByHostname = unstable_cache(
  fetchWebsiteDataByHostname,
  ['website-by-hostname'],
  {
    revalidate: 3600, // 1 hour
    tags: ['website'],
  }
);

export const getWebsiteDataById = unstable_cache(
  fetchWebsiteDataById,
  ['website-by-id'],
  {
    revalidate: 3600, // 1 hour
    tags: ['website'],
  }
);
