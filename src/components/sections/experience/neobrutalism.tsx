import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

function formatYear(value?: string | null) {
    if (!value) return '';
    return new Date(value).getFullYear().toString();
}

export default function ExperienceNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Experience';
    const experiences = siteData.experiences || [];

    if (experiences.length === 0) return null;

    return (
        <section id="experience" className="border-b-4 border-border bg-background py-20">
            <div className="mx-auto max-w-theme px-6">
                <h2 className="mb-10 text-5xl font-black uppercase leading-none tracking-tighter text-foreground sm:text-7xl">{sectionTitle}</h2>
                <div className="space-y-6">
                    {experiences.map((experience, index) => {
                        const startYear = formatYear(experience.start_date);
                        const endYear = experience.is_current ? 'Now' : formatYear(experience.end_date);
                        const range = [startYear, endYear].filter(Boolean).join(' - ');

                        return (
                            <article key={experience.id} className="grid gap-5 border-4 border-border bg-card p-5 text-card-foreground shadow-[8px_8px_0_hsl(var(--border))] md:grid-cols-[8rem_1fr]">
                                <div className="flex h-fit items-center justify-between border-4 border-border bg-primary px-3 py-2 text-sm font-black uppercase text-primary-foreground md:block md:text-center">
                                    <span>#{index + 1}</span><span className="md:mt-2 md:block">{range}</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black uppercase leading-none tracking-tight">{experience.position}</h3>
                                    <p className="mt-2 text-lg font-black text-accent">{experience.company}{experience.location && <span className="text-muted-foreground"> / {experience.location}</span>}</p>
                                    {experience.description && <p className="mt-4 font-semibold leading-relaxed text-muted-foreground">{experience.description}</p>}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
