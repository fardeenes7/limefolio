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
    const headline = (i.headline as string) || 'Core Technologies';
    const showCategories = i.showCategories !== false;

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
                        {headline}
                    </h2>
                </div>

                {showCategories && featuredSkills.length > 0 ? (
                    <div className="space-y-12">
                        {/* Featured */}
                        <div>
                            <div className="flex flex-wrap justify-center gap-4">
                                {featuredSkills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        className="px-6 py-3 rounded-full bg-background border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-default"
                                    >
                                        <span className="font-semibold text-foreground">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Others */}
                        {otherSkills.length > 0 && (
                            <div>
                                <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                                    Familiar With
                                </h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {otherSkills.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground cursor-default hover:bg-background hover:text-foreground transition-colors border border-transparent hover:border-border"
                                        >
                                            {skill.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-4">
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="px-5 py-2.5 rounded-full bg-background border border-border shadow-sm hover:border-primary transition-colors cursor-default"
                            >
                                <span className="font-medium text-foreground">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
