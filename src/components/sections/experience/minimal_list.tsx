import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

function formatYear(value?: string | null) {
    if (!value) return '';
    return new Date(value).getFullYear().toString();
}

export default function ExperienceMinimalList({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Experience';
    const experiences = siteData.experiences || [];

    if (experiences.length === 0) return null;

    return (
        <section id="experience" className="bg-background py-12">
            <div className="mx-auto max-w-3xl px-6">
                <div className="border-t border-border pt-8">
                    {sectionTitle && <h2 className="mb-5 text-sm font-medium text-foreground">{sectionTitle}</h2>}
                    <div className="divide-y divide-border">
                        {experiences.map((experience) => {
                            const startYear = formatYear(experience.start_date);
                            const endYear = experience.is_current ? 'Now' : formatYear(experience.end_date);
                            const range = [startYear, endYear].filter(Boolean).join(' - ');

                            return (
                                <div key={experience.id} className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr]">
                                    <p className="text-sm text-muted-foreground">{range}</p>
                                    <div>
                                        <h3 className="font-medium text-foreground">{experience.position}</h3>
                                        <p className="text-sm text-muted-foreground">{experience.company}</p>
                                        {experience.description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{experience.description}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
