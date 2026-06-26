import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';

export default function CtaTerminal({ section }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || 'Ready to deploy?';
    const subtext = (i.subtext as string) || '';
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'ssh contact';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '/contact';

    return (
        <section className="bg-background py-14 font-mono">
            <div className="mx-auto max-w-5xl px-6">
                <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
                    <p className="text-sm text-muted-foreground"><span className="text-primary">$</span> ./next-step</p>
                    <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">{headline}</h2>
                            {subtext && <p className="mt-2 text-muted-foreground">{subtext}</p>}
                        </div>
                        <a href={primaryCtaUrl} className="inline-flex shrink-0 items-center justify-center gap-2 rounded border border-primary/40 bg-primary/10 px-5 py-3 font-semibold text-primary hover:bg-primary hover:text-primary-foreground">{primaryCtaLabel}<IconArrowRight size={17} /></a>
                    </div>
                </div>
            </div>
        </section>
    );
}
