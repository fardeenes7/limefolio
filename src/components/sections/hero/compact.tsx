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

export default function HeroCompact({ section, siteData }: SectionProps) {
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
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '/contact';

    // Socials
    const socialLinks = siteData.social_links || [];

    // Avatar
    const avatarUrl = (i.avatarImage as string) || siteData.logo;

    return (
        <section 
            className="relative py-12 md:py-20 flex items-center overflow-hidden bg-background"
            style={{ paddingTop: paddingTop ? `${paddingTop}px` : undefined, paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined }}
        >
            <HeroBackground section={section} />

            <div className="container max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-8">
                {/* Avatar / Left Side */}
                {showAvatar && avatarUrl && (
                    <div className="shrink-0">
                        <img
                            src={avatarUrl}
                            alt={siteData.title}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-background shadow-xl ring-2 ring-border"
                        />
                    </div>
                )}
                {!avatarUrl && showAvatar && (
                    <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border-4 border-background shadow-xl ring-2 ring-border" />
                )}

                {/* Typography / Right Side */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
                        {headline}
                    </h1>

                    {subheadline && (
                        <p className="text-lg sm:text-xl text-primary font-medium mb-4">
                            {subheadline}
                        </p>
                    )}

                    {body && (
                        <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                            {body}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4">
                        {primaryCtaLabel && (
                            <a
                                href={primaryCtaUrl}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md"
                            >
                                {primaryCtaLabel}
                                <IconArrowRight size={18} />
                            </a>
                        )}
                        {secondaryCtaLabel && (
                            <a
                                href={secondaryCtaUrl}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-border bg-background text-foreground font-semibold hover:bg-muted transition-all"
                            >
                                {secondaryCtaLabel}
                            </a>
                        )}
                    </div>
                </div>

                {/* Social Links on far right for large screens */}
                {showSocialLinks && socialLinks.length > 0 && (
                    <div className="flex md:flex-col items-center justify-center gap-3 shrink-0 mt-6 md:mt-0">
                        {socialLinks.map((link) => {
                            const Icon = socialIconsMap[link.platform] || IconExternalLink;
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
                                    aria-label={link.platform}
                                >
                                    <Icon size={18} />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
