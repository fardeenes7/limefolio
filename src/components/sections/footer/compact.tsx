/**
 * Footer — Compact Variant
 *
 * A slim footer suitable for terminal or minimalist themes.
 */
"use client";
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUp, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from '@tabler/icons-react';
import { getFooterBackgroundClass, getFooterGapClass, LimefolioAttribution } from './footerUtils';

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
    const showLimefolioAttribution = i.showLimefolioAttribution !== false;
    const attributionPlacement = (i.attributionPlacement as string) || 'copyright';
    const backgroundClass = getFooterBackgroundClass(i.backgroundStyle, i.backgroundColor);
    const gapClass = getFooterGapClass(i.linkDensity);

    const currentYear = new Date().getFullYear().toString();
    const title = siteData.title || 'Portfolio';
    const finalCopyright = copyrightText
        .replace('{year}', currentYear)
        .replace('{title}', title);

    const socialLinks = siteData.social_links || [];

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className={`border-t border-border py-6 ${backgroundClass}`}>
            <div className="container max-w-theme mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center gap-1 sm:items-start">
                    {showCopyright && (
                        <p className="text-sm text-muted-foreground font-mono">
                            {finalCopyright}
                        </p>
                    )}
                    {showLimefolioAttribution && attributionPlacement === 'copyright' && <LimefolioAttribution className="hover:text-primary" />}
                </div>

                <div className="flex items-center gap-4">
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
            {showLimefolioAttribution && attributionPlacement === 'bottom' && (
                <div className="container max-w-theme mx-auto px-6 pt-4 text-center">
                    <LimefolioAttribution className="hover:text-primary" />
                </div>
            )}
        </footer>
    );
}
