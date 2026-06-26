import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';

export default function CtaNeobrutalism({ section }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || "Let's Work Together";
    const subtext = (i.subtext as string) || '';
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'Get In Touch';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '/contact';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || '';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '';

    return (
        <section className="border-b-4 border-border bg-primary py-16 text-primary-foreground">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-8 border-4 border-border bg-background p-6 text-foreground shadow-[12px_12px_0_hsl(var(--border))] md:grid-cols-[1fr_auto] md:items-center md:p-10">
                    <div>
                        <p className="mb-3 inline-block border-4 border-border bg-accent px-3 py-1 text-xs font-black uppercase text-accent-foreground">Call to action</p>
                        <h2 className="text-4xl font-black uppercase leading-none tracking-tighter sm:text-6xl">{headline}</h2>
                        {subtext && <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-muted-foreground">{subtext}</p>}
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row md:flex-col">
                        <a href={primaryCtaUrl} className="inline-flex items-center justify-center gap-2 border-4 border-border bg-accent px-7 py-4 text-sm font-black uppercase text-accent-foreground shadow-[6px_6px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">{primaryCtaLabel}<IconArrowRight size={18} /></a>
                        {secondaryCtaLabel && <a href={secondaryCtaUrl} className="inline-flex items-center justify-center border-4 border-border bg-secondary px-7 py-4 text-sm font-black uppercase text-secondary-foreground shadow-[6px_6px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">{secondaryCtaLabel}</a>}
                    </div>
                </div>
            </div>
        </section>
    );
}
