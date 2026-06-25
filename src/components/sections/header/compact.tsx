"use client";

/**
 * Header — Compact Variant
 * Minimal single-line bar — tighter padding, smaller font.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';
import { useHeaderState } from './useHeaderState';

export default function HeaderCompact({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sticky = i.sticky !== false;
    const showNav = i.showNav !== false;
    const ctaButton = i.ctaButton !== false;
    const ctaLabel = (i.ctaLabel as string) || 'Hire Me';
    const bottomBorder = i.bottomBorder === true;
    const transparentOnTop = i.transparentOnTop === true;
    const backgroundStyle = (i.backgroundStyle as string) || 'frosted';
    const title = siteData.title || 'Portfolio';

    const { headerClass } = useHeaderState(sticky, transparentOnTop, bottomBorder, backgroundStyle, section.instanceId);

    return (
        <header className={headerClass}>
            <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <Link href="/" className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex-shrink-0">
                    {siteData.logo ? (
                        <img src={siteData.logo} alt={title} className="h-6 w-auto" />
                    ) : (
                        title
                    )}
                </Link>
                <div className="flex items-center gap-5">
                    {showNav && (
                        <nav className="hidden items-center gap-5 text-xs font-medium text-muted-foreground sm:flex">
                            <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
                            <Link href="/#experience" className="hover:text-foreground transition-colors">Experience</Link>
                            <Link href="/#skills" className="hover:text-foreground transition-colors">Skills</Link>
                            <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
                        </nav>
                    )}
                    {ctaButton && (
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
                        >
                            {ctaLabel}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
