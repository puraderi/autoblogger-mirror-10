'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getWebsites() {
  const { data, error } = await supabase
    .from('website_data')
    .select('id, host_name, website_name, topic, primary_color, background_color, text_color, font_heading, font_body, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching websites:', error);
    return [];
  }

  return data || [];
}

export async function deleteWebsite(id: string) {
  const { error } = await supabase
    .from('website_data')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting website:', error);
    return false;
  }

  return true;
}
