/**
 * Testimonials — Carousel Variant
 *
 * Horizontal scrolling carousel of testimonial cards.
 */
'use client';

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconQuote } from '@tabler/icons-react';
import { useState, useRef } from 'react';

export default function TestimonialsCarousel({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || 'What People Say';
    const subheadline = (i.subheadline as string) || '';

    const testimonials = siteData.testimonials || [];
    if (testimonials.length === 0) return null;

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <section className="py-24 bg-muted/30 overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {headline}
                        </h2>
                        {subheadline && (
                            <p className="text-lg text-muted-foreground">
                                {subheadline}
                            </p>
                        )}
                    </div>
                    {/* Controls */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors"
                            aria-label="Previous"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors"
                            aria-label="Next"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="shrink-0 w-[85vw] sm:w-[400px] snap-center sm:snap-start bg-background border border-border rounded-2xl p-8 shadow-sm flex flex-col h-full"
                        >
                            <IconQuote className="text-primary/20 mb-6" size={40} />
                            <p className="text-lg text-foreground italic mb-8 grow leading-relaxed">
                                "{t.body}"
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                {t.avatar_url ? (
                                    <img
                                        src={t.avatar_url}
                                        alt={t.author_name}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg ring-2 ring-primary/20">
                                        {t.author_name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <div className="font-bold text-foreground">
                                        {t.author_name}
                                    </div>
                                    {(t.author_title || t.author_company) && (
                                        <div className="text-sm text-muted-foreground">
                                            {t.author_title}
                                            {t.author_title && t.author_company && ' at '}
                                            {t.author_company}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
