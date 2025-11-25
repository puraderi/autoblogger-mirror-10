import Image from 'next/image';
import Link from 'next/link';
import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import { getContrastTextColor } from '@/lib/utils';
import Breadcrumbs from '@/components/blogcomponents/Breadcrumbs';
import ShareButtons from '@/components/blogcomponents/ShareButtons';
import TagsDisplay from '@/components/blogcomponents/TagsDisplay';
import ReadingTime from '@/components/blogcomponents/ReadingTime';
import AuthorBox from '@/components/blogcomponents/AuthorBox';
import PostNavigation from '@/components/blogcomponents/PostNavigation';
import RelatedPosts from '@/components/blogcomponents/RelatedPosts';
import ReadingProgressBar from '@/components/blogcomponents/ReadingProgressBar';

interface BlogPostProps {
  websiteData: WebsiteData;
  post: BlogPost;
  relatedPosts?: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

// BlogPost 4: Hero Cover - Full-width immersive hero with overlay text
export default function BlogPost4({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorSlug = websiteData.author_slug || '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <article>
        {/* Hero section */}
        {post.image_url ? (
          <div className="relative h-[60vh] md:h-[70vh] mb-10 md:mb-14">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0">
              <div className={`${websiteData.container_width} mx-auto px-4 md:px-6 pb-10 md:pb-14 text-white`}>
                {websiteData.show_breadcrumbs && (
                  <div className="mb-4 opacity-80">
                    <Breadcrumbs
                      websiteData={websiteData}
                      items={[
                        { label: 'Blogg', href: '/blogg' },
                        { label: post.title, href: `/blogg/${post.slug}` },
                      ]}
                    />
                  </div>
                )}
                {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/20 backdrop-blur-sm">
                      {post.tags[0]}
                    </span>
                  </div>
                )}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl leading-tight">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm md:text-base flex-wrap opacity-90">
                  {websiteData.author_image_url && (
                    <Image
                      src={websiteData.author_image_url}
                      alt={websiteData.author_name || ''}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-white/30"
                    />
                  )}
                  <Link href={`/${authorSlug}`} className="font-medium hover:underline">{websiteData.author_name}</Link>
                  {post.published_at && (
                    <>
                      <span className="opacity-60">·</span>
                      <span>{new Date(post.published_at).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </>
                  )}
                  {websiteData.show_reading_time && (
                    <>
                      <span className="opacity-60">·</span>
                      <ReadingTime websiteData={websiteData} content={post.content} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Fallback header when no image */
          <div className="py-16 md:py-20" style={{ backgroundColor: websiteData.primary_color }}>
            <div className={`${websiteData.container_width} mx-auto px-4 md:px-6`} style={{ color: getContrastTextColor(websiteData.primary_color) }}>
              {websiteData.show_breadcrumbs && (
                <div className="mb-4 opacity-80">
                  <Breadcrumbs
                    websiteData={websiteData}
                    items={[
                      { label: 'Blogg', href: '/blogg' },
                      { label: post.title, href: `/blogg/${post.slug}` },
                    ]}
                  />
                </div>
              )}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">{post.title}</h1>
              <div className="flex items-center gap-4 flex-wrap opacity-90">
                <span>Av <Link href={`/${authorSlug}`} className="hover:underline">{websiteData.author_name}</Link></span>
                {post.published_at && (
                  <span>{new Date(post.published_at).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                )}
                {websiteData.show_reading_time && <ReadingTime websiteData={websiteData} content={post.content} />}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`${websiteData.container_width} mx-auto px-4 md:px-6 max-w-3xl py-8`}>
          <div
            className="prose prose-lg max-w-none mb-10"
            style={{ color: websiteData.text_color }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
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
