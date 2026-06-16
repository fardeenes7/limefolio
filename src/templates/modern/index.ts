/**
 * Modern Theme Template
 *
 * Exports all page components for the modern theme
 */

import { ThemeTemplate } from "@/lib/template-types";
import ModernLayout from "./layout";
import ModernHome from "./home";
import ModernSingleProject from "./single-project";

export const modernTemplate: ThemeTemplate = {
    name: "Modern",
    slug: "modern",
    description:
        "Bold, vibrant design with a full-bleed gradient hero and strong typography.",
    tags: ["Bold", "Vibrant", "Gradient hero"],
    layout: ModernLayout,
    home: ModernHome,
    "single-project": ModernSingleProject,
};
