import { z } from "zod";

/**
 * Experience Schemas
 */

export const experienceSchema = z.object({
    id: z.number(),
    company: z.string().min(1).max(200),
    position: z.string().min(1).max(200),
    description: z.string(),
    type: z.enum(["Full Time", "Part Time", "Internship", "Freelance"]),
    company_logo: z.string().url().nullable(),
    url: z.string().url().nullable(),
    location: z.string().max(200).nullable(),
    start_date: z.string().date(),
    end_date: z.string().date().nullable(),
    is_current: z.boolean(),
    order: z.number().int().min(0),
    is_published: z.boolean(),
});

export const experienceFormSchema = z
    .object({
        company: z
            .string()
            .min(1, "Company name is required")
            .max(200, "Company name must be at most 200 characters")
            .optional(),
        position: z
            .string()
            .min(1, "Position is required")
            .max(200, "Position must be at most 200 characters")
            .optional(),
        description: z.string().min(1, "Description is required").optional(),
        type: z
            .enum(["Full Time", "Part Time", "Internship", "Freelance"])
            .optional(),
        company_logo: z.url("Invalid company logo URL").nullable().optional(),
        url: z.url("Invalid URL").or(z.literal("")).nullable().optional(),
        location: z
            .string()
            .max(200, "Location must be at most 200 characters")
            .nullable()
            .optional(),
        start_date: z.date("Invalid start date").optional(),
        end_date: z.date("Invalid end date").optional(),
        is_current: z.boolean().optional(),
        order: z.number().int().min(0).optional(),
        is_published: z.boolean().optional(),
    })
    .refine(
        (data) => {
            if (data.is_current) {
                return !data.end_date;
            }
            return true;
        },
        {
            message: "End date should not be set for current positions",
            path: ["end_date"],
        },
    )
    .refine(
        (data) => {
            if (data.start_date && data.end_date) {
                return new Date(data.start_date) <= new Date(data.end_date);
            }
            return true;
        },
        {
            message: "End date must be after start date",
            path: ["end_date"],
        },
    );

export type Experience = z.infer<typeof experienceSchema>;
export type ExperienceFormData = z.infer<typeof experienceFormSchema>;
