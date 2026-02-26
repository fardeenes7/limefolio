"use client";

import { useState } from "react";
import { Media } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    IconPhoto,
    IconVideo,
    IconTrash,
    IconMaximize,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { deleteMedia } from "@/lib/actions/media";
import {
    MediaUploader,
    UploadedMedia,
} from "@/components/media/media-uploader";
import Image from "next/image";
import { MediaDetailsSheet } from "@/components/ui/media-details-sheet";

interface MediaClientProps {
    initialMedia: Media[];
}

export function MediaClient({ initialMedia }: MediaClientProps) {
    const [media, setMedia] = useState<Media[]>(initialMedia);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleMediaSuccess = (newMedia: UploadedMedia) => {
        // Map UploadedMedia back to Media shape for the gallery
        setMedia((prev) => [
            {
                id: newMedia.id,
                image: newMedia.media_type === "image" ? newMedia.url : null,
                video: newMedia.media_type === "video" ? newMedia.url : null,
                thumbnail: newMedia.thumbnail_url ?? null,
                alt: newMedia.alt,
                caption: newMedia.caption,
                order: 0,
                is_featured: false,
                media_type: newMedia.media_type as "image" | "video",
                url: newMedia.url,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            } as Media,
            ...prev,
        ]);
    };

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this media?")) return;

        const response = await deleteMedia(id);
        if (response.ok) {
            setMedia((prev) => prev.filter((m) => m.id !== id));
        }
    };

    const handleViewMedia = (item: Media) => {
        setSelectedMedia(item);
        setIsSheetOpen(true);
    };

    const handleThumbnailUpdate = (
        mediaId: number,
        newThumbnailUrl: string,
    ) => {
        setMedia((prev) =>
            prev.map((m) =>
                m.id === mediaId ? { ...m, thumbnail: newThumbnailUrl } : m,
            ),
        );
        // Also update the selected media so the sheet reflects the new thumbnail
        setSelectedMedia((prev) =>
            prev?.id === mediaId
                ? { ...prev, thumbnail: newThumbnailUrl }
                : prev,
        );
    };

    return (
        <div className="space-y-6">
            <MediaDetailsSheet
                media={selectedMedia}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                onThumbnailUpdate={handleThumbnailUpdate}
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Media Library
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Upload and manage your images and videos
                    </p>
                </div>
                <MediaUploader
                    mode="dialog"
                    onSuccess={handleMediaSuccess}
                    buttonLabel="Upload Media"
                />
            </div>

            {/* Media Gallery */}
            {media.length === 0 ? (
                <Card className="p-12">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <div className="p-4 rounded-full bg-muted">
                            <IconPhoto className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">
                                No media yet
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Upload your first image or video to get started
                            </p>
                        </div>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {media.map((item) => (
                        <Card
                            key={item.id}
                            className="group overflow-hidden hover:shadow-lg transition-all duration-300 py-0 gap-0 cursor-pointer"
                            onClick={() => handleViewMedia(item)}
                        >
                            <div className="relative aspect-video bg-muted">
                                {/* Use thumbnail for display when available */}
                                {item.media_type === "image" && (
                                    <Image
                                        src={item.thumbnail ?? item.url}
                                        alt={item.alt || "Media"}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                {item.media_type === "video" &&
                                    (item.thumbnail ? (
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.alt || "Video thumbnail"}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <IconVideo className="w-10 h-10 text-muted-foreground" />
                                        </div>
                                    ))}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="gap-1.5"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleViewMedia(item);
                                        }}
                                    >
                                        <IconMaximize className="w-4 h-4" />
                                        View
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={(e) =>
                                            handleDelete(e, item.id)
                                        }
                                        className="bg-red-500 hover:bg-red-400 text-white gap-1.5"
                                    >
                                        <IconTrash className="w-4 h-4" />
                                        Delete
                                    </Button>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <Badge
                                        variant="secondary"
                                        className="gap-1.5"
                                    >
                                        {item.media_type === "image" ? (
                                            <IconPhoto className="w-3 h-3" />
                                        ) : (
                                            <IconVideo className="w-3 h-3" />
                                        )}
                                        {item.media_type}
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-medium truncate">
                                    {item.alt || "Untitled"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(
                                        item.created_at,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
