"use server";

import { api } from "../fetcher";
import type {
    BlogPost,
    BlogPostFormData,
    BlogComment,
    BlogCommentFormData,
} from "../../types";
import { revalidatePath } from "next/cache";

// ============================================================================
// Dashboard Blog Post Actions (Authenticated)
// ============================================================================

/**
 * Get list of blog posts
 */
export async function getBlogPostList(params?: {
    status?: "draft" | "published" | "archived";
    is_featured?: boolean;
    tags?: string;
    categories?: string;
    search?: string;
    ordering?: string;
}) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.is_featured !== undefined)
        queryParams.append("is_featured", params.is_featured.toString());
    if (params?.tags) queryParams.append("tags", params.tags);
    if (params?.categories) queryParams.append("categories", params.categories);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.ordering) queryParams.append("ordering", params.ordering);

    const url = `/api/dashboard/blog/posts/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await api.get<BlogPost[]>(url);
    return response;
}

/**
 * Get single blog post details
 */
export async function getBlogPostDetail(id: number) {
    const response = await api.get<BlogPost>(
        `/api/dashboard/blog/posts/${id}/`,
    );
    return response;
}

/**
 * Create new blog post
 */
export async function createBlogPost(data: BlogPostFormData) {
    const response = await api.post<BlogPost>(
        "/api/dashboard/blog/posts/",
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard/blog");
    }

    return response;
}

/**
 * Update existing blog post
 */
export async function updateBlogPost(id: number, data: BlogPostFormData) {
    const response = await api.patch<BlogPost>(
        `/api/dashboard/blog/posts/${id}/`,
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard/blog");
        revalidatePath(`/dashboard/blog/${id}`);
    }

    return response;
}

/**
 * Delete blog post
 */
export async function deleteBlogPost(id: number) {
    const response = await api.delete(`/api/dashboard/blog/posts/${id}/`);

    if (response.ok) {
        revalidatePath("/dashboard/blog");
    }

    return response;
}

/**
 * Publish a blog post
 */
export async function publishBlogPost(id: number) {
    const response = await api.post<BlogPost>(
        `/api/dashboard/blog/posts/${id}/publish/`,
        {},
    );

    if (response.ok) {
        revalidatePath("/dashboard/blog");
        revalidatePath(`/dashboard/blog/${id}`);
    }

    return response;
}

/**
 * Unpublish a blog post (set to draft)
 */
export async function unpublishBlogPost(id: number) {
    const response = await api.post<BlogPost>(
        `/api/dashboard/blog/posts/${id}/unpublish/`,
        {},
    );

    if (response.ok) {
        revalidatePath("/dashboard/blog");
        revalidatePath(`/dashboard/blog/${id}`);
    }

    return response;
}

/**
 * Archive a blog post
 */
export async function archiveBlogPost(id: number) {
    const response = await api.post<BlogPost>(
        `/api/dashboard/blog/posts/${id}/archive/`,
        {},
    );

    if (response.ok) {
        revalidatePath("/dashboard/blog");
        revalidatePath(`/dashboard/blog/${id}`);
    }

    return response;
}

/**
 * Toggle blog post featured status
 */
export async function toggleBlogPostFeatured(id: number, is_featured: boolean) {
    return updateBlogPost(id, { is_featured });
}

// ============================================================================
// Dashboard Blog Comment Actions (Authenticated)
// ============================================================================

/**
 * Get list of comments
 */
export async function getBlogCommentList(params?: { is_approved?: boolean }) {
    const queryParams = new URLSearchParams();
    if (params?.is_approved !== undefined)
        queryParams.append("is_approved", params.is_approved.toString());

    const url = `/api/dashboard/blog/comments/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await api.get<BlogComment[]>(url);
    return response;
}

/**
 * Get comments for a specific blog post
 */
export async function getBlogPostComments(
    postId: number,
    params?: {
        is_approved?: boolean;
    },
) {
    const queryParams = new URLSearchParams();
    if (params?.is_approved !== undefined)
        queryParams.append("is_approved", params.is_approved.toString());

    const url = `/api/dashboard/blog/posts/${postId}/comments/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await api.get<BlogComment[]>(url);
    return response;
}

/**
 * Approve a comment
 */
export async function approveBlogComment(id: number) {
    const response = await api.post<BlogComment>(
        `/api/dashboard/blog/comments/${id}/approve/`,
        {},
    );

    if (response.ok) {
        revalidatePath("/dashboard/blog/comments");
    }

    return response;
}

/**
 * Unapprove a comment
 */
export async function unapproveBlogComment(id: number) {
    const response = await api.post<BlogComment>(
        `/api/dashboard/blog/comments/${id}/unapprove/`,
        {},
    );

    if (response.ok) {
        revalidatePath("/dashboard/blog/comments");
    }

    return response;
}

/**
 * Delete a comment
 */
export async function deleteBlogComment(id: number) {
    const response = await api.delete(`/api/dashboard/blog/comments/${id}/`);

    if (response.ok) {
        revalidatePath("/dashboard/blog/comments");
    }

    return response;
}

// ============================================================================
// Public Blog Actions (No Authentication Required)
// ============================================================================

/**
 * Get list of published blog posts (public)
 */
export async function getPublicBlogPosts(params?: {
    tag?: string;
    category?: string;
    featured?: boolean;
}) {
    const queryParams = new URLSearchParams();
    if (params?.tag) queryParams.append("tag", params.tag);
    if (params?.category) queryParams.append("category", params.category);
    if (params?.featured !== undefined)
        queryParams.append("featured", params.featured.toString());

    const url = `/api/public/blog/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await api.get<BlogPost[]>(url);
    return response;
}

/**
 * Get single published blog post by slug (public)
 */
export async function getPublicBlogPost(slug: string) {
    const response = await api.get<BlogPost>(`/api/public/blog/${slug}/`);
    return response;
}

/**
 * Get approved comments for a blog post (public)
 */
export async function getPublicBlogPostComments(slug: string) {
    const response = await api.get<BlogComment[]>(
        `/api/public/blog/${slug}/comments/`,
    );
    return response;
}

/**
 * Submit a comment on a blog post (public)
 */
export async function submitBlogComment(
    slug: string,
    data: BlogCommentFormData,
) {
    const response = await api.post<{ message: string; comment: BlogComment }>(
        `/api/public/blog/${slug}/comments/`,
        data,
    );

    if (response.ok) {
        revalidatePath(`/blog/${slug}`);
    }

    return response;
}

/**
 * Get all tags from published blog posts (public)
 */
export async function getPublicBlogTags() {
    const response = await api.get<string[]>("/api/public/blog/tags/");
    return response;
}

/**
 * Get all categories from published blog posts (public)
 */
export async function getPublicBlogCategories() {
    const response = await api.get<string[]>("/api/public/blog/categories/");
    return response;
}
