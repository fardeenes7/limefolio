"use client";

import { useState } from 'react';
import { IconPlayerPlayFilled, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import type { Media, SiteData } from '@/types/site';

export function mediaUrl(item: Media) {
    return item.url || item.image || item.video || item.thumbnail || '';
}

export function mediaPoster(item: Media) {
    return item.thumbnail || item.image || item.url || '';
}

export function isVideo(item: Media) {
    return item.media_type === 'video' || Boolean(item.video);
}

export function collectMedia(siteData: SiteData): Media[] {
    const byId = new Map<number, Media>();
    const add = (items?: Media[]) => {
        for (const item of items || []) {
            const src = mediaUrl(item);
            if (!src) continue;
            const key = item.id || byId.size + 1;
            byId.set(key, { ...item, id: key });
        }
    };

    add(siteData.media);
    add(siteData.project?.media);
    add(siteData.projects?.flatMap((project) => project.media || []));
    add(siteData.blog_post?.media);
    add(siteData.blog_posts?.flatMap((post) => post.media || []));

    return Array.from(byId.values()).sort((a, b) => {
        const featured = Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured));
        if (featured !== 0) return featured;
        return (a.order || 0) - (b.order || 0);
    });
}

export function mediaFromInput(value: unknown): Media[] {
    if (!Array.isArray(value)) return [];

    const mediaItems: Media[] = [];

    value.forEach((item, index) => {
            if (typeof item === 'string') {
                mediaItems.push({
                    id: index + 1,
                    url: item,
                    image: item,
                    media_type: 'image',
                    order: index,
                });
                return;
            }

            if (!item || typeof item !== 'object') return;

            const media = item as Partial<Media>;
            const url = media.url || media.image || media.video || media.thumbnail;
            if (!url) return;

            mediaItems.push({
                ...media,
                id: media.id || index + 1,
                url,
                order: media.order ?? index,
                media_type: media.media_type || (media.video ? 'video' : 'image'),
            });
        });

    return mediaItems;
}

export function getGalleryInputs(inputs: Record<string, unknown>) {
    const columnsValue = parseInt((inputs.columns as string) || '3', 10);

    return {
        sectionTitle: (inputs.sectionTitle as string) || 'Gallery',
        showCaptions: inputs.showCaptions === true,
        lightboxEnabled: inputs.lightboxEnabled !== false,
        columns: [2, 3, 4].includes(columnsValue) ? columnsValue : 3,
        images: mediaFromInput(inputs.images),
    };
}

export function galleryGridColumns(columns: number) {
    const classes: Record<number, string> = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    };

    return classes[columns] || classes[3];
}

export function MediaFrame({
    item,
    className = '',
    mediaClassName = '',
    showCaption = false,
}: {
    item: Media;
    className?: string;
    mediaClassName?: string;
    showCaption?: boolean;
}) {
    const src = mediaUrl(item);
    const poster = mediaPoster(item);
    const alt = item.alt || item.caption || 'Portfolio media';

    return (
        <figure className={cn('group overflow-hidden bg-muted', className)}>
            {isVideo(item) ? (
                <div className="relative h-full w-full">
                    <video
                        src={src}
                        poster={poster || undefined}
                        controls
                        playsInline
                        className={cn('h-full w-full object-cover', mediaClassName)}
                    />
                    <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 p-2 text-white shadow-lg">
                        <IconPlayerPlayFilled size={18} />
                    </div>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={cn('h-full w-full object-cover transition-transform duration-700 group-hover:scale-105', mediaClassName)}
                />
            )}
            {showCaption && item.caption && (
                <figcaption className="border-t border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                    {item.caption}
                </figcaption>
            )}
        </figure>
    );
}

export function LightboxMedia({
    media,
    initialIndex,
    onClose,
}: {
    media: Media[];
    initialIndex: number;
    onClose: () => void;
}) {
    const [index, setIndex] = useState(initialIndex);
    const item = media[index];

    if (!item) return null;

    const src = mediaUrl(item);
    const poster = mediaPoster(item);
    const alt = item.alt || item.caption || `Gallery item ${index + 1}`;
    const hasMultiple = media.length > 1;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Media preview">
            <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full border border-border bg-card/80 p-3 text-foreground shadow-lg transition-colors hover:bg-card"
                aria-label="Close media preview"
            >
                <IconX size={20} />
            </button>

            {hasMultiple && (
                <button
                    type="button"
                    onClick={() => setIndex((index - 1 + media.length) % media.length)}
                    className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-card/80 px-4 py-3 text-sm font-semibold shadow-lg transition-colors hover:bg-card md:block"
                >
                    Prev
                </button>
            )}

            <figure className="max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                {isVideo(item) ? (
                    <video src={src} poster={poster || undefined} controls autoPlay playsInline className="max-h-[78vh] w-full bg-black object-contain" />
                ) : (
                    <img src={src} alt={alt} className="max-h-[78vh] w-full bg-black object-contain" />
                )}
                {(item.caption || hasMultiple) && (
                    <figcaption className="flex flex-col gap-1 border-t border-border bg-card px-5 py-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                        <span>{item.caption || alt}</span>
                        {hasMultiple && <span>{index + 1} / {media.length}</span>}
                    </figcaption>
                )}
            </figure>

            {hasMultiple && (
                <button
                    type="button"
                    onClick={() => setIndex((index + 1) % media.length)}
                    className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-card/80 px-4 py-3 text-sm font-semibold shadow-lg transition-colors hover:bg-card md:block"
                >
                    Next
                </button>
            )}
        </div>
    );
}

export function EmptyGallery() {
    return (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center text-sm text-muted-foreground">
            Add media to this portfolio to populate the gallery.
        </div>
    );
}
