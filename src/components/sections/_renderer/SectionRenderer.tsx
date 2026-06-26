/**
 * @file src/components/sections/_renderer/SectionRenderer.tsx
 *
 * Dynamic section component dispatcher.
 *
 * Resolves a `ResolvedSection` to its concrete React component by importing
 * `src/components/sections/[componentKey]/[resolvedVariant].tsx` at runtime.
 *
 * ## Fallback strategy
 * If the resolved variant file doesn't exist, Next.js dynamic import throws.
 * We catch this and fall back to the `default` variant for that component.
 * If `default` also doesn't exist, we render nothing with a console warning —
 * a hard error here would break the entire page for a single missing component.
 *
 * ## Variant key sanitisation
 * Variant keys may contain hyphens (e.g. "3d_model"). The file path uses the
 * raw variant key as-is. Variant filenames must exactly match the key in the
 * component registry.
 */

/* eslint-disable react-hooks/static-components */
"use client";

import type { ResolvedSection } from '@/templates/types';
import type { SiteData } from '@/types/site';
import { ComponentType, memo, useMemo, useContext } from 'react';
import { PreviewContext } from '@/components/preview/LivePreviewProvider';

// ─────────────────────────────────────────────────────────────────────────────
// Public section component contract
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Props every section component must accept.
 * `resolvedInputs` is the fully-merged input map from `merge.ts`.
 */
export interface SectionProps {
    section: ResolvedSection;
    siteData: SiteData;
}

// ─────────────────────────────────────────────────────────────────────────────
// Module import cache — avoids re-creating the dynamic import on every render
// ─────────────────────────────────────────────────────────────────────────────

import { ComponentRegistry } from '@/templates/components';
import { VariantRegistry } from './VariantRegistry';

type SectionComponent = ComponentType<SectionProps>;

function getComponent(componentKey: string, variant: string): SectionComponent {
    const cacheKey = `${componentKey}/${variant}`;
    
    // Fast path: Exact variant match
    if (VariantRegistry[cacheKey]) {
        return VariantRegistry[cacheKey];
    }

    const schema = ComponentRegistry[componentKey];
    if (!schema) {
        console.warn(`[SectionRenderer] Unknown componentKey: ${componentKey}`);
        return () => null;
    }

    // Fallback path: Try default variant
    const defaultCacheKey = `${componentKey}/${schema.defaultVariant}`;
    if (VariantRegistry[defaultCacheKey]) {
        console.warn(
            `[SectionRenderer] Variant "${variant}" not found for "${componentKey}". Falling back to default "${schema.defaultVariant}".`
        );
        return VariantRegistry[defaultCacheKey];
    }

    // Final fallback
    console.warn(`[SectionRenderer] Default variant "${schema.defaultVariant}" for "${componentKey}" also missing. Rendering nothing.`);
    return () => null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionRenderer
// ─────────────────────────────────────────────────────────────────────────────

interface SectionRendererProps {
    section: ResolvedSection;
    siteData: SiteData;
}

/**
 * Renders a single `ResolvedSection` by dynamically importing the correct
 * variant component from `src/components/sections/[componentKey]/[variant].tsx`.
 */
export const SectionRenderer = memo(function SectionRenderer({
    section,
    siteData,
}: SectionRendererProps) {
    const { selectedInstanceId, isPreviewMode } = useContext(PreviewContext);
    const isSelected = selectedInstanceId === section.instanceId;

    const Component = getComponent(section.componentKey, section.resolvedVariant); console.log("Rendering:", section.componentKey, "Variant:", section.resolvedVariant, "isPreview:", isPreviewMode);
    
    // Interpolate template variables in inputs
    const interpolatedInputs = { ...section.resolvedInputs };
    const userName = siteData.user?.first_name || siteData.title || '';
    
    for (const [key, value] of Object.entries(interpolatedInputs)) {
        if (typeof value === 'string') {
            interpolatedInputs[key] = value.replace(/{name}/g, userName);
        }
    }
    
    const interpolatedSection = { ...section, resolvedInputs: interpolatedInputs };

    const handleClick = useMemo(() => {
        return () => {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({
                    type: 'SELECT_SECTION',
                    instanceId: section.instanceId,
                }, '*');
            }
        };
    }, [section.instanceId]);

    if (!isPreviewMode) {
        return <Component section={interpolatedSection} siteData={siteData} />;
    }

    if (section.componentKey === 'header') {
        return (
            <div className="contents" onClick={handleClick}>
                <Component section={interpolatedSection} siteData={siteData} />
            </div>
        );
    }

    return (
        <div 
            onClick={handleClick}
            className={`group/section relative cursor-pointer ${isSelected ? 'ring-2 ring-primary ring-inset z-10' : ''}`}
        >
            <Component section={interpolatedSection} siteData={siteData} />
            <div className={`absolute inset-0 border-2 border-transparent group-hover/section:border-primary/50 pointer-events-none transition-colors ${isSelected ? 'border-primary/50' : ''}`} />
        </div>
    );
});
