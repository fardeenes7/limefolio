"use server";

import { api } from "../fetcher";
import type { CustomDomain } from "../../types";
import { revalidatePath } from "next/cache";

/**
 * Get all custom domains for the user's site
 */
export async function getCustomDomains() {
    return await api.get<CustomDomain[]>("/api/dashboard/custom-domains/");
}

/**
 * Add a new custom domain
 */
export async function createCustomDomain(data: { domain: string }) {
    const response = await api.post<CustomDomain>("/api/dashboard/custom-domains/", data);
    if (response.ok) {
        revalidatePath("/app/site/domains");
    }
    return response;
}

/**
 * Delete a custom domain
 */
export async function deleteCustomDomain(id: number) {
    const response = await api.delete(`/api/dashboard/custom-domains/${id}/`);
    if (response.ok) {
        revalidatePath("/app/site/domains");
    }
    return response;
}

/**
 * Verify a custom domain
 */
export async function verifyCustomDomain(id: number) {
    const response = await api.post<CustomDomain>(`/api/dashboard/custom-domains/${id}/verify/`, {});
    if (response.ok) {
        revalidatePath("/app/site/domains");
    }
    return response;
}
