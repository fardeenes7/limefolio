import type { MetadataRoute } from "next";

const BASE_URL = "https://www.limefolio.com";

/**
 * Next.js Metadata Route handler.
 * Served at /robots.txt with the correct text/plain content-type.
 *
 * Rules:
 *  - Public marketing / legal pages → fully crawlable.
 *  - Authenticated app routes (/app/*) → disallowed (private dashboard).
 *  - Auth routes (/login, /register, /reset-password) → disallowed (no SEO value).
 *  - Internal API routes (/api/*) → disallowed.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: [
                    "/", // home / landing page
                    "/terms", // terms and conditions
                    "/privacy", // privacy policy
                ],
                disallow: [
                    "/app/", // authenticated dashboard
                    "/api/", // internal API endpoints
                    "/login", // auth pages have no SEO value
                    "/register",
                    "/reset-password",
                    "/verify-email",
                ],
            },
            /** Block AI/LLM scrapers that disregard meta tags */
            {
                userAgent: [
                    "GPTBot",
                    "ChatGPT-User",
                    "CCBot",
                    "anthropic-ai",
                    "Claude-Web",
                    "Omgilibot",
                    "FacebookBot",
                ],
                disallow: ["/"],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
