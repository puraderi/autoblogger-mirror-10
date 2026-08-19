import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';

/**
 * Single rule for whether an article shows any AI disclosure at all — the
 * disclaimer box, the image badge, the byline chip and the AI-persona line in
 * the author box.
 *
 * Every AI component calls this itself rather than taking a boolean from the
 * template, so a render site cannot accidentally skip the check.
 */
export function showAIDisclosure(
  websiteData: WebsiteData,
  post: Pick<BlogPost, 'ai_tag' | 'post_type'> | null | undefined
): boolean {
  // Site-level opt-out.
  if (websiteData.ai_tag === false) return false;

  // Per-article opt-out.
  if (post?.ai_tag === false) return false;

  // Sponsored articles carry no AI messaging of any kind.
  if (post?.post_type === 'sponsored') return false;

  return true;
}
