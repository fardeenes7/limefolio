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
 * Get presigned URL for uploading media directly to S3
 */
export async function getPresignedURL(params: {
    filename: string;
    content_type: string;
    file_size: number;
}) {
    const queryParams = new URLSearchParams({
        filename: params.filename,
        content_type: params.content_type,
        file_size: params.file_size.toString(),
    });

    const response = await api.get<{
        upload_url: string;
        file_key: string;
        public_url: string;
        content_type: string;
    }>(`/api/dashboard/media/presigned-url/?${queryParams}`);

    return response;
}

/**
 * Get all media for the authenticated user
 */
export async function getMediaList() {
    const response = await api.get<Media[]>("/api/dashboard/media/");
    return response;
}

/**
 * Upload media file through Django backend (proxy upload)
 * Use this instead of presigned URL to avoid CORS issues
 */
export async function uploadMediaFile(
    file: File | FormData,
    alt?: string,
    caption?: string,
) {
    const formData =
        file instanceof FormData
            ? file
            : (() => {
                  const fd = new FormData();
                  fd.append("file", file);
                  if (alt) fd.append("alt", alt);
                  if (caption) fd.append("caption", caption);
                  return fd;
              })();

    const response = await api.post<Media>(
        "/api/dashboard/media/upload/",
        formData,
    );

    if (response.ok) {
        revalidatePath("/app/media");
    }

    return response;
}

/**
 * Confirm a presigned-URL upload by creating the media record.
 * Sends the video/image public URL as a plain form field and optionally
 * includes the thumbnail as a real file upload — all in one multipart POST.
 */
export async function confirmPresignedUpload(data: {
    video?: string;
    image?: string;
    thumbnailFile?: File;
    alt?: string;
    caption?: string;
}) {
    const formData = new FormData();
    if (data.video) formData.append("video", data.video);
    if (data.image) formData.append("image", data.image);
    if (data.alt) formData.append("alt", data.alt);
    if (data.caption) formData.append("caption", data.caption);
    if (data.thumbnailFile)
        formData.append(
            "thumbnail",
            data.thumbnailFile,
            data.thumbnailFile.name,
        );

    const response = await api.post<Media>("/api/dashboard/media/", formData);

    if (response.ok) {
        revalidatePath("/app/media");
    }

    return response;
}

/**
 * Create media record after direct S3 upload
 */
export async function createMediaRecord(data: {
    image?: string;
    video?: string;
    thumbnail?: string;
    alt?: string;
    caption?: string;
    order?: number;
    is_featured?: boolean;
}) {
    const response = await api.post<Media>("/api/dashboard/media/", data);

    if (response.ok) {
        revalidatePath("/app/media");
    }

    return response;
}

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
 * Update the thumbnail of an existing media item by uploading the file
 * directly to the PATCH endpoint as multipart/form-data.
 * No presigned URL needed — thumbnails are small enough for a direct upload.
 */
export async function updateMediaThumbnail(
    id: number,
    thumbnailFile: File,
): Promise<{ ok: boolean; thumbnailUrl?: string; error?: string }> {
    const formData = new FormData();
    formData.append("thumbnail", thumbnailFile);

    const response = await api.patch<Media>(
        `/api/dashboard/media/${id}/`,
        formData,
    );

    if (!response.ok) {
        return { ok: false, error: "Failed to update thumbnail" };
    }

    revalidatePath("/app/media");
    const thumbnailUrl = response.data?.thumbnail ?? undefined;
    return { ok: true, thumbnailUrl };
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
