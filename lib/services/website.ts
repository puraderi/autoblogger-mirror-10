import { supabase } from '../supabase';
import { Database } from '../database.types';
import { cache } from '../utils';

export type WebsiteData = Database['public']['Tables']['website_data']['Row'];

export async function getWebsiteDataByHostname(hostname: string): Promise<WebsiteData | null> {
  // Use cache with 1 hour TTL (skipped for localhost)
  return cache.get(
    `website:${hostname}`,
    3600,
    async () => {
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
    },
    hostname
  );
}

export async function getWebsiteDataById(id: string): Promise<WebsiteData | null> {
  // Use cache with 1 hour TTL
  return cache.get(
    `website:id:${id}`,
    3600,
    async () => {
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
  );
}
