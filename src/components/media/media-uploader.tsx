"use client";

import { useState } from "react";
import { getPresignedURL, createMediaRecord } from "@/lib/actions/media";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    IconUpload,
    IconLoader2,
    IconCheck,
    IconX,
    IconRefresh,
    IconPhoto,
    IconVideo,
} from "@tabler/icons-react";

export interface UploadedMedia {
    id: number;
    url: string;
    media_type: string;
    alt: string;
    caption: string;
}

interface UploadStatus {
    file: File;
    status: "pending" | "uploading" | "success" | "error";
    progress: number;
    error?: string;
    mediaId?: number;
}

interface MediaUploaderProps {
    onUploadComplete?: (media: UploadedMedia[]) => void;
    maxFiles?: number;
    showPreview?: boolean;
}

export function MediaUploader({
    onUploadComplete,
    initialMedia = [],
    maxFiles = 10,
    showPreview = true,
}: {
    onUploadComplete?: (media: UploadedMedia[]) => void;
    initialMedia?: UploadedMedia[];
    maxFiles?: number;
    showPreview?: boolean;
}) {
    const [uploads, setUploads] = useState<UploadStatus[]>([]);
    const [uploadedMedia, setUploadedMedia] =
        useState<UploadedMedia[]>(initialMedia);
    const [isDragging, setIsDragging] = useState(false);

    const validateFile = (file: File): string | null => {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (!isImage && !isVideo) {
            return "Only image and video files are allowed";
        }

        const maxSize = isImage ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
        if (file.size > maxSize) {
            return `${isImage ? "Image" : "Video"} files must be less than ${maxSize / (1024 * 1024)}MB`;
        }

        return null;
    };

    const uploadFile = async (file: File) => {
        setUploads((prev) => [
            ...prev,
            { file, status: "pending", progress: 0 },
        ]);

        try {
            const validationError = validateFile(file);
            if (validationError) {
                setUploads((prev) =>
                    prev.map((u) =>
                        u.file === file
                            ? { ...u, status: "error", error: validationError }
                            : u,
                    ),
                );
                return;
            }

            // Step 1: Get presigned URL
            setUploads((prev) =>
                prev.map((u) =>
                    u.file === file
                        ? { ...u, status: "uploading", progress: 25 }
                        : u,
                ),
            );

            const presignedResponse = await getPresignedURL({
                filename: file.name,
                content_type: file.type,
                file_size: file.size,
            });

            if (!presignedResponse.ok || !presignedResponse.data) {
                throw new Error("Failed to get upload URL");
            }

            const { upload_url, public_url } = presignedResponse.data;

            // Step 2: Upload to S3
            setUploads((prev) =>
                prev.map((u) => (u.file === file ? { ...u, progress: 50 } : u)),
            );

            const uploadResponse = await fetch(upload_url, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload file");
            }

            // Step 3: Create media record
            setUploads((prev) =>
                prev.map((u) => (u.file === file ? { ...u, progress: 75 } : u)),
            );

            const isImage = file.type.startsWith("image/");
            const mediaData = isImage
                ? { image: public_url, alt: file.name }
                : { video: public_url, alt: file.name };

            const createResponse = await createMediaRecord(mediaData);

            if (!createResponse.ok || !createResponse.data) {
                throw new Error("Failed to create media record");
            }

            setUploads((prev) =>
                prev.map((u) =>
                    u.file === file
                        ? {
                              ...u,
                              status: "success",
                              progress: 100,
                              mediaId: createResponse.data!.id,
                          }
                        : u,
                ),
            );

            const newMedia: UploadedMedia = {
                id: createResponse.data.id,
                url: createResponse.data.url,
                media_type: createResponse.data.media_type,
                alt: createResponse.data.alt,
                caption: createResponse.data.caption,
            };

            setUploadedMedia((prev) => {
                const updated = [...prev, newMedia];
                onUploadComplete?.(updated);
                return updated;
            });

            setTimeout(() => {
                setUploads((prev) => prev.filter((u) => u.file !== file));
            }, 3000);
        } catch (error) {
            setUploads((prev) =>
                prev.map((u) =>
                    u.file === file
                        ? {
                              ...u,
                              status: "error",
                              error:
                                  error instanceof Error
                                      ? error.message
                                      : "Upload failed",
                          }
                        : u,
                ),
            );
        }
    };

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const fileArray = Array.from(files);
        const remainingSlots =
            maxFiles - (uploads.length + uploadedMedia.length);

        if (fileArray.length > remainingSlots) {
            alert(`You can only upload ${remainingSlots} more file(s)`);
            return;
        }

        fileArray.forEach((file) => uploadFile(file));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleRetryUpload = (file: File) => {
        setUploads((prev) => prev.filter((u) => u.file !== file));
        uploadFile(file);
    };

    const handleRemoveUpload = (file: File) => {
        setUploads((prev) => prev.filter((u) => u.file !== file));
    };

    const handleRemoveMedia = (mediaId: number) => {
        setUploadedMedia((prev) => {
            const updated = prev.filter((m) => m.id !== mediaId);
            onUploadComplete?.(updated);
            return updated;
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <Card
                className={`border-2 border-dashed transition-colors ${
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25"
                }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <div className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-primary/10">
                            <IconUpload className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h3 className="font-semibold mb-2">Upload Media</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                        Images up to 5MB, Videos up to 50MB
                    </p>
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        multiple
                        accept="image/*,video/*"
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                    <Button type="button" variant="outline">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex items-center gap-2"
                        >
                            <IconUpload className="w-4 h-4 mr-2" />
                            Choose Files
                        </label>
                    </Button>
                </div>
            </Card>

            {/* Upload Progress */}
            {uploads.length > 0 && (
                <Card className="p-4 space-y-3">
                    <h4 className="font-semibold text-sm">Uploading Files</h4>
                    <div className="space-y-2">
                        {uploads.map((upload, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                            >
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
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">
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

                                {upload.status === "error" ? (
                                    <div className="flex items-center gap-1 shrink-0">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                handleRetryUpload(upload.file)
                                            }
                                            className="gap-1 h-7 text-xs"
                                        >
                                            <IconRefresh className="w-3 h-3" />
                                            Retry
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() =>
                                                handleRemoveUpload(upload.file)
                                            }
                                            className="h-7 w-7 p-0"
                                        >
                                            <IconX className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ) : (
                                    <Badge
                                        variant={
                                            upload.status === "success"
                                                ? "default"
                                                : "secondary"
                                        }
                                        className="shrink-0 text-xs"
                                    >
                                        {upload.status === "uploading" &&
                                            `${upload.progress}%`}
                                        {upload.status === "success" && "Done"}
                                        {upload.status === "pending" &&
                                            "Pending"}
                                    </Badge>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Preview of uploaded media */}
            {showPreview && uploadedMedia.length > 0 && (
                <Card className="p-4">
                    <h4 className="font-semibold text-sm mb-3">
                        Uploaded Media ({uploadedMedia.length})
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                        {uploadedMedia.map((media) => (
                            <div
                                key={media.id}
                                className="relative aspect-square rounded-lg overflow-hidden bg-muted group"
                            >
                                {media.media_type === "image" ? (
                                    <img
                                        src={media.url}
                                        alt={media.alt}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-black/5">
                                        <IconVideo className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="h-8 w-8 rounded-full"
                                        onClick={() =>
                                            handleRemoveMedia(media.id)
                                        }
                                    >
                                        <IconX className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
