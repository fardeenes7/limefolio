import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from '@tabler/icons-react';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function HeroNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'Welcome';
    const subheadline = (i.subheadline as string) || siteData.tagline;
    const body = (i.body as string) || siteData.description;
    const showAvatar = i.showAvatar !== false;
    const showSocialLinks = i.showSocialLinks !== false;
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'View My Work';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '#projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'Get In Touch';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '/contact';
    const avatarUrl = (i.avatarImage as string) || siteData.logo;
    const socialLinks = siteData.social_links || [];

    return (
        <section className="relative overflow-hidden border-b-4 border-border bg-background py-20 sm:py-28">
            <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_2px,transparent_2px),linear-gradient(90deg,hsl(var(--border))_2px,transparent_2px)] bg-[size:48px_48px] opacity-10" />
            <div className="relative mx-auto grid max-w-theme gap-10 px-6 lg:grid-cols-[1fr_22rem] lg:items-center">
                <div>
                    <div className="mb-6 inline-flex border-4 border-border bg-secondary px-4 py-2 text-sm font-black uppercase text-secondary-foreground shadow-[6px_6px_0_hsl(var(--border))]">
                        {subheadline || 'Available for bold work'}
                    </div>
                    <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
                        {headline}
                    </h1>
                    {body && <p className="mt-8 max-w-2xl border-l-4 border-border bg-card p-5 text-lg font-semibold leading-relaxed text-card-foreground shadow-[8px_8px_0_hsl(var(--border))]">{body}</p>}

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        {primaryCtaLabel && (
                            <a href={primaryCtaUrl} className="inline-flex items-center justify-center gap-2 border-4 border-border bg-accent px-8 py-4 text-base font-black uppercase text-accent-foreground shadow-[8px_8px_0_hsl(var(--border))] transition-transform hover:-translate-x-1 hover:-translate-y-1">
                                {primaryCtaLabel}<IconArrowRight size={20} />
                            </a>
                        )}
                        {secondaryCtaLabel && <a href={secondaryCtaUrl} className="inline-flex items-center justify-center border-4 border-border bg-background px-8 py-4 text-base font-black uppercase text-foreground shadow-[8px_8px_0_hsl(var(--border))] transition-transform hover:-translate-x-1 hover:-translate-y-1">{secondaryCtaLabel}</a>}
                    </div>
                </div>

                <div className="space-y-6">
                    {showAvatar && (
                        <div className="rotate-2 border-4 border-border bg-primary p-4 shadow-[12px_12px_0_hsl(var(--border))]">
                            {avatarUrl ? <img src={avatarUrl} alt={siteData.title || 'Portfolio avatar'} className="aspect-square w-full border-4 border-border object-cover" /> : <div className="aspect-square w-full border-4 border-border bg-secondary" />}
                        </div>
                    )}
                    {showSocialLinks && socialLinks.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((link) => {
                                const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                return <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="border-4 border-border bg-card p-3 text-card-foreground shadow-[4px_4px_0_hsl(var(--border))] hover:bg-primary" aria-label={link.platform}><Icon size={20} /></a>;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
