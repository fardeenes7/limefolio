"use server";

import { api } from "../fetcher";
import type { Experience, ExperienceFormData } from "../../types";
import { revalidatePath } from "next/cache";

/**
 * Get list of experiences
 */
export async function getExperienceList() {
    const response = await api.get<Experience[]>("/api/dashboard/experiences/");
    return response;
}

/**
 * Get single experience details
 */
export async function getExperienceDetail(id: number) {
    const response = await api.get<Experience>(
        `/api/dashboard/experiences/${id}/`,
    );
    return response;
}

/**
 * Create new experience
 */
export async function createExperience(data: ExperienceFormData) {
    const response = await api.post<Experience>(
        "/api/dashboard/experiences/",
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard/experiences");
    }

    return response;
}

/**
 * Update existing experience
 */
export async function updateExperience(id: number, data: ExperienceFormData) {
    const response = await api.patch<Experience>(
        `/api/dashboard/experiences/${id}/`,
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard/experiences");
        revalidatePath(`/dashboard/experiences/${id}`);
    }

    return response;
}

/**
 * Delete experience
 */
export async function deleteExperience(id: number) {
    const response = await api.delete(`/api/dashboard/experiences/${id}/`);

    if (response.ok) {
        revalidatePath("/dashboard/experiences");
    }

    return response;
}

/**
 * Toggle experience published status
 */
export async function toggleExperiencePublished(
    id: number,
    isPublished: boolean,
) {
    return updateExperience(id, { is_published: isPublished });
}

/**
 * Mark experience as current
 */
export async function setExperienceCurrent(id: number, isCurrent: boolean) {
    return updateExperience(id, { is_current: isCurrent });
}
