"use client";

/**
 * Header — Centered Variant
 * Logo on the left, navigation centered, CTA on the right.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';
import { useHeaderState } from './useHeaderState';

export default function HeaderCentered({ section, siteData }: SectionProps) {
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

    const { headerClass, headerRef, headerInitialStyle } = useHeaderState(sticky, transparentOnTop, bottomBorder, backgroundStyle, section.instanceId, 64, backgroundColor);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: headerInitialStyle }} />
            <header className={headerClass} ref={headerRef}>
            <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo / Site name */}
                <div className="flex-1">
                    <Link
                        href="/"
                        className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary inline-block"
                    >
                        {siteData.logo ? (
                            <img src={siteData.logo} alt={title} className="h-8 w-auto" />
                        ) : (
                            title
                        )}
                    </Link>
                </div>

                {/* Desktop nav (Centered) */}
                {showNav && (
                    <nav className="hidden items-center justify-center gap-8 text-sm font-medium text-muted-foreground sm:flex flex-1">
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
                    </nav>
                )}

                {/* Right side CTA */}
                <div className="flex items-center justify-end gap-3 flex-1">
                    <div className="sm:hidden">
                        <Link
                            href="/projects"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground mr-3"
                        >
                            Projects
                        </Link>
                    </div>
                    {ctaButton && (
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
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
