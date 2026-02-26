"use client";

import { useState, useRef, useCallback } from "react";
import {
    uploadMediaFile,
    getPresignedURL,
    confirmPresignedUpload,
} from "@/lib/actions/media";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    IconUpload,
    IconLoader2,
    IconCheck,
    IconX,
    IconRefresh,
    IconVideo,
    IconFileUpload,
    IconTrash,
    IconEdit,
} from "@tabler/icons-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    generateImageThumbnail,
    generateVideoThumbnail,
    blobToPreviewUrl,
    thumbnailBlobToFile,
} from "@/lib/thumbnail";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UploadedMedia {
    id: number;
    url: string;
    thumbnail_url?: string | null;
    media_type: string;
    alt: string;
    caption: string;
}

/** A file that has been selected but not yet confirmed for upload */
interface StagedFile {
    file: File;
    mediaType: "image" | "video";
    /** Auto-generated thumbnail blob (filled async after staging) */
    thumbBlob?: Blob;
    /** Preview URL for the generated thumbnail */
    thumbPreview?: string;
    /** User-selected custom thumbnail file */
    customThumbFile?: File;
    /** Preview URL for the custom thumbnail */
    customThumbPreview?: string;
    /** Whether thumbnail is still being generated */
    thumbGenerating: boolean;
}

interface UploadStatus {
    file: File;
    mediaType: "image" | "video";
    status: "pending" | "uploading" | "success" | "error";
    progress: number;
    error?: string;
    thumbBlob?: Blob;
    customThumbFile?: File;
    thumbPreview?: string;
    customThumbPreview?: string;
}

export interface MediaUploaderProps {
    onUploadComplete?: (media: UploadedMedia[]) => void;
    onSuccess?: (media: UploadedMedia) => void;
    maxFiles?: number;
    mode?: "dialog" | "inline";
    buttonLabel?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Upload a file directly to S3 via presigned URL.
 * Used for videos (large files that should bypass Django's request limit).
 */
async function uploadToS3(file: File): Promise<string> {
    const presignedResponse = await getPresignedURL({
        filename: file.name,
        content_type: file.type,
        file_size: file.size,
    });

    if (!presignedResponse.ok || !presignedResponse.data) {
        throw new Error("Failed to get presigned upload URL");
    }

    const { upload_url, public_url } = presignedResponse.data;

    const uploadResponse = await fetch(upload_url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
    });

    if (!uploadResponse.ok)
        throw new Error("Failed to upload video to storage");

    return public_url;
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// ─── Staged File Row (list item) ─────────────────────────────────────────────

interface StagedRowProps {
    item: StagedFile;
    onRemove: (file: File) => void;
    onCustomThumb: (file: File, thumbFile: File) => void;
    onRemoveCustomThumb: (file: File) => void;
}

function StagedRow({
    item,
    onRemove,
    onCustomThumb,
    onRemoveCustomThumb,
}: StagedRowProps) {
    const thumbInputRef = useRef<HTMLInputElement>(null);
    const activeThumbPreview = item.customThumbPreview ?? item.thumbPreview;

    return (
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
            {/* Thumbnail */}
            <div className="w-20 h-12 rounded-md overflow-hidden shrink-0 bg-muted border flex items-center justify-center">
                {activeThumbPreview ? (
                    <img
                        src={activeThumbPreview}
                        alt={item.file.name}
                        className="w-full h-full object-cover"
                    />
                ) : item.thumbGenerating ? (
                    <IconLoader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                ) : item.mediaType === "video" ? (
                    <IconVideo className="w-5 h-5 text-muted-foreground" />
                ) : (
                    <IconFileUpload className="w-5 h-5 text-muted-foreground" />
                )}
            </div>

            {/* File info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-sm font-medium line-clamp-1 break-all">
                        {item.file.name}
                    </p>
                </div>
                <p className="text-xs text-muted-foreground">
                    {formatFileSize(item.file.size)}
                </p>
                <Badge
                    variant="muted"
                    className="text-[10px] px-1.5 h-4 shrink-0 capitalize"
                >
                    {item.mediaType}
                </Badge>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
                {item.mediaType === "video" && (
                    <>
                        <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="gap-1.5 text-xs"
                            onClick={() => thumbInputRef.current?.click()}
                            title={
                                item.customThumbPreview
                                    ? "Change thumb"
                                    : "Set thumb"
                            }
                        >
                            <IconEdit className="w-3 h-3" />
                        </Button>
                        {item.customThumbPreview && (
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="gap-1.5 text-xs text-muted-foreground"
                                onClick={() => onRemoveCustomThumb(item.file)}
                                title="Reset thumb"
                            >
                                <IconRefresh className="w-3 h-3" />
                            </Button>
                        )}
                        <input
                            ref={thumbInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) onCustomThumb(item.file, f);
                                e.target.value = "";
                            }}
                        />
                    </>
                )}
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="gap-1.5 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemove(item.file)}
                    title="Remove"
                >
                    <IconTrash className="w-3 h-3" />
                </Button>
            </div>
        </div>
    );
}

// ─── Upload Progress Item ─────────────────────────────────────────────────────

interface UploadItemProps {
    upload: UploadStatus;
    onRetry: (file: File) => void;
    onRemove: (file: File) => void;
}

function UploadItem({ upload, onRetry, onRemove }: UploadItemProps) {
    const activeThumbPreview = upload.customThumbPreview ?? upload.thumbPreview;

    return (
        <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
            {/* Thumbnail */}
            {activeThumbPreview && (
                <div className="w-12 h-8 rounded overflow-hidden shrink-0 bg-muted border">
                    <img
                        src={activeThumbPreview}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Status icon */}
            <div className="shrink-0">
                {upload.status === "uploading" && (
                    <IconLoader2 className="w-4 h-4 text-primary animate-spin" />
                )}
                {upload.status === "success" && (
                    <IconCheck className="w-4 h-4 text-green-500" />
                )}
                {upload.status === "error" && (
                    <IconX className="w-4 h-4 text-destructive" />
                )}
                {upload.status === "pending" && (
                    <IconLoader2 className="w-4 h-4 text-muted-foreground" />
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium line-clamp-1 break-all">
                    {upload.file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                    {formatFileSize(upload.file.size)}
                </p>
                {upload.error && (
                    <p className="text-xs text-destructive mt-0.5">
                        {upload.error}
                    </p>
                )}
            </div>

            {/* Actions */}
            {upload.status === "error" ? (
                <div className="flex items-center gap-1 shrink-0">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onRetry(upload.file)}
                        className="gap-1 h-7 text-xs"
                    >
                        <IconRefresh className="w-3 h-3" />
                        Retry
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemove(upload.file)}
                        className="h-7 w-7 p-0"
                    >
                        <IconX className="w-3 h-3" />
                    </Button>
                </div>
            ) : (
                <Badge
                    variant={
                        upload.status === "success" ? "default" : "secondary"
                    }
                    className="shrink-0 text-xs"
                >
                    {upload.status === "uploading" && `${upload.progress}%`}
                    {upload.status === "success" && "Done"}
                    {upload.status === "pending" && "Pending"}
                </Badge>
            )}
        </div>
    );
}

// ─── Drop Zone ────────────────────────────────────────────────────────────────

interface DropZoneProps {
    onFiles: (files: FileList) => void;
}

function DropZone({ onFiles }: DropZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Card
            className={`border-2 border-dashed transition-colors cursor-pointer ${
                isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
            }`}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
        >
            <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10">
                        <IconFileUpload className="w-8 h-8 text-primary" />
                    </div>
                </div>
                <h3 className="font-semibold mb-2">Upload Images or Videos</h3>
                <p className="text-sm text-muted-foreground mb-1">
                    Drag and drop here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                    JPEG, PNG, WebP · up to 5 MB &nbsp;·&nbsp; MP4, WebM, MOV ·
                    up to 50 MB
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files?.length) onFiles(e.target.files);
                        e.target.value = "";
                    }}
                />
            </div>
        </Card>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MediaUploader({
    onUploadComplete,
    onSuccess,
    maxFiles = 10,
    mode = "dialog",
    buttonLabel = "Upload Media",
}: MediaUploaderProps) {
    const [staged, setStaged] = useState<StagedFile[]>([]);
    const [uploads, setUploads] = useState<UploadStatus[]>([]);

    // ── staging ──

    const handleAllFiles = useCallback(
        (files: FileList) => {
            const remaining = maxFiles - (staged.length + uploads.length);
            const incoming = Array.from(files).slice(0, remaining);

            // Add to staged list immediately
            const newStaged: StagedFile[] = incoming.map((file) => ({
                file,
                mediaType: file.type.startsWith("video/") ? "video" : "image",
                thumbGenerating: true,
            }));
            setStaged((prev) => [...prev, ...newStaged]);

            // Generate thumbnails asynchronously, update staged as each finishes
            incoming.forEach(async (file) => {
                const mediaType = file.type.startsWith("video/")
                    ? "video"
                    : "image";
                try {
                    const thumbBlob =
                        mediaType === "image"
                            ? await generateImageThumbnail(file)
                            : await generateVideoThumbnail(file);
                    const thumbPreview = blobToPreviewUrl(thumbBlob);
                    setStaged((prev) =>
                        prev.map((s) =>
                            s.file === file
                                ? {
                                      ...s,
                                      thumbBlob,
                                      thumbPreview,
                                      thumbGenerating: false,
                                  }
                                : s,
                        ),
                    );
                } catch {
                    setStaged((prev) =>
                        prev.map((s) =>
                            s.file === file
                                ? { ...s, thumbGenerating: false }
                                : s,
                        ),
                    );
                }
            });
        },
        [maxFiles, staged.length, uploads.length],
    );

    const removeStagedFile = useCallback((file: File) => {
        setStaged((prev) => {
            const item = prev.find((s) => s.file === file);
            if (item?.thumbPreview) URL.revokeObjectURL(item.thumbPreview);
            if (item?.customThumbPreview)
                URL.revokeObjectURL(item.customThumbPreview);
            return prev.filter((s) => s.file !== file);
        });
    }, []);

    const clearStaged = useCallback(() => {
        setStaged((prev) => {
            prev.forEach((s) => {
                if (s.thumbPreview) URL.revokeObjectURL(s.thumbPreview);
                if (s.customThumbPreview)
                    URL.revokeObjectURL(s.customThumbPreview);
            });
            return [];
        });
    }, []);

    const setStagedCustomThumb = useCallback((file: File, thumbFile: File) => {
        setStaged((prev) => {
            return prev.map((s) => {
                if (s.file !== file) return s;
                if (s.customThumbPreview)
                    URL.revokeObjectURL(s.customThumbPreview);
                const customThumbPreview = blobToPreviewUrl(thumbFile);
                return { ...s, customThumbFile: thumbFile, customThumbPreview };
            });
        });
    }, []);

    const removeStagedCustomThumb = useCallback((file: File) => {
        setStaged((prev) =>
            prev.map((s) => {
                if (s.file !== file) return s;
                if (s.customThumbPreview)
                    URL.revokeObjectURL(s.customThumbPreview);
                return {
                    ...s,
                    customThumbFile: undefined,
                    customThumbPreview: undefined,
                };
            }),
        );
    }, []);

    // ── upload core ──

    const updateUpload = useCallback(
        (file: File, patch: Partial<UploadStatus>) => {
            setUploads((prev) =>
                prev.map((u) => (u.file === file ? { ...u, ...patch } : u)),
            );
        },
        [],
    );

    const removeUpload = useCallback((file: File) => {
        setUploads((prev) => prev.filter((x) => x.file !== file));
    }, []);

    const uploadFile = useCallback(
        async (stagedItem: StagedFile) => {
            const {
                file,
                mediaType,
                thumbBlob,
                customThumbFile,
                thumbPreview,
                customThumbPreview,
            } = stagedItem;

            setUploads((prev) => [
                ...prev,
                {
                    file,
                    mediaType,
                    status: "uploading",
                    progress: 20,
                    thumbBlob,
                    customThumbFile,
                    thumbPreview,
                    customThumbPreview,
                },
            ]);

            try {
                // Determine thumbnail file to use (custom > auto-generated)
                const thumbFileToUpload = customThumbFile
                    ? customThumbFile
                    : thumbBlob
                      ? thumbnailBlobToFile(thumbBlob, file.name)
                      : undefined;

                let createResponse;

                if (mediaType === "image") {
                    // ── Images: single multipart POST ──────────────────────
                    // Small files — send everything (file + thumbnail) together
                    // to avoid the extra presigned-URL round-trip.
                    const formData = new FormData();
                    formData.append("file", file, file.name);
                    formData.append("alt", file.name);
                    if (thumbFileToUpload) {
                        formData.append(
                            "thumbnail",
                            thumbFileToUpload,
                            thumbFileToUpload.name,
                        );
                    }
                    updateUpload(file, { progress: 50 });
                    createResponse = await uploadMediaFile(formData);
                } else {
                    // ── Videos: presigned URL → S3, then confirmation POST ──
                    // Large files go directly to S3 to avoid Django timeouts.
                    // The thumbnail (small) is sent in the confirmation POST.
                    updateUpload(file, { progress: 20 });
                    const videoPublicUrl = await uploadToS3(file);
                    updateUpload(file, { progress: 80 });
                    createResponse = await confirmPresignedUpload({
                        video: videoPublicUrl,
                        thumbnailFile: thumbFileToUpload,
                        alt: file.name,
                    });
                }

                if (!createResponse.ok || !createResponse.data) {
                    throw new Error("Upload failed");
                }

                updateUpload(file, { status: "success", progress: 100 });

                const newMedia: UploadedMedia = {
                    id: createResponse.data.id,
                    url: createResponse.data.url,
                    thumbnail_url: createResponse.data.thumbnail,
                    media_type: createResponse.data.media_type,
                    alt: createResponse.data.alt,
                    caption: createResponse.data.caption,
                };

                onUploadComplete?.([newMedia]);
                onSuccess?.(newMedia);

                setTimeout(() => removeUpload(file), 3000);
            } catch (error) {
                updateUpload(file, {
                    status: "error",
                    error:
                        error instanceof Error
                            ? error.message
                            : "Upload failed",
                });
            }
        },
        [updateUpload, removeUpload, onUploadComplete, onSuccess],
    );

    // ── confirm upload ──

    const handleConfirmUpload = useCallback(() => {
        const toUpload = [...staged];
        setStaged([]); // clear staging queue
        toUpload.forEach((item) => uploadFile(item));
    }, [staged, uploadFile]);

    // ── retry ──

    const handleRetry = useCallback(
        (file: File) => {
            const u = uploads.find((x) => x.file === file);
            if (!u) return;
            removeUpload(file);
            uploadFile({
                file,
                mediaType: u.mediaType,
                thumbBlob: u.thumbBlob,
                customThumbFile: u.customThumbFile,
                thumbPreview: u.thumbPreview,
                customThumbPreview: u.customThumbPreview,
                thumbGenerating: false,
            });
        },
        [uploads, removeUpload, uploadFile],
    );

    const handleRemoveUpload = useCallback((file: File) => {
        setUploads((prev) => prev.filter((u) => u.file !== file));
    }, []);

    // ── render ──

    const renderUploadZone = () => (
        <div className="space-y-4">
            {/* Drop zone — always visible so user can keep adding */}
            <DropZone onFiles={handleAllFiles} />

            {/* Staging queue */}
            {staged.length > 0 && (
                <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                        {staged.map((item, i) => (
                            <StagedRow
                                key={i}
                                item={item}
                                onRemove={removeStagedFile}
                                onCustomThumb={setStagedCustomThumb}
                                onRemoveCustomThumb={removeStagedCustomThumb}
                            />
                        ))}
                    </div>

                    {/* Confirm / Cancel row */}
                    <div className="flex items-center gap-2 pt-1">
                        <Button
                            className="flex-1 gap-2"
                            onClick={handleConfirmUpload}
                            disabled={staged.some((s) => s.thumbGenerating)}
                        >
                            <IconUpload className="w-4 h-4" />
                            Upload {staged.length} file
                            {staged.length !== 1 ? "s" : ""}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={clearStaged}
                            className="gap-2"
                        >
                            <IconX className="w-4 h-4" />
                            Cancel
                        </Button>
                    </div>
                    {staged.some((s) => s.thumbGenerating) && (
                        <p className="text-xs text-muted-foreground text-center">
                            Generating previews, please wait…
                        </p>
                    )}
                </div>
            )}

            {/* Active uploads */}
            {uploads.length > 0 && (
                <Card className="p-4 space-y-2">
                    <h4 className="font-semibold text-sm">Uploading</h4>
                    {uploads.map((upload, i) => (
                        <UploadItem
                            key={i}
                            upload={upload}
                            onRetry={handleRetry}
                            onRemove={handleRemoveUpload}
                        />
                    ))}
                </Card>
            )}
        </div>
    );

    return (
        <>
            {mode === "dialog" ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <IconUpload className="w-4 h-4 mr-2" />
                            {buttonLabel}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[580px]">
                        <DialogHeader>
                            <DialogTitle>Upload Media</DialogTitle>
                        </DialogHeader>
                        {renderUploadZone()}
                    </DialogContent>
                </Dialog>
            ) : (
                renderUploadZone()
            )}
        </>
    );
}
