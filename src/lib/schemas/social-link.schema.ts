import { z } from "zod";

/**
 * Social Link Schemas
 */

const socialPlatforms = [
    "github",
    "linkedin",
    "twitter",
    "facebook",
    "instagram",
    "youtube",
    "dribbble",
    "behance",
    "medium",
    "dev.to",
    "stack overflow",
    "codepen",
    "portfolio",
    "website",
    "email",
    "other",
] as const;

export const socialLinkSchema = z.object({
    id: z.number(),
    platform: z.enum(socialPlatforms),
    url: z.string().url(),
    username: z.string(),
    order: z.number().int().min(0),
});

export const socialLinkFormSchema = z.object({
    platform: z.enum(socialPlatforms).optional(),
    url: z.string().url("Invalid URL").min(1, "URL is required").optional(),
    username: z
        .string()
        .max(100, "Username must be at most 100 characters")
        .optional(),
    order: z.number().int().min(0).optional(),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;
export type SocialLinkFormData = z.infer<typeof socialLinkFormSchema>;
export type SocialPlatform = (typeof socialPlatforms)[number];
