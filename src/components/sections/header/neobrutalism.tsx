"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';
import { useHeaderState } from './useHeaderState';

export default function HeaderNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sticky = i.sticky !== false;
    const showNav = i.showNav !== false;
    const ctaButton = i.ctaButton !== false;
    const ctaLabel = (i.ctaLabel as string) || 'Hire Me';
    const backgroundStyle = (i.backgroundStyle as string) || 'solid';
    const backgroundColor = (i.backgroundColor as string) || 'bg-primary';
    const title = siteData.title || 'Portfolio';

    const { headerClass, headerRef, headerInitialStyle } = useHeaderState(sticky, false, true, backgroundStyle, section.instanceId, 72, backgroundColor);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: headerInitialStyle }} />
            <header className={headerClass} ref={headerRef}>
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                    <Link
                        href="/"
                        className="border-4 border-border bg-background px-3 py-2 text-base font-black uppercase tracking-tight text-foreground shadow-[6px_6px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                        {siteData.logo ? (
                            <img src={siteData.logo} alt={title} className="h-8 w-auto" />
                        ) : title}
                    </Link>

                    {showNav && (
                        <nav className="hidden items-center gap-2 text-sm font-black uppercase sm:flex">
                            <Link href="/projects" className="border-2 border-border bg-background px-3 py-2 text-foreground hover:bg-secondary">Work</Link>
                            <Link href="/blog" className="border-2 border-border bg-background px-3 py-2 text-foreground hover:bg-secondary">Blog</Link>
                            <Link href="/contact" className="border-2 border-border bg-background px-3 py-2 text-foreground hover:bg-secondary">Contact</Link>
                            {ctaButton && (
                                <Link href="/contact" className="border-2 border-border bg-accent px-4 py-2 text-accent-foreground shadow-[4px_4px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">
                                    {ctaLabel}
                                </Link>
                            )}
                        </nav>
                    )}

                    <div className="flex items-center gap-2 sm:hidden">
                        <Link href="/projects" className="border-2 border-border bg-background px-3 py-2 text-xs font-black uppercase text-foreground">Work</Link>
                        {ctaButton && <Link href="/contact" className="border-2 border-border bg-accent px-3 py-2 text-xs font-black uppercase text-accent-foreground">Contact</Link>}
                    </div>
                </div>
            </header>
        </>
    );
}
