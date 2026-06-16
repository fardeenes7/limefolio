/**
 * Default Theme Template
 *
 * Exports all page components for the default theme
 */

import { ThemeTemplate } from "@/lib/template-types";
import DefaultLayout from "./layout";
import DefaultHome from "./home";
import DefaultSingleProject from "./single-project";

export const defaultTemplate: ThemeTemplate = {
    name: "Default",
    slug: "default",
    description:
        "A modern card-based layout with gradient accents and a bold hero.",
    tags: ["Card-based", "Gradient", "Full-sections"],
    layout: DefaultLayout,
    home: DefaultHome,
    "single-project": DefaultSingleProject,
};
