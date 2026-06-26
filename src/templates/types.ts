/**
 * @file src/templates/types.ts
 *
 * Core type system for the Limefolio templating engine.
 *
 * ## Three-layer model
 *
 * This file defines types for all three layers of the templating system:
 *
 * ### 1. Schema layer (static, authored by developers)
 * `ComponentSchema` and `Template` live in `components.ts` and `registry.ts`.
 * They describe what components exist, what variants they support, and what
 * inputs they accept. These are compile-time constants — never stored in the DB.
 *
 * ### 2. User config layer (sparse deltas — persisted in Django)
 * `UserPortfolioConfig` is what the Django `PortfolioTemplateConfig` model stores.
 * It contains ONLY what the user has explicitly changed from the template defaults:
 * overrides, additions, removals, and reorderings. The full merged result is NEVER
 * stored here. Sending the full resolved config to the API is a hard constraint
 * violation — always send only the changed delta fields.
 *
 * ### 3. Resolved layer (SSR only — never persisted)
 * `ResolvedPortfolioConfig` is computed at request time by `merge.ts` by merging
 * the static template definition with the user's sparse config. It is passed
 * directly to page and layout components and must never be sent back to Django.
 *
 * ## Color values
 * All color values throughout this system — in component inputs, theme tokens,
 * and any resolved configs — must use shadcn semantic CSS variable tokens
 * (e.g. `--primary`, `--muted-foreground`, `--card`). Raw hex values and Tailwind
 * arbitrary color classes (e.g. `text-[#abc]`, `bg-[rgb(1,2,3)]`) are strictly
 * forbidden. Color inputs in component schemas must use `{ kind: 'token' }`.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Input types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single option in a `select` input.
 * `label` is shown in the UI; `value` is stored in the config.
 */
export type SelectOption = { label: string; value: string };

/**
 * Discriminated union describing the kind of value a `ComponentInput` accepts.
 *
 * - `text`    — free-form string
 * - `boolean` — true/false toggle
 * - `select`  — one of a fixed set of labelled options
 * - `file`    — a user-uploaded asset (image, video, or document)
 * - `token`   — a reference to a shadcn semantic CSS variable (e.g. `--primary`).
 *               The `category` narrows which token palette is shown in the UI:
 *               `color` → color tokens, `radius` → radius tokens, `shadow` → shadow tokens.
 *               Never use hex or Tailwind arbitrary values for token inputs.
 */
export type ComponentInputType =
    | { kind: 'text' }
    | { kind: 'boolean' }
    | { kind: 'select'; options: SelectOption[] }
    | { kind: 'file'; accepts: 'image' | 'video' | 'doc'; multiple?: boolean }
    | { kind: 'token'; category: 'color' | 'radius' | 'shadow' }
    | { kind: 'slider'; min: number; max: number; step: number };

/**
 * A single configurable input on a component.
 *
 * - `key`     — stable identifier used as the property name in `resolvedInputs`.
 *               Must never change once a template version is published.
 * - `label`   — human-readable name shown in the editor UI
 * - `type`    — the input kind (see `ComponentInputType`)
 * - `default` — the fallback value used when no user override exists.
 *               Must match the runtime type implied by `type.kind`.
 * - `showIf`  — conditionally hides this input in the UI when another input
 *               does not equal the specified value. Only affects the editor UI;
 *               the input's `default` is still applied during SSR merge even
 *               when the condition is not met.
 * - `group`   — logical grouping for the editor UI (e.g. "Content", "Style", "Layout")
 */
export type ComponentInput = {
    key: string;
    label: string;
    type: ComponentInputType;
    default?: unknown;
    showIf?: { input: string; equals: unknown };
    group?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Component schema
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single visual variant of a component.
 * `key` is the stable identifier used in `resolvedVariant`; `label` is shown in
 * the editor UI. Never change a variant `key` after a template version is published.
 */
export type ComponentVariant = {
    key: string;
    label: string;
};

/**
 * The static definition of a reusable portfolio section component.
 *
 * Invariants:
 * - `defaultVariant` must be present as a `key` in the `variants` array.
 * - `key` must be globally unique across `ComponentRegistry`.
 * - `isGlobal: true` means this component is automatically injected into every
 *   page render without being declared in `template.pages[x].sections`. Its
 *   config is sourced from `template.layout`.
 * - `repeatable: true` means a user can add multiple instances of this component
 *   to the same page (e.g. multiple `featured_projects` sections).
 * - `removable: true` means the user can remove this component from their layout.
 *   `SectionInstance.removable` can further override this at the template level.
 * - Site name and logo are sourced from global portfolio config and must NEVER
 *   appear as component inputs.
 */
export type ComponentSchema = {
    key: string;
    label: string;
    isGlobal: boolean;
    repeatable: boolean;
    removable: boolean;
    variants: ComponentVariant[];
    defaultVariant: string;
    inputs: ComponentInput[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Template section instance
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A concrete placement of a component within a template's layout or page.
 *
 * `instanceId` is the stable join key between the static template definition and
 * the user's stored overrides. Changing an `instanceId` after a template version
 * is published is a breaking change that orphans all existing user customizations
 * for that section — it requires a version bump and a data migration.
 *
 * Invariants:
 * - `instanceId` must be a stable slug (e.g. "hero_1", "featured_projects_2").
 * - `componentKey` must match a key in `ComponentRegistry`.
 * - `allowedVariants` must be a non-empty subset of the variants declared in the
 *   corresponding `ComponentSchema`.
 * - `defaultVariant` must be present in `allowedVariants`.
 */
export type SectionInstance = {
    /** Stable slug identifier, e.g. "header_1", "photo_gallery_1". */
    instanceId: string;
    /** Must match a key in ComponentRegistry. */
    componentKey: string;
    /** Subset of ComponentSchema.variants the user may choose from. */
    allowedVariants: string[];
    /** Must be in allowedVariants. Used when no user override exists. */
    defaultVariant: string;
    /** Per-instance input defaults that take precedence over ComponentSchema defaults. */
    inputDefaults?: Record<string, unknown>;
    /** If true, the user cannot reorder or remove this section. */
    fixed?: boolean;
    /** Overrides ComponentSchema.removable for this specific instance. */
    removable?: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// Template definition
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single page within a template.
 *
 * `key` identifies the page route type — must be one of the canonical page keys:
 * "landing" | "all_projects" | "project_details" | "all_blog" | "blog_details" | "contact"
 *
 * `sections` is the ordered list of `SectionInstance` objects rendered by the
 * corresponding `page.tsx`. Global components (isGlobal: true) are NOT declared
 * here — they are automatically injected by `resolvePortfolioConfig`.
 */
export type TemplatePage = {
    key: string;
    label: string;
    sections: SectionInstance[];
};

/**
 * The complete static definition of a portfolio template.
 *
 * Invariants:
 * - `defaultTheme` must exist as a key in `ColorThemes` (src/themes/index.ts).
 * - `defaultFont` must exist as a key in `Fonts` (src/lib/fonts.ts).
 * - `version` is semver (e.g. "1.0.0") and must be bumped when any breaking
 *   change is made to section instanceIds, input keys, or removed sections.
 *
 * `layout` contains `SectionInstance` objects for global components (header,
 * footer, cookie banner, etc.) rendered by `layout.tsx` on every page.
 *
 * `pages` contains one `TemplatePage` per route. Page sections are rendered by
 * each `page.tsx`; they do not include the global layout components.
 */
export type Template = {
    key: string;
    label: string;
    /** Semver, e.g. "1.0.0". Bump on breaking changes to instanceIds or input keys. */
    version: string;
    /** Must exist in ColorThemes. Applied when the user first switches to this template. */
    defaultTheme: string;
    /** Must exist in Fonts. Applied when the user first switches to this template. */
    defaultFont: string;
    /** Global sections rendered by layout.tsx — header, footer, cookie banner, etc. */
    layout: SectionInstance[];
    /** Per-route page definitions. One entry per supported page type. */
    pages: TemplatePage[];
};

// ─────────────────────────────────────────────────────────────────────────────
// User config — sparse deltas stored in Django
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The user's override for a single section instance.
 * Only the fields that have been explicitly changed are present.
 * Never include the full resolved inputs here — only the user's deltas.
 */
export type SectionOverride = {
    /** The variant key the user has chosen (if changed from the default). */
    variant?: string;
    /** Input key/value pairs the user has changed. Sparse — only changed keys. */
    inputs?: Record<string, unknown>;
};

/**
 * The user's sparse customization deltas for their portfolio template.
 *
 * This is what the Django `PortfolioTemplateConfig` model stores — only what
 * the user has explicitly changed from the template defaults. The full merged/
 * resolved config is computed at SSR time and must NEVER be persisted here.
 *
 * Delta fields:
 * - `overrides`  — variant and input changes keyed by instanceId
 * - `additions`  — user-added SectionInstances (for repeatable components)
 * - `removals`   — instanceIds the user has explicitly removed
 * - `ordering`   — the user's preferred section order as instanceId arrays;
 *                  sections absent from the array are appended in template order
 *
 * Sending full merged config to the API is a hard constraint violation.
 * Always PATCH only the specific delta fields that changed.
 */
export type UserPortfolioConfig = {
    templateKey: string;
    themeKey: string;
    fontKey: string;
    templateVersion: string;
    themeOverrides: Record<string, string>;
    overrides: {
        /** keyed by instanceId */
        layout: Record<string, SectionOverride>;
        /** [pageKey][instanceId] */
        pages: Record<string, Record<string, SectionOverride>>;
    };
    additions: {
        layout: SectionInstance[];
        pages: Record<string, SectionInstance[]>;
    };
    removals: {
        /** instanceIds removed from the layout */
        layout: string[];
        /** [pageKey] → instanceIds removed from that page */
        pages: Record<string, string[]>;
    };
    ordering: {
        /** instanceIds in user's preferred order for the layout */
        layout?: string[];
        /** [pageKey] → instanceIds in user's preferred order */
        pages?: Record<string, string[]>;
    };
};

// ─────────────────────────────────────────────────────────────────────────────
// Resolved config — SSR only, never persisted
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A fully resolved section instance, ready for the renderer.
 *
 * Produced by `resolvePortfolioConfig` in `merge.ts`. Contains all of the
 * `SectionInstance` fields plus:
 * - `resolvedVariant` — the variant to render (user override ?? defaultVariant)
 * - `resolvedInputs`  — the complete input map after merging all three priority
 *                       levels (schema default → instanceDefault → user override)
 *
 * Never send a `ResolvedSection` or `ResolvedPortfolioConfig` to the Django API.
 */
export type ResolvedSection = SectionInstance & {
    resolvedVariant: string;
    resolvedInputs: Record<string, unknown>;
};

/**
 * A fully resolved page definition, ready for the page renderer.
 * `sections` contains `ResolvedSection` objects in final display order,
 * with removals applied and user additions appended.
 */
export type ResolvedPage = {
    key: string;
    label: string;
    sections: ResolvedSection[];
};

/**
 * The complete SSR-time merge result for a user's portfolio.
 *
 * Produced by `resolvePortfolioConfig` in `merge.ts`. Contains:
 * - `layout`  — resolved global sections (header, footer, etc.) in display order
 * - `pages`   — map of resolved pages keyed by page key
 *
 * This object is passed to layout.tsx and page.tsx components at render time.
 * It must NEVER be sent to or stored in Django.
 */
export type ResolvedPortfolioConfig = {
    templateKey: string;
    themeKey: string;
    fontKey: string;
    themeOverrides: Record<string, string>;
    layout: ResolvedSection[];
    pages: ResolvedPage[];
};
