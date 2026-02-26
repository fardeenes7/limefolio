"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Media } from "@/types";
import Image from "next/image";
import {
    IconCalendar,
    IconLink,
    IconFileDescription,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MediaDetailsSheetProps {
    media: Media | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function MediaDetailsSheet({
    media,
    open,
    onOpenChange,
}: MediaDetailsSheetProps) {
    if (!media) return null;

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Media Details</SheetTitle>
                    <SheetDescription>
                        View information about this media file.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-6">
                    {/* Media Preview */}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        {media.media_type === "image" && media.url ? (
                            <Image
                                src={media.url}
                                alt={media.alt || "Media preview"}
                                fill
                                className="object-contain"
                            />
                        ) : media.media_type === "video" && media.url ? (
                            <video
                                src={`${media.url}#t=0.001`}
                                controls
                                preload="metadata"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="text-muted-foreground">
                                No preview available
                            </div>
                        )}
                    </div>

                    {/* Media Info */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg truncate pr-4">
                                {media.alt ||
                                    media.url?.split("/").pop() ||
                                    "Untitled"}
                            </h3>
                            <Badge
                                variant={
                                    media.media_type === "video"
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {media.media_type}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 gap-4 text-sm bg-muted/30 p-4 rounded-lg">
                            {media.caption && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <IconFileDescription className="w-4 h-4" />
                                        <span className="font-medium">
                                            Caption
                                        </span>
                                    </div>
                                    <p className="text-foreground pl-6">
                                        {media.caption}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <IconLink className="w-4 h-4" />
                                    <span className="font-medium">URL</span>
                                </div>
                                <div className="flex items-center gap-2 pl-6">
                                    <p className="text-foreground truncate flex-1">
                                        {media.url}
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 shrink-0"
                                        onClick={() =>
                                            media.url &&
                                            copyToClipboard(media.url)
                                        }
                                    >
                                        Copy
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <IconCalendar className="w-4 h-4" />
                                    <span className="font-medium">
                                        Uploaded
                                    </span>
                                </div>
                                <p className="text-foreground pl-6">
                                    {media.created_at
                                        ? new Date(
                                              media.created_at,
                                          ).toLocaleString()
                                        : "Unknown"}
                                </p>
                            </div>

                            {media.thumbnail && (
                                <div className="space-y-1 mt-2 border-t pt-4">
                                    <div className="flex items-center gap-2 text-muted-foreground pb-2">
                                        <span className="font-medium">
                                            Thumbnail URL
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 pl-6">
                                        <p className="text-foreground truncate flex-1 text-xs">
                                            {media.thumbnail}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 shrink-0"
                                            onClick={() =>
                                                media.thumbnail &&
                                                copyToClipboard(media.thumbnail)
                                            }
                                        >
                                            Copy
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
