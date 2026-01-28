"use server";

import { api } from "../fetcher";
import type { Site, SiteFormData } from "../../types";
import { revalidatePath } from "next/cache";

/**
 * Get user's site details
 */
export async function getSiteDetail() {
    const response = await api.get<Site>("/api/dashboard/site/");
    return response;
}

/**
 * Update site details
 */
export async function updateSite(data: SiteFormData) {
    const response = await api.patch<Site>("/api/dashboard/site/", data);

    if (response.ok) {
        revalidatePath("/dashboard");
    }

    return response;
}

/**
 * Publish/unpublish site
 */
export async function toggleSitePublish(isPublished: boolean) {
    return updateSite({ is_published: isPublished });
}
