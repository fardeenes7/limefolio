"use server";

import { api } from "../fetcher";
import type {
    DashboardStats,
    AnalyticsOverview,
    AnalyticsBreakdown,
    TrackVisitPayload,
} from "../../types";

// ---------------------------------------------------------------------------
// Dashboard Stats
// ---------------------------------------------------------------------------

/**
 * Get aggregated KPIs, recent content, and site health for the dashboard.
 * Calls GET /api/analytics/stats/
 */
export async function getDashboardStats() {
    const response = await api.get<DashboardStats>("/api/analytics/stats/");
    return response;
}

// ---------------------------------------------------------------------------
// Analytics Overview (time-series)
// ---------------------------------------------------------------------------

/**
 * Get daily visit time-series for the analytics page chart.
 * Calls GET /api/analytics/overview/?days=<days>
 *
 * @param days - Number of past days to include (1–365, default 30)
 */
export async function getAnalyticsOverview(days: number = 30) {
    const response = await api.get<AnalyticsOverview>(
        `/api/analytics/overview/?days=${days}`,
    );
    return response;
}

// ---------------------------------------------------------------------------
// Analytics Breakdown (top pages / referrers / devices / countries)
// ---------------------------------------------------------------------------

/**
 * Get traffic source, page, device, and geographic breakdowns.
 * Calls GET /api/analytics/breakdown/?days=<days>
 *
 * @param days - Number of past days to include (1–365, default 30)
 */
export async function getAnalyticsBreakdown(days: number = 30) {
    const response = await api.get<AnalyticsBreakdown>(
        `/api/analytics/breakdown/?days=${days}`,
    );
    return response;
}

// ---------------------------------------------------------------------------
// Track Visit  (public — no bearer token needed)
// This is intended to be called from the PUBLIC portfolio frontend,
// not from the dashboard. Included here for completeness.
// ---------------------------------------------------------------------------

/**
 * Record a page view on the portfolio site.
 * Calls POST /api/analytics/track/
 *
 * @param siteUuid - The UUID of the portfolio site (sent as X-Site-ID header)
 * @param payload  - Visit data: path, session_id, referrer, device, browser
 */
export async function trackPortfolioVisit(
    siteUuid: string,
    payload: TrackVisitPayload,
) {
    const API_URL = process.env.API_URL || "http://localhost:8000";

    try {
        const response = await fetch(`${API_URL}/api/analytics/track/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Site-ID": siteUuid,
            },
            body: JSON.stringify(payload),
        });

        return { ok: response.ok, status: response.status };
    } catch {
        return { ok: false, status: 500 };
    }
}
