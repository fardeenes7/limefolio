/**
 * Template Registry
 *
 * Central registry for all theme templates.
 *
 * To add a new theme:
 * 1. Create a new folder in /templates/ (e.g., /templates/modern/)
 * 2. Create page components (home.tsx, single-project.tsx, etc.)
 * 3. Create an index.ts that exports the ThemeTemplate object
 * 4. Import and register it here
 *
 * Usage:
 * import { Templates } from "@/templates";
 * const HomeComponent = Templates[theme].home;
 * <HomeComponent data={siteData} />
 */

import { TemplateRegistry } from "@/lib/template-types";
import { defaultTemplate } from "./default";
import { modernTemplate } from "./modern";
import { minimalTemplate } from "./minimal";
import { prismTemplate } from "./prism";

// Import additional themes here:
// import { minimalTemplate } from "./minimal";

/**
 * Template Registry
 * Maps theme IDs to their template components
 */
export const Templates: TemplateRegistry = {
    default: defaultTemplate,
    modern: modernTemplate,
    minimal: minimalTemplate,
    prism: prismTemplate,
};

/**
 * Get template for a theme
 * Falls back to default template if theme not found
 */
export function getTemplate(themeId: string | undefined | null) {
    if (!themeId || !Templates[themeId]) {
        if (themeId && !Templates[themeId]) {
            console.warn(
                `Template for theme "${themeId}" not found. Falling back to default.`,
            );
        }
        return Templates.default;
    }
    return Templates[themeId];
}

/**
 * Check if a template exists for a theme
 */
export function templateExists(themeId: string): boolean {
    return themeId in Templates;
}

/**
 * Get all available theme IDs
 */
export function getAvailableThemes(): string[] {
    return Object.keys(Templates);
}

/**
 * Get metadata for all available templates
 */
export function getTemplateMetadata() {
    return Object.entries(Templates).map(([slug, template]) => ({
        name: template.name,
        slug: template.slug,
        description: template.description,
    }));
}
