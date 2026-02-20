import { z } from "zod";

/**
 * Project Schemas
 */

export const projectMediaSchema = z.object({
    id: z.number(),
    image: z.string().url(),
    thumbnail: z.string().url(),
    caption: z.string(),
    order: z.number().int().min(0),
    media_type: z.enum(["image", "video"]),
});

export const projectSchema = z.object({
    id: z.number(),
    title: z.string().min(1).max(200),
    slug: z.string().min(1).max(100),
    tagline: z.string().max(500),
    description: z.string(),
    thumbnail: z.string().url().nullable(),
    demo_url: z.string().url(),
    github_url: z.string().url(),
    youtube_url: z.string().url(),
    technologies: z.array(z.string()),
    featured: z.boolean(),
    status: z.enum(["draft", "published"]),
    order: z.number().int().min(0),
    media: z.array(projectMediaSchema).optional(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const projectFormSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(200, "Title must be at most 200 characters")
        .optional(),
    tagline: z
        .string()
        .max(500, "Tagline must be at most 500 characters")
        .optional(),
    description: z.string().min(1, "Description is required").optional(),
    demo_url: z.string().url("Invalid demo URL").or(z.literal("")).optional(),
    github_url: z
        .string()
        .url("Invalid GitHub URL")
        .or(z.literal(""))
        .optional(),
    youtube_url: z
        .string()
        .url("Invalid YouTube URL")
        .or(z.literal(""))
        .optional(),
    technologies: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    status: z.enum(["draft", "published"]).optional(),
    order: z.number().int().min(0).optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectMedia = z.infer<typeof projectMediaSchema>;
export type ProjectFormData = z.infer<typeof projectFormSchema>;
