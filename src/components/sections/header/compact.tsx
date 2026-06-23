/**
 * Header — Compact Variant
 * Minimal single-line bar — no CTA pill, tighter padding, smaller font.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';

export default function HeaderCompact({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sticky = i.sticky !== false;
    const title = siteData.title || 'Portfolio';

    return (
        <header className={`${sticky ? 'sticky top-0 z-50' : 'relative'} border-b border-border bg-background`}>
            <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <Link href="/" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    {title}
                </Link>
                <nav className="flex items-center gap-5 text-xs font-medium text-muted-foreground">
                    <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
                    <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
                </nav>
            </div>
        </header>
    );
}
