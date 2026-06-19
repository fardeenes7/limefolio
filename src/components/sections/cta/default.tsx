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
    const subheadline = (i.subheadline as string) || "Let's build something amazing together.";
    const buttonText = (i.buttonText as string) || "Let's Talk";
    const buttonLink = (i.buttonLink as string) || '#contact';

    return (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-20 pointer-events-none" />

            <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                    {headline}
                </h2>

                {subheadline && (
                    <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                        {subheadline}
                    </p>
                )}

                <a
                    href={buttonLink}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background text-foreground font-bold text-lg hover:bg-muted transition-all hover:scale-105 shadow-xl"
                >
                    {buttonText}
                    <IconArrowRight size={20} />
                </a>
            </div>
        </section>
    );
}
