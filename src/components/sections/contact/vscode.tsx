import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink, IconMail, IconTerminal2 } from '@tabler/icons-react';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function ContactVsCode({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Integrated Terminal';
    const showEmail = i.showEmail !== false;
    const showSocialLinks = i.showSocialLinks !== false;
    const email = siteData.user?.email || 'hello@example.com';
    const socialLinks = siteData.social_links || [];

    return (
        <section id="contact" className="bg-background py-8 pb-16 font-mono">
            <div className="mx-auto max-w-theme px-4 sm:px-6">
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground"><IconTerminal2 size={14} /> {sectionTitle}</div>
                    <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_18rem]">
                        <div className="space-y-3 p-5 text-sm leading-7 sm:p-8">
                            <p><span className="text-primary">visitor@portfolio</span>:<span className="text-accent">~/contact</span>$ npm run handshake</p>
                            <p className="text-muted-foreground">Checking availability... {siteData.available_for_hire ? 'ready for new work' : 'online'}</p>
                            <p className="text-muted-foreground">Loading verified channels... done</p>
                            {showEmail && <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded border border-primary bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90"><IconMail size={17} /> mailto:{email}</a>}
                        </div>
                        {showSocialLinks && socialLinks.length > 0 && (
                            <aside className="border-t border-border bg-background/70 p-5 lg:border-l lg:border-t-0">
                                <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Ports</p>
                                <div className="space-y-2">
                                    {socialLinks.map((link) => {
                                        const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                        return (
                                            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary">
                                                <span className="inline-flex items-center gap-2"><Icon size={16} /> {link.platform}</span>
                                                <IconExternalLink size={14} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
