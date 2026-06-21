/**
 * Skills — Icon Grid Variant
 *
 * Simple grid of skill tags grouped by featured vs other, or just a flat list
 * if category grouping is not used.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconCode } from '@tabler/icons-react';

export default function SkillsIconGrid({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Skills';
    const showProficiencyLevel = i.showProficiencyLevel === true;
    const layout = (i.layout as string) || 'compact';

    const skills = siteData.skills || [];

    if (skills.length === 0) return null;

    const featuredSkills = skills.filter((s) => s.is_featured);
    const otherSkills = skills.filter((s) => !s.is_featured);

    return (
        <section id="skills" className="py-24 bg-muted/30">
            <div className="container max-w-5xl mx-auto px-6">
                <div className="flex items-center gap-3 justify-center mb-12">
                    <IconCode className="text-primary" size={32} />
                    <h2 className="text-3xl font-bold text-foreground">
                        {sectionTitle}
                    </h2>
                </div>

                <div className={`flex flex-wrap justify-center ${layout === 'spacious' ? 'gap-6' : 'gap-4'}`}>
                    {skills.map((skill) => (
                        <div
                            key={skill.id}
                            className={`rounded-full bg-background border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-default flex items-center gap-2 ${layout === 'spacious' ? 'px-8 py-4 text-lg' : 'px-6 py-3'}`}
                        >
                            <span className="font-semibold text-foreground">
                                {skill.name}
                            </span>
                            {showProficiencyLevel && skill.proficiency_percentage && (
                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/10 text-primary ml-2">
                                    {skill.proficiency_percentage}%
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
