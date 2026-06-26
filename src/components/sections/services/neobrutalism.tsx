import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconCheck } from '@tabler/icons-react';

export default function ServicesNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Services';
    const showPricing = i.showPricing === true;
    const columns = parseInt((i.columns as string) || '3', 10);
    const services = siteData.services || [];

    if (services.length === 0) return null;

    const gridCols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }[columns] || 'md:grid-cols-2 lg:grid-cols-3';

    return (
        <section id="services" className="border-b-4 border-border bg-accent py-20 text-accent-foreground">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="mb-10 text-5xl font-black uppercase leading-none tracking-tighter sm:text-7xl">{sectionTitle}</h2>
                <div className={`grid gap-6 ${gridCols}`}>
                    {services.map((service) => (
                        <article key={service.id} className="flex h-full flex-col border-4 border-border bg-card p-6 text-card-foreground shadow-[8px_8px_0_hsl(var(--border))]">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center border-4 border-border bg-primary text-primary-foreground"><IconCheck size={28} /></div>
                            <h3 className="text-2xl font-black uppercase leading-none tracking-tight">{service.name}</h3>
                            {service.description && <p className="mt-4 grow font-semibold leading-relaxed text-muted-foreground">{service.description}</p>}
                            {showPricing && service.price && <div className="mt-8 border-t-4 border-border pt-4 text-2xl font-black">{service.price}{service.price_unit && <span className="text-sm uppercase text-muted-foreground"> / {service.price_unit}</span>}</div>}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
