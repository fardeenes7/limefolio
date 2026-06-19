/**
 * Stats — Counter Row Variant
 *
 * Horizontal row of stats with labels and optional icons.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function StatsCounterRow({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || '';

    const stats = siteData.stats || [];
    if (stats.length === 0) return null;

    return (
        <section className="py-16 bg-primary text-primary-foreground">
            <div className="container max-w-7xl mx-auto px-6">
                {headline && (
                    <h2 className="text-2xl font-bold text-center mb-12 text-primary-foreground/90">
                        {headline}
                    </h2>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-primary-foreground/20">
                    {stats.map((stat, idx) => (
                        <div key={stat.id} className={`flex flex-col ${idx === 0 ? 'border-l-0' : ''}`}>
                            <div className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                                {stat.value}
                                {stat.suffix && <span className="text-primary-foreground/70">{stat.suffix}</span>}
                            </div>
                            <div className="text-sm md:text-base font-medium uppercase tracking-widest text-primary-foreground/80">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
