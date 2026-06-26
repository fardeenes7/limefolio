"use client";

/**
 * Header — Default Variant

 *
 * Sticky frosted-glass navigation bar with logo, desktop nav links, and an
 * optional CTA button. Reads from resolvedInputs: sticky, showNav, ctaButton,
 * ctaLabel, transparentOnTop.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';
import { useHeaderState } from './useHeaderState';

export default function HeaderDefault({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sticky = i.sticky !== false;
    const showNav = i.showNav !== false;
    const ctaButton = i.ctaButton !== false;
    const ctaLabel = (i.ctaLabel as string) || 'Hire Me';
    const bottomBorder = i.bottomBorder === true;
    const transparentOnTop = i.transparentOnTop === true;
    const backgroundStyle = (i.backgroundStyle as string) || 'frosted';
    const title = siteData.title || 'Portfolio';

    const { headerClass, headerRef, headerInitialStyle } = useHeaderState(sticky, transparentOnTop, bottomBorder, backgroundStyle, section.instanceId, 64);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: headerInitialStyle }} />
            <header className={headerClass} ref={headerRef}>
            <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo / Site name */}
                <Link
                    href="/"
                    className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
                >
                    {siteData.logo ? (
                        <img src={siteData.logo} alt={title} className="h-8 w-auto" />
                    ) : (
                        title
                    )}
                </Link>

                {/* Desktop nav */}
                {showNav && (
                    <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
                        <Link href="/projects" className="transition-colors hover:text-foreground">
                            Projects
                        </Link>
                        <Link href="/#experience" className="transition-colors hover:text-foreground">
                            Experience
                        </Link>
                        <Link href="/#skills" className="transition-colors hover:text-foreground">
                            Skills
                        </Link>
                        <Link href="/#contact" className="transition-colors hover:text-foreground">
                            Contact
                        </Link>
                        {ctaButton && (
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-primary-foreground transition-all hover:bg-primary/90"
                            >
                                {ctaLabel}
                            </Link>
                        )}
                    </nav>
                )}

                {/* Mobile nav */}
                <div className="flex items-center gap-3 sm:hidden">
                    <Link
                        href="/projects"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                    >
                        {ctaLabel}
                    </Link>
                </div>
            </div>
        </header>
        </>
    );
}
