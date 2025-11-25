import { WebsiteData } from '@/lib/services/website';
import { BlogPost } from '@/lib/services/blog';
import BlogPost1 from './BlogPost1';
import BlogPost2 from './BlogPost2';
import BlogPost3 from './BlogPost3';
import BlogPost4 from './BlogPost4';
import BlogPost5 from './BlogPost5';
import BlogPost6 from './BlogPost6';
import BlogPost7 from './BlogPost7';
import BlogPost8 from './BlogPost8';

interface BlogPostTemplateProps {
  websiteData: WebsiteData;
  post: BlogPost;
  relatedPosts?: BlogPost[];
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

export default function BlogPostTemplate({ websiteData, post, relatedPosts, previousPost, nextPost }: BlogPostTemplateProps) {
  const templates = [BlogPost1, BlogPost2, BlogPost3, BlogPost4, BlogPost5, BlogPost6, BlogPost7, BlogPost8];
  const BlogPostComponent = templates[websiteData.template_blog_post - 1] || BlogPost1;

  return <BlogPostComponent websiteData={websiteData} post={post} relatedPosts={relatedPosts} previousPost={previousPost} nextPost={nextPost} />;
}
