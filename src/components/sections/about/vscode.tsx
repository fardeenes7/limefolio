import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function AboutVsCode({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const bio = (i.bio as string) || siteData.description;

    if (!bio) return null;

    return (
        <section id="about" className="bg-background py-8 font-mono">
            <div className="mx-auto max-w-theme px-4 sm:px-6">
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">about.md</div>
                    <article className="space-y-5 p-5 text-sm leading-7 text-muted-foreground sm:p-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">## About</h2>
                        {bio.split(/\n\s*\n/).map((paragraph, index) => (
                            <p key={index}><span className="select-none text-primary">{String(index + 1).padStart(2, '0')}</span> {paragraph.trim()}</p>
                        ))}
                    </article>
                </div>
            </div>
        </section>
    );
}
