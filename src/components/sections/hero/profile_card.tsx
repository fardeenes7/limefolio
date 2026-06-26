import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from '@tabler/icons-react';

const socialIconsMap: Record<string, any> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function HeroProfileCard({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'Welcome';
    const subheadline = (i.subheadline as string) || siteData.tagline;
    const body = (i.body as string) || siteData.description;
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'View My Work';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '#projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'Contact Me';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '/contact';
    const avatarUrl = (i.avatarImage as string) || siteData.logo;
    const socialLinks = siteData.social_links || [];

    return (
        <section className="relative overflow-hidden bg-muted/20 py-20 md:py-28">
            <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-primary/10 to-transparent" />
            <div className="container relative z-10 mx-auto max-w-6xl px-6">
                <div className="grid items-center gap-10 rounded-[2rem] border border-border bg-card p-6 shadow-2xl shadow-foreground/5 md:grid-cols-[0.9fr_1.1fr] md:p-10">
                    <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-border bg-muted">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt={siteData.title} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/20 to-accent/20 text-muted-foreground">
                                No image
                            </div>
                        )}
                    </div>

                    <div className="text-center md:text-left">
                        {subheadline && (
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                                {subheadline}
                            </p>
                        )}
                        <h1 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">
                            {headline}
                        </h1>
                        {body && (
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                {body}
                            </p>
                        )}

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                            <a href={primaryCtaUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                                {primaryCtaLabel}
                                <IconArrowRight size={18} />
                            </a>
                            {secondaryCtaLabel && (
                                <a href={secondaryCtaUrl} className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3 font-semibold text-foreground transition-colors hover:bg-muted">
                                    {secondaryCtaLabel}
                                </a>
                            )}
                        </div>

                        {socialLinks.length > 0 && (
                            <div className="mt-8 flex justify-center gap-3 md:justify-start">
                                {socialLinks.map((link) => {
                                    const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                    return (
                                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-background p-3 text-muted-foreground transition-colors hover:text-primary" aria-label={link.platform}>
                                            <Icon size={18} />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
