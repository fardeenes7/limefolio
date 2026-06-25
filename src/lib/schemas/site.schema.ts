import { z } from "zod";

/**
 * Site Schemas
 */

export const siteSchema = z.object({
    id: z.number(),
    uuid: z.string().uuid(),
    subdomain: z
        .string()
        .min(3)
        .max(63)
        .regex(/^[a-z0-9-]+$/),
    title: z.string().min(1).max(100),
    tagline: z.string().max(200),
    description: z.string(),
    logo: z.string().url().nullable(),
    favicon: z.string().url().nullable(),
    theme: z.string(),
    template: z.string(),
    font: z.string(),
    is_published: z.boolean(),
    is_active: z.boolean(),
    available_for_hire: z.boolean(),
    custom_domains: z.array(z.lazy(() => customDomainSchema)).optional(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const customDomainSchema = z.object({
    id: z.number(),
    domain: z.string().regex(/^[a-z0-9-]+\.[a-z]{2,}$/),
    status: z.enum(["pending", "verified", "failed"]),
    verified_at: z.string().datetime().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const siteFormSchema = z.object({
    subdomain: z
        .string()
        .min(3, "Subdomain must be at least 3 characters")
        .max(63, "Subdomain must be at most 63 characters")
        .regex(
            /^[a-z0-9-]+$/,
            "Subdomain can only contain lowercase letters, numbers, and hyphens",
        )
        .optional(),
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be at most 100 characters")
        .optional(),
    tagline: z
        .string()
        .max(200, "Tagline must be at most 200 characters")
        .optional(),
    description: z.string().optional(),
    logo: z.string().url("Invalid logo URL").nullable().optional(),
    favicon: z.string().url("Invalid favicon URL").nullable().optional(),
    theme: z.string().optional(),
    template: z.string().optional(),
    font: z.string().optional(),
    is_published: z.boolean().optional(),
    is_active: z.boolean().optional(),
    available_for_hire: z.boolean().optional(),
});

export type Site = z.infer<typeof siteSchema>;
export type CustomDomain = z.infer<typeof customDomainSchema>;
export type SiteFormData = z.infer<typeof siteFormSchema>;
