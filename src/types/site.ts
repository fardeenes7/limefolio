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
    featured: boolean;
    technologies?: string[];
    project_url?: string | null;
    github_url?: string | null;
    cover_image?: string | null;
    thumbnail?: string | null;
    /** Present on project detail pages */
    project?: Project;
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
    cover_image?: string | null;
    published_at?: string | null;
    tags?: string[];
    reading_time_minutes?: number | null;
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
    testimonials?: Testimonial[];
    services?: Service[];
    stats?: Stat[];

    /** Present on project detail pages */
    project?: Project;
}
