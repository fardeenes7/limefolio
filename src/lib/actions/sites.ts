"use server";

import { api } from "../fetcher";
import type { Site, SiteFormData } from "../../types";
import type { UserPortfolioConfig } from "@/templates/types";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Get user's site details
 */
export async function getSiteDetail() {
    const response = await api.get<Site>("/api/dashboard/site/");
    return response;
}

/**
 * Update site details
 */
export async function updateSite(data: SiteFormData) {
    const response = await api.patch<Site>("/api/dashboard/site/", data);

    if (response.ok) {
        revalidatePath("/dashboard");
        revalidatePath("/", "layout");
        if (response.data?.subdomain) {
            // @ts-ignore - Next.js 16.1.6 typings issue expecting 2 arguments
            revalidateTag(`${response.data.subdomain}-site`);
            // @ts-ignore
            revalidateTag(`${response.data.subdomain}.limefolio.com-site`); // Assuming default domain scheme
        }
        if (response.data?.custom_domains) {
            response.data.custom_domains.forEach((cd: any) => {
                // @ts-ignore
                revalidateTag(`${cd.domain}-site`);
            });
        }
    }

    return response;
}

/**
 * Publish/unpublish site
 */
export async function toggleSitePublish(isPublished: boolean) {
    return updateSite({ is_published: isPublished });
}

/**
 * Get user's template config
 */
export async function getTemplateConfig() {
    const response = await api.get<any>("/api/dashboard/template-config/");
    return response;
}

/**
 * Update user's template config
 */
export async function updateTemplateConfig(data: any) {
    const response = await api.patch<any>("/api/dashboard/template-config/", data);

    if (response.ok) {
        revalidatePath("/dashboard");
        revalidatePath("/", "layout");
        
        // Fetch site to get subdomain to invalidate tag
        const siteResponse = await getSiteDetail();
        if (siteResponse.ok && siteResponse.data?.subdomain) {
            // @ts-ignore - Next.js 16.1.6 typings issue expecting 2 arguments
            revalidateTag(`${siteResponse.data.subdomain}-template-config`);
            // @ts-ignore
            revalidateTag(`${siteResponse.data.subdomain}.limefolio.com-template-config`);
        }
        if (siteResponse.ok && siteResponse.data?.custom_domains) {
            siteResponse.data.custom_domains.forEach((cd: any) => {
                // @ts-ignore
                revalidateTag(`${cd.domain}-template-config`);
            });
        }
    }

    return response;
}
