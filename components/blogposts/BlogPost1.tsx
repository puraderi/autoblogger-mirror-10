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

// BlogPost 1: Classic Article Layout
export default function BlogPost1({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const authorSlug = websiteData.author_slug || '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <article className={`${websiteData.container_width} mx-auto px-4 md:px-6 py-6 md:py-12`}>
        {websiteData.show_breadcrumbs && (
          <Breadcrumbs
            websiteData={websiteData}
            items={[
              { label: 'Blogg', href: '/blogg' },
              { label: post.title, href: `/blogg/${post.slug}` },
            ]}
          />
        )}

        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4" style={{ color: websiteData.primary_color }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 text-sm md:text-base">
            <span style={{ color: websiteData.text_color }}>
              Av <Link href={`/${authorSlug}`} className="hover:underline">{websiteData.author_name}</Link>
            </span>
            {post.published_at && (
              <span style={{ color: websiteData.text_color }}>
                {formatSwedishDate(post.published_at)}
              </span>
            )}
            {websiteData.show_reading_time && <ReadingTime websiteData={websiteData} content={post.content} />}
          </div>

          {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
            <div className="mb-4 md:mb-6">
              <TagsDisplay websiteData={websiteData} tags={post.tags} />
            </div>
          )}

          {post.image_url && (
            <Image
              src={post.image_url}
              alt={post.title}
              width={1200}
              height={600}
              className={`w-full h-48 md:h-64 lg:h-96 object-cover ${websiteData.border_radius}`}
            />
          )}
        </header>

        <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none mb-8 md:mb-12" style={{ color: websiteData.text_color }} dangerouslySetInnerHTML={{ __html: post.content }} />

        {websiteData.show_share_buttons && (
          <div className="mb-8 md:mb-12 pb-6 md:pb-8 border-t pt-6 md:pt-8" style={{ borderColor: websiteData.secondary_color }}>
            <ShareButtons websiteData={websiteData} title={post.title} url={currentUrl} />
          </div>
        )}

        {websiteData.show_author_box && (
          <div className="mb-12">
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

      {websiteData.show_related_posts && relatedPosts.length > 0 && (
        <RelatedPosts websiteData={websiteData} posts={relatedPosts} />
      )}
    </>
  );
}
