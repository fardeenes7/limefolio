"use client";

import { useState, useRef } from "react";
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
    IconUpload,
    IconLoader2,
    IconCheck,
    IconX,
    IconEdit,
    IconRefresh,
    IconPhoto,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateMediaThumbnail } from "@/lib/actions/media";
import {
    generateImageThumbnail,
    blobToPreviewUrl,
    thumbnailBlobToFile,
} from "@/lib/thumbnail";

interface MediaDetailsSheetProps {
    media: Media | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Called after a thumbnail is successfully updated */
    onThumbnailUpdate?: (mediaId: number, newThumbnailUrl: string) => void;
}

export function MediaDetailsSheet({
    media,
    open,
    onOpenChange,
    onThumbnailUpdate,
}: MediaDetailsSheetProps) {
    const thumbInputRef = useRef<HTMLInputElement>(null);

    // Thumbnail editor state
    const [pendingThumbFile, setPendingThumbFile] = useState<File | null>(null);
    const [pendingThumbPreview, setPendingThumbPreview] = useState<
        string | null
    >(null);
    const [thumbSaving, setThumbSaving] = useState(false);
    const [thumbSaved, setThumbSaved] = useState(false);
    const [thumbError, setThumbError] = useState<string | null>(null);

    // Reset editor state when sheet closes or media changes
    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            if (pendingThumbPreview) URL.revokeObjectURL(pendingThumbPreview);
            setPendingThumbFile(null);
            setPendingThumbPreview(null);
            setThumbSaving(false);
            setThumbSaved(false);
            setThumbError(null);
        }
        onOpenChange(isOpen);
    };

    const handleThumbFileSelected = async (file: File) => {
        // Clean up old preview
        if (pendingThumbPreview) URL.revokeObjectURL(pendingThumbPreview);

        // Generate a downsized thumbnail blob from the selected image
        try {
            const blob = await generateImageThumbnail(file);
            const thumbFile = thumbnailBlobToFile(blob, file.name);
            const preview = blobToPreviewUrl(blob);
            setPendingThumbFile(thumbFile);
            setPendingThumbPreview(preview);
        } catch {
            // Fallback: use the raw file if Canvas fails
            const preview = blobToPreviewUrl(file);
            setPendingThumbFile(file);
            setPendingThumbPreview(preview);
        }

        setThumbSaved(false);
        setThumbError(null);
    };

    const handleThumbSave = async () => {
        if (!media || !pendingThumbFile) return;
        setThumbSaving(true);
        setThumbError(null);

        const result = await updateMediaThumbnail(media.id, pendingThumbFile);

        setThumbSaving(false);
        if (result.ok && result.thumbnailUrl) {
            setThumbSaved(true);
            onThumbnailUpdate?.(media.id, result.thumbnailUrl);
            // auto-clear "saved" feedback after 2s
            setTimeout(() => setThumbSaved(false), 2000);
        } else {
            setThumbError(result.error ?? "Unknown error");
        }
    };

    const handleThumbDiscard = () => {
        if (pendingThumbPreview) URL.revokeObjectURL(pendingThumbPreview);
        setPendingThumbFile(null);
        setPendingThumbPreview(null);
        setThumbError(null);
        setThumbSaved(false);
    };

    if (!media) return null;

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const isVideo = media.media_type === "video";
    const currentThumbnail = pendingThumbPreview ?? media.thumbnail ?? null;

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent className="w-[400px] sm:w-[560px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Media Details</SheetTitle>
                    <SheetDescription>
                        View information about this media file.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-6">
                    {/* ── Media Preview ─────────────────────────────────── */}
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

                    {/* ── Thumbnail Editor (videos only) ────────────────── */}
                    {isVideo && (
                        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">
                                    Thumbnail
                                </h4>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="h-7 gap-1.5 text-xs"
                                    onClick={() =>
                                        thumbInputRef.current?.click()
                                    }
                                    disabled={thumbSaving}
                                >
                                    <IconEdit className="w-3 h-3" />
                                    {currentThumbnail
                                        ? "Change"
                                        : "Set thumbnail"}
                                </Button>
                            </div>

                            {/* Thumbnail preview */}
                            <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted border">
                                {currentThumbnail ? (
                                    <>
                                        <img
                                            src={currentThumbnail}
                                            alt="Thumbnail preview"
                                            className="w-full h-full object-cover"
                                        />
                                        {pendingThumbFile && (
                                            <div className="absolute top-1.5 right-1.5">
                                                <Badge
                                                    variant="secondary"
                                                    className="text-[10px]"
                                                >
                                                    Unsaved
                                                </Badge>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                        <IconPhoto className="w-8 h-8" />
                                        <p className="text-xs">
                                            No thumbnail set
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Pending actions */}
                            {pendingThumbFile && !thumbSaved && (
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        size="sm"
                                        className="flex-1 gap-1.5"
                                        onClick={handleThumbSave}
                                        disabled={thumbSaving}
                                    >
                                        {thumbSaving ? (
                                            <>
                                                <IconLoader2 className="w-3.5 h-3.5 animate-spin" />
                                                Saving…
                                            </>
                                        ) : (
                                            <>
                                                <IconUpload className="w-3.5 h-3.5" />
                                                Save thumbnail
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        className="gap-1.5"
                                        onClick={handleThumbDiscard}
                                        disabled={thumbSaving}
                                    >
                                        <IconX className="w-3.5 h-3.5" />
                                        Discard
                                    </Button>
                                </div>
                            )}

                            {/* Success feedback */}
                            {thumbSaved && (
                                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1.5">
                                    <IconCheck className="w-3.5 h-3.5" />
                                    Thumbnail updated successfully
                                </p>
                            )}

                            {/* Error feedback */}
                            {thumbError && (
                                <p className="text-xs text-destructive flex items-center gap-1.5">
                                    <IconX className="w-3.5 h-3.5" />
                                    {thumbError}
                                </p>
                            )}

                            <input
                                ref={thumbInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) handleThumbFileSelected(f);
                                    e.target.value = "";
                                }}
                            />
                        </div>
                    )}

                    {/* ── Media Info ────────────────────────────────────── */}
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

                            {media.thumbnail && !isVideo && (
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
