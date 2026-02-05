"use server";

import { api } from "../fetcher";
import type { Skill, SkillFormData } from "../../types";
import { revalidatePath } from "next/cache";

/**
 * Get list of skills
 */
export async function getSkillList() {
    const response = await api.get<Skill[]>("/api/dashboard/skills/");
    return response;
}

/**
 * Get single skill details
 */
export async function getSkillDetail(id: number) {
    const response = await api.get<Skill>(`/api/dashboard/skills/${id}/`);
    return response;
}

/**
 * Create new skill
 */
export async function createSkill(data: SkillFormData) {
    const response = await api.post<Skill>("/api/dashboard/skills/", data);

    if (response.ok) {
        revalidatePath("/dashboard/skills");
    }

    return response;
}

/**
 * Update existing skill
 */
export async function updateSkill(id: number, data: SkillFormData) {
    const response = await api.patch<Skill>(
        `/api/dashboard/skills/${id}/`,
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard/skills");
        revalidatePath(`/dashboard/skills/${id}`);
    }

    return response;
}

/**
 * Delete skill
 */
export async function deleteSkill(id: number) {
    const response = await api.delete(`/api/dashboard/skills/${id}/`);

    if (response.ok) {
        revalidatePath("/dashboard/skills");
    }

    return response;
}

/**
 * Toggle skill published status
 */
export async function toggleSkillPublished(id: number, isPublished: boolean) {
    return updateSkill(id, { is_published: isPublished });
}

/**
 * Toggle skill featured status
 */
export async function toggleSkillFeatured(id: number, isFeatured: boolean) {
    return updateSkill(id, { is_featured: isFeatured });
}

/**
 * Bulk update skill order
 */
export async function updateSkillsOrder(
    skills: { id: number; order: number }[],
) {
    const promises = skills.map(({ id, order }) => updateSkill(id, { order }));

    const results = await Promise.all(promises);
    return results.every((r) => r.ok);
}
