import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function StatsMinimalRow({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || '';
    const stats = siteData.stats || [];

    if (stats.length === 0) return null;

    return (
        <section className="bg-background py-12">
            <div className="mx-auto max-w-3xl px-6">
                <div className="border-t border-border pt-8">
                    {sectionTitle && <h2 className="mb-5 text-sm font-medium text-foreground">{sectionTitle}</h2>}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.id}>
                                <p className="text-2xl font-semibold tracking-tight text-foreground">
                                    {stat.value}{stat.suffix}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
