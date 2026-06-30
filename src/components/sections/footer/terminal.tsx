"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUp, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from '@tabler/icons-react';
import { LimefolioAttribution } from './footerUtils';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function FooterTerminal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const showSocialLinks = i.showSocialLinks !== false;
    const showCopyright = i.showCopyright !== false;
    const showBackToTop = i.showBackToTop !== false;
    const showLimefolioAttribution = i.showLimefolioAttribution !== false;
    const socialLinks = siteData.social_links || [];
    const title = siteData.title || 'portfolio';
    const copyrightText = ((i.copyrightText as string) || 'exit 0 // {title} // {year}')
        .replace('{year}', new Date().getFullYear().toString())
        .replace('{title}', title);

    return (
        <footer className="border-t border-border bg-background py-8 font-mono text-sm">
            <div className="mx-auto flex max-w-theme flex-col gap-5 px-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    {showCopyright && <p className="text-muted-foreground"><span className="text-primary">$</span> {copyrightText}</p>}
                    {showLimefolioAttribution && <LimefolioAttribution className="font-mono hover:text-primary" />}
                </div>
                <div className="flex items-center gap-3">
                    {showSocialLinks && socialLinks.map((link) => {
                        const Icon = socialIconsMap[link.platform] || IconExternalLink;
                        return <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="rounded border border-border bg-card p-2 text-muted-foreground hover:border-primary hover:text-primary" aria-label={link.platform}><Icon size={17} /></a>;
                    })}
                    {showBackToTop && <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded border border-border bg-card p-2 text-muted-foreground hover:border-primary hover:text-primary" aria-label="Back to top"><IconArrowUp size={17} /></button>}
                </div>
            </div>
        </footer>
    );
}
