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
import { formatSwedishDate } from '@/lib/utils';

interface BlogPostProps {
  websiteData: WebsiteData;
  post: BlogPost;
  relatedPosts?: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

// BlogPost 2: Magazine Sidebar - Content with sticky info sidebar
export default function BlogPost2({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorSlug = websiteData.author_slug || '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <div className={`${websiteData.container_width} mx-auto px-4 md:px-6 py-8 md:py-14`}>
        {websiteData.show_breadcrumbs && (
          <div className="mb-6">
            <Breadcrumbs
              websiteData={websiteData}
              items={[
                { label: 'Blogg', href: '/blogg' },
                { label: post.title, href: `/blogg/${post.slug}` },
              ]}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main content */}
          <article className="lg:col-span-8">
            {post.image_url && (
              <Image
                src={post.image_url}
                alt={post.title}
                width={1200}
                height={500}
                className={`w-full h-56 md:h-72 lg:h-80 object-cover mb-8 ${websiteData.border_radius}`}
              />
            )}

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: websiteData.primary_color }}>
              {post.title}
            </h1>

            {/* Mobile-only meta info */}
            <div className="lg:hidden flex flex-wrap items-center gap-3 mb-6 text-sm text-gray-600">
              <span>Av <Link href={`/${authorSlug}`} className="hover:underline font-medium">{websiteData.author_name}</Link></span>
              {post.published_at && (
                <>
                  <span>·</span>
                  <span>{formatSwedishDate(post.published_at)}</span>
                </>
              )}
              {websiteData.show_reading_time && (
                <>
                  <span>·</span>
                  <ReadingTime websiteData={websiteData} content={post.content} />
                </>
              )}
            </div>

            <div
              className="prose prose-lg max-w-none mb-10"
              style={{ color: websiteData.text_color }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {websiteData.show_share_buttons && (
              <div className="mb-10 pb-8 border-t pt-8" style={{ borderColor: websiteData.secondary_color }}>
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
          </article>

          {/* Sidebar - desktop only */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Author card */}
              <div className="p-5 rounded-xl" style={{ backgroundColor: `${websiteData.secondary_color}50` }}>
                <div className="flex items-center gap-3 mb-3">
                  {websiteData.author_image_url && (
                    <Image
                      src={websiteData.author_image_url}
                      alt={websiteData.author_name || 'Författare'}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">Författare</p>
                    <Link href={`/${authorSlug}`} className="font-semibold hover:underline" style={{ color: websiteData.primary_color }}>
                      {websiteData.author_name}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Date + reading time */}
              <div className="p-5 rounded-xl border" style={{ borderColor: websiteData.secondary_color }}>
                {post.published_at && (
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Publicerad</p>
                    <p className="font-medium" style={{ color: websiteData.primary_color }}>
                      {formatSwedishDate(post.published_at)}
                    </p>
                  </div>
                )}
                {websiteData.show_reading_time && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Lästid</p>
                    <ReadingTime websiteData={websiteData} content={post.content} />
                  </div>
                )}
              </div>

              {/* Tags */}
              {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
                <div className="p-5 rounded-xl border" style={{ borderColor: websiteData.secondary_color }}>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">Taggar</p>
                  <TagsDisplay websiteData={websiteData} tags={post.tags} />
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {websiteData.show_related_posts && relatedPosts.length > 0 && (
        <RelatedPosts websiteData={websiteData} posts={relatedPosts} />
      )}
    </>
  );
}
