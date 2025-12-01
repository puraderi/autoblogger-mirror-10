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

// Cached versions - revalidates every hour, tagged for on-demand revalidation
const cachedGetWebsiteDataByHostname = unstable_cache(
  fetchWebsiteDataByHostname,
  ['website-by-hostname'],
  {
    revalidate: 3600, // 1 hour
    tags: ['website'],
  }
);

const cachedGetWebsiteDataById = unstable_cache(
  fetchWebsiteDataById,
  ['website-by-id'],
  {
    revalidate: 3600, // 1 hour
    tags: ['website'],
  }
);

// In development, bypass cache for instant updates
const isDev = process.env.NODE_ENV === 'development';

export const getWebsiteDataByHostname = isDev
  ? fetchWebsiteDataByHostname
  : cachedGetWebsiteDataByHostname;

export const getWebsiteDataById = isDev
  ? fetchWebsiteDataById
  : cachedGetWebsiteDataById;
