import { cache } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { supabase } from '../supabase';
import { Database } from '../database.types';

export type WebsiteData = Database['public']['Tables']['website_data']['Row'];

// Fetch website data by hostname — cached across requests via 'use cache',
// deduped within a single request via React cache()
async function fetchWebsiteByHostname(hostname: string): Promise<WebsiteData | null> {
  'use cache';
  cacheLife({ revalidate: 3600 }); // 1 hour
  cacheTag('website', `website-${hostname}`);

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

// Fetch website data by ID
async function fetchWebsiteById(id: string): Promise<WebsiteData | null> {
  'use cache';
  cacheLife({ revalidate: 3600 });
  cacheTag('website', `website-${id}`);

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

// React cache() deduplicates calls with the same args within a single request
// (layout, generateMetadata, and page all call getWebsiteDataByHostname — now only 1 actual call)
export const getWebsiteDataByHostname = cache(fetchWebsiteByHostname);
export const getWebsiteDataById = cache(fetchWebsiteById);
