"use server";

import { api } from "../fetcher";
import type { SocialLink, SocialLinkFormData } from "../../types";
import { revalidatePath } from "next/cache";

/**
 * Get list of social links
 */
export async function getSocialLinkList() {
    const response = await api.get<SocialLink[]>(
        "/api/dashboard/social-links/",
    );
    return response;
}

/**
 * Get single social link details
 */
export async function getSocialLinkDetail(id: number) {
    const response = await api.get<SocialLink>(
        `/api/dashboard/social-links/${id}/`,
    );
    return response;
}

/**
 * Create new social link
 */
export async function createSocialLink(data: SocialLinkFormData) {
    const response = await api.post<SocialLink>(
        "/api/dashboard/social-links/",
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard");
    }

    return response;
}

/**
 * Update existing social link
 */
export async function updateSocialLink(id: number, data: SocialLinkFormData) {
    const response = await api.patch<SocialLink>(
        `/api/dashboard/social-links/${id}/`,
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard");
    }

    return response;
}

/**
 * Delete social link
 */
export async function deleteSocialLink(id: number) {
    const response = await api.delete(`/api/dashboard/social-links/${id}/`);

    if (response.ok) {
        revalidatePath("/dashboard");
    }

    return response;
}

/**
 * Reorder social links
 */
export async function reorderSocialLinks(
    links: { id: number; order: number }[],
) {
    const promises = links.map(({ id, order }) =>
        updateSocialLink(id, { order }),
    );

    const results = await Promise.all(promises);
    return results.every((r) => r.ok);
}
