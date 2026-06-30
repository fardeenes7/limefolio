import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function AboutMinimal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const bio = (i.bio as string) || siteData.description;

    if (!bio) return null;

    return (
        <section id="about" className="bg-background py-12">
            <div className="mx-auto max-w-theme px-6">
                <div className="border-t border-border pt-8">
                    <h2 className="mb-5 text-sm font-medium text-foreground">About</h2>
                    <div className="space-y-4 text-base leading-8 text-muted-foreground">
                        {bio.split(/\n\s*\n/).map((paragraph, idx) => (
                            <p key={idx}>{paragraph.trim()}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
