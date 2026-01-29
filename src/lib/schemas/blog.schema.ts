import { z } from "zod";

/**
 * Blog Schemas
 */

export const mediaSchema = z.object({
    id: z.number(),
    image: z.string().url().nullable(),
    video: z.string().url().nullable(),
    thumbnail: z.string().url().nullable(),
    alt: z.string(),
    caption: z.string(),
    order: z.number().int().min(0),
    is_featured: z.boolean(),
    media_type: z.enum(["image", "video"]),
    url: z.string().url(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const blogCommentSchema = z.object({
    id: z.number(),
    author_name: z.string().min(1).max(100),
    author_email: z.string().email(),
    author_website: z.string().url(),
    content: z.string().min(1),
    is_approved: z.boolean(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const blogPostSchema = z.object({
    id: z.number(),
    title: z.string().min(1).max(200),
    slug: z.string().min(1).max(100),
    excerpt: z.string(),
    content: z.string(),
    media: z.array(mediaSchema),
    thumbnail: z.string().url().nullable(),
    author: z.string(),
    author_name: z.string(),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    meta_description: z.string().max(160),
    meta_keywords: z.string().max(255),
    status: z.enum(["draft", "published", "archived"]),
    is_featured: z.boolean(),
    published_at: z.string().datetime().nullable(),
    reading_time: z.number().int().min(0),
    view_count: z.number().int().min(0),
    comments_count: z.number().int().min(0),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const blogPostFormSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(200, "Title must be at most 200 characters")
        .optional(),
    excerpt: z
        .string()
        .max(500, "Excerpt must be at most 500 characters")
        .optional(),
    content: z.string().min(1, "Content is required").optional(),
    author: z
        .string()
        .max(100, "Author name must be at most 100 characters")
        .optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    meta_description: z
        .string()
        .max(160, "Meta description must be at most 160 characters")
        .optional(),
    meta_keywords: z
        .string()
        .max(255, "Meta keywords must be at most 255 characters")
        .optional(),
    status: z.enum(["draft", "published", "archived"]).optional(),
    is_featured: z.boolean().optional(),
    published_at: z
        .string()
        .datetime("Invalid published date")
        .nullable()
        .optional(),
});

export const blogCommentFormSchema = z.object({
    author_name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be at most 100 characters"),
    author_email: z.string().email("Invalid email address"),
    author_website: z
        .string()
        .url("Invalid website URL")
        .or(z.literal(""))
        .optional()
        .transform((val) => (val === "" ? "" : val)),
    content: z
        .string()
        .min(1, "Comment is required")
        .min(10, "Comment must be at least 10 characters")
        .max(1000, "Comment must be at most 1000 characters"),
});

export const mediaFormSchema = z
    .object({
        image: z
            .instanceof(File)
            .refine(
                (file) => file.size <= 5000000,
                "Image must be less than 5MB",
            )
            .refine(
                (file) =>
                    [
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "image/webp",
                    ].includes(file.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported",
            )
            .nullable()
            .optional(),
        video: z
            .instanceof(File)
            .refine(
                (file) => file.size <= 50000000,
                "Video must be less than 50MB",
            )
            .refine(
                (file) => ["video/mp4", "video/webm"].includes(file.type),
                "Only .mp4 and .webm formats are supported",
            )
            .nullable()
            .optional(),
        thumbnail: z
            .instanceof(File)
            .refine(
                (file) => file.size <= 2000000,
                "Thumbnail must be less than 2MB",
            )
            .refine(
                (file) =>
                    [
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "image/webp",
                    ].includes(file.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported",
            )
            .nullable()
            .optional(),
        alt: z
            .string()
            .max(200, "Alt text must be at most 200 characters")
            .optional(),
        caption: z
            .string()
            .max(500, "Caption must be at most 500 characters")
            .optional(),
        order: z.number().int().min(0).optional(),
        is_featured: z.boolean().optional(),
    })
    .refine((data) => data.image || data.video, {
        message: "Either image or video must be provided",
        path: ["image"],
    });

export type Media = z.infer<typeof mediaSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type BlogComment = z.infer<typeof blogCommentSchema>;
export type BlogPostFormData = z.infer<typeof blogPostFormSchema>;
export type BlogCommentFormData = z.infer<typeof blogCommentFormSchema>;
export type MediaFormData = z.infer<typeof mediaFormSchema>;
