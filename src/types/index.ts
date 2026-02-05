// Common types
export interface APIResponse<T> {
    data: T | null;
    status: number;
    ok: boolean;
}

// Site types
export interface Site {
    id: number;
    uuid: string;
    subdomain: string;
    title: string;
    tagline: string;
    description: string;
    logo: string | null;
    favicon: string | null;
    meta_title: string;
    meta_description: string;
    is_published: boolean;
    is_active: boolean;
    custom_domains?: CustomDomain[];
    created_at: string;
    updated_at: string;
}

export interface CustomDomain {
    id: number;
    domain: string;
    status: "pending" | "verified" | "failed";
    verified_at: string | null;
    created_at: string;
    updated_at: string;
}

// Project types
export interface Project {
    id: number;
    title: string;
    slug: string;
    tagline: string;
    description: string;
    thumbnail: string | null;
    demo_url: string;
    github_url: string;
    technologies: string[];
    featured: boolean;
    status: "draft" | "published";
    order: number;
    media?: ProjectMedia[];
    created_at: string;
    updated_at: string;
}

export interface ProjectMedia {
    id: number;
    image: string;
    thumbnail: string;
    caption: string;
    order: number;
    media_type: "image" | "video";
}

// Experience types
export interface Experience {
    id: number;
    company: string;
    position: string;
    description: string;
    type: "Full Time" | "Part Time" | "Internship" | "Freelance";
    type_display: string;
    company_logo: string | null;
    url: string | null;
    location: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    order: number;
    is_published: boolean;
}

// Skill types
export interface Skill {
    id: number;
    name: string;
    category:
        | "programming"
        | "framework"
        | "database"
        | "devops"
        | "design"
        | "soft_skill"
        | "language"
        | "tool"
        | "other";
    category_display: string;
    proficiency: "beginner" | "intermediate" | "advanced" | "expert";
    proficiency_display: string;
    description: string;
    years_of_experience: number | null;
    icon_url: string | null;
    order: number;
    is_featured: boolean;
    is_published: boolean;
}

// Social Link types
export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    username: string;
    order: number;
}

// API Key types
export interface APIKey {
    id: number;
    name: string;
    key: string;
    secret?: string; // Only returned on creation
    is_active: boolean;
    read_only: boolean;
    rate_limit: number;
    request_count: number;
    last_used_at: string | null;
    created_at: string;
    updated_at: string;
}

// Media types
export interface Media {
    id: number;
    image: string | null;
    video: string | null;
    thumbnail: string | null;
    alt: string;
    caption: string;
    order: number;
    is_featured: boolean;
    media_type: "image" | "video";
    url: string;
    created_at: string;
    updated_at: string;
}

// Blog types
export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    media: Media[];
    thumbnail: string | null;
    author: string;
    author_name: string;
    tags: string[];
    categories: string[];
    meta_description: string;
    meta_keywords: string;
    status: "draft" | "published" | "archived";
    is_featured: boolean;
    published_at: string | null;
    reading_time: number;
    view_count: number;
    comments_count: number;
    created_at: string;
    updated_at: string;
}

export interface BlogComment {
    id: number;
    author_name: string;
    author_email: string;
    author_website: string;
    content: string;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
}

// Form data types (for creating/updating)
export type SiteFormData = Partial<
    Omit<Site, "id" | "uuid" | "created_at" | "updated_at">
>;
export type ProjectFormData = Partial<
    Omit<Project, "id" | "slug" | "created_at" | "updated_at">
>;
export type ExperienceFormData = Partial<
    Omit<Experience, "id" | "type_display">
>;
export type SkillFormData = Partial<
    Omit<Skill, "id" | "category_display" | "proficiency_display">
>;
export type SocialLinkFormData = Partial<Omit<SocialLink, "id">>;
export type APIKeyFormData = Partial<
    Omit<
        APIKey,
        | "id"
        | "key"
        | "request_count"
        | "last_used_at"
        | "created_at"
        | "updated_at"
    >
>;
export type BlogPostFormData = Partial<
    Omit<
        BlogPost,
        | "id"
        | "slug"
        | "media"
        | "thumbnail"
        | "author_name"
        | "reading_time"
        | "view_count"
        | "comments_count"
        | "created_at"
        | "updated_at"
    >
>;
export type BlogCommentFormData = Omit<
    BlogComment,
    "id" | "is_approved" | "created_at" | "updated_at"
>;
export type MediaFormData = Partial<
    Omit<Media, "id" | "media_type" | "url" | "created_at" | "updated_at">
>;
