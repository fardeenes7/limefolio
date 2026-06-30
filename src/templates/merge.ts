/**
 * @file src/templates/merge.ts
 *
 * SSR-only merge utility for the Limefolio templating engine.
 *
 * ## Purpose
 * This module implements the three-layer merge that produces the final, fully
 * resolved portfolio configuration at request time. It is the bridge between:
 *   - The static template definition (from `registry.ts`)
 *   - The user's sparse delta config (fetched from the Django API)
 *
 * The output is a `ResolvedPortfolioConfig` that is passed directly to
 * `layout.tsx` and `page.tsx` components. It must NEVER be sent back to the
 * Django API or stored in any persistent store.
 *
 * ## Input sources
 * 1. `template: Template` — the static template definition from `TemplateRegistry`.
 *    Contains the canonical section lists, allowed variants, and default variants.
 * 2. `userConfig: Partial<UserPortfolioConfig>` — the sparse delta config from
 *    `PortfolioTemplateConfig` on the Django side. May be empty for new users.
 *
 * ## Output
 * `ResolvedPortfolioConfig` — every section in final display order, every input
 * with its merged value, every variant resolved. Ready to pass to renderers.
 *
 * ## Global components
 * Global layout components declared in `template.layout` (e.g. header, footer) are automatically included in every page's resolved section list.
 * Their config is sourced from `template.layout`, not from page section declarations.
 * The merge function injects them using the following convention:
 *   - Header-like globals (defined first in layout) are prepended to page sections.
 *   - Footer-like globals (defined last in layout) are appended to page sections.
 * A component is considered "header-like" if it appears before the first non-global
 * component in `template.layout`; all others are "footer-like".
 *
 * ## Priority order for input resolution (lowest → highest)
 * 1. `ComponentSchema.inputs[n].default`
 * 2. `SectionInstance.inputDefaults[n]`
 * 3. `userConfig.overrides[context][instanceId].inputs[n]` (sparse — only set keys)
 */

import type {
    Template,
    SectionInstance,
    UserPortfolioConfig,
    ResolvedPortfolioConfig,
    ResolvedSection,
    ResolvedPage,
    SectionOverride,
} from './types';
import { ComponentRegistry } from './components';

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Produces a fully resolved portfolio configuration by merging the static template
 * definition with the user's sparse delta config.
 *
 * The result is SSR-only and must never be persisted or sent to the API.
 * Pass `emptyUserConfig(...)` for new users who have no saved config — the result
 * will be the full template defaults.
 *
 * @param template   - The static template definition from TemplateRegistry.
 * @param userConfig - The user's sparse delta config (may be partial / empty).
 * @returns          - A fully resolved config ready to pass to layout and page renderers.
 */
export function resolvePortfolioConfig(
    template: Template,
    userConfig: Partial<UserPortfolioConfig>,
): ResolvedPortfolioConfig {
    const themeKey = userConfig.themeKey ?? template.defaultTheme;
    const fontKey = userConfig.fontKey ?? template.defaultFont;
    const themeOverrides = userConfig.themeOverrides ?? {};

    // Resolve layout sections (rendered by layout.tsx)
    const resolvedLayout = resolveContext(
        template.layout,
        userConfig.overrides?.layout ?? {},
        userConfig.removals?.layout ?? [],
        userConfig.additions?.layout ?? [],
        userConfig.ordering?.layout,
    );

    // Resolve each page's sections
    const resolvedPages: ResolvedPage[] = template.pages.map((page) => {
        const pageOverrides = userConfig.overrides?.pages?.[page.key] ?? {};
        const pageRemovals = userConfig.removals?.pages?.[page.key] ?? [];
        const pageAdditions = userConfig.additions?.pages?.[page.key] ?? [];
        const pageOrdering = userConfig.ordering?.pages?.[page.key];

        // Resolve the page's own sections
        const ownSections = resolveContext(
            page.sections,
            pageOverrides,
            pageRemovals,
            pageAdditions,
            pageOrdering,
        );

        return {
            key: page.key,
            label: page.label,
            sections: ownSections,
        };
    });

    return {
        templateKey: userConfig.templateKey ?? template.key,
        themeKey,
        fontKey,
        layoutWidth: userConfig.layoutWidth ?? template.defaultLayoutWidth ?? 'default',
        themeOverrides,
        layout: resolvedLayout,
        pages: resolvedPages,
    };
}

/**
 * Returns a blank `UserPortfolioConfig` with all four delta fields empty.
 *
 * Use this as the starting point for a new user who has no saved config.
 * Passing this to `resolvePortfolioConfig` returns the full template defaults —
 * exactly what the template author declared in the registry.
 *
 * @param templateKey     - The template key (e.g. "default").
 * @param themeKey        - The theme key to use (e.g. "default").
 * @param fontKey         - The font key to use (e.g. "inter").
 * @param templateVersion - The semver version of the template (e.g. "1.0.0").
 */
export function emptyUserConfig(
    templateKey: string,
    themeKey: string,
    fontKey: string,
    templateVersion: string,
    layoutWidth: string = 'default',
): UserPortfolioConfig {
    return {
        templateKey,
        themeKey,
        fontKey,
        layoutWidth,
        templateVersion,
        themeOverrides: {},
        overrides: { layout: {}, pages: {} },
        additions: { layout: [], pages: {} },
        removals: { layout: [], pages: {} },
        ordering: {},
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Core merge algorithm for a single context (layout or a specific page).
 *
 * Steps:
 *   1. Apply user ordering (known sections first; unknowns appended in template order).
 *   2. Apply removals.
 *   3. Append user additions.
 *   4. Resolve inputs and variant for each section.
 *
 * @param templateSections - Base ordered section list from the template definition.
 * @param overrides        - Sparse user overrides keyed by instanceId.
 * @param removals         - instanceIds the user has removed.
 * @param additions        - User-added SectionInstances (for repeatable components).
 * @param ordering         - Optional user-preferred instanceId ordering.
 */
function resolveContext(
    templateSections: SectionInstance[],
    overrides: Record<string, SectionOverride>,
    removals: string[],
    additions: SectionInstance[],
    ordering?: string[],
): ResolvedSection[] {
    // Step 1 — Apply ordering
    let ordered: SectionInstance[];
    if (ordering && ordering.length > 0) {
        ordered = applyOrdering(templateSections, ordering);
    } else {
        ordered = [...templateSections];
    }

    // Step 2 — Apply removals
    const removalSet = new Set(removals);
    const afterRemovals = ordered.filter(
        (s) => !removalSet.has(s.instanceId),
    );

    // Step 3 — Append user additions (for repeatable components)
    const withAdditions = [...afterRemovals, ...additions];

    // Step 4 — Resolve inputs and variant for each section
    return withAdditions.map((section) =>
        resolveSection(section, overrides[section.instanceId] ?? {}),
    );
}

/**
 * Reorders `templateSections` to match the user's `ordering` array.
 *
 * Sections present in `ordering` are placed first (in that order).
 * Sections NOT in `ordering` (e.g. newly added by a template update) are
 * appended at the end in their original template order.
 *
 * @param templateSections - The template's canonical section list.
 * @param ordering         - The user's preferred instanceId order.
 */
function applyOrdering(
    templateSections: SectionInstance[],
    ordering: string[],
): SectionInstance[] {
    const sectionMap = new Map<string, SectionInstance>(
        templateSections.map((s) => [s.instanceId, s]),
    );
    const orderingSet = new Set(ordering);

    // Place user-ordered sections first
    const ordered: SectionInstance[] = [];
    for (const instanceId of ordering) {
        const section = sectionMap.get(instanceId);
        if (section) {
            ordered.push(section);
        }
        // instanceIds in ordering that no longer exist in the template are silently skipped
    }

    // Append any template sections not present in the user's ordering
    // (handles new sections added by template updates)
    for (const section of templateSections) {
        if (!orderingSet.has(section.instanceId)) {
            ordered.push(section);
        }
    }

    return ordered;
}

/**
 * Resolves a single section's variant and inputs by merging three priority layers.
 *
 * Priority (lowest → highest):
 *   1. ComponentSchema.inputs[n].default
 *   2. SectionInstance.inputDefaults[n]
 *   3. userOverride.inputs[n] (sparse — only keys explicitly set by the user)
 *
 * Variant: userOverride.variant ?? sectionInstance.defaultVariant
 *
 * @param section      - The SectionInstance from the template or user additions.
 * @param userOverride - The user's sparse override for this instanceId.
 */
function resolveSection(
    section: SectionInstance,
    userOverride: SectionOverride,
): ResolvedSection {
    const schema = ComponentRegistry[section.componentKey];
    if (!schema) {
        // Unknown component key — return section as-is with empty resolved fields
        console.warn(
            `[merge] Unknown componentKey "${section.componentKey}" for instanceId ` +
            `"${section.instanceId}". Skipping input resolution.`,
        );
        return {
            ...section,
            resolvedVariant: userOverride.variant ?? section.defaultVariant,
            resolvedInputs: { ...(section.inputDefaults ?? {}), ...(userOverride.inputs ?? {}) },
        };
    }

    // Layer 1 — Schema defaults
    const schemaDefaults: Record<string, unknown> = {};
    for (const input of schema.inputs) {
        if (input.default !== undefined) {
            schemaDefaults[input.key] = input.default;
        }
    }

    // Layer 2 — SectionInstance.inputDefaults (per-instance overrides in the template)
    const instanceDefaults: Record<string, unknown> = section.inputDefaults ?? {};

    // Layer 3 — User override inputs (sparse — only apply explicitly set keys)
    const userInputs: Record<string, unknown> = userOverride.inputs ?? {};

    // Merge: schema defaults → instance defaults → user inputs
    const resolvedInputs: Record<string, unknown> = {
        ...schemaDefaults,
        ...instanceDefaults,
        ...userInputs,
    };

    // Resolve variant within the section's allowed set. Persisted config can outlive
    // schema changes, so invalid variants fall back instead of reaching the renderer.
    const variantCandidate = userOverride.variant ?? section.defaultVariant;
    const schemaVariantKeys = new Set(schema.variants.map((variant) => variant.key));
    const allowedVariants = section.allowedVariants.filter((variant) =>
        schemaVariantKeys.has(variant),
    );
    const fallbackVariant = allowedVariants.includes(section.defaultVariant)
        ? section.defaultVariant
        : schema.defaultVariant;
    const resolvedVariant = allowedVariants.includes(variantCandidate)
        ? variantCandidate
        : fallbackVariant;

    return {
        ...section,
        resolvedVariant,
        resolvedInputs,
    };
}
