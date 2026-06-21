/**
 * Footer — Compact Variant
 *
 * A slim footer suitable for terminal or minimalist themes.
 */
"use client";
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUp, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from '@tabler/icons-react';

const socialIconsMap: Record<string, any> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function FooterCompact({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const showSocialLinks = i.showSocialLinks !== false;
    const showCopyright = i.showCopyright !== false;
    const copyrightText = (i.copyrightText as string) || `© {year} {title}`;
    const showBackToTop = i.showBackToTop === true;

    const currentYear = new Date().getFullYear().toString();
    const title = siteData.title || 'Portfolio';
    const finalCopyright = copyrightText
        .replace('{year}', currentYear)
        .replace('{title}', title);

    const socialLinks = siteData.social_links || [];

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="border-t border-border bg-background py-6">
            <div className="container max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                {showCopyright && (
                    <p className="text-sm text-muted-foreground font-mono">
                        {finalCopyright}
                    </p>
                )}

                <div className="flex items-center gap-4">
                    {showSocialLinks && socialLinks.length > 0 && (
                        <div className="flex items-center gap-3">
                            {socialLinks.map((link) => {
                                const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                return (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                        aria-label={link.platform}
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    )}

                    {showBackToTop && (
                        <button
                            onClick={scrollToTop}
                            className="ml-2 text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Back to top"
                        >
                            <IconArrowUp size={18} />
                        </button>
                    )}
                </div>
            </div>
        </footer>
    );
}
