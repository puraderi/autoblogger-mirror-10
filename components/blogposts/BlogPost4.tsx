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

interface BlogPostProps {
  websiteData: WebsiteData;
  post: BlogPost;
  relatedPosts?: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

// BlogPost 4: Full Width Hero Image
export default function BlogPost4({ websiteData, post, relatedPosts = [], previousPost, nextPost }: BlogPostProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const authorSlug = websiteData.author_slug || '';

  return (
    <>
      {websiteData.show_reading_progress_bar && <ReadingProgressBar websiteData={websiteData} />}

      <article>
        {post.image_url && (
          <div className="relative h-[70vh] mb-12">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <div className={`absolute bottom-0 left-0 right-0 ${websiteData.container_width} mx-auto px-4 pb-12 text-white`}>
              {websiteData.show_breadcrumbs && (
                <div className="mb-4">
                  <Breadcrumbs
                    websiteData={websiteData}
                    items={[
                      { label: 'Blogg', href: '/blogg' },
                      { label: post.title, href: `/blogg/${post.slug}` },
                    ]}
                  />
                </div>
              )}
              <h1 className="text-6xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-lg flex-wrap">
                <Link href={`/${authorSlug}`} className="hover:underline">{websiteData.author_name}</Link>
                {post.published_at && (
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                )}
                {websiteData.show_reading_time && <ReadingTime websiteData={websiteData} content={post.content} />}
              </div>
            </div>
          </div>
        )}

        <div className={`${websiteData.container_width} mx-auto px-4 max-w-4xl`}>
          {!post.image_url && (
            <header className="mb-12">
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
              <h1 className="text-6xl font-bold mb-4" style={{ color: websiteData.primary_color }}>
                {post.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap" style={{ color: websiteData.text_color }}>
                <span>
                  By <Link href={`/${authorSlug}`} className="hover:underline">{websiteData.author_name}</Link>
                </span>
                {post.published_at && (
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                )}
                {websiteData.show_reading_time && <ReadingTime websiteData={websiteData} content={post.content} />}
              </div>
            </header>
          )}

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
                authorName={websiteData.author_name}
                authorAvatar={websiteData.author_image_url}
              />
            </div>
          )}

          <footer className="border-t-2 pt-8 pb-12" style={{ borderColor: websiteData.accent_color }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {websiteData.author_image_url && (
                  <Image
                    src={websiteData.author_image_url}
                    alt={websiteData.author_name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                )}
                <div>
                  <Link href={`/${authorSlug}`} className="font-bold text-lg hover:underline" style={{ color: websiteData.primary_color }}>{websiteData.author_name}</Link>
                  <div className="text-sm text-gray-600">Author</div>
                </div>
              </div>
              {websiteData.show_tags_display && post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  <TagsDisplay websiteData={websiteData} tags={post.tags} />
                </div>
              )}
            </div>
          </footer>

          {websiteData.show_post_navigation && (
            <div className="mb-12">
              <PostNavigation websiteData={websiteData} previousPost={previousPost} nextPost={nextPost} />
            </div>
          )}
        </div>
      </article>

      {websiteData.show_related_posts && relatedPosts.length > 0 && (
        <RelatedPosts websiteData={websiteData} posts={relatedPosts} />
      )}
    </>
  );
}
