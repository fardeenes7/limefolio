'use client';

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { useState } from 'react';
import { collectMedia, EmptyGallery, getGalleryInputs, LightboxMedia, MediaFrame } from './mediaUtils';

export default function MediaGalleryMasonry({ section, siteData }: SectionProps) {
    const inputs = getGalleryInputs(section.resolvedInputs as Record<string, unknown>);
    const media = inputs.images.length > 0 ? inputs.images : collectMedia(siteData);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <section id="gallery" className="bg-background py-24">
            <div className="container mx-auto max-w-7xl px-6">
                {inputs.sectionTitle && (
                    <div className="mb-12 max-w-2xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Selected work</p>
                        <h2 className="text-3xl font-bold text-foreground md:text-5xl">{inputs.sectionTitle}</h2>
                    </div>
                )}

                {media.length === 0 ? (
                    <EmptyGallery />
                ) : (
                    <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
                        {media.map((item, index) => {
                            const shape = index % 5 === 1 || index % 5 === 4 ? 'aspect-[3/4]' : 'aspect-[4/3]';

                            return (
                                <button
                                    key={item.id || index}
                                    type="button"
                                    onClick={() => inputs.lightboxEnabled && setLightboxIndex(index)}
                                    className="mb-5 block w-full break-inside-avoid text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    disabled={!inputs.lightboxEnabled}
                                >
                                    <MediaFrame item={item} showCaption={inputs.showCaptions} className="rounded-2xl border border-border bg-card shadow-sm" mediaClassName={shape} />
                                </button>
                            );
                        })}
                    </div>
                )}

                {lightboxIndex !== null && (
                    <LightboxMedia media={media} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
                )}
            </div>
        </section>
    );
}
