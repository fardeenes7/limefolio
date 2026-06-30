import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function StatsNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || '';
    const stats = siteData.stats || [];

    if (stats.length === 0) return null;

    return (
        <section className="border-b-4 border-border bg-primary py-14 text-primary-foreground">
            <div className="mx-auto max-w-theme px-6">
                {sectionTitle && <h2 className="mb-8 text-4xl font-black uppercase leading-none tracking-tighter">{sectionTitle}</h2>}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.id} className="border-4 border-border bg-background p-5 text-foreground shadow-[8px_8px_0_hsl(var(--border))]">
                            <div className="text-5xl font-black leading-none tracking-tighter">{stat.value}{stat.suffix && <span className="text-2xl text-accent">{stat.suffix}</span>}</div>
                            <div className="mt-3 text-sm font-black uppercase tracking-wide text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
