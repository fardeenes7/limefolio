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

export default function HeroSplitSection({ section, siteData }: SectionProps) {
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

    // Avatar / Image side
    const avatarUrl = (i.avatarImage as string) || siteData.logo;

    return (
        <section 
            className="relative min-h-[85vh] flex items-center overflow-hidden bg-background"
            style={{ paddingTop: paddingTop ? `${paddingTop}px` : undefined, paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined }}
        >
            <HeroBackground section={section} />

            <div className="container max-w-6xl mx-auto px-6 py-20 relative z-10 flex flex-col md:flex-row items-center gap-12">
                
                {/* Typography / Left Side */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                        {headline}
                    </h1>

                    {subheadline && (
                        <p className="text-xl sm:text-2xl text-primary font-medium mb-6">
                            {subheadline}
                        </p>
                    )}

                    {body && (
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                            {body}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4 mb-8">
                        {primaryCtaLabel && (
                            <a
                                href={primaryCtaUrl}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg"
                            >
                                {primaryCtaLabel}
                                <IconArrowRight size={20} />
                            </a>
                        )}
                        {secondaryCtaLabel && (
                            <a
                                href={secondaryCtaUrl}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-border bg-background text-foreground font-semibold hover:bg-muted transition-all"
                            >
                                {secondaryCtaLabel}
                            </a>
                        )}
                    </div>

                    {showSocialLinks && socialLinks.length > 0 && (
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            {socialLinks.map((link) => {
                                const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                return (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
                                        aria-label={link.platform}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Avatar / Right Side */}
                <div className="flex-1 flex justify-center md:justify-end w-full">
                    {showAvatar && avatarUrl && (
                        <div className="relative w-full max-w-sm aspect-square md:max-w-md md:aspect-auto md:h-[500px] overflow-hidden rounded-2xl shadow-2xl border border-border">
                            <img
                                src={avatarUrl}
                                alt={siteData.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    {!avatarUrl && showAvatar && (
                        <div className="relative w-full max-w-sm aspect-square md:max-w-md md:aspect-auto md:h-[500px] rounded-2xl shadow-2xl border border-border bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center text-muted-foreground font-medium">
                            No image
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
