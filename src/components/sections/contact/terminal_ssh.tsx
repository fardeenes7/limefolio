import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink, IconMail, IconShieldLock } from '@tabler/icons-react';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function ContactTerminalSsh({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Contact';
    const showEmail = i.showEmail !== false;
    const showSocialLinks = i.showSocialLinks !== false;
    const email = siteData.user?.email || 'hello@example.com';
    const socialLinks = siteData.social_links || [];

    return (
        <section id="contact" className="bg-background py-20 font-mono text-foreground">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/10 lg:grid-cols-[1fr_22rem]">
                    <div className="p-6 sm:p-8">
                        <p className="text-xs uppercase tracking-[0.28em] text-primary">$ ssh handshake</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{sectionTitle}</h2>
                        <div className="mt-8 rounded border border-border bg-background p-4 text-sm leading-7 text-muted-foreground">
                            <p><span className="text-primary">host</span> limefolio.contact</p>
                            <p><span className="text-primary">auth</span> public-key</p>
                            <p><span className="text-primary">status</span> ready for brief</p>
                            <p><span className="text-primary">latency</span> usually fast</p>
                        </div>
                        {showEmail && <a href={`mailto:${email}`} className="mt-6 inline-flex items-center gap-3 rounded border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><IconMail size={18} /> mailto:{email}</a>}
                    </div>
                    <aside className="border-t border-border bg-background/80 p-6 lg:border-l lg:border-t-0">
                        <div className="flex items-center gap-3 text-primary">
                            <IconShieldLock size={22} />
                            <span className="text-xs font-bold uppercase tracking-[0.24em]">verified channels</span>
                        </div>
                        {showSocialLinks && socialLinks.length > 0 && (
                            <div className="mt-6 grid gap-3">
                                {socialLinks.map((link) => {
                                    const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                    return (
                                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded border border-border bg-card px-4 py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary" aria-label={link.platform}>
                                            <span className="inline-flex items-center gap-3"><Icon size={18} /> {link.platform}</span>
                                            <IconExternalLink size={16} />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </section>
    );
}
