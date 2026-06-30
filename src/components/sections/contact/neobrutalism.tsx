import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconExternalLink, IconMail, IconPhone } from '@tabler/icons-react';

const socialIconsMap: Record<string, typeof IconExternalLink> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function ContactNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Get In Touch';
    const showForm = i.showForm !== false;
    const showEmail = i.showEmail !== false;
    const showPhone = i.showPhone === true;
    const showSocialLinks = i.showSocialLinks !== false;
    const email = siteData.user?.email || 'hello@example.com';
    const phone = '+1 (555) 000-0000';
    const socialLinks = siteData.social_links || [];

    return (
        <section id="contact" className="bg-background py-20">
            <div className="mx-auto grid max-w-theme gap-8 px-6 lg:grid-cols-[1fr_1.1fr]">
                <div>
                    <h2 className="text-5xl font-black uppercase leading-none tracking-tighter text-foreground sm:text-7xl">{sectionTitle}</h2>
                    <div className="mt-8 space-y-4">
                        {showEmail && <a href={`mailto:${email}`} className="flex w-fit items-center gap-3 border-4 border-border bg-primary px-5 py-4 font-black text-primary-foreground shadow-[6px_6px_0_hsl(var(--border))]"><IconMail size={22} />{email}</a>}
                        {showPhone && <a href={`tel:${phone}`} className="flex w-fit items-center gap-3 border-4 border-border bg-secondary px-5 py-4 font-black text-secondary-foreground shadow-[6px_6px_0_hsl(var(--border))]"><IconPhone size={22} />{phone}</a>}
                    </div>
                    {showSocialLinks && socialLinks.length > 0 && <div className="mt-8 flex flex-wrap gap-3">{socialLinks.map((link) => { const Icon = socialIconsMap[link.platform] || IconExternalLink; return <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="border-4 border-border bg-accent p-3 text-accent-foreground shadow-[4px_4px_0_hsl(var(--border))]" aria-label={link.platform}><Icon size={20} /></a>; })}</div>}
                </div>
                {showForm && (
                    <form action={`mailto:${email}`} method="POST" className="border-4 border-border bg-card p-6 shadow-[12px_12px_0_hsl(var(--border))] sm:p-8">
                        <div className="grid gap-5">
                            <label className="grid gap-2 text-sm font-black uppercase text-card-foreground">Name<input name="name" required className="border-4 border-border bg-background px-4 py-3 text-base font-semibold outline-none focus:bg-primary" placeholder="Jane Doe" /></label>
                            <label className="grid gap-2 text-sm font-black uppercase text-card-foreground">Email<input name="email" type="email" required className="border-4 border-border bg-background px-4 py-3 text-base font-semibold outline-none focus:bg-primary" placeholder="jane@example.com" /></label>
                            <label className="grid gap-2 text-sm font-black uppercase text-card-foreground">Message<textarea name="message" rows={5} required className="resize-y border-4 border-border bg-background px-4 py-3 text-base font-semibold outline-none focus:bg-primary" placeholder="Tell me what we are making..." /></label>
                            <button type="submit" className="inline-flex items-center justify-center gap-2 border-4 border-border bg-accent px-7 py-4 text-sm font-black uppercase text-accent-foreground shadow-[6px_6px_0_hsl(var(--border))]"><span>Send Message</span><IconArrowRight size={18} /></button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
