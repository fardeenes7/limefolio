/**
 * CTA — Card Variant
 *
 * A compact CTA inside a styled card.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';

export default function CtaCard({ section }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || "Let's Work Together";
    const subtext = (i.subtext as string) || '';
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'Get In Touch';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '/contact';
    const backgroundStyle = (i.backgroundStyle as string) || '';

    return (
        <section className="py-24 bg-background">
            <div className="container max-w-4xl mx-auto px-6">
                <div 
                    className="p-12 md:p-16 rounded-3xl text-center bg-card border border-border shadow-xl relative overflow-hidden"
                    style={backgroundStyle ? { backgroundColor: `hsl(var(${backgroundStyle}))` } : undefined}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground mb-4">
                        {headline}
                    </h2>
                    
                    {subtext && (
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            {subtext}
                        </p>
                    )}

                    <a
                        href={primaryCtaUrl}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-md"
                    >
                        {primaryCtaLabel}
                        <IconArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
}
