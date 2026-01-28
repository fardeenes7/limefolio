import { auth } from "@/auth";
import type { APIResponse } from "../types";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * Authenticated fetcher - automatically includes Bearer token from session
 * @param endpoint - API endpoint (e.g., '/api/dashboard/site/')
 * @param options - Fetch options
 * @returns Serialized response with data, status, and original response
 */
export async function fetcher<T = any>(
    endpoint: string,
    options: RequestInit = {},
): Promise<APIResponse<T>> {
    const session = await auth();

    if (!session?.accessToken) {
        return {
            data: null,
            status: 401,
            ok: false,
        };
    }

    const url = `${API_URL}${endpoint}`;

    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${session.accessToken}`);
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
 * Convenience methods for common HTTP verbs
 */
export const api = {
    get: <T = any>(endpoint: string, options?: RequestInit) =>
        fetcher<T>(endpoint, { ...options, method: "GET" }),

    post: <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
        fetcher<T>(endpoint, {
            ...options,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        }),

    patch: <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
        fetcher<T>(endpoint, {
            ...options,
            method: "PATCH",
            body: body ? JSON.stringify(body) : undefined,
        }),

    put: <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
        fetcher<T>(endpoint, {
            ...options,
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        }),

    delete: <T = any>(endpoint: string, options?: RequestInit) =>
        fetcher<T>(endpoint, { ...options, method: "DELETE" }),
};
