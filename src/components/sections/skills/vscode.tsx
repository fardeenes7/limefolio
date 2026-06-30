import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconBox, IconStar } from '@tabler/icons-react';

export default function SkillsVsCode({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Extensions';
    const showProficiencyLevel = i.showProficiencyLevel === true;
    const skills = siteData.skills || [];

    if (skills.length === 0) return null;

    return (
        <section id="skills" className="bg-background py-8 font-mono">
            <div className="mx-auto max-w-theme px-4 sm:px-6">
                <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">{sectionTitle}</h2>
                    <span className="text-xs text-muted-foreground">{skills.length} installed</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill) => (
                        <div key={skill.id} className="rounded border border-border bg-card p-4 text-sm transition hover:border-primary/60 hover:bg-muted/30">
                            <div className="flex items-start gap-3">
                                <div className="grid size-9 shrink-0 place-items-center rounded bg-primary/10 text-primary"><IconBox size={18} /></div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="truncate font-semibold text-foreground">{skill.name}</h3>
                                        {skill.is_featured && <IconStar size={14} className="text-primary" />}
                                    </div>
                                    {skill.category && <p className="mt-1 text-xs text-muted-foreground">@category/{skill.category}</p>}
                                    {showProficiencyLevel && skill.proficiency && <p className="mt-2 text-xs text-muted-foreground">activation: {skill.proficiency}%</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
