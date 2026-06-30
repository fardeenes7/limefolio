/**
 * Experience — Timeline Variant
 *
 * Vertical timeline layout displaying roles sequentially. Grouped nicely
 * by "Current" vs past years.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconBriefcase } from '@tabler/icons-react';

export default function ExperienceTimeline({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || 'Experience';
    const showDescriptions = i.showDescriptions !== false;

    const experiences = siteData.experiences || [];
    if (experiences.length === 0) return null;

    return (
        <section id="experience" className="py-24 bg-background">
            <div className="container max-w-theme mx-auto px-6">
                <div className="flex items-center gap-3 mb-16">
                    <IconBriefcase className="text-primary" size={32} />
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        {headline}
                    </h2>
                </div>

                <div className="relative border-l border-border/60 ml-4 md:ml-6 space-y-12 pb-4">
                    {experiences.map((exp) => {
                        const startYear = new Date(exp.start_date).getFullYear();
                        const endYear = exp.is_current ? 'Present' : exp.end_date ? new Date(exp.end_date).getFullYear() : '';
                        const dateString = endYear ? `${startYear} — ${endYear}` : startYear;

                        return (
                            <div key={exp.id} className="relative pl-8 md:pl-12">
                                {/* Timeline dot */}
                                <div className={`absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background ${exp.is_current ? 'bg-primary ring-2 ring-primary/20' : 'bg-muted-foreground'}`} />

                                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">
                                            {exp.position}
                                        </h3>
                                        <div className="text-lg font-medium text-primary mt-1">
                                            {exp.company}
                                            {exp.location && <span className="text-muted-foreground font-normal text-sm ml-2">• {exp.location}</span>}
                                        </div>
                                    </div>
                                    <div className="shrink-0 text-sm font-semibold tracking-wider uppercase text-muted-foreground bg-muted px-3 py-1 rounded-md w-fit">
                                        {dateString}
                                    </div>
                                </div>

                                {showDescriptions && exp.description && (
                                    <div className="text-muted-foreground leading-relaxed space-y-4 mt-4">
                                        {exp.description.split(/\n\s*\n/).map((p, idx) => (
                                            <p key={idx}>{p.trim()}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
