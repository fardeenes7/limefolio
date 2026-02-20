/**
 * Templates Metadata (client app)
 *
 * A lightweight, static copy of template metadata for the /templates gallery.
 * Kept separate from the public app's template registry (which imports React
 * components) to avoid coupling the two Next.js apps at build time.
 *
 * Keep in sync with /public/src/templates/index.ts when you add a new template.
 */

export interface TemplateMeta {
    name: string;
    slug: string;
    description: string;
    tags: string[];
}

export const TEMPLATES_META: TemplateMeta[] = [
    {
        name: "Default",
        slug: "default",
        description:
            "A modern card-based layout with gradient accents and a bold hero. The go-to starting point for most developers.",
        tags: ["Card-based", "Gradient", "Full-sections"],
    },
    {
        name: "Minimal",
        slug: "minimal",
        description:
            "Typography-first layout with ample whitespace and a refined reading experience. Lets your content speak for itself.",
        tags: ["Minimal", "Typography", "Content-first"],
    },
    {
        name: "Modern",
        slug: "modern",
        description:
            "Bold, vibrant design with a full-bleed gradient hero and strong typography. Makes a memorable first impression.",
        tags: ["Bold", "Vibrant", "Gradient hero"],
    },
    {
        name: "Prism",
        slug: "prism",
        description:
            "A dark, vibrant, Stripe-inspired template with explosive colours and glassmorphism.",
        tags: ["dark", "vibrant", "gradient", "glass", "stripe"],
    },
];
