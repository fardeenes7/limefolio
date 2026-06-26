"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';
import { useHeaderState } from './useHeaderState';

export default function HeaderTerminal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sticky = i.sticky !== false;
    const showNav = i.showNav !== false;
    const ctaButton = i.ctaButton !== false;
    const ctaLabel = (i.ctaLabel as string) || './contact';
    const backgroundStyle = (i.backgroundStyle as string) || 'solid';
    const backgroundColor = (i.backgroundColor as string) || 'bg-background';
    const title = siteData.title || 'portfolio';
    const handle = title.toLowerCase().replace(/\s+/g, '-');
    const { headerClass, headerRef, headerInitialStyle } = useHeaderState(sticky, false, true, backgroundStyle, section.instanceId, 58, backgroundColor);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: headerInitialStyle }} />
            <header className={`${headerClass} font-mono`} ref={headerRef}>
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                    <Link href="/" className="flex min-w-0 items-center gap-2 text-sm font-semibold text-foreground hover:text-primary">
                        <span className="text-primary">~/</span>
                        <span className="truncate">{handle}</span>
                        <span className="hidden text-muted-foreground sm:inline">main</span>
                    </Link>

                    {showNav && (
                        <nav className="hidden items-center gap-1 text-xs font-medium sm:flex">
                            <Link href="/projects" className="rounded px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">ls projects</Link>
                            <Link href="/#skills" className="rounded px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">cat stack</Link>
                            <Link href="/blog" className="rounded px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">tail logs</Link>
                            <Link href="/contact" className="rounded px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">ssh contact</Link>
                            {ctaButton && <Link href="/contact" className="ml-2 rounded border border-primary/40 bg-primary/10 px-3 py-1.5 text-primary hover:bg-primary hover:text-primary-foreground">{ctaLabel}</Link>}
                        </nav>
                    )}

                    <div className="flex items-center gap-2 sm:hidden">
                        <Link href="/projects" className="text-xs text-muted-foreground">ls</Link>
                        {ctaButton && <Link href="/contact" className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">ssh</Link>}
                    </div>
                </div>
            </header>
        </>
    );
}
