/**
 * Contact — Minimal Variant
 *
 * A very simple contact section. Just email and social links.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconMail, IconPhone } from '@tabler/icons-react';

export default function ContactMinimal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Get In Touch';
    const showEmail = i.showEmail !== false;
    const showPhone = i.showPhone === true;
    
    // In a real app, email/phone would come from siteData.user or siteData itself.
    const email = 'hello@example.com';
    const phone = '+1 (555) 000-0000';

    return (
        <section id="contact" className="py-24 bg-background">
            <div className="container max-w-theme mx-auto px-6 text-center">
                {sectionTitle && (
                    <h2 className="text-3xl font-bold text-foreground mb-8">
                        {sectionTitle}
                    </h2>
                )}
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    {showEmail && (
                        <a href={`mailto:${email}`} className="flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors">
                            <IconMail size={24} />
                            {email}
                        </a>
                    )}
                    {showPhone && (
                        <a href={`tel:${phone}`} className="flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors">
                            <IconPhone size={24} />
                            {phone}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
