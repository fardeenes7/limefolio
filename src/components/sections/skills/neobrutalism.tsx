import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function SkillsNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Skills';
    const showProficiencyLevel = i.showProficiencyLevel === true;
    const layout = (i.layout as string) || 'compact';
    const skills = siteData.skills || [];

    if (skills.length === 0) return null;

    return (
        <section id="skills" className="border-b-4 border-border bg-secondary py-20 text-secondary-foreground">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-10 flex items-end justify-between gap-6">
                    <h2 className="border-4 border-border bg-background px-4 py-3 text-4xl font-black uppercase leading-none tracking-tighter text-foreground shadow-[8px_8px_0_hsl(var(--border))] sm:text-6xl">{sectionTitle}</h2>
                    <span className="hidden border-4 border-border bg-accent px-4 py-2 text-sm font-black uppercase text-accent-foreground sm:block">{skills.length} tools</span>
                </div>
                <div className={`flex flex-wrap ${layout === 'spacious' ? 'gap-5' : 'gap-3'}`}>
                    {skills.map((skill, index) => (
                        <div key={skill.id} className="border-4 border-border bg-card px-5 py-4 text-card-foreground shadow-[6px_6px_0_hsl(var(--border))]">
                            <span className="mr-3 text-sm font-black text-muted-foreground">#{String(index + 1).padStart(2, '0')}</span>
                            <span className="text-lg font-black uppercase">{skill.name}</span>
                            {showProficiencyLevel && skill.proficiency && <span className="ml-3 border-2 border-border bg-primary px-2 py-1 text-xs font-black text-primary-foreground">{skill.proficiency}%</span>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
