/**
 * Skills — Tag Cloud Variant
 *
 * A dense, unstructured layout of skill tags resembling a terminal output.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function SkillsTagCloud({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Skills';
    const showProficiencyLevel = i.showProficiencyLevel === true;

    const skills = siteData.skills || [];
    if (skills.length === 0) return null;

    return (
        <section id="skills" className="py-24 bg-background font-mono border-y border-border/50">
            <div className="container max-w-4xl mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-12">
                    {sectionTitle && (
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            {sectionTitle}
                        </h2>
                    )}
                    <div className="w-12 h-1 bg-primary/50" />
                </div>

                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {skills.map((skill) => {
                        // Vary opacity based on featured status to create depth
                        const opacityClass = skill.is_featured ? 'text-primary' : 'text-muted-foreground';
                        const borderClass = skill.is_featured ? 'border-primary/40 bg-primary/5' : 'border-border bg-card hover:border-primary/30';
                        
                        return (
                            <div
                                key={skill.id}
                                className={`px-4 py-2 border rounded-md transition-colors cursor-default flex items-center gap-2 ${borderClass} ${opacityClass}`}
                            >
                                <span className="font-medium">
                                    {skill.name}
                                </span>
                                {showProficiencyLevel && skill.proficiency && (
                                    <span className="text-xs opacity-50 ml-1 capitalize">
                                        [{skill.proficiency}]
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
