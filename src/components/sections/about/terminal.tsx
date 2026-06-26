import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function AboutTerminal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const bio = (i.bio as string) || siteData.description;

    if (!bio) return null;

    return (
        <section id="about" className="border-y border-border bg-background py-20 font-mono">
            <div className="mx-auto max-w-5xl px-6">
                <div className="rounded-lg border border-border bg-card">
                    <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
                        <span className="text-primary">$</span> man about
                    </div>
                    <div className="space-y-5 p-6 text-base leading-7 text-muted-foreground sm:p-8">
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-primary">NAME</h2>
                        <p className="text-2xl font-bold text-foreground">{siteData.title || 'portfolio'} - profile manual page</p>
                        <h2 className="pt-3 text-sm font-bold uppercase tracking-[0.25em] text-primary">DESCRIPTION</h2>
                        {bio.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph.trim()}</p>)}
                    </div>
                </div>
            </div>
        </section>
    );
}
