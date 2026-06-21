/**
 * CTA — Banner Variant
 *
 * A wide banner spanning the full width, often used above the footer.
 * Supports primary and secondary CTAs.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';

export default function CtaBanner({ section }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || "Let's Work Together";
    const subtext = (i.subtext as string) || '';
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'Get In Touch';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '/contact';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || '';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '';
    const backgroundStyle = (i.backgroundStyle as string) || '';

    return (
        <section 
            className="py-16 md:py-20 bg-muted text-foreground border-y border-border"
            style={backgroundStyle ? { backgroundColor: `hsl(var(${backgroundStyle}))` } : undefined}
        >
            <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
                        {headline}
                    </h2>
                    {subtext && (
                        <p className="mt-4 text-xl text-muted-foreground font-light">
                            {subtext}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                    <a
                        href={primaryCtaUrl}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none border border-foreground bg-foreground text-background font-bold uppercase tracking-wider hover:bg-transparent hover:text-foreground transition-all"
                    >
                        {primaryCtaLabel}
                        <IconArrowRight size={20} />
                    </a>
                    
                    {secondaryCtaLabel && (
                        <a
                            href={secondaryCtaUrl}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-none border border-border bg-transparent text-foreground font-bold uppercase tracking-wider hover:border-foreground transition-all"
                        >
                            {secondaryCtaLabel}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
