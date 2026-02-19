import type { MetadataRoute } from "next";

const BASE_URL = "https://www.limefolio.com";

/**
 * Next.js Metadata Route handler.
 * Served at /sitemap.xml with the correct application/xml content-type.
 *
 * Add new public marketing/legal routes here as the site grows.
 * Dynamic routes (user portfolio subdomains) are intentionally omitted —
 * those are served from the public app and have their own sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date("2026-02-19");

    /** Static public routes */
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.4,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.4,
        },
    ];

    return staticRoutes;
}
