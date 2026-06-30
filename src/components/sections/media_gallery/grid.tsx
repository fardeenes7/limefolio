'use client';

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { useState } from 'react';
import { collectMedia, EmptyGallery, galleryGridColumns, getGalleryInputs, LightboxMedia, MediaFrame } from './mediaUtils';

export default function MediaGalleryGrid({ section, siteData }: SectionProps) {
    const inputs = getGalleryInputs(section.resolvedInputs as Record<string, unknown>);
    const media = inputs.images.length > 0 ? inputs.images : collectMedia(siteData);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <section id="gallery" className="bg-background py-24">
            <div className="container mx-auto max-w-theme px-6">
                {inputs.sectionTitle && (
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-foreground md:text-5xl">{inputs.sectionTitle}</h2>
                    </div>
                )}

                {media.length === 0 ? (
                    <EmptyGallery />
                ) : (
                    <div className={`grid gap-5 ${galleryGridColumns(inputs.columns)}`}>
                        {media.map((item, index) => (
                            <button
                                key={item.id || index}
                                type="button"
                                onClick={() => inputs.lightboxEnabled && setLightboxIndex(index)}
                                className="min-w-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                disabled={!inputs.lightboxEnabled}
                            >
                                <MediaFrame item={item} showCaption={inputs.showCaptions} className="h-full rounded-2xl border border-border bg-card shadow-sm" mediaClassName="aspect-[4/3]" />
                            </button>
                        ))}
                    </div>
                )}

                {lightboxIndex !== null && (
                    <LightboxMedia media={media} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
                )}
            </div>
        </section>
    );
}
