"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from '@tabler/icons-react';
import { LimefolioAttribution } from './footerUtils';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function FooterMinimal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const showSocialLinks = i.showSocialLinks !== false;
    const showCopyright = i.showCopyright !== false;
    const showLimefolioAttribution = i.showLimefolioAttribution === true;
    const copyrightText = (i.copyrightText as string) || '{year} {title}';
    const currentYear = new Date().getFullYear().toString();
    const title = siteData.title || 'Portfolio';
    const finalCopyright = copyrightText.replace('{year}', currentYear).replace('{title}', title);
    const socialLinks = siteData.social_links || [];

    return (
        <footer className="bg-background py-10">
            <div className="mx-auto flex max-w-theme flex-col gap-4 px-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    {showCopyright && <p>{finalCopyright}</p>}
                    {showLimefolioAttribution && <LimefolioAttribution />}
                </div>

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
                                    className="hover:text-foreground"
                                    aria-label={link.platform}
                                >
                                    <Icon size={16} />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </footer>
    );
}
