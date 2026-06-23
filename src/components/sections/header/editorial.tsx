/**
 * Header — Editorial Variant
 * Two-row stacked layout: centered logo on top, navigation and CTA on the bottom row.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';

export default function HeaderEditorial({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sticky = i.sticky !== false;
    const showNav = i.showNav !== false;
    const ctaButton = i.ctaButton !== false;
    const ctaLabel = (i.ctaLabel as string) || 'Hire Me';
    const bottomBorder = i.bottomBorder === true;
    const bottomRowLayout = (i.bottomRowLayout as string) || 'center';
    const isBetween = bottomRowLayout === 'between';
    const title = siteData.title || 'Portfolio';

    return (
        <header
            className={`${sticky ? 'sticky top-0 z-50' : 'relative'} ${bottomBorder ? 'border-b border-border/60' : ''} bg-background/80 backdrop-blur-xl transition-all`}
        >
            <div className="container max-w-7xl mx-auto px-6 pt-6 pb-4 flex flex-col items-center gap-5">
                {/* Top Row: Logo / Site name */}
                <div className="w-full flex justify-center">
                    <Link
                        href="/"
                        className="text-2xl font-black tracking-tight text-foreground transition-colors hover:text-primary uppercase"
                    >
                        {siteData.logo ? (
                            <img src={siteData.logo} alt={title} className="h-10 w-auto" />
                        ) : (
                            title
                        )}
                    </Link>
                </div>

                {/* Bottom Row: Navigation & CTA */}
                <div className={`w-full flex flex-wrap items-center gap-x-8 gap-y-4 ${isBetween ? 'justify-between' : 'justify-center'}`}>
                    {showNav && (
                        <nav className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground ${isBetween ? 'justify-start' : 'justify-center'}`}>
                            <Link href="/projects" className="transition-colors hover:text-foreground">
                                Projects
                            </Link>
                            <Link href="/#experience" className="transition-colors hover:text-foreground">
                                Experience
                            </Link>
                            <Link href="/#skills" className="transition-colors hover:text-foreground">
                                Skills
                            </Link>
                            <Link href="/#contact" className="transition-colors hover:text-foreground hidden sm:inline-block">
                                Contact
                            </Link>
                        </nav>
                    )}
                    {ctaButton && (
                        <div className="flex items-center">
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
                            >
                                {ctaLabel}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
