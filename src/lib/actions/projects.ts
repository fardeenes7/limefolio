"use server";

import { api } from "../fetcher";
import { revalidatePath } from "next/cache";

export interface Project {
    id: number;
    title: string;
    slug: string;
    tagline: string;
    description: string;
    content: string;
    thumbnail: string | null;
    project_url: string | null | undefined;
    github_url: string | null;
    technologies: string[];
    featured: boolean;
    is_published: boolean;
    order: number;
    media: Array<{
        id: number;
        url: string;
        media_type: string;
        alt: string;
        caption: string;
    }>;
    start_date: string | null;
    end_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProjectListItem {
    id: number;
    title: string;
    slug: string;
    tagline: string;
    thumbnail: string | null;
    featured: boolean;
    is_published: boolean;
    media_count: number;
    created_at: string;
}

/**
 * Get all projects for the authenticated user
 */
export async function getProjectList() {
    const response = await api.get<ProjectListItem[]>(
        "/api/dashboard/projects/",
    );
    return response;
}

/**
 * Get a single project by ID
 */
export async function getProjectDetail(id: number) {
    const response = await api.get<Project>(`/api/dashboard/projects/${id}/`);
    return response;
}

/**
 * Create a new project
 */
export async function createProject(data: any) {
    const response = await api.post<Project>("/api/dashboard/projects/", data);

    if (response.ok) {
        revalidatePath("/app/projects");
    }

    return response;
}

/**
 * Update an existing project
 */
export async function updateProject(
    id: number,
    data: Partial<{
        title: string;
        tagline: string;
        description: string;
        content: string;
        project_url: string | null;
        github_url: string | null;
        technologies: string[];
        featured: boolean;
        is_published: boolean;
        order: number;
        media_ids: number[];
        start_date: Date | null;
        end_date: Date | null;
    }>,
) {
    const response = await api.patch<Project>(
        `/api/dashboard/projects/${id}/`,
        data,
    );

    if (response.ok) {
        revalidatePath("/app/projects");
        revalidatePath(`/app/projects/${id}`);
    }

    return response;
}

/**
 * Delete a project
 */
export async function deleteProject(id: number) {
    const response = await api.delete(`/api/dashboard/projects/${id}/`);

    if (response.ok) {
        revalidatePath("/app/projects");
    }

    return response;
}
