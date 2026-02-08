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

interface BlogPostProps {
  websiteData: WebsiteData;
  post: BlogPost;
  relatedPosts?: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

// BlogPost 3: Editorial Centered - Elegant centered layout with serif typography
export default function BlogPost3({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const lang = getLanguageConfig(websiteData.language);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorSlug = websiteData.author_slug || '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <article className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {websiteData.show_breadcrumbs && (
          <div className="mb-8 text-center">
            <Breadcrumbs
              websiteData={websiteData}
              items={[
                { label: lang.labels.blog, href: `/${lang.slugs.blog}` },
                { label: post.title, href: `/${lang.slugs.blog}/${post.slug}` },
              ]}
            />
          </div>
        )}

        <header className="text-center mb-10 md:mb-14">
          {/* Category with decorative lines */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gray-300" />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: websiteData.accent_color }}>
                {post.tags[0]}
              </span>
              <div className="h-px w-12 bg-gray-300" />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight" style={{ color: websiteData.primary_color }}>
            {post.title}
          </h1>

          {/* Author centered */}
          <div className="flex flex-col items-center gap-3">
            {websiteData.author_image_url && (
              <Image
                src={websiteData.author_image_url}
                alt={websiteData.author_name || lang.labels.author}
                width={64}
                height={64}
                className="rounded-full border-2"
                style={{ borderColor: websiteData.secondary_color }}
              />
            )}
            <div className="text-center">
              <Link href={`/${authorSlug}`} className="font-semibold hover:underline block mb-1" style={{ color: websiteData.primary_color }}>
                {websiteData.author_name}
              </Link>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                {post.published_at && (
                  <span>{new Date(post.published_at).toLocaleDateString(lang.locale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                )}
                {websiteData.show_reading_time && (
                  <>
                    <span>·</span>
                    <ReadingTime websiteData={websiteData} content={post.content} />
                  </>
                )}
              </div>
            </div>
            <div className="mt-4">
              <AIDisclaimerCTA websiteData={websiteData} />
            </div>
          </div>
        </header>

        {post.image_url && (
          <div className="mb-10 md:mb-14 -mx-4 md:mx-0">
            <Image
              src={post.image_url}
              alt={post.title}
              width={1200}
              height={600}
              className={`w-full h-64 md:h-80 lg:h-96 object-cover ${websiteData.border_radius}`}
            />
          </div>
        )}

        {/* Content with elegant prose styling */}
        <div
          className="prose prose-lg md:prose-xl max-w-none mb-12 prose-p:first-of-type:first-letter:text-5xl prose-p:first-of-type:first-letter:font-serif prose-p:first-of-type:first-letter:font-bold prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:mt-1"
          style={{ color: websiteData.text_color }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mb-10">
          <AIDisclaimer websiteData={websiteData} />
        </div>

        {/* Tags centered */}
        {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
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
      </article>

      {websiteData.show_related_posts && relatedPosts.length > 0 && (
        <RelatedPosts websiteData={websiteData} posts={relatedPosts} />
      )}
    </>
  );
}
