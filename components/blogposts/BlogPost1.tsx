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
import AIDisclaimer from '@/components/blogcomponents/AIDisclaimer';
import AIDisclaimerCTA from '@/components/blogcomponents/AIDisclaimerCTA';
import { formatSwedishDate } from '@/lib/utils';

interface BlogPostProps {
  websiteData: WebsiteData;
  post: BlogPost;
  relatedPosts?: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

// BlogPost 1: Classic Article - Clean traditional blog layout with author inline
export default function BlogPost1({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const lang = getLanguageConfig(websiteData.language);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorSlug = websiteData.author_slug || '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <article className={`${websiteData.container_width} mx-auto px-4 md:px-6 py-8 md:py-16`}>
        {websiteData.show_breadcrumbs && (
          <div className="mb-6">
            <Breadcrumbs
              websiteData={websiteData}
              items={[
                { label: lang.labels.blog, href: `/${lang.slugs.blog}` },
                { label: post.title, href: `/${lang.slugs.blog}/${post.slug}` },
              ]}
            />
          </div>
        )}

        <header className="mb-8 md:mb-10">
          {/* Category badge */}
          {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
            <div className="mb-4">
              <span
                className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full"
                style={{ backgroundColor: `${websiteData.accent_color}20`, color: websiteData.accent_color }}
              >
                {post.tags[0]}
              </span>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight" style={{ color: websiteData.primary_color }}>
            {post.title}
          </h1>

          {/* Author line with avatar */}
          <div className="flex items-center gap-3 mb-6">
            {websiteData.author_image_url && (
              <Image
                src={websiteData.author_image_url}
                alt={websiteData.author_name || ''}
                width={44}
                height={44}
                className="rounded-full"
              />
            )}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
              <Link href={`/${authorSlug}`} className="font-medium hover:underline" style={{ color: websiteData.primary_color }}>
                {websiteData.author_name}
              </Link>
              {post.published_at && (
                <>
                  <span className="text-gray-300">·</span>
                  <span>{formatSwedishDate(post.published_at)}</span>
                </>
              )}
              {websiteData.show_reading_time && (
                <>
                  <span className="text-gray-300">·</span>
                  <ReadingTime websiteData={websiteData} content={post.content} />
                </>
              )}
            </div>
            <AIDisclaimerCTA websiteData={websiteData} />
          </div>

          {post.image_url && (
            <Image
              src={post.image_url}
              alt={post.title}
              width={1200}
              height={600}
              className={`w-full h-56 md:h-72 lg:h-[420px] object-cover ${websiteData.border_radius}`}
            />
          )}
        </header>

        <div
          className="prose prose-lg max-w-none mb-10 prose-headings:font-bold prose-a:underline prose-img:rounded-lg"
          style={{ color: websiteData.text_color }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mb-10">
          <AIDisclaimer websiteData={websiteData} />
        </div>

        {/* Tags row */}
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
      </article>

      {websiteData.show_related_posts && relatedPosts.length > 0 && (
        <RelatedPosts websiteData={websiteData} posts={relatedPosts} />
      )}
    </>
  );
}
