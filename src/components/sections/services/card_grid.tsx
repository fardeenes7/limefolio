/**
 * Services — Card Grid Variant
 *
 * Grid of service cards with icons, descriptions, and optional pricing.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconCheck } from '@tabler/icons-react';

export default function ServicesCardGrid({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || 'Services';
    const subheadline = (i.subheadline as string) || 'What I can do for you';
    const columns = (i.columns as number) || 3;

    const services = siteData.services || [];
    if (services.length === 0) return null;

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'md:grid-cols-2 lg:grid-cols-3';

    return (
        <section id="services" className="py-24 bg-background">
            <div className="container max-w-theme mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        {headline}
                    </h2>
                    {subheadline && (
                        <p className="text-lg text-muted-foreground max-w-theme mx-auto">
                            {subheadline}
                        </p>
                    )}
                </div>

                <div className={`grid gap-8 ${gridCols}`}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-card border border-border rounded-2xl p-8 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                {/* In a real app we'd map service.icon string to an actual icon */}
                                <IconCheck size={28} />
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-4">
                                {service.name}
                            </h3>

                            {service.description && (
                                <p className="text-muted-foreground mb-8 grow">
                                    {service.description}
                                </p>
                            )}

                            {service.price && (
                                <div className="mt-auto pt-6 border-t border-border flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-foreground">
                                        {service.price}
                                    </span>
                                    {service.price_unit && (
                                        <span className="text-sm font-medium text-muted-foreground">
                                            / {service.price_unit}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
