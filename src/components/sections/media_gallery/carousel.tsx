'use client';

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState } from 'react';
import { collectMedia, EmptyGallery, getGalleryInputs, LightboxMedia, MediaFrame } from './mediaUtils';

export default function MediaGalleryCarousel({ section, siteData }: SectionProps) {
    const inputs = getGalleryInputs(section.resolvedInputs as Record<string, unknown>);
    const media = inputs.images.length > 0 ? inputs.images : collectMedia(siteData);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <section id="gallery" className="overflow-hidden bg-background py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    {inputs.sectionTitle && (
                        <h2 className="max-w-2xl text-3xl font-bold text-foreground md:text-5xl">{inputs.sectionTitle}</h2>
                    )}
                    {media.length > 1 && <p className="text-sm text-muted-foreground">{media.length} pieces</p>}
                </div>

                {media.length === 0 ? (
                    <EmptyGallery />
                ) : (
                    <Carousel opts={{ align: 'start', loop: media.length > 2 }} className="px-0 md:px-12">
                        <CarouselContent className="-ml-5">
                            {media.map((item, index) => (
                                <CarouselItem key={item.id || index} className="basis-full pl-5 md:basis-4/5 lg:basis-2/3">
                                    <button
                                        type="button"
                                        onClick={() => inputs.lightboxEnabled && setLightboxIndex(index)}
                                        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                        disabled={!inputs.lightboxEnabled}
                                    >
                                        <MediaFrame item={item} showCaption={inputs.showCaptions} className="rounded-3xl border border-border bg-card shadow-sm" mediaClassName="aspect-video" />
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {media.length > 1 && (
                            <>
                                <CarouselPrevious className="left-0 hidden md:inline-flex" />
                                <CarouselNext className="right-0 hidden md:inline-flex" />
                            </>
                        )}
                    </Carousel>
                )}

                {lightboxIndex !== null && (
                    <LightboxMedia media={media} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
                )}
            </div>
        </section>
    );
}
