"use server";

import { api } from "../fetcher";
import type { Project, ProjectFormData, ProjectMedia } from "../../types";
import { revalidatePath } from "next/cache";

/**
 * Get list of projects
 */
export async function getProjectList() {
    const response = await api.get<Project[]>("/api/dashboard/projects/");
    return response;
}

/**
 * Get single project details
 */
export async function getProjectDetail(id: number) {
    const response = await api.get<Project>(`/api/dashboard/projects/${id}/`);
    return response;
}

/**
 * Create new project
 */
export async function createProject(data: ProjectFormData) {
    const response = await api.post<Project>("/api/dashboard/projects/", data);

    if (response.ok) {
        revalidatePath("/dashboard/projects");
    }

    return response;
}

/**
 * Update existing project
 */
export async function updateProject(id: number, data: ProjectFormData) {
    const response = await api.patch<Project>(
        `/api/dashboard/projects/${id}/`,
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard/projects");
        revalidatePath(`/dashboard/projects/${id}`);
    }

    return response;
}

/**
 * Delete project
 */
export async function deleteProject(id: number) {
    const response = await api.delete(`/api/dashboard/projects/${id}/`);

    if (response.ok) {
        revalidatePath("/dashboard/projects");
    }

    return response;
}

/**
 * Toggle project featured status
 */
export async function toggleProjectFeatured(id: number, featured: boolean) {
    return updateProject(id, { featured });
}

/**
 * Update project status (draft/published)
 */
export async function updateProjectStatus(
    id: number,
    status: "draft" | "published",
) {
    return updateProject(id, { status });
}

// Project Media actions

/**
 * Get project media list
 */
export async function getProjectMediaList() {
    const response = await api.get<ProjectMedia[]>("/api/dashboard/media/");
    return response;
}

/**
 * Create project media
 */
export async function createProjectMedia(projectId: number, data: FormData) {
    data.append("project", projectId.toString());

    const response = await api.post<ProjectMedia>(
        "/api/dashboard/media/",
        data,
    );

    if (response.ok) {
        revalidatePath(`/dashboard/projects/${projectId}`);
    }

    return response;
}

/**
 * Delete project media
 */
export async function deleteProjectMedia(id: number, projectId: number) {
    const response = await api.delete(`/api/dashboard/media/${id}/`);

    if (response.ok) {
        revalidatePath(`/dashboard/projects/${projectId}`);
    }

    return response;
}
