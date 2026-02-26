"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { IconUpload, IconX } from "@tabler/icons-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import {
    generateImageThumbnail,
    generateVideoThumbnail,
    blobToPreviewUrl,
    thumbnailBlobToFile,
} from "@/lib/thumbnail";
import { uploadMediaFile, confirmPresignedUpload } from "@/lib/actions/media";
import { uploadToS3 } from "./helpers";
import { DropZone } from "./drop-zone";
import { StagedRow } from "./staged-row";
import { UploadQueue } from "./upload-item";
import type {
    MediaUploaderProps,
    UploadedMedia,
    StagedFile,
    UploadStatus,
} from "./types";

// Re-export types so existing import paths keep working
export type { UploadedMedia, MediaUploaderProps };

export function MediaUploader({
    onUploadComplete,
    onSuccess,
    maxFiles = 10,
    mode = "dialog",
    buttonLabel = "Upload Media",
}: MediaUploaderProps) {
    const [staged, setStaged] = useState<StagedFile[]>([]);
    const [uploads, setUploads] = useState<UploadStatus[]>([]);

    // ── staging ──────────────────────────────────────────────────────────────

    const handleAllFiles = useCallback(
        (files: FileList) => {
            const remaining = maxFiles - (staged.length + uploads.length);
            const incoming = Array.from(files).slice(0, remaining);

            const newStaged: StagedFile[] = incoming.map((file) => ({
                file,
                mediaType: file.type.startsWith("video/") ? "video" : "image",
                thumbGenerating: true,
            }));
            setStaged((prev) => [...prev, ...newStaged]);

            // Generate thumbnails asynchronously, patch the staged item when done
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
        setStaged((prev) =>
            prev.map((s) => {
                if (s.file !== file) return s;
                if (s.customThumbPreview)
                    URL.revokeObjectURL(s.customThumbPreview);
                return {
                    ...s,
                    customThumbFile: thumbFile,
                    customThumbPreview: blobToPreviewUrl(thumbFile),
                };
            }),
        );
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

    // ── upload core ──────────────────────────────────────────────────────────

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
                const thumbFileToUpload = customThumbFile
                    ? customThumbFile
                    : thumbBlob
                      ? thumbnailBlobToFile(thumbBlob, file.name)
                      : undefined;

                let createResponse;

                if (mediaType === "image") {
                    // Images: single multipart POST (small enough to go through Django)
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
                    // Videos: presigned URL → S3 directly, then confirm with thumbnail
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

    const handleConfirmUpload = useCallback(() => {
        const toUpload = [...staged];
        setStaged([]);
        toUpload.forEach((item) => uploadFile(item));
    }, [staged, uploadFile]);

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

    // ── render ───────────────────────────────────────────────────────────────

    const uploadZone = (
        <div className="space-y-4">
            <DropZone onFiles={handleAllFiles} />

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

            <UploadQueue
                uploads={uploads}
                onRetry={handleRetry}
                onRemove={handleRemoveUpload}
            />
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
                        {uploadZone}
                    </DialogContent>
                </Dialog>
            ) : (
                uploadZone
            )}
        </>
    );
}
