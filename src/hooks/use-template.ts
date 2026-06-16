"use client";

/**
 * useTemplate Hook
 *
 * Returns all template components for the current theme.
 * Automatically falls back to default theme components if a component
 * is missing from the current theme.
 *
 * Usage:
 * const { HomeComponent, SingleProjectComponent } = useTemplate();
 * return <HomeComponent data={data} />;
 */

import { useTemplateContext } from "@/contexts/template-context";
import { Templates } from "@/templates";
import { ThemeTemplate } from "@/lib/template-types";
import { ComponentType } from "react";
import { PageProps, LayoutProps } from "@/lib/template-types";

/**
 * Template components with PascalCase names for easy destructuring
 */
export interface TemplateComponents {
    HomeComponent: ComponentType<PageProps>;
    LayoutComponent: ComponentType<LayoutProps>;
    SingleProjectComponent: ComponentType<PageProps>;
    // Add more as needed:
    // AboutComponent: ComponentType<PageProps>;
    // ContactComponent: ComponentType<PageProps>;
}

/**
 * Get a component from a theme with fallback to default
 */
function getComponentWithFallback(
    theme: string,
    componentKey: keyof ThemeTemplate,
): ComponentType<PageProps | LayoutProps> {
    const themeTemplate = Templates[theme];
    const defaultTemplate = Templates.default;

    // If theme exists and has the component, use it
    if (themeTemplate && themeTemplate[componentKey]) {
        return themeTemplate[componentKey] as ComponentType<PageProps>;
    }

    // Otherwise, fall back to default theme component
    if (defaultTemplate && defaultTemplate[componentKey]) {
        console.warn(
            `Component "${componentKey}" not found in theme "${theme}". ` +
                `Falling back to default theme.`,
        );
        return defaultTemplate[componentKey] as ComponentType<PageProps>;
    }

    // This should never happen if default theme is properly configured
    throw new Error(
        `Component "${componentKey}" not found in theme "${theme}" or default theme.`,
    );
}

/**
 * Build a complete template with fallbacks
 */
function buildTemplateWithFallbacks(theme: string): ThemeTemplate {
    const themeTemplate = Templates[theme];
    const defaultTemplate = Templates.default;

    // If theme doesn't exist, return default
    if (!themeTemplate) {
        console.warn(`Theme "${theme}" not found. Using default theme.`);
        return defaultTemplate;
    }

    // Build template with fallbacks for each component
    const template: ThemeTemplate = {
        name: themeTemplate.name,
        slug: themeTemplate.slug,
        layout: getComponentWithFallback(
            theme,
            "layout",
        ) as ComponentType<LayoutProps>,
        home: getComponentWithFallback(
            theme,
            "home",
        ) as ComponentType<PageProps>,
        "single-project": getComponentWithFallback(
            theme,
            "single-project",
        ) as ComponentType<PageProps>,
    };

    return template;
}

/**
 * Hook to get template components for the current theme
 * with automatic fallback to default theme for missing components.
 *
 * Returns components with PascalCase names for easy destructuring:
 * const { HomeComponent, SingleProjectComponent } = useTemplate();
 */
export function useTemplate(): TemplateComponents {
    const { theme } = useTemplateContext();
    const template = buildTemplateWithFallbacks(theme);

    return {
        HomeComponent: template.home,
        LayoutComponent: template.layout,
        SingleProjectComponent: template["single-project"],
        // Add more mappings as you add page types
    };
}

/**
 * Hook to get the raw template object (original behavior)
 * Use this if you need the original template structure
 */
export function useTemplateRaw(): ThemeTemplate {
    const { theme } = useTemplateContext();
    return buildTemplateWithFallbacks(theme);
}

/**
 * Hook to get a specific component from the current theme
 * with automatic fallback to default theme
 */
export function useTemplateComponent(
    componentKey: keyof ThemeTemplate,
): ComponentType<PageProps> {
    const { theme } = useTemplateContext();
    return getComponentWithFallback(theme, componentKey);
}
