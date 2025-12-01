import Image from 'next/image';
import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import { getLanguageConfig } from '@/lib/languages';
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

// BlogPost 8: Split Layout - Two-tone background with image side-by-side
export default function BlogPost8({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const lang = getLanguageConfig(websiteData.language);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorSlug = websiteData.author_slug || '';
  const secondaryTextColor = getContrastTextColor(websiteData.secondary_color);
  const secondaryMuted = secondaryTextColor === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      {/* Split header */}
      <div className="relative" style={{ backgroundColor: websiteData.secondary_color }}>
        {/* Dotted pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(${secondaryTextColor === 'white' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'} 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        />

        <div className={`${websiteData.container_width} mx-auto px-4 md:px-6 relative z-10`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 md:py-16 lg:py-20">
            {/* Text side */}
            <div className="flex flex-col justify-center">
              {websiteData.show_breadcrumbs && (
                <div className="mb-6">
                  <Breadcrumbs
                    websiteData={{ ...websiteData, text_color: secondaryMuted, primary_color: secondaryTextColor }}
                    items={[
                      { label: lang.labels.blog, href: `/${lang.slugs.blog}` },
                      { label: post.title, href: `/${lang.slugs.blog}/${post.slug}` },
                    ]}
                  />
                </div>
              )}

              {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded"
                    style={{ backgroundColor: websiteData.accent_color, color: getContrastTextColor(websiteData.accent_color) }}
                  >
                    {post.tags[0]}
                  </span>
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: secondaryTextColor }}>
                {post.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-4">
                {websiteData.author_image_url && (
                  <Image
                    src={websiteData.author_image_url}
                    alt={websiteData.author_name || ''}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div className="text-sm" style={{ color: secondaryMuted }}>
                  <Link href={`/${authorSlug}`} className="font-semibold hover:underline block" style={{ color: secondaryTextColor }}>
                    {websiteData.author_name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    {post.published_at && <span>{formatSwedishDate(post.published_at)}</span>}
                    {websiteData.show_reading_time && (
                      <>
                        <span>·</span>
                        <ReadingTime websiteData={{ ...websiteData, text_color: secondaryMuted, primary_color: secondaryTextColor }} content={post.content} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Image side */}
            {post.image_url && (
              <div className="flex items-center">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  width={700}
                  height={500}
                  className={`w-full h-64 md:h-80 lg:h-[400px] object-cover shadow-xl ${websiteData.border_radius}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <article className={`${websiteData.container_width} mx-auto px-4 md:px-6 py-10 md:py-16`}>
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none mb-10 prose-headings:font-bold prose-a:underline prose-img:rounded-lg"
            style={{ color: websiteData.text_color }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {websiteData.show_tags_display && post.tags && post.tags.length > 1 && (
            <div className="mb-8 pb-8 border-b" style={{ borderColor: websiteData.secondary_color }}>
              <TagsDisplay websiteData={websiteData} tags={post.tags} />
            </div>
          )}

          {websiteData.show_share_buttons && (
            <div className="mb-10 pb-8 border-b" style={{ borderColor: websiteData.secondary_color }}>
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
