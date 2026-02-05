import { z } from "zod";

/**
 * Skill Schemas
 */

export const skillSchema = z.object({
    id: z.number(),
    name: z.string().min(1).max(100),
    category: z.enum([
        "programming",
        "framework",
        "database",
        "devops",
        "design",
        "soft_skill",
        "language",
        "tool",
        "other",
    ]),
    category_display: z.string(),
    proficiency: z.enum(["beginner", "intermediate", "advanced", "expert"]),
    proficiency_display: z.string(),
    description: z.string(),
    years_of_experience: z.number().int().min(0).nullable(),
    icon_url: z.string().url().nullable(),
    order: z.number().int().min(0),
    is_featured: z.boolean(),
    is_published: z.boolean(),
});

export const skillFormSchema = z.object({
    name: z
        .string()
        .min(1, "Skill name is required")
        .max(100, "Skill name must be at most 100 characters")
        .optional(),
    category: z
        .enum(
            [
                "programming",
                "framework",
                "database",
                "devops",
                "design",
                "soft_skill",
                "language",
                "tool",
                "other",
            ],
            {
                message: "Please select a valid category",
            },
        )
        .optional(),
    proficiency: z
        .enum(["beginner", "intermediate", "advanced", "expert"], {
            message: "Please select a valid proficiency level",
        })
        .optional(),
    description: z.string().optional(),
    years_of_experience: z
        .number()
        .int("Years must be a whole number")
        .min(0, "Years cannot be negative")
        .max(100, "Years must be realistic")
        .nullable()
        .optional(),
    icon_url: z
        .string()
        .url("Invalid icon URL")
        .or(z.literal(""))
        .nullable()
        .optional(),
    order: z.number().int().min(0).optional(),
    is_featured: z.boolean().optional(),
    is_published: z.boolean().optional(),
});

export type Skill = z.infer<typeof skillSchema>;
export type SkillFormData = z.infer<typeof skillFormSchema>;

// Category labels for UI
export const SKILL_CATEGORIES = {
    programming: "Programming",
    framework: "Framework/Library",
    database: "Database",
    devops: "DevOps/Cloud",
    design: "Design",
    soft_skill: "Soft Skill",
    language: "Language",
    tool: "Tool",
    other: "Other",
} as const;

// Proficiency labels for UI
export const SKILL_PROFICIENCY = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
} as const;

// Proficiency colors for UI
export const PROFICIENCY_COLORS = {
    beginner: "bg-blue-500",
    intermediate: "bg-green-500",
    advanced: "bg-orange-500",
    expert: "bg-purple-500",
} as const;
