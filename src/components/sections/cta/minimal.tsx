/**
 * CTA — Minimal Variant
 *
 * A very simple, inline CTA without much background or padding. Good for blog posts.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';

export default function CtaMinimal({ section }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || "Let's Work Together";
    const subtext = (i.subtext as string) || '';
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'Get In Touch';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '/contact';

    return (
        <section className="py-12 bg-background border-t border-border mt-12">
            <div className="container max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">
                        {headline}
                    </h2>
                    {subtext && (
                        <p className="text-muted-foreground mt-1">
                            {subtext}
                        </p>
                    )}
                </div>

                <a
                    href={primaryCtaUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shrink-0"
                >
                    {primaryCtaLabel}
                    <IconArrowRight size={18} />
                </a>
            </div>
        </section>
    );
}
