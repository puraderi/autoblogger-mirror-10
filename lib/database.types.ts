export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      website_data: {
        Row: {
          id: string
          created_at: string
          host_name: string
          website_name: string
          topic: string
          about_us: string
          contact_us: string
          language: string
          frontpage_hero_title: string | null
          frontpage_hero_text: string | null
          frontpage_outro_text: string | null
          template_header: number
          template_footer: number
          template_blog_post: number
          template_page: number
          template_front_page: number
          primary_color: string
          secondary_color: string
          accent_color: string
          background_color: string
          text_color: string
          font_heading: string
          font_body: string
          container_width: string
          border_radius: string
          logo_url: string | null
          favicon_url: string | null
          meta_description: string | null
          social_twitter: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_linkedin: string | null
          show_breadcrumbs: boolean
          show_related_posts: boolean
          show_search_bar: boolean
          show_share_buttons: boolean
          show_table_of_contents: boolean
          show_author_box: boolean
          show_tags_display: boolean
          show_reading_time: boolean
          show_post_navigation: boolean
          show_reading_progress_bar: boolean
          author_name: string | null
          author_bio: string | null
          author_image_url: string | null
          author_slug: string | null
          icon_identifier: string | null
          contact_email: string | null
          topic_image_landscape_16_9: string | null
          topic_image_portrait_2_3: string | null
          topic_image_square_1_1: string | null
          ai_tag: boolean | null
        }
        Insert: {
          id?: string
          created_at?: string
          host_name: string
          website_name: string
          topic: string
          about_us: string
          contact_us: string
          language?: string
          template_header: number
          template_footer: number
          template_blog_post: number
          template_page: number
          template_front_page: number
          primary_color: string
          secondary_color: string
          accent_color: string
          background_color?: string
          text_color?: string
          font_heading?: string
          font_body?: string
          container_width?: string
          logo_url?: string | null
          favicon_url?: string | null
          meta_description?: string | null
          social_twitter?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          show_breadcrumbs?: boolean
          show_related_posts?: boolean
          show_search_bar?: boolean
          show_share_buttons?: boolean
          show_table_of_contents?: boolean
          show_author_box?: boolean
          show_tags_display?: boolean
          show_reading_time?: boolean
          show_post_navigation?: boolean
          show_reading_progress_bar?: boolean
          author_name?: string | null
          author_bio?: string | null
          author_image_url?: string | null
          author_slug?: string | null
          icon_identifier?: string | null
          contact_email?: string | null
          topic_image_landscape_16_9?: string | null
          topic_image_portrait_2_3?: string | null
          topic_image_square_1_1?: string | null
          ai_tag?: boolean | null
        }
        Update: {
          id?: string
          created_at?: string
          host_name?: string
          website_name?: string
          topic?: string
          about_us?: string
          contact_us?: string
          language?: string
          template_header?: number
          template_footer?: number
          template_blog_post?: number
          template_page?: number
          template_front_page?: number
          primary_color?: string
          secondary_color?: string
          accent_color?: string
          background_color?: string
          text_color?: string
          font_heading?: string
          font_body?: string
          container_width?: string
          logo_url?: string | null
          favicon_url?: string | null
          meta_description?: string | null
          social_twitter?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          show_breadcrumbs?: boolean
          show_related_posts?: boolean
          show_search_bar?: boolean
          show_share_buttons?: boolean
          show_table_of_contents?: boolean
          show_author_box?: boolean
          show_tags_display?: boolean
          show_reading_time?: boolean
          show_post_navigation?: boolean
          show_reading_progress_bar?: boolean
          author_name?: string | null
          author_bio?: string | null
          author_image_url?: string | null
          author_slug?: string | null
          icon_identifier?: string | null
          contact_email?: string | null
          topic_image_landscape_16_9?: string | null
          topic_image_portrait_2_3?: string | null
          topic_image_square_1_1?: string | null
          ai_tag?: boolean | null
        }
      }
      blog_post: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          website_id: string
          slug: string
          title: string
          excerpt: string
          content: string
          image_url: string | null
          author_name: string
          author_avatar: string | null
          published: boolean
          published_at: string | null
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          website_id: string
          slug: string
          title: string
          excerpt: string
          content: string
          image_url?: string | null
          author_name: string
          author_avatar?: string | null
          published?: boolean
          published_at?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          website_id?: string
          slug?: string
          title?: string
          excerpt?: string
          content?: string
          image_url?: string | null
          author_name?: string
          author_avatar?: string | null
          published?: boolean
          published_at?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
        }
      }
      blog_generation_jobs: {
        Row: {
          id: string
          website_id: string
          keyword: string
          status: 'pending' | 'processing' | 'complete' | 'failed'
          progress_step: string | null
          result_post_id: string | null
          error_message: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          website_id: string
          keyword: string
          status?: 'pending' | 'processing' | 'complete' | 'failed'
          progress_step?: string | null
          result_post_id?: string | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          website_id?: string
          keyword?: string
          status?: 'pending' | 'processing' | 'complete' | 'failed'
          progress_step?: string | null
          result_post_id?: string | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
    }
  }
}
