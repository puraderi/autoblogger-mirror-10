import Image from 'next/image';
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

interface BlogPostProps {
  websiteData: WebsiteData;
  post: BlogPost;
  relatedPosts?: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

// BlogPost 2: Magazine Style with Sidebar
export default function BlogPost2({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <div className={`${websiteData.container_width} mx-auto px-4 md:px-6 py-6 md:py-12`}>
        {websiteData.show_breadcrumbs && (
          <div className="mb-4 md:mb-6">
            <Breadcrumbs
              websiteData={websiteData}
              items={[
                { label: 'Blogg', href: '/blogg' },
                { label: post.title, href: `/blogg/${post.slug}` },
              ]}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          <article className="lg:col-span-3">
            {post.image_url && (
              <Image
                src={post.image_url}
                alt={post.title}
                width={1200}
                height={500}
                className={`w-full h-48 md:h-64 lg:h-80 object-cover mb-6 md:mb-8 ${websiteData.border_radius}`}
              />
            )}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6" style={{ color: websiteData.primary_color }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 flex-wrap text-sm md:text-base" style={{ color: websiteData.text_color }}>
              <span>By {post.author_name}</span>
              {post.published_at && (
                <span>
                  {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
              {websiteData.show_reading_time && <ReadingTime websiteData={websiteData} content={post.content} />}
            </div>

            <div className="prose prose-sm md:prose-base max-w-none mb-8 md:mb-12" style={{ color: websiteData.text_color }} dangerouslySetInnerHTML={{ __html: post.content }} />

            {websiteData.show_share_buttons && (
              <div className="mb-12 pb-8 border-t pt-8" style={{ borderColor: websiteData.secondary_color }}>
                <ShareButtons websiteData={websiteData} title={post.title} url={currentUrl} />
              </div>
            )}

            {websiteData.show_author_box && (
              <div className="mb-12">
                <AuthorBox
                  websiteData={websiteData}
                  authorName={post.author_name}
                  authorAvatar={post.author_avatar}
                />
              </div>
            )}

            {websiteData.show_post_navigation && (
              <PostNavigation websiteData={websiteData} previousPost={previousPost} nextPost={nextPost} />
            )}
          </article>

          <aside className="space-y-6">
            <div className="border-l-4 pl-4 sticky top-4" style={{ borderColor: websiteData.accent_color }}>
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3" style={{ color: websiteData.primary_color }}>Author</h3>
                {post.author_avatar && (
                  <Image
                    src={post.author_avatar}
                    alt={post.author_name}
                    width={64}
                    height={64}
                    className="rounded-full mb-2"
                  />
                )}
                <div className="font-semibold">{post.author_name}</div>
              </div>

              {post.published_at && (
                <div className="mb-6">
                  <h3 className="font-bold text-sm mb-2" style={{ color: websiteData.primary_color }}>Published</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              )}

              {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: websiteData.primary_color }}>Tags</h3>
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
