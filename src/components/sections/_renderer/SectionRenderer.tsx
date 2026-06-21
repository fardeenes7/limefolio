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

"use client";

import type { ResolvedSection } from '@/templates/types';
import type { SiteData } from '@/types/site';
import dynamic from 'next/dynamic';
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

type SectionComponent = ComponentType<SectionProps>;
const componentCache = new Map<string, SectionComponent>();

function getComponent(componentKey: string, variant: string): SectionComponent {
    const cacheKey = `${componentKey}/${variant}`;
    if (componentCache.has(cacheKey)) return componentCache.get(cacheKey)!;

    const schema = ComponentRegistry[componentKey];
    if (!schema) {
        console.warn(`[SectionRenderer] Unknown componentKey: ${componentKey}`);
        const NullComp = () => null;
        componentCache.set(cacheKey, NullComp);
        return NullComp;
    }

    const loadVariant = async (targetVariant: string) => {
        switch (componentKey) {
            case 'about': return await import(`../about/${targetVariant}`);
            case 'contact': return await import(`../contact/${targetVariant}`);
            case 'cookie_banner': return await import(`../cookie_banner/${targetVariant}`);
            case 'cta': return await import(`../cta/${targetVariant}`);
            case 'experience': return await import(`../experience/${targetVariant}`);
            case 'featured_projects': return await import(`../featured_projects/${targetVariant}`);
            case 'footer': return await import(`../footer/${targetVariant}`);
            case 'header': return await import(`../header/${targetVariant}`);
            case 'hero': return await import(`../hero/${targetVariant}`);
            case 'latest_blogs': return await import(`../latest_blogs/${targetVariant}`);
            case 'media_gallery': return await import(`../media_gallery/${targetVariant}`);
            case 'services': return await import(`../services/${targetVariant}`);
            case 'skills': return await import(`../skills/${targetVariant}`);
            case 'social_feed': return await import(`../social_feed/${targetVariant}`);
            case 'stats': return await import(`../stats/${targetVariant}`);
            case 'testimonials': return await import(`../testimonials/${targetVariant}`);
            default:
                throw new Error(`Unknown componentKey: ${componentKey}`);
        }
    };

    const Comp = dynamic(() => 
        loadVariant(variant).catch((err) => {
            if (variant !== schema.defaultVariant) {
                console.warn(
                    `[SectionRenderer] Variant "${variant}" not found for "${componentKey}". Falling back to default "${schema.defaultVariant}".`,
                );
                return loadVariant(schema.defaultVariant).catch(() => {
                    console.warn(`[SectionRenderer] Default variant "${schema.defaultVariant}" for "${componentKey}" also missing. Rendering nothing.`);
                    return { default: () => null };
                });
            }
            console.warn(`[SectionRenderer] Variant "${variant}" not found for "${componentKey}". Rendering nothing.`);
            return { default: () => null };
        }), 
        { ssr: true }
    ) as SectionComponent;

    componentCache.set(cacheKey, Comp);
    return Comp;
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
    const { selectedInstanceId } = useContext(PreviewContext);
    const isSelected = selectedInstanceId === section.instanceId;

    const Component = getComponent(section.componentKey, section.resolvedVariant);
    
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
