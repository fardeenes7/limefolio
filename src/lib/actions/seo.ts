"use server";

import { api } from "../fetcher";
import type { SiteSEO } from "../../types";
import type { SiteSEOFormData } from "../schemas";
import { revalidatePath } from "next/cache";

/**
 * Get user's site SEO details
 */
export async function getSiteSEO() {
    const response = await api.get<SiteSEO>("/api/dashboard/site/seo/");
    return response;
}

/**
 * Update user's site SEO details
 */
export async function updateSiteSEO(data: SiteSEOFormData) {
    const response = await api.patch<SiteSEO>("/api/dashboard/site/seo/", data);

    if (response.ok) {
        revalidatePath("/dashboard");
    }

    return response;
}
