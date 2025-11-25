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

// BlogPost 6: Bold Header - Full primary color header section
export default function BlogPost6({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorSlug = websiteData.author_slug || '';
  const headerTextColor = getContrastTextColor(websiteData.primary_color);
  const headerMuted = headerTextColor === 'white' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      {/* Colored header section */}
      <div style={{ backgroundColor: websiteData.primary_color }}>
        <div className={`${websiteData.container_width} mx-auto px-4 md:px-6 py-12 md:py-20`}>
          {websiteData.show_breadcrumbs && (
            <div className="mb-6" style={{ opacity: 0.8 }}>
              <Breadcrumbs
                websiteData={{ ...websiteData, text_color: headerTextColor, primary_color: headerTextColor }}
                items={[
                  { label: 'Blogg', href: '/blogg' },
                  { label: post.title, href: `/blogg/${post.slug}` },
                ]}
              />
            </div>
          )}

          {/* Category badge */}
          {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
            <div className="mb-4">
              <span
                className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full"
                style={{ backgroundColor: `${headerTextColor === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`, color: headerTextColor }}
              >
                {post.tags[0]}
              </span>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl" style={{ color: headerTextColor }}>
            {post.title}
          </h1>

          {/* Author line */}
          <div className="flex items-center gap-4 flex-wrap">
            {websiteData.author_image_url && (
              <Image
                src={websiteData.author_image_url}
                alt={websiteData.author_name || ''}
                width={48}
                height={48}
                className="rounded-full border-2"
                style={{ borderColor: `${headerTextColor === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}` }}
              />
            )}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: headerMuted }}>
              <Link href={`/${authorSlug}`} className="font-medium hover:underline" style={{ color: headerTextColor }}>
                {websiteData.author_name}
              </Link>
              {post.published_at && (
                <>
                  <span style={{ opacity: 0.6 }}>·</span>
                  <span>{formatSwedishDate(post.published_at)}</span>
                </>
              )}
              {websiteData.show_reading_time && (
                <>
                  <span style={{ opacity: 0.6 }}>·</span>
                  <ReadingTime websiteData={{ ...websiteData, text_color: headerMuted, primary_color: headerTextColor }} content={post.content} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <article className={`${websiteData.container_width} mx-auto px-4 md:px-6`}>
        {/* Image overlapping the header */}
        {post.image_url && (
          <div className="-mt-8 md:-mt-12 mb-10">
            <Image
              src={post.image_url}
              alt={post.title}
              width={1200}
              height={600}
              className={`w-full h-56 md:h-72 lg:h-[450px] object-cover shadow-xl ${websiteData.border_radius}`}
            />
          </div>
        )}

        <div className="py-8 md:py-12">
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
