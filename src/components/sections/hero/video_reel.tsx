'use client';

import { useRef } from 'react';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { useStaggeredReveal } from '@/lib/animations';
import { IconPlayerPlayFilled } from '@tabler/icons-react';

export default function HeroVideoReel({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'Welcome';
    const subheadline = (i.subheadline as string) || siteData.tagline;
    const backgroundVideo = (i.backgroundVideo as string) || '';
    const showPlayButton = i.showPlayButton !== false;
    
    const headlineRef = useRef<HTMLHeadingElement>(null);

    // Prepare text for staggered reveal by splitting into words
    const words = headline.split(' ').map((word, index) => (
        <span key={index} className="inline-block mr-4 char">
            {word}
        </span>
    ));

    useStaggeredReveal(headlineRef, 0.2, [headline]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Background Video */}
            {backgroundVideo ? (
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            ) : (
                <div className="absolute inset-0 bg-background" />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

            <div className="container relative z-10 px-6 py-20 text-center">
                <h1 ref={headlineRef} className="text-6xl sm:text-8xl font-black tracking-tighter text-foreground mb-6 uppercase">
                    {words}
                </h1>
                
                {subheadline && (
                    <p className="text-xl sm:text-2xl text-muted-foreground font-light tracking-wide mb-12 max-w-2xl mx-auto">
                        {subheadline}
                    </p>
                )}

                {showPlayButton && (
                    <button className="group relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform duration-500 ease-out shadow-[0_0_40px_rgba(var(--primary),0.5)]">
                        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                        <IconPlayerPlayFilled size={36} className="ml-2 group-hover:scale-110 transition-transform" />
                    </button>
                )}
            </div>
        </section>
    );
}
