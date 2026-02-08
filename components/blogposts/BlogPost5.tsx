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

// BlogPost 5: Card Elevated - Article in elevated card with accent border
export default function BlogPost5({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const lang = getLanguageConfig(websiteData.language);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorSlug = websiteData.author_slug || '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <div className="py-10 md:py-16 min-h-screen" style={{ backgroundColor: `${websiteData.secondary_color}40` }}>
        <article className={`${websiteData.container_width} mx-auto px-4 max-w-4xl`}>
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

          <div className={`bg-white shadow-2xl overflow-hidden border-t-4 ${websiteData.border_radius}`} style={{ borderColor: websiteData.accent_color }}>
            {post.image_url && (
              <Image
                src={post.image_url}
                alt={post.title}
                width={1200}
                height={500}
                className="w-full h-64 md:h-80 object-cover"
              />
            )}

            <div className="p-6 md:p-10 lg:p-12">
              <header className="mb-8 pb-8 border-b" style={{ borderColor: websiteData.secondary_color }}>
                {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                        style={{ backgroundColor: `${websiteData.accent_color}15`, color: websiteData.accent_color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: websiteData.primary_color }}>
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 flex-wrap">
                  {websiteData.author_image_url && (
                    <Image
                      src={websiteData.author_image_url}
                      alt={websiteData.author_name || lang.labels.author}
                      width={52}
                      height={52}
                      className="rounded-full ring-2 ring-offset-2"
                      style={{ ringColor: websiteData.accent_color } as React.CSSProperties}
                    />
                  )}
                  <div>
                    <Link href={`/${authorSlug}`} className="font-bold hover:underline block" style={{ color: websiteData.primary_color }}>
                      {websiteData.author_name}
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
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
                </div>
                <div className="mt-4">
                  <AIDisclaimerCTA websiteData={websiteData} />
                </div>
              </header>

              <div
                className="prose prose-lg max-w-none mb-10"
                style={{ color: websiteData.text_color }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mb-10">
                <AIDisclaimer websiteData={websiteData} />
              </div>

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
