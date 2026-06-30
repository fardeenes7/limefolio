"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';
import { useHeaderState } from './useHeaderState';

export default function HeaderMinimal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sticky = i.sticky === true;
    const showNav = i.showNav !== false;
    const bottomBorder = i.bottomBorder === true;
    const transparentOnTop = i.transparentOnTop === true;
    const backgroundStyle = (i.backgroundStyle as string) || 'transparent';
    const backgroundColor = (i.backgroundColor as string) || 'bg-background';
    const title = siteData.title || 'Portfolio';

    const { headerClass, headerRef, headerInitialStyle } = useHeaderState(sticky, transparentOnTop, bottomBorder, backgroundStyle, section.instanceId, 56, backgroundColor);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: headerInitialStyle }} />
            <header className={headerClass} ref={headerRef}>
                <div className="mx-auto flex max-w-theme items-center justify-between px-6 py-6">
                    <Link href="/" className="text-sm font-medium text-foreground underline-offset-4 hover:underline">
                        {siteData.logo ? (
                            // Section variants use raw uploaded asset URLs from the API.
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={siteData.logo} alt={title} className="h-5 w-auto" />
                        ) : title}
                    </Link>

                    {showNav && (
                        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Link href="/projects" className="hover:text-foreground">Work</Link>
                            <Link href="/blog" className="hover:text-foreground">Writing</Link>
                            <Link href="/contact" className="hover:text-foreground">Contact</Link>
                        </nav>
                    )}
                </div>
            </header>
        </>
    );
}
