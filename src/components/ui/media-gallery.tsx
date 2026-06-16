"use client";

import React, { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "./carousel";

interface MediaItem {
    id: string | number;
    media_type: "image" | "video";
    url: string;
    thumbnail?: string;
    alt?: string;
    caption?: string;
}

interface MediaGalleryProps {
    media: MediaItem[];
}

export function MediaGallery({ media }: MediaGalleryProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [thumbApi, setThumbApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!api || !containerRef.current) {
            return;
        }

        const handleSelect = () => {
            const selectedIndex = api.selectedScrollSnap();
            setCurrent(selectedIndex);

            // Sync thumbnail carousel
            if (thumbApi) {
                thumbApi.scrollTo(selectedIndex);
            }

            // Auto play/pause videos
            const videos = containerRef.current?.querySelectorAll("video");
            if (videos) {
                videos.forEach((video) => {
                    const videoIndex = parseInt(
                        video.getAttribute("data-index") || "-1",
                        10,
                    );
                    if (videoIndex === selectedIndex) {
                        video
                            .play()
                            .catch((e) =>
                                console.log("Auto-play prevented", e),
                            );
                    } else {
                        video.pause();
                    }
                });
            }
        };

        // Call initially to play the first video if applicable
        handleSelect();

        api.on("select", handleSelect);
    }, [api, thumbApi]);

    if (!media || media.length === 0) return null;

    return (
        <div className="space-y-4" ref={containerRef}>
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {media.map((item, idx) => (
                        <CarouselItem key={item.id || idx}>
                            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-center">
                                {item.media_type === "video" ? (
                                    <video
                                        src={item.url}
                                        poster={item.thumbnail}
                                        controls
                                        muted
                                        playsInline
                                        data-index={idx}
                                        className="w-full aspect-video object-contain bg-muted/30"
                                    />
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={item.url}
                                        alt={
                                            item.alt ||
                                            item.caption ||
                                            `Media ${idx + 1}`
                                        }
                                        className="w-full aspect-video object-contain bg-muted/30"
                                    />
                                )}
                                {item.caption && (
                                    <p className="text-sm text-center text-muted-foreground p-3 border-t border-border bg-muted/10">
                                        {item.caption}
                                    </p>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {media.length > 1 && (
                    <>
                        <CarouselPrevious className="hidden sm:flex" />
                        <CarouselNext className="hidden sm:flex" />
                    </>
                )}
            </Carousel>

            {/* Thumbnails */}
            {media.length > 1 && (
                <div className="relative">
                    <Carousel
                        setApi={setThumbApi}
                        opts={{
                            align: "start",
                            containScroll: "trimSnaps",
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2">
                            {media.map((item, idx) => (
                                <CarouselItem
                                    key={`thumb-${item.id || idx}`}
                                    className="pl-2 basis-auto"
                                >
                                    <button
                                        onClick={() => api?.scrollTo(idx)}
                                        className={`relative overflow-hidden rounded-md border-2 transition-all block ${
                                            current === idx
                                                ? " scale-105 z-10"
                                                : "border-transparent opacity-70 hover:opacity-100"
                                        }`}
                                    >
                                        <div className="relative w-36 aspect-video bg-muted/20 flex items-center justify-center">
                                            {item.media_type === "video" ? (
                                                <>
                                                    {item.thumbnail && (
                                                        <img
                                                            src={item.thumbnail}
                                                            alt={`Thumbnail ${
                                                                idx + 1
                                                            }`}
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors hover:bg-black/20">
                                                        <svg
                                                            className="w-6 h-6 text-white"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </>
                                            ) : (
                                                <img
                                                    src={
                                                        item.thumbnail ||
                                                        item.url
                                                    }
                                                    alt={`Thumbnail ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            )}
        </div>
    );
}
