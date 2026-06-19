/**
 * Template Registry — barrel re-export
 *
 * This file is the public entry point for the templating system.
 * It re-exports everything from the new schema-driven registry so that
 * existing import paths (`@/templates`) continue to resolve correctly.
 *
 * The old React-component-bundle approach (ThemeTemplate / TemplateRegistry)
 * has been replaced by a three-layer schema system:
 *
 *   1. Schema layer   — `components.ts`, `registry.ts`  (static, authored by devs)
 *   2. User config    — Django DB via `UserPortfolioConfig` (sparse deltas only)
 *   3. Resolved layer — `merge.ts` resolvePortfolioConfig() (SSR only, never persisted)
 *
 * ## Typical import patterns
 *
 * ```ts
 * // Template registry (to look up a template by key)
 * import { TemplateRegistry, getTemplate } from '@/templates'
 *
 * // Type-only imports
 * import type { Template, UserPortfolioConfig } from '@/templates/types'
 *
 * // SSR merge utility
 * import { resolvePortfolioConfig, emptyUserConfig } from '@/templates/merge'
 *
 * // Component registry (editor UI, merge internals)
 * import { ComponentRegistry } from '@/templates/components'
 * ```
 */

// ── Template registry ──────────────────────────────────────────────────────

export {
    TemplateRegistry,
    getTemplate,
    templateExists,
    getAvailableTemplates,
} from './registry';

// ── Component registry ──────────────────────────────────────────────────────

export { ComponentRegistry } from './components';

// ── SSR merge utilities ─────────────────────────────────────────────────────

export { resolvePortfolioConfig, emptyUserConfig } from './merge';

// ── Types ────────────────────────────────────────────────────────────────────

export type {
    Template,
    TemplatePage,
    SectionInstance,
    ComponentSchema,
    ComponentVariant,
    ComponentInput,
    ComponentInputType,
    SelectOption,
    UserPortfolioConfig,
    SectionOverride,
    ResolvedPortfolioConfig,
    ResolvedPage,
    ResolvedSection,
} from './types';
