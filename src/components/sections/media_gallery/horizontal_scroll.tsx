'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { prefersReducedMotion } from '@/lib/animations';
import { collectMedia, EmptyGallery, getGalleryInputs, LightboxMedia, MediaFrame } from './mediaUtils';

gsap.registerPlugin(ScrollTrigger);

export default function MediaGalleryHorizontalScroll({ section, siteData }: SectionProps) {
    const inputs = getGalleryInputs(section.resolvedInputs as Record<string, unknown>);
    const media = inputs.images.length > 0 ? inputs.images : collectMedia(siteData);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const sticky = stickyRef.current;
        const viewport = viewportRef.current;
        const track = trackRef.current;

        if (!container || !sticky || !viewport || !track || prefersReducedMotion()) return;

        const getHeaderHeight = () => getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim() || '0px';
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        const syncSectionHeight = () => {
            container.style.setProperty('--gallery-scroll-distance', `${getDistance()}px`);
            container.style.setProperty('--gallery-sticky-height', `${sticky.offsetHeight}px`);
        };

        syncSectionHeight();

        const scrollTrigger = ScrollTrigger.create({
            trigger: container,
            start: () => `top ${getHeaderHeight()}`,
            end: () => `+=${getDistance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefresh: syncSectionHeight,
            animation: gsap.to(track, {
                x: () => -getDistance(),
                ease: 'none',
            }),
        });

        const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
        resizeObserver.observe(sticky);
        resizeObserver.observe(track);

        return () => {
            resizeObserver.disconnect();
            scrollTrigger.kill();
        };
    }, { scope: containerRef, dependencies: [inputs.sectionTitle, media.length] });

    if (media.length === 0) {
        return (
            <section id="gallery" className="bg-background py-24">
                <div className="container mx-auto max-w-theme px-6">
                {inputs.sectionTitle && <h2 className="mb-8 text-4xl font-black uppercase leading-none tracking-tighter text-foreground md:text-6xl">{inputs.sectionTitle}</h2>}
                    <EmptyGallery />
                </div>
            </section>
        );
    }

    return (
        <section
            id="gallery"
            ref={containerRef}
            className="relative min-h-[calc(var(--gallery-sticky-height,700px)+var(--gallery-scroll-distance,0px))] border-y border-border bg-card"
        >
            <div ref={stickyRef} className="sticky top-[var(--header-height,0px)] overflow-hidden bg-card py-16 md:py-24">
                <div className="container mx-auto mb-10 max-w-theme px-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-primary">Frame by Frame</p>
                            <h2 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-tighter text-foreground md:text-6xl">
                            {inputs.sectionTitle}
                            </h2>
                        </div>
                        <p className="rounded-full border border-border bg-background px-4 py-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">Scroll to explore {media.length} frame{media.length === 1 ? '' : 's'}</p>
                    </div>
                </div>

                {/* Filmstrip top/bottom perforations */}
                <div className="pointer-events-none absolute left-0 right-0 top-0 flex h-8 items-center justify-between px-4 opacity-20">
                    {Array.from({ length: 50 }).map((_, idx) => (
                        <div key={idx} className="h-4 w-4 rounded-sm bg-foreground" />
                    ))}
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex h-8 items-center justify-between px-4 opacity-20">
                    {Array.from({ length: 50 }).map((_, idx) => (
                        <div key={idx} className="h-4 w-4 rounded-sm bg-foreground" />
                    ))}
                </div>

                <div ref={viewportRef} className="overflow-hidden px-6 md:px-12">
                    <div ref={trackRef} className="flex h-[360px] w-max items-stretch gap-5 pb-2 pr-[calc(100vw-3rem)] sm:h-[430px] md:h-[500px] md:gap-8 md:pr-[calc(100vw-6rem)] lg:h-[580px]">
                        {media.map((item, index) => (
                            <button
                                key={item.id || index}
                                type="button"
                                onClick={() => inputs.lightboxEnabled && setLightboxIndex(index)}
                                className="group relative h-full w-auto shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                disabled={!inputs.lightboxEnabled}
                            >
                                <MediaFrame item={item} showCaption={inputs.showCaptions} className="h-full w-auto rounded-2xl border border-border bg-background shadow-2xl" mediaClassName="h-full w-auto max-w-[82vw] object-contain" />
                                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />
                                <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/75 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-primary backdrop-blur">Frame {String(index + 1).padStart(2, '0')}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {lightboxIndex !== null && (
                <LightboxMedia media={media} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
            )}
        </section>
    );
}
