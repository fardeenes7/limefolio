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
import { getFooterBackgroundClass, getFooterGapClass, LimefolioAttribution } from './footerUtils';

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
    const showLimefolioAttribution = i.showLimefolioAttribution !== false;
    const attributionPlacement = (i.attributionPlacement as string) || 'copyright';
    const backgroundClass = getFooterBackgroundClass(i.backgroundStyle, i.backgroundColor, 'bg-muted/20');
    const gapClass = getFooterGapClass(i.linkDensity);

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
        <footer className={`border-t border-border py-12 ${backgroundClass}`}>
            <div className="container max-w-theme mx-auto px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="order-2 flex flex-col items-center gap-2 text-center sm:order-1 sm:items-start sm:text-left">
                    {/* Copyright */}
                    {showCopyright && (
                        <p className="text-sm text-muted-foreground">
                            {finalCopyright}
                        </p>
                    )}
                    {showLimefolioAttribution && attributionPlacement === 'copyright' && <LimefolioAttribution />}
                </div>

                <div className="flex items-center gap-6 order-1 sm:order-2">
                    {/* Social Links */}
                    {showSocialLinks && socialLinks.length > 0 && (
                        <div className={`flex items-center ${gapClass}`}>
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
            {showLimefolioAttribution && attributionPlacement === 'bottom' && (
                <div className="container max-w-theme mx-auto px-6 pt-6 text-center">
                    <LimefolioAttribution />
                </div>
            )}
        </footer>
    );
}
