import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink, IconMail } from '@tabler/icons-react';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function ContactTerminal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Contact';
    const showEmail = i.showEmail !== false;
    const showSocialLinks = i.showSocialLinks !== false;
    const email = siteData.user?.email || 'hello@example.com';
    const socialLinks = siteData.social_links || [];

    return (
        <section id="contact" className="bg-background py-20 font-mono">
            <div className="mx-auto max-w-4xl px-6">
                <div className="rounded-lg border border-border bg-card">
                    <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">$ ssh {sectionTitle.toLowerCase().replace(/\s+/g, '-')}</div>
                    <div className="space-y-5 p-6 sm:p-8">
                        {showEmail && <a href={`mailto:${email}`} className="flex items-center gap-3 text-lg font-semibold text-primary hover:underline"><IconMail size={20} /> mailto:{email}</a>}
                        {showSocialLinks && socialLinks.length > 0 && <div className="flex flex-wrap gap-3">{socialLinks.map((link) => { const Icon = socialIconsMap[link.platform] || IconExternalLink; return <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="rounded border border-border bg-background p-3 text-muted-foreground hover:border-primary hover:text-primary" aria-label={link.platform}><Icon size={18} /></a>; })}</div>}
                    </div>
                </div>
            </div>
        </section>
    );
}
