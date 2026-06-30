"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';
import { useHeaderState } from './useHeaderState';

export default function HeaderFloating({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sticky = i.sticky !== false;
    const showNav = i.showNav !== false;
    const ctaButton = i.ctaButton !== false;
    const ctaLabel = (i.ctaLabel as string) || 'Hire Me';
    const bottomBorder = i.bottomBorder === true;
    const transparentOnTop = i.transparentOnTop === true;
    const backgroundStyle = (i.backgroundStyle as string) || 'frosted';
    const backgroundColor = (i.backgroundColor as string) || 'bg-background';
    const title = siteData.title || 'Portfolio';

    const { headerClass, headerRef, headerInitialStyle } = useHeaderState(
        sticky,
        transparentOnTop,
        bottomBorder,
        backgroundStyle,
        section.instanceId,
        80,
        backgroundColor,
    );

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: headerInitialStyle }} />
            <header className={`${headerClass} px-4 pt-4`} ref={headerRef}>
                <div className="mx-auto flex max-w-theme items-center justify-between gap-4 rounded-full border border-border/70 px-5 py-3 shadow-lg shadow-foreground/5 backdrop-blur-xl md:px-6">
                    <Link
                        href="/"
                        className="min-w-0 truncate text-sm font-bold tracking-tight text-foreground transition-colors hover:text-primary md:text-base"
                    >
                        {siteData.logo ? (
                            <img src={siteData.logo} alt={title} className="h-7 w-auto" />
                        ) : (
                            title
                        )}
                    </Link>

                    {showNav && (
                        <nav className="hidden items-center gap-1 rounded-full bg-muted/50 p-1 text-xs font-medium text-muted-foreground md:flex">
                            <Link href="/projects" className="rounded-full px-3 py-1.5 transition-colors hover:bg-background hover:text-foreground">
                                Projects
                            </Link>
                            <Link href="/#experience" className="rounded-full px-3 py-1.5 transition-colors hover:bg-background hover:text-foreground">
                                Experience
                            </Link>
                            <Link href="/#skills" className="rounded-full px-3 py-1.5 transition-colors hover:bg-background hover:text-foreground">
                                Skills
                            </Link>
                            <Link href="/contact" className="rounded-full px-3 py-1.5 transition-colors hover:bg-background hover:text-foreground">
                                Contact
                            </Link>
                        </nav>
                    )}

                    <div className="flex items-center gap-3">
                        <Link href="/projects" className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:hidden">
                            Projects
                        </Link>
                        {ctaButton && (
                            <Link
                                href="/contact"
                                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 md:px-5"
                            >
                                {ctaLabel}
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
