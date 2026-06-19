/**
 * Footer — Default Variant
 *
 * Simple, elegant footer with copyright statement, social icons, and an optional
 * "Back to top" button.
 */
"use client";
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import {
    IconArrowUp,
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

export default function FooterDefault({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const showSocialLinks = i.showSocialLinks !== false;
    const showCopyright = i.showCopyright !== false;
    const copyrightText = (i.copyrightText as string) || `© {year} {title}. All rights reserved.`;
    const showBackToTop = i.showBackToTop === true;

    const currentYear = new Date().getFullYear().toString();
    const title = siteData.title || 'Portfolio';
    const finalCopyright = copyrightText
        .replace('{year}', currentYear)
        .replace('{title}', title);

    const socialLinks = siteData.social_links || [];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="border-t border-border bg-muted/20 py-12">
            <div className="container max-w-7xl mx-auto px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
                {/* Copyright */}
                {showCopyright && (
                    <p className="text-sm text-muted-foreground order-2 sm:order-1 text-center sm:text-left">
                        {finalCopyright}
                    </p>
                )}

                <div className="flex items-center gap-6 order-1 sm:order-2">
                    {/* Social Links */}
                    {showSocialLinks && socialLinks.length > 0 && (
                        <div className="flex items-center gap-4">
                            {socialLinks.map((link) => {
                                const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                return (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                        aria-label={link.platform}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    )}

                    {/* Back to Top */}
                    {showBackToTop && (
                        <button
                            onClick={scrollToTop}
                            className="hidden sm:inline-flex items-center justify-center rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all"
                            aria-label="Back to top"
                        >
                            <IconArrowUp size={16} />
                        </button>
                    )}
                </div>
            </div>
        </footer>
    );
}
