import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { HeroBackground } from './HeroBackground';
import {
    IconArrowRight,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconExternalLink,
} from '@tabler/icons-react';

const socialIconsMap: Record<string, any> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function HeroCentered({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;

    // Inputs
    const headline = (i.headline as string) || siteData.title || 'Welcome';
    const subheadline = (i.subheadline as string) || siteData.tagline;
    const body = (i.body as string) || siteData.description;
    const showAvatar = i.showAvatar !== false;
    const showSocialLinks = i.showSocialLinks !== false;
    
    // Layout
    const paddingTop = (i.paddingTop as number) || 0;
    const paddingBottom = (i.paddingBottom as number) || 0;

    // CTAs
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'View My Work';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '#projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'Get In Touch';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '#contact';

    // Socials
    const socialLinks = siteData.social_links || [];

    // Avatar
    const avatarUrl = (i.avatarImage as string) || siteData.logo;

    return (
        <section 
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background text-center"
            style={{ paddingTop: `calc(${paddingTop || 0}px + var(--header-offset, 0px))`, paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined }}
        >
            <HeroBackground section={section} />

            <div className="container max-w-3xl mx-auto px-6 py-20 relative z-10 flex flex-col items-center text-center">
                
                {/* Avatar */}
                {showAvatar && avatarUrl && (
                    <div className="mb-8">
                        <img
                            src={avatarUrl}
                            alt={siteData.title}
                            className="w-28 h-28 rounded-full object-cover shadow-xl border-2 border-border"
                        />
                    </div>
                )}
                {!avatarUrl && showAvatar && (
                    <div className="mb-8 w-28 h-28 rounded-full bg-linear-to-br from-primary/20 to-primary/5 shadow-xl border-2 border-border" />
                )}

                {/* Typography */}
                {subheadline && (
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase mb-6">
                        {subheadline}
                    </span>
                )}

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                    {headline}
                </h1>

                {body && (
                    <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        {body}
                    </p>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
                    {primaryCtaLabel && (
                        <a
                            href={primaryCtaUrl}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md"
                        >
                            {primaryCtaLabel}
                            <IconArrowRight size={18} />
                        </a>
                    )}
                    {secondaryCtaLabel && (
                        <a
                            href={secondaryCtaUrl}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-border bg-background text-foreground font-semibold hover:bg-muted transition-all"
                        >
                            {secondaryCtaLabel}
                        </a>
                    )}
                </div>

                {/* Social Links */}
                {showSocialLinks && socialLinks.length > 0 && (
                    <div className="flex items-center justify-center gap-4">
                        {socialLinks.map((link) => {
                            const Icon = socialIconsMap[link.platform] || IconExternalLink;
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-full text-muted-foreground hover:text-foreground transition-all hover:bg-muted"
                                    aria-label={link.platform}
                                >
                                    <Icon size={22} />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>

        </section>
    );
}
