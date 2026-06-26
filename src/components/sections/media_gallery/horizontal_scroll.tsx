'use client';

import { useRef } from 'react';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { useHorizontalScroll } from '@/lib/animations';

export default function MediaGalleryHorizontalScroll({ section }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Gallery';
    
    // We don't have media gallery data in SiteData yet, so we use placeholders
    // to demonstrate the horizontal scroll filmstrip effect.
    const mockFrames = [1, 2, 3, 4, 5, 6, 7, 8];

    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useHorizontalScroll(containerRef, wrapperRef, [sectionTitle]);

    return (
        <section ref={containerRef} className="relative h-[calc(100vh-var(--header-height,0px))] bg-background overflow-hidden flex flex-col justify-center border-y border-border">
            <div className="absolute top-12 left-6 md:left-12 z-20">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground uppercase tracking-widest">
                    {sectionTitle}
                </h2>
            </div>
            
            {/* Filmstrip top/bottom perforations */}
            <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-4 opacity-20 pointer-events-none">
                {Array.from({ length: 50 }).map((_, idx) => (
                    <div key={idx} className="w-4 h-4 bg-foreground rounded-sm" />
                ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between px-4 opacity-20 pointer-events-none">
                {Array.from({ length: 50 }).map((_, idx) => (
                    <div key={idx} className="w-4 h-4 bg-foreground rounded-sm" />
                ))}
            </div>

            <div className="flex h-[60vh] mt-8 items-center pl-6 md:pl-12">
                <div ref={wrapperRef} className="flex gap-8 md:gap-16 pr-[50vw]">
                    {mockFrames.map((frame) => (
                        <div 
                            key={frame} 
                            className="shrink-0 w-[70vw] md:w-[45vw] h-full relative group"
                        >
                            <div className="absolute inset-0 bg-secondary rounded-lg overflow-hidden border border-border">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-sm">
                                    Frame {frame}
                                </div>
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
