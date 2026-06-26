/**
 * @file src/components/sections/_renderer/PageRenderer.tsx
 *
 * Maps a `ResolvedSection[]` to a vertical stack of `<SectionRenderer>` nodes.
 *
 * Used by:
 * - `layout.tsx`       → renders the layout sections (header, footer, cookie_banner)
 *                        wrapping `{children}` (page-specific content)
 * - each `page.tsx`    → renders that page's own sections
 *
 * The `context` prop is passed through to section components so they can
 * differentiate between layout-level and page-level rendering when needed
 * (e.g. the header can anchor its sticky position relative to the viewport
 * regardless of render context).
 */

import type { ResolvedSection } from '@/templates/types';
import type { SiteData } from '@/types/site';
import { SectionRenderer } from './SectionRenderer';
import { ReactNode } from 'react';

interface LayoutPageRendererProps {
    /** Sections rendered in the layout wrapper (header, footer, cookie_banner) */
    layoutSections: ResolvedSection[];
    /** Page-specific sections rendered between header and footer */
    children: ReactNode;
    siteData: SiteData;
}

/**
 * Renders the site layout: header sections → children → footer sections.
 *
 * The header-like sections (those that appear before any non-global section in
 * the template layout definition — i.e. `header`) are rendered above `children`.
 * The footer-like sections (`footer`, `cookie_banner`) are rendered below.
 *
 * This replaces the old `<DefaultLayout>` / `<TemplateLayout>` wrapper pattern.
 */
export function LayoutPageRenderer({
    layoutSections,
    children,
    siteData,
}: LayoutPageRendererProps) {
    // Split layout sections into header group and footer group.
    // Sections with componentKey === 'header' (or any header-variant) are headers.
    // Everything else (footer, cookie_banner) goes below content.
    const headerSections = layoutSections.filter(
        (s) => s.componentKey === 'header',
    );
    const footerSections = layoutSections.filter(
        (s) => s.componentKey !== 'header',
    );

    return (
        <div className="flex min-h-screen flex-col bg-background">
            {headerSections.map((section) => (
                <SectionRenderer
                    key={section.instanceId}
                    section={section}
                    siteData={siteData}
                />
            ))}
            <main className="flex-1">
                {children}
            </main>
            <div className="mt-auto">
                {footerSections.map((section) => (
                    <SectionRenderer
                        key={section.instanceId}
                        section={section}
                        siteData={siteData}
                    />
                ))}
            </div>
        </div>
    );
}

interface PageRendererProps {
    /** Ordered list of resolved sections to render for this page */
    sections: ResolvedSection[];
    siteData: SiteData;
}

/**
 * Renders an ordered list of resolved sections for a single page.
 * Does NOT include layout sections (header/footer) — those are handled by
 * `LayoutPageRenderer` in `layout.tsx`.
 */
export function PageRenderer({ sections, siteData }: PageRendererProps) {
    return (
        <>
            {sections.map((section, index) => (
                <SectionRenderer
                    key={section.instanceId}
                    section={section}
                    siteData={siteData}
                    compensateHeaderOffset={index === 0}
                />
            ))}
        </>
    );
}
