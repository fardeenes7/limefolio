import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink, IconMail, IconPhone } from '@tabler/icons-react';

const socialIconsMap: Record<string, any> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function ContactSocialCards({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Get In Touch';
    const showEmail = i.showEmail !== false;
    const showPhone = i.showPhone === true;
    const showSocialLinks = i.showSocialLinks !== false;
    const email = siteData.user?.email || 'hello@example.com';
    const phone = '+1 (555) 000-0000';
    const socialLinks = siteData.social_links || [];

    return (
        <section id="contact" className="bg-muted/20 py-24">
            <div className="container mx-auto max-w-theme px-6">
                <div className="mx-auto mb-12 max-w-theme text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Contact</p>
                    <h2 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">{sectionTitle}</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {showEmail && (
                        <a href={`mailto:${email}`} className="group rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                            <IconMail className="mx-auto mb-5 text-primary" size={34} />
                            <h3 className="font-bold text-foreground">Email</h3>
                            <p className="mt-2 break-words text-sm text-muted-foreground group-hover:text-primary">{email}</p>
                        </a>
                    )}
                    {showPhone && (
                        <a href={`tel:${phone}`} className="group rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                            <IconPhone className="mx-auto mb-5 text-primary" size={34} />
                            <h3 className="font-bold text-foreground">Phone</h3>
                            <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary">{phone}</p>
                        </a>
                    )}
                    {showSocialLinks && socialLinks.map((link) => {
                        const Icon = socialIconsMap[link.platform] || IconExternalLink;
                        return (
                            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="group rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                                <Icon className="mx-auto mb-5 text-primary" size={34} />
                                <h3 className="font-bold capitalize text-foreground">{link.platform}</h3>
                                <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary">Open profile</p>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
