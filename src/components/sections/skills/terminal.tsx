import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function SkillsTerminal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Skills';
    const showProficiencyLevel = i.showProficiencyLevel === true;
    const skills = siteData.skills || [];

    if (skills.length === 0) return null;

    return (
        <section id="skills" className="bg-card py-20 font-mono">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-8 flex items-center justify-between border-b border-border pb-3">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">$ ls ./stack --long</h2>
                    <span className="text-xs text-muted-foreground">{skills.length} packages</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill) => (
                        <div key={skill.id} className="rounded border border-border bg-background px-4 py-3 text-sm">
                            <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold text-foreground">{sectionTitle.toLowerCase()}/{skill.name.toLowerCase().replace(/\s+/g, '-')}</span>
                                {skill.is_featured && <span className="text-primary">*</span>}
                            </div>
                            {showProficiencyLevel && skill.proficiency && <div className="mt-2 text-xs text-muted-foreground">chmod {skill.proficiency}%</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
