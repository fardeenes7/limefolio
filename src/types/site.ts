/**
 * @file src/types/site.ts
 *
 * Typed shape of the data returned by `getSite()` and the public portfolio API.
 * This is the data model that all section components receive via `siteData`.
 */

export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    order?: number;
}

export interface Project {
    id: number;
    slug: string;
    title: string;
    tagline?: string | null;
    description?: string | null;
    content?: string | null;
    featured: boolean;
    technologies?: string[];
    project_url?: string | null;
    github_url?: string | null;
    youtube_url?: string | null;
    cover_image?: string | null;
    thumbnail?: string | null;
    media?: Media[];
    start_date?: string | null;
    end_date?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    /** Present on project detail pages */
    project?: Project;
}

export interface Media {
    id: number;
    image?: string | null;
    video?: string | null;
    thumbnail?: string | null;
    alt?: string | null;
    caption?: string | null;
    order?: number;
    is_featured?: boolean;
    media_type?: 'image' | 'video' | string;
    url?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface Experience {
    id: number;
    position: string;
    company: string;
    location?: string | null;
    type?: string | null;
    start_date: string;
    end_date?: string | null;
    is_current: boolean;
    description?: string | null;
}

export interface Skill {
    id: number;
    name: string;
    category?: string | null;
    is_featured: boolean;
    years_of_experience?: number | null;
    proficiency?: number | null; // 0-100
    icon_url?: string | null;
    order?: number;
}

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt?: string | null;
    content?: string | null;
    thumbnail?: string | null;
    thumbnail_url?: string | null;
    cover_image?: string | null;
    author?: string | null;
    author_name?: string | null;
    published_at?: string | null;
    tags?: string[];
    categories?: string[];
    reading_time?: number | null;
    reading_time_minutes?: number | null;
    is_featured?: boolean;
    view_count?: number;
    meta_description?: string | null;
    meta_keywords?: string | null;
    media?: Media[];
}

export interface Testimonial {
    id: number;
    author_name: string;
    author_title?: string | null;
    author_company?: string | null;
    avatar_url?: string | null;
    body: string;
}

export interface Service {
    id: number;
    name: string;
    description?: string | null;
    icon?: string | null;
    price?: string | null;
    price_unit?: string | null;
}

export interface Stat {
    id: number;
    label: string;
    value: string;
    icon?: string | null;
    suffix?: string | null;
}

export interface SiteUser {
    email?: string;
    first_name?: string;
    last_name?: string;
}

/**
 * The full data payload for a portfolio site.
 * Shape must match the API response from `getSite()`.
 * Optional arrays default to `[]` when the field is absent.
 */
export interface SiteData {
    // ── Identity ──────────────────────────────────────────────────────────────
    title: string;
    tagline?: string | null;
    description?: string | null;
    logo?: string | null;
    favicon?: string | null;

    // ── Presentation ──────────────────────────────────────────────────────────
    template?: string | null;
    theme?: string | null;
    font?: string | null;

    // ── SEO ───────────────────────────────────────────────────────────────────
    meta_title?: string | null;
    meta_description?: string | null;
    available_for_hire?: boolean;

    // ── User ──────────────────────────────────────────────────────────────────
    user?: SiteUser;

    // ── Collections ───────────────────────────────────────────────────────────
    social_links?: SocialLink[];
    projects?: Project[];
    experiences?: Experience[];
    skills?: Skill[];
    blog_posts?: BlogPost[];
    media?: Media[];
    testimonials?: Testimonial[];
    services?: Service[];
    stats?: Stat[];

    /** Present on project detail pages */
    project?: Project;

    /** Present on blog detail pages */
    blog_post?: BlogPost;
}
