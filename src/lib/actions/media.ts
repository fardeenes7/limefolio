"use server";

import { api } from "../fetcher";
import type { Media } from "../../types";
import { revalidatePath } from "next/cache";

// ============================================================================
// Public Media Actions (No Authentication Required)
// ============================================================================

/**
 * Get list of media (public)
 */
export async function getPublicMediaList(params?: {
    content_type?: "project" | "blogpost";
    media_type?: "image" | "video";
    featured?: boolean;
}) {
    const queryParams = new URLSearchParams();
    if (params?.content_type)
        queryParams.append("content_type", params.content_type);
    if (params?.media_type) queryParams.append("media_type", params.media_type);
    if (params?.featured !== undefined)
        queryParams.append("featured", params.featured.toString());

    const url = `/api/public/media/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await api.get<Media[]>(url);
    return response;
}

/**
 * Get single media item by ID (public)
 */
export async function getPublicMediaDetail(id: number) {
    const response = await api.get<Media>(`/api/public/media/${id}/`);
    return response;
}

// ============================================================================
// Dashboard Media Actions (Authenticated)
// ============================================================================

/**
 * Create media item
 * Note: This should be used with FormData for file uploads
 */
export async function createMedia(
    data: FormData,
    contentType?: "project" | "blogpost",
    objectId?: number,
) {
    // Add content type and object ID if provided
    if (contentType) data.append("content_type", contentType);
    if (objectId) data.append("object_id", objectId.toString());

    const response = await api.post<Media>("/api/dashboard/media/", data);

    if (response.ok) {
        // Revalidate relevant paths
        if (contentType === "project" && objectId) {
            revalidatePath(`/dashboard/projects/${objectId}`);
        } else if (contentType === "blogpost" && objectId) {
            revalidatePath(`/dashboard/blog/${objectId}`);
        }
        revalidatePath("/dashboard/media");
    }

    return response;
}

/**
 * Update media item
 */
export async function updateMedia(id: number, data: FormData | Partial<Media>) {
    const response = await api.patch<Media>(
        `/api/dashboard/media/${id}/`,
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard/media");
    }

    return response;
}

/**
 * Delete media item
 */
export async function deleteMedia(
    id: number,
    contentType?: "project" | "blogpost",
    objectId?: number,
) {
    const response = await api.delete(`/api/dashboard/media/${id}/`);

    if (response.ok) {
        // Revalidate relevant paths
        if (contentType === "project" && objectId) {
            revalidatePath(`/dashboard/projects/${objectId}`);
        } else if (contentType === "blogpost" && objectId) {
            revalidatePath(`/dashboard/blog/${objectId}`);
        }
        revalidatePath("/dashboard/media");
    }

    return response;
}

/**
 * Toggle media featured status
 */
export async function toggleMediaFeatured(id: number, is_featured: boolean) {
    const formData = new FormData();
    formData.append("is_featured", is_featured.toString());
    return updateMedia(id, formData);
}

/**
 * Update media order
 */
export async function updateMediaOrder(id: number, order: number) {
    const formData = new FormData();
    formData.append("order", order.toString());
    return updateMedia(id, formData);
}

/**
 * Bulk upload media items
 */
export async function bulkUploadMedia(
    files: File[],
    contentType?: "project" | "blogpost",
    objectId?: number,
) {
    const uploadPromises = files.map((file, index) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("order", index.toString());
        formData.append("alt", file.name);

        if (contentType) formData.append("content_type", contentType);
        if (objectId) formData.append("object_id", objectId.toString());

        return createMedia(formData, contentType, objectId);
    });

    const results = await Promise.all(uploadPromises);
    return results;
}
