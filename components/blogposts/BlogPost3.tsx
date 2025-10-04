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

// BlogPost 3: Minimal Centered Layout
export default function BlogPost3({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <article className={`${websiteData.container_width} mx-auto px-4 py-16 max-w-3xl`}>
        {websiteData.show_breadcrumbs && (
          <div className="mb-8">
            <Breadcrumbs
              websiteData={websiteData}
              items={[
                { label: 'Blogg', href: '/blogg' },
                { label: post.title, href: `/blogg/${post.slug}` },
              ]}
            />
          </div>
        )}

        <header className="text-center mb-12">
          {post.tags && post.tags.length > 0 && (
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: websiteData.accent_color }}>
                {post.tags[0]}
              </span>
            </div>
          )}

          <h1 className="text-6xl font-bold mb-6" style={{ color: websiteData.primary_color }}>
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4">
            {post.author_avatar && (
              <Image
                src={post.author_avatar}
                alt={post.author_name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div className="text-left">
              <div className="font-semibold" style={{ color: websiteData.primary_color }}>{post.author_name}</div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {post.published_at && (
                  <span>
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                )}
                {websiteData.show_reading_time && <ReadingTime websiteData={websiteData} content={post.content} />}
              </div>
            </div>
          </div>
        </header>

        {post.image_url && (
          <Image
            src={post.image_url}
            alt={post.title}
            width={1200}
            height={600}
            className={`w-full h-96 object-cover mb-12 ${websiteData.border_radius}`}
          />
        )}

        <div className="prose prose-xl max-w-none mb-12" style={{ color: websiteData.text_color }} dangerouslySetInnerHTML={{ __html: post.content }} />

        {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
          <div className="mt-16 text-center">
            <TagsDisplay websiteData={websiteData} tags={post.tags} />
          </div>
        )}

        {websiteData.show_share_buttons && (
          <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: websiteData.secondary_color }}>
            <ShareButtons websiteData={websiteData} title={post.title} url={currentUrl} />
          </div>
        )}

        {websiteData.show_author_box && (
          <div className="mt-12">
            <AuthorBox
              websiteData={websiteData}
              authorName={post.author_name}
              authorAvatar={post.author_avatar}
            />
          </div>
        )}

        {websiteData.show_post_navigation && (
          <div className="mt-12">
            <PostNavigation websiteData={websiteData} previousPost={previousPost} nextPost={nextPost} />
          </div>
        )}
      </article>

      {websiteData.show_related_posts && relatedPosts.length > 0 && (
        <RelatedPosts websiteData={websiteData} posts={relatedPosts} />
      )}
    </>
  );
}
