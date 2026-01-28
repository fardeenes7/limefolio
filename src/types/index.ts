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
    company_logo: string | null;
    url: string | null;
    location: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    order: number;
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

// Form data types (for creating/updating)
export type SiteFormData = Partial<
    Omit<Site, "id" | "uuid" | "created_at" | "updated_at">
>;
export type ProjectFormData = Partial<
    Omit<Project, "id" | "slug" | "created_at" | "updated_at">
>;
export type ExperienceFormData = Partial<Omit<Experience, "id">>;
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
