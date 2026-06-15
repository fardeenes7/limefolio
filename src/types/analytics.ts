/**
 * TypeScript types for the Analytics and Dashboard Stats APIs.
 */

// ---------------------------------------------------------------------------
// Dashboard Stats  —  GET /api/analytics/stats/
// ---------------------------------------------------------------------------

export interface CompletenessItem {
    key: string;
    label: string;
    done: boolean;
    url: string;
}

export interface RecentProject {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    is_published: boolean;
    featured: boolean;
    updated_at: string;
    technologies: string[];
}

export interface RecentPost {
    id: number;
    title: string;
    slug: string;
    status: "draft" | "published" | "archived";
    view_count: number;
    reading_time: number;
    published_at: string | null;
    updated_at: string;
}

export interface DashboardStats {
    // Content counts
    total_projects: number;
    published_projects: number;
    total_posts: number;
    published_posts: number;
    draft_posts: number;
    total_skills: number;
    total_experiences: number;
    total_social_links: number;
    total_post_views: number;

    // Site health
    is_published: boolean;
    available_for_hire: boolean;
    subdomain: string;
    /** "none" | "pending" | "verified" | "failed" */
    domain_status: "none" | "pending" | "verified" | "failed";
    verified_domain: string | null;

    // Profile completeness
    completeness_score: number; // 0–100
    completeness_items: CompletenessItem[];

    // Recent content
    recent_projects: RecentProject[];
    recent_posts: RecentPost[];
}

// ---------------------------------------------------------------------------
// Analytics Overview  —  GET /api/analytics/overview/?days=30
// ---------------------------------------------------------------------------

export interface VisitDataPoint {
    date: string; // ISO date string "YYYY-MM-DD"
    visits: number;
    unique_visitors: number;
}

export interface AnalyticsOverview {
    days: number;
    total_visits: number;
    unique_visitors: number;
    data: VisitDataPoint[];
}

// ---------------------------------------------------------------------------
// Analytics Breakdown  —  GET /api/analytics/breakdown/?days=30
// ---------------------------------------------------------------------------

export interface TopPage {
    path: string;
    visits: number;
}

export interface TopReferrer {
    domain: string;
    visits: number;
}

export interface DeviceBreakdown {
    device: "desktop" | "mobile" | "tablet" | "unknown";
    visits: number;
}

export interface CountryBreakdown {
    country: string; // ISO-3166 code
    visits: number;
}

export interface AnalyticsBreakdown {
    days: number;
    top_pages: TopPage[];
    top_referrers: TopReferrer[];
    devices: DeviceBreakdown[];
    countries: CountryBreakdown[];
}

// ---------------------------------------------------------------------------
// Tracking payload  —  POST /api/analytics/track/
// ---------------------------------------------------------------------------

export interface TrackVisitPayload {
    path: string;
    session_id: string;
    referrer?: string;
    device?: "desktop" | "mobile" | "tablet" | "unknown";
    browser?: string;
}
