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
            className="relative overflow-hidden border-y border-border bg-muted py-16 text-foreground md:py-24"
            style={backgroundStyle ? { backgroundColor: `hsl(var(${backgroundStyle}))` } : undefined}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-background" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-background" />
            <div className="container relative mx-auto flex max-w-theme flex-col items-center justify-between gap-8 px-6 text-center md:flex-row md:text-left">
                <div className="max-w-2xl">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-primary">Next Production</p>
                    <h2 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">
                        {headline}
                    </h2>
                    {subtext && (
                        <p className="mt-5 text-xl font-light leading-relaxed text-muted-foreground">
                            {subtext}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                    <a
                        href={primaryCtaUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform hover:scale-105"
                    >
                        {primaryCtaLabel}
                        <IconArrowRight size={20} />
                    </a>
                    
                    {secondaryCtaLabel && (
                        <a
                            href={secondaryCtaUrl}
                            className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-background/60 px-8 py-4 font-bold uppercase tracking-[0.22em] text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                            {secondaryCtaLabel}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
