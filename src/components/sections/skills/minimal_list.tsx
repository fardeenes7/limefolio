import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function SkillsMinimalList({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Stack';
    const skills = siteData.skills || [];

    if (skills.length === 0) return null;

    return (
        <section id="skills" className="bg-background py-12">
            <div className="mx-auto max-w-theme px-6">
                <div className="border-t border-border pt-8">
                    {sectionTitle && <h2 className="mb-5 text-sm font-medium text-foreground">{sectionTitle}</h2>}
                    <p className="text-base leading-8 text-muted-foreground">
                        {skills.map((skill) => skill.name).join(', ')}
                    </p>
                </div>
            </div>
        </section>
    );
}
