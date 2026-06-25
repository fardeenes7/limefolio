import { z } from "zod";

const pageMetaSchema = z.object({
    meta_title: z.string().max(60, "Must be at most 60 characters").optional(),
    meta_description: z.string().max(160, "Must be at most 160 characters").optional(),
    og_image: z.string().url("Must be a valid URL").nullable().optional(),
    robots: z.enum(["index,follow", "noindex,follow", "index,nofollow", "noindex,nofollow"]).optional(),
});

export const siteSEOFormSchema = z.object({
    default_meta_title: z.string().max(60, "Must be at most 60 characters").optional(),
    default_meta_description: z.string().max(160, "Must be at most 160 characters").optional(),
    og_image: z.string().url("Must be a valid URL").nullable().optional(),
    google_analytics_id: z.string().max(50, "Must be at most 50 characters").optional(),
    google_tag_manager_id: z.string().max(50, "Must be at most 50 characters").optional(),
    facebook_pixel_id: z.string().max(50, "Must be at most 50 characters").optional(),
    robots_default: z.enum(["index,follow", "noindex,follow", "index,nofollow", "noindex,nofollow"]).optional(),
    page_meta: z.record(z.string(), pageMetaSchema).optional(),
});

export type SiteSEOFormData = z.infer<typeof siteSEOFormSchema>;
