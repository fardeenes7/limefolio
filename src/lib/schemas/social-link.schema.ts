import { z } from "zod";

/**
 * Social Link Schemas
 */

const socialPlatforms = [
    "GitHub",
    "LinkedIn",
    "Twitter",
    "Facebook",
    "Instagram",
    "YouTube",
    "Dribbble",
    "Behance",
    "Medium",
    "Dev.to",
    "Stack Overflow",
    "CodePen",
    "Portfolio",
    "Website",
    "Email",
    "Other",
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
        .min(1, "Username is required")
        .max(100, "Username must be at most 100 characters")
        .optional(),
    order: z.number().int().min(0).optional(),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;
export type SocialLinkFormData = z.infer<typeof socialLinkFormSchema>;
export type SocialPlatform = (typeof socialPlatforms)[number];
