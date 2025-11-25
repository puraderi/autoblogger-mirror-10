import Image from 'next/image';
import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import Breadcrumbs from '@/components/blogcomponents/Breadcrumbs';
import ShareButtons from '@/components/blogcomponents/ShareButtons';
import TagsDisplay from '@/components/blogcomponents/TagsDisplay';
import ReadingTime from '@/components/blogcomponents/ReadingTime';
import AuthorBox from '@/components/blogcomponents/AuthorBox';
import PostNavigation from '@/components/blogcomponents/PostNavigation';
import RelatedPosts from '@/components/blogcomponents/RelatedPosts';
import ReadingProgressBar from '@/components/blogcomponents/ReadingProgressBar';
import { formatSwedishDate, getContrastTextColor } from '@/lib/utils';

interface BlogPostProps {
  websiteData: WebsiteData;
  post: BlogPost;
  relatedPosts?: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

// BlogPost 7: Gradient Hero - Gradient background with centered title
export default function BlogPost7({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorSlug = websiteData.author_slug || '';
  const heroTextColor = getContrastTextColor(websiteData.accent_color);

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      {/* Gradient hero section */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${websiteData.accent_color} 0%, ${websiteData.primary_color} 100%)`
        }}
      >
        {/* Soft decorative blurs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: heroTextColor }} />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: heroTextColor }} />

        <div className={`${websiteData.container_width} mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10`}>
          {websiteData.show_breadcrumbs && (
            <div className="mb-6 text-center" style={{ opacity: 0.8 }}>
              <Breadcrumbs
                websiteData={{ ...websiteData, text_color: heroTextColor, primary_color: heroTextColor }}
                items={[
                  { label: 'Blogg', href: '/blogg' },
                  { label: post.title, href: `/blogg/${post.slug}` },
                ]}
              />
            </div>
          )}

          <div className="text-center max-w-4xl mx-auto">
            {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12" style={{ backgroundColor: `${heroTextColor === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}` }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: heroTextColor }}>
                  {post.tags[0]}
                </span>
                <div className="h-px w-12" style={{ backgroundColor: `${heroTextColor === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}` }} />
              </div>
            )}

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight" style={{ color: heroTextColor }}>
              {post.title}
            </h1>

            {/* Author centered */}
            <div className="flex flex-col items-center gap-3">
              {websiteData.author_image_url && (
                <Image
                  src={websiteData.author_image_url}
                  alt={websiteData.author_name || ''}
                  width={56}
                  height={56}
                  className="rounded-full border-2"
                  style={{ borderColor: `${heroTextColor === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}` }}
                />
              )}
              <div className="text-center">
                <Link href={`/${authorSlug}`} className="font-semibold hover:underline block mb-1" style={{ color: heroTextColor }}>
                  {websiteData.author_name}
                </Link>
                <div className="flex items-center justify-center gap-2 text-sm" style={{ color: heroTextColor, opacity: 0.8 }}>
                  {post.published_at && (
                    <span>{formatSwedishDate(post.published_at)}</span>
                  )}
                  {websiteData.show_reading_time && (
                    <>
                      <span>·</span>
                      <ReadingTime websiteData={{ ...websiteData, text_color: heroTextColor, primary_color: heroTextColor }} content={post.content} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className={`${websiteData.container_width} mx-auto px-4 md:px-6`}>
        {post.image_url && (
          <div className="-mt-12 mb-12">
            <Image
              src={post.image_url}
              alt={post.title}
              width={1200}
              height={600}
              className={`w-full h-56 md:h-80 lg:h-[500px] object-cover shadow-2xl ${websiteData.border_radius}`}
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto py-8 md:py-12">
          <div
            className="prose prose-lg md:prose-xl max-w-none mb-10 prose-headings:font-bold prose-a:underline prose-img:rounded-lg"
            style={{ color: websiteData.text_color }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {websiteData.show_tags_display && post.tags && post.tags.length > 1 && (
            <div className="flex justify-center mb-10 pt-8 border-t" style={{ borderColor: websiteData.secondary_color }}>
              <TagsDisplay websiteData={websiteData} tags={post.tags} />
            </div>
          )}

          {websiteData.show_share_buttons && (
            <div className="mb-10 pb-8 border-b flex justify-center" style={{ borderColor: websiteData.secondary_color }}>
              <ShareButtons websiteData={websiteData} title={post.title} url={currentUrl} />
            </div>
          )}

          {websiteData.show_author_box && (
            <div className="mb-10">
              <AuthorBox
                websiteData={websiteData}
                authorName={websiteData.author_name}
                authorAvatar={websiteData.author_image_url}
              />
            </div>
          )}

          {websiteData.show_post_navigation && (
            <PostNavigation websiteData={websiteData} previousPost={previousPost} nextPost={nextPost} />
          )}
        </div>
      </article>

      {websiteData.show_related_posts && relatedPosts.length > 0 && (
        <RelatedPosts websiteData={websiteData} posts={relatedPosts} />
      )}
    </>
  );
}
