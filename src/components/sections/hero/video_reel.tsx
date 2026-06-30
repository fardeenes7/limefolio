'use client';

import { useRef } from 'react';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { useStaggeredReveal } from '@/lib/animations';
import { IconArrowRight, IconPlayerPlayFilled } from '@tabler/icons-react';

export default function HeroVideoReel({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'Welcome';
    const subheadline = (i.subheadline as string) || siteData.tagline;
    const body = (i.body as string) || siteData.description;
    const backgroundVideo = (i.backgroundVideo as string) || '';
    const showPlayButton = i.showPlayButton !== false;
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'Watch the reel';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '#projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'View stills';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '#gallery';
    
    // Layout
    const paddingTop = (i.paddingTop as number) || 0;
    const paddingBottom = (i.paddingBottom as number) || 0;
    
    const headlineRef = useRef<HTMLHeadingElement>(null);

    // Prepare text for staggered reveal by splitting into words
    const words = headline.split(' ').map((word, index) => (
        <span key={index} className="inline-block mr-4 char">
            {word}
        </span>
    ));

    useStaggeredReveal(headlineRef, 0.2, [headline]);

    return (
        <section
            className="relative flex min-h-screen items-center overflow-hidden bg-background"
            style={{ paddingTop: paddingTop ? `${paddingTop}px` : undefined, paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined }}
        >
            {backgroundVideo ? (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-luminosity"
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,hsl(var(--primary)/0.20),transparent_28%),radial-gradient(circle_at_80%_75%,hsl(var(--accent)/0.20),transparent_30%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--muted)))]" />
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-background" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-background" />
            <div className="pointer-events-none absolute left-0 right-0 top-16 flex h-6 items-center justify-between px-4 opacity-30">
                {Array.from({ length: 38 }).map((_, idx) => <span key={idx} className="h-2.5 w-4 rounded-sm bg-primary" />)}
            </div>
            <div className="pointer-events-none absolute bottom-16 left-0 right-0 flex h-6 items-center justify-between px-4 opacity-30">
                {Array.from({ length: 38 }).map((_, idx) => <span key={idx} className="h-2.5 w-4 rounded-sm bg-primary" />)}
            </div>

            <div className="relative z-10 mx-auto grid w-full max-w-theme gap-10 px-6 py-28 lg:grid-cols-[1fr_17rem] lg:items-end">
                <div>
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.5em] text-primary">Feature Presentation</p>
                    <h1 ref={headlineRef} className="max-w-6xl text-6xl font-black uppercase leading-[0.82] tracking-tighter text-foreground sm:text-8xl lg:text-9xl">
                        {words}
                    </h1>

                    {subheadline && <p className="mt-8 max-w-3xl text-xl font-light leading-relaxed tracking-wide text-foreground/85 sm:text-2xl">{subheadline}</p>}
                    {body && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{body}</p>}

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        {primaryCtaLabel && <a href={primaryCtaUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-primary-foreground transition-transform hover:scale-105">{primaryCtaLabel}<IconArrowRight size={18} /></a>}
                        {secondaryCtaLabel && <a href={secondaryCtaUrl} className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-card/60 px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary">{secondaryCtaLabel}</a>}
                    </div>
                </div>

                <aside className="rounded-2xl border border-border bg-card/70 p-5 shadow-2xl backdrop-blur">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">Runtime</p>
                    <p className="mt-3 text-5xl font-black tracking-tighter text-foreground">02:26</p>
                    <p className="mt-2 text-sm text-muted-foreground">Portfolio reel, selected scenes, and production notes.</p>
                    {showPlayButton && <button className="group mt-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_60px_hsl(var(--primary)/0.35)] transition-transform hover:scale-110"><IconPlayerPlayFilled size={28} className="ml-1" /></button>}
                </aside>
            </div>
        </section>
    );
}
