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

// BlogPost 5: Card Style with Accent
export default function BlogPost5({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <div className="py-12" style={{ backgroundColor: websiteData.secondary_color }}>
        <article className={`${websiteData.container_width} mx-auto px-4 max-w-4xl`}>
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

          <div className={`bg-white shadow-xl overflow-hidden ${websiteData.border_radius}`}>
            {post.image_url && (
              <Image
                src={post.image_url}
                alt={post.title}
                width={1200}
                height={500}
                className="w-full h-80 object-cover"
              />
            )}

            <div className="p-12">
              <header className="mb-8 pb-8 border-b-4" style={{ borderColor: websiteData.accent_color }}>
                {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
                  <div className="mb-4">
                    <TagsDisplay websiteData={websiteData} tags={post.tags} />
                  </div>
                )}

                <h1 className="text-5xl font-bold mb-6" style={{ color: websiteData.primary_color }}>
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 flex-wrap">
                  {post.author_avatar && (
                    <Image
                      src={post.author_avatar}
                      alt={post.author_name}
                      width={56}
                      height={56}
                      className="rounded-full border-2"
                      style={{ borderColor: websiteData.accent_color }}
                    />
                  )}
                  <div>
                    <div className="font-bold text-lg" style={{ color: websiteData.primary_color }}>
                      {post.author_name}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {post.published_at && (
                        <span>
                          {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      )}
                      {websiteData.show_reading_time && <ReadingTime websiteData={websiteData} content={post.content} />}
                    </div>
                  </div>
                </div>
              </header>

              <div className="prose prose-lg max-w-none mb-12" style={{ color: websiteData.text_color }} dangerouslySetInnerHTML={{ __html: post.content }} />

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
            </div>
          </div>
        </article>
      </div>

      {websiteData.show_related_posts && relatedPosts.length > 0 && (
        <RelatedPosts websiteData={websiteData} posts={relatedPosts} />
      )}
    </>
  );
}
