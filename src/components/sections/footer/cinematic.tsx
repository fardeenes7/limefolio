"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUp, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from '@tabler/icons-react';
import { LimefolioAttribution } from './footerUtils';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function FooterCinematic({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const showSocialLinks = i.showSocialLinks !== false;
    const showCopyright = i.showCopyright !== false;
    const showBackToTop = i.showBackToTop !== false;
    const showLimefolioAttribution = i.showLimefolioAttribution !== false;
    const copyrightText = (i.copyrightText as string) || '{title} / {year} / Final Cut';
    const title = siteData.title || 'Portfolio';
    const socialLinks = siteData.social_links || [];
    const finalCopyright = copyrightText.replace('{year}', new Date().getFullYear().toString()).replace('{title}', title);

    return (
        <footer className="border-t border-border bg-background py-12 text-foreground">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-8 flex h-8 items-center justify-between opacity-30" aria-hidden="true">
                    {Array.from({ length: 28 }).map((_, index) => <span key={index} className="h-3 w-3 rounded-sm bg-primary" />)}
                </div>
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-3xl font-black uppercase tracking-tighter text-foreground md:text-5xl">End Credits</p>
                        {showCopyright && <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">{finalCopyright}</p>}
                        {showLimefolioAttribution && <LimefolioAttribution className="mt-3 inline-block" />}
                    </div>
                    <div className="flex items-center gap-3">
                        {showSocialLinks && socialLinks.map((link) => {
                            const Icon = socialIconsMap[link.platform] || IconExternalLink;
                            return <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-card p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label={link.platform}><Icon size={18} /></a>;
                        })}
                        {showBackToTop && <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full border border-primary/50 bg-primary/10 p-3 text-primary transition-colors hover:bg-primary hover:text-primary-foreground" aria-label="Back to top"><IconArrowUp size={18} /></button>}
                    </div>
                </div>
            </div>
        </footer>
    );
}
