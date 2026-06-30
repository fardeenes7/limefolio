"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';
import { useHeaderState } from './useHeaderState';

export default function HeaderCinematic({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sticky = i.sticky !== false;
    const showNav = i.showNav !== false;
    const ctaButton = i.ctaButton !== false;
    const ctaLabel = (i.ctaLabel as string) || 'Book a screening';
    const backgroundStyle = (i.backgroundStyle as string) || 'solid';
    const backgroundColor = (i.backgroundColor as string) || 'bg-background';
    const title = siteData.title || 'Portfolio';
    const { headerClass, headerRef, headerInitialStyle } = useHeaderState(sticky, false, true, backgroundStyle, section.instanceId, 76, backgroundColor);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: headerInitialStyle }} />
            <header className={headerClass} ref={headerRef}>
                <div className="mx-auto flex max-w-theme items-center justify-between gap-6 px-6 py-4">
                    <Link href="/" className="group flex items-center gap-3 text-foreground">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-[10px] font-black uppercase tracking-widest text-primary">LF</span>
                        <span className="text-sm font-semibold uppercase tracking-[0.35em] group-hover:text-primary">
                            {siteData.logo ? <img src={siteData.logo} alt={title} className="h-7 w-auto" /> : title}
                        </span>
                    </Link>

                    {showNav && (
                        <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground md:flex">
                            <Link href="/projects" className="transition-colors hover:text-primary">Reels</Link>
                            <Link href="/#gallery" className="transition-colors hover:text-primary">Stills</Link>
                            <Link href="/blog" className="transition-colors hover:text-primary">Journal</Link>
                            <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
                            {ctaButton && <Link href="/contact" className="rounded-full border border-primary/50 px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{ctaLabel}</Link>}
                        </nav>
                    )}

                    <div className="flex items-center gap-3 md:hidden">
                        <Link href="/projects" className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Work</Link>
                        {ctaButton && <Link href="/contact" className="rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground">Contact</Link>}
                    </div>
                </div>
            </header>
        </>
    );
}
