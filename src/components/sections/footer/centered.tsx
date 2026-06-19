/**
 * Footer — Centered Variant
 *
 * Symmetrical layout with everything stacked centrally. Great for minimal designs.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import {
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

export default function FooterCentered({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const showSocialLinks = i.showSocialLinks !== false;
    const showCopyright = i.showCopyright !== false;
    const copyrightText = (i.copyrightText as string) || `© {year} {title}. All rights reserved.`;

    const currentYear = new Date().getFullYear().toString();
    const title = siteData.title || 'Portfolio';
    const finalCopyright = copyrightText
        .replace('{year}', currentYear)
        .replace('{title}', title);

    const socialLinks = siteData.social_links || [];

    return (
        <footer className="border-t border-border bg-background py-16">
            <div className="container max-w-3xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
                {/* Social Links */}
                {showSocialLinks && socialLinks.length > 0 && (
                    <div className="flex items-center gap-6">
                        {socialLinks.map((link) => {
                            const Icon = socialIconsMap[link.platform] || IconExternalLink;
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-all hover:-translate-y-1"
                                    aria-label={link.platform}
                                >
                                    <Icon size={24} />
                                </a>
                            );
                        })}
                    </div>
                )}

                {/* Copyright */}
                {showCopyright && (
                    <p className="text-sm font-medium text-muted-foreground">
                        {finalCopyright}
                    </p>
                )}
            </div>
        </footer>
    );
}
