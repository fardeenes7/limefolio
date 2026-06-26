"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUp, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from '@tabler/icons-react';
import { getFooterBackgroundClass, getFooterGapClass, LimefolioAttribution } from './footerUtils';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function FooterNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const showSocialLinks = i.showSocialLinks !== false;
    const showCopyright = i.showCopyright !== false;
    const copyrightText = (i.copyrightText as string) || '{year} {title}. Built loud.';
    const showBackToTop = i.showBackToTop !== false;
    const showLimefolioAttribution = i.showLimefolioAttribution !== false;
    const attributionPlacement = (i.attributionPlacement as string) || 'copyright';
    const backgroundClass = getFooterBackgroundClass(i.backgroundStyle, i.backgroundColor, 'bg-secondary');
    const gapClass = getFooterGapClass(i.linkDensity);
    const title = siteData.title || 'Portfolio';
    const finalCopyright = copyrightText.replace('{year}', new Date().getFullYear().toString()).replace('{title}', title);
    const socialLinks = siteData.social_links || [];

    return (
        <footer className={`border-t-4 border-border py-10 text-foreground ${backgroundClass}`}>
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="border-4 border-border bg-background p-4 shadow-[8px_8px_0_hsl(var(--border))]">
                    {showCopyright && <p className="text-sm font-black uppercase tracking-tight">{finalCopyright}</p>}
                    {showLimefolioAttribution && attributionPlacement === 'copyright' && <LimefolioAttribution className="mt-2 inline-block font-black uppercase" />}
                </div>

                <div className="flex items-center gap-4">
                    {showSocialLinks && socialLinks.length > 0 && (
                        <div className={`flex items-center ${gapClass}`}>
                            {socialLinks.map((link) => {
                                const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                return (
                                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="border-4 border-border bg-primary p-3 text-primary-foreground shadow-[4px_4px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5" aria-label={link.platform}>
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                    {showBackToTop && (
                        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="border-4 border-border bg-accent p-3 text-accent-foreground shadow-[4px_4px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5" aria-label="Back to top">
                            <IconArrowUp size={20} />
                        </button>
                    )}
                </div>
            </div>
            {showLimefolioAttribution && attributionPlacement === 'bottom' && <div className="mx-auto max-w-7xl px-6 pt-8 text-center"><LimefolioAttribution /></div>}
        </footer>
    );
}
