"use server";

import { api } from "../fetcher";
import type { APIKey, APIKeyFormData } from "../../types";
import { revalidatePath } from "next/cache";

/**
 * Get list of API keys
 */
export async function getAPIKeyList() {
    const response = await api.get<APIKey[]>("/api/dashboard/api-keys/");
    return response;
}

/**
 * Get single API key details
 */
export async function getAPIKeyDetail(id: number) {
    const response = await api.get<APIKey>(`/api/dashboard/api-keys/${id}/`);
    return response;
}

/**
 * Create new API key
 */
export async function createAPIKey(data: APIKeyFormData) {
    const response = await api.post<APIKey>("/api/dashboard/api-keys/", data);

    if (response.ok) {
        revalidatePath("/dashboard/api-keys");
    }

    return response;
}

/**
 * Update existing API key
 */
export async function updateAPIKey(id: number, data: APIKeyFormData) {
    const response = await api.patch<APIKey>(
        `/api/dashboard/api-keys/${id}/`,
        data,
    );

    if (response.ok) {
        revalidatePath("/dashboard/api-keys");
    }

    return response;
}

/**
 * Delete API key
 */
export async function deleteAPIKey(id: number) {
    const response = await api.delete(`/api/dashboard/api-keys/${id}/`);

    if (response.ok) {
        revalidatePath("/dashboard/api-keys");
    }

    return response;
}

/**
 * Regenerate API key
 */
export async function regenerateAPIKey(id: number) {
    const response = await api.post<{ key: string }>(
        `/api/dashboard/api-keys/${id}/regenerate/`,
    );

    if (response.ok) {
        revalidatePath("/dashboard/api-keys");
    }

    return response;
}

/**
 * Reset API secret
 */
export async function resetAPISecret(id: number) {
    const response = await api.post<{ secret: string }>(
        `/api/dashboard/api-keys/${id}/reset_secret/`,
    );

    if (response.ok) {
        revalidatePath("/dashboard/api-keys");
    }

    return response;
}

/**
 * Toggle API key active status
 */
export async function toggleAPIKeyActive(id: number, isActive: boolean) {
    return updateAPIKey(id, { is_active: isActive });
}
