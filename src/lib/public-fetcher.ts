import type { APIResponse } from "../types";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * Public fetcher - no authentication required
 * Used for public site API calls
 * @param endpoint - API endpoint (e.g., '/api/site/')
 * @param options - Fetch options
 * @returns Serialized response with data, status, and original response
 */
export async function publicFetcher<T = any>(
    endpoint: string,
    options: RequestInit = {},
): Promise<APIResponse<T>> {
    const url = `${API_URL}${endpoint}`;

    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        let data: T | null = null;

        // Try to parse JSON response
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            try {
                data = await response.json();
            } catch (e) {
                console.error("Failed to parse JSON:", e);
            }
        }

        return {
            data,
            status: response.status,
            ok: response.ok,
        };
    } catch (error) {
        console.error("Fetch error:", error);
        return {
            data: null,
            status: 500,
            ok: false,
        };
    }
}

/**
 * Convenience methods for common HTTP verbs (public API)
 */
export const publicApi = {
    get: <T = any>(endpoint: string, options?: RequestInit) =>
        publicFetcher<T>(endpoint, { ...options, method: "GET" }),

    post: <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
        publicFetcher<T>(endpoint, {
            ...options,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        }),
};
