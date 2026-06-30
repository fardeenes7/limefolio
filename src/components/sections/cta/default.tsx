/**
 * CTA — Default Variant
 *
 * Simple centered call to action banner.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';

export default function CtaDefault({ section }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || 'Ready to start your next project?';
    const subtext = (i.subtext as string) || "Let's build something amazing together.";
    const primaryCtaLabel = (i.primaryCtaLabel as string) || "Let's Talk";
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '/contact';
    const backgroundStyle = (i.backgroundStyle as string) || '';

    return (
        <section 
            className="py-24 text-primary-foreground relative overflow-hidden bg-primary"
            style={backgroundStyle ? { backgroundColor: `hsl(var(${backgroundStyle}))` } : undefined}
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-20 pointer-events-none" />

            <div className="container max-w-theme mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                    {headline}
                </h2>

                {subtext && (
                    <p className="text-xl text-primary-foreground/80 mb-10 max-w-theme mx-auto">
                        {subtext}
                    </p>
                )}

                <a
                    href={primaryCtaUrl}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background text-foreground font-bold text-lg hover:bg-muted transition-all hover:scale-105 shadow-xl"
                >
                    {primaryCtaLabel}
                    <IconArrowRight size={20} />
                </a>
            </div>
        </section>
    );
}
