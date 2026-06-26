import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from '@tabler/icons-react';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function HeroNeobrutalismPoster({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'Welcome';
    const subheadline = (i.subheadline as string) || siteData.tagline || 'Independent maker available for sharp launches';
    const body = (i.body as string) || siteData.description;
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'View My Work';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '#projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'Get In Touch';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '/contact';
    const showSocialLinks = i.showSocialLinks !== false;
    const socialLinks = siteData.social_links || [];

    return (
        <section className="relative overflow-hidden border-b-4 border-border bg-primary py-14 text-primary-foreground sm:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--border))_1.5px,transparent_1.5px)] bg-[size:20px_20px] opacity-20" />
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid min-h-[72vh] border-4 border-border bg-background text-foreground shadow-[16px_16px_0_hsl(var(--border))] lg:grid-cols-[1fr_19rem]">
                    <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
                        <div>
                            <div className="mb-8 flex flex-wrap gap-3 text-xs font-black uppercase">
                                <span className="border-4 border-border bg-accent px-3 py-2 text-accent-foreground">Now booking</span>
                                <span className="border-4 border-border bg-secondary px-3 py-2 text-secondary-foreground">No soft edges</span>
                            </div>
                            <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.82] tracking-tighter sm:text-8xl lg:text-9xl">
                                {headline}
                            </h1>
                        </div>

                        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                            <div>
                                <p className="border-l-4 border-border pl-4 text-xl font-black uppercase leading-tight text-accent sm:text-2xl">{subheadline}</p>
                                {body && <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-muted-foreground sm:text-lg">{body}</p>}
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                {primaryCtaLabel && <a href={primaryCtaUrl} className="inline-flex items-center justify-center gap-2 border-4 border-border bg-accent px-7 py-4 text-sm font-black uppercase text-accent-foreground shadow-[6px_6px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">{primaryCtaLabel}<IconArrowRight size={18} /></a>}
                                {secondaryCtaLabel && <a href={secondaryCtaUrl} className="inline-flex items-center justify-center border-4 border-border bg-secondary px-7 py-4 text-sm font-black uppercase text-secondary-foreground shadow-[6px_6px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">{secondaryCtaLabel}</a>}
                            </div>
                        </div>
                    </div>

                    <aside className="border-t-4 border-border bg-muted p-6 lg:border-l-4 lg:border-t-0">
                        <div className="grid h-full content-between gap-6">
                            <div className="border-4 border-border bg-card p-5 shadow-[8px_8px_0_hsl(var(--border))]">
                                <p className="text-xs font-black uppercase text-muted-foreground">Portfolio signal</p>
                                <p className="mt-3 text-5xl font-black leading-none tracking-tighter text-foreground">LOUD</p>
                                <p className="mt-2 text-sm font-semibold text-muted-foreground">Fast pages, bold work, visible proof.</p>
                            </div>
                            {showSocialLinks && socialLinks.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((link) => {
                                        const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                        return <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="border-4 border-border bg-background p-3 text-foreground shadow-[4px_4px_0_hsl(var(--border))] hover:bg-primary" aria-label={link.platform}><Icon size={20} /></a>;
                                    })}
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
