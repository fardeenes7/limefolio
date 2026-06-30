/**
 * Contact — Split with Info Variant
 *
 * Two column layout: contact form on one side, email/socials on the other.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import {
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconExternalLink,
    IconArrowRight,
} from '@tabler/icons-react';

const socialIconsMap: Record<string, any> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function ContactSplit({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || "Let's Work Together";
    const subheadline = (i.subheadline as string) || "Have a project in mind? I'd love to hear about it.";
    const emailAddress = (i.emailAddress as string) || siteData.user?.email || 'contact@example.com';
    const showSocialLinks = i.showSocialLinks !== false;
    const formProvider = (i.formProvider as string) || 'mailto';
    const formAction = (i.formAction as string) || '';

    const socialLinks = siteData.social_links || [];

    return (
        <section id="contact" className="py-24 bg-muted/20">
            <div className="container max-w-theme mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Info Column */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                            {headline}
                        </h2>
                        {subheadline && (
                            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                                {subheadline}
                            </p>
                        )}

                        <div className="space-y-8">
                            {/* Email */}
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                                    Email
                                </h3>
                                <a
                                    href={`mailto:${emailAddress}`}
                                    className="inline-flex items-center gap-3 text-xl font-medium text-foreground hover:text-primary transition-colors group"
                                >
                                    <IconMail className="text-primary group-hover:scale-110 transition-transform" />
                                    {emailAddress}
                                </a>
                            </div>

                            {/* Socials */}
                            {showSocialLinks && socialLinks.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                                        Socials
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        {socialLinks.map((link) => {
                                            const Icon = socialIconsMap[link.platform] || IconExternalLink;
                                            return (
                                                <a
                                                    key={link.id}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 rounded-full bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm"
                                                    aria-label={link.platform}
                                                >
                                                    <Icon size={20} />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="bg-background rounded-2xl p-8 shadow-xl border border-border">
                        {formProvider === 'mailto' ? (
                            <div className="text-center py-12">
                                <IconMail className="mx-auto text-muted-foreground mb-4 opacity-50" size={48} />
                                <h3 className="text-xl font-semibold mb-2">Prefer email?</h3>
                                <p className="text-muted-foreground mb-8">
                                    Click below to open your email client.
                                </p>
                                <a
                                    href={`mailto:${emailAddress}`}
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:-translate-y-1 w-full justify-center"
                                >
                                    Send Email
                                    <IconArrowRight size={20} />
                                </a>
                            </div>
                        ) : (
                            <form action={formAction} method="POST" className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:-translate-y-1"
                                >
                                    Send Message
                                    <IconArrowRight size={20} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
