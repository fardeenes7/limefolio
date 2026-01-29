import { z } from "zod";

/**
 * API Key Schemas
 */

export const apiKeySchema = z.object({
    id: z.number(),
    name: z.string().min(1).max(100),
    key: z.string(),
    secret: z.string().optional(), // Only returned on creation
    is_active: z.boolean(),
    read_only: z.boolean(),
    rate_limit: z.number().int().min(0),
    request_count: z.number().int().min(0),
    last_used_at: z.string().datetime().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const apiKeyFormSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be at most 100 characters")
        .optional(),
    is_active: z.boolean().optional(),
    read_only: z.boolean().optional(),
    rate_limit: z
        .number()
        .int("Rate limit must be a whole number")
        .min(0, "Rate limit must be at least 0")
        .max(10000, "Rate limit must be at most 10,000")
        .optional(),
});

export type APIKey = z.infer<typeof apiKeySchema>;
export type APIKeyFormData = z.infer<typeof apiKeyFormSchema>;
