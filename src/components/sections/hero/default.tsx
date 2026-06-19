/**
 * Hero — Default Variant
 *
 * Full-bleed hero with headline, subheadline, user avatar, two CTAs,
 * and social links.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
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

export default function HeroDefault({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;

    // Inputs
    const headline = (i.headline as string) || siteData.title || 'Welcome';
    const subheadline = (i.subheadline as string) || siteData.tagline;
    const body = (i.body as string) || siteData.description;
    const showAvatar = i.showAvatar !== false;
    const showSocialLinks = i.showSocialLinks !== false;
    const showScrollIndicator = i.showScrollIndicator !== false;

    // CTAs
    const primaryCtaText = (i.primaryCtaText as string) || 'View My Work';
    const primaryCtaLink = (i.primaryCtaLink as string) || '#projects';
    const secondaryCtaText = (i.secondaryCtaText as string) || 'Get In Touch';
    const secondaryCtaLink = (i.secondaryCtaLink as string) || '#contact';

    // Socials
    const socialLinks = siteData.social_links || [];

    // Avatar (fallback to an abstract gradient if none)
    const avatarUrl = siteData.logo; // For now we'll use logo as avatar if present

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

            <div className="container max-w-4xl mx-auto px-6 py-20 relative z-10 text-center">
                {/* Avatar */}
                {showAvatar && avatarUrl && (
                    <div className="mb-8 inline-block">
                        <img
                            src={avatarUrl}
                            alt={siteData.title}
                            className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-xl ring-2 ring-border"
                        />
                    </div>
                )}
                {!avatarUrl && showAvatar && (
                    <div className="mb-8 inline-block w-24 h-24 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border-4 border-background shadow-xl ring-2 ring-border" />
                )}

                {/* Typography */}
                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                    {headline}
                </h1>

                {subheadline && (
                    <p className="text-xl sm:text-2xl text-primary font-medium mb-6">
                        {subheadline}
                    </p>
                )}

                {body && (
                    <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        {body}
                    </p>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    {primaryCtaText && (
                        <a
                            href={primaryCtaLink}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-105 transition-all shadow-lg"
                        >
                            {primaryCtaText}
                            <IconArrowRight size={20} />
                        </a>
                    )}
                    {secondaryCtaText && (
                        <a
                            href={secondaryCtaLink}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-border bg-background text-foreground font-semibold hover:bg-muted transition-all"
                        >
                            {secondaryCtaText}
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
                                    className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all shadow-sm"
                                    aria-label={link.platform}
                                >
                                    <Icon size={20} />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Scroll Indicator */}
            {showScrollIndicator && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
                    <div className="w-px h-6 bg-muted-foreground" />
                </div>
            )}
        </section>
    );
}
