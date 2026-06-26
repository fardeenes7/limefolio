import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconDownload } from '@tabler/icons-react';

export default function AboutNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const bio = (i.bio as string) || siteData.description;
    const showProfileImage = i.showProfileImage !== false;
    const showResumeButton = i.showResumeButton !== false;
    const resumeFile = (i.resumeFile as string) || '#';
    const resumeLabel = (i.resumeLabel as string) || 'Download Resume';
    const imageUrl = (i.profileImage as string) || siteData.logo;

    return (
        <section id="about" className="border-b-4 border-border bg-muted py-20">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[20rem_1fr]">
                {showProfileImage && (
                    <div className="border-4 border-border bg-primary p-3 shadow-[10px_10px_0_hsl(var(--border))] lg:-rotate-2">
                        {imageUrl ? <img src={imageUrl} alt="About me" className="aspect-[4/5] w-full border-4 border-border object-cover" /> : <div className="aspect-[4/5] w-full border-4 border-border bg-secondary" />}
                    </div>
                )}
                <div className="border-4 border-border bg-background p-6 shadow-[10px_10px_0_hsl(var(--border))] sm:p-10">
                    <p className="mb-4 inline-block border-4 border-border bg-accent px-3 py-1 text-sm font-black uppercase text-accent-foreground">About</p>
                    <h2 className="text-4xl font-black uppercase leading-none tracking-tighter text-foreground sm:text-6xl">The short version</h2>
                    {bio ? (
                        <div className="mt-8 space-y-5 text-lg font-semibold leading-relaxed text-foreground">
                            {bio.split(/\n\s*\n/).map((paragraph, idx) => <p key={idx}>{paragraph.trim()}</p>)}
                        </div>
                    ) : <p className="mt-8 text-lg font-semibold text-muted-foreground">Add your bio here.</p>}
                    {showResumeButton && (
                        <a href={resumeFile} className="mt-8 inline-flex items-center gap-2 border-4 border-border bg-primary px-6 py-3 text-sm font-black uppercase text-primary-foreground shadow-[6px_6px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">
                            <IconDownload size={20} />{resumeLabel}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
