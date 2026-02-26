"use client";

import { useState, useRef } from "react";
import { Media } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    IconUpload,
    IconPhoto,
    IconVideo,
    IconTrash,
    IconCheck,
    IconX,
    IconLoader2,
    IconAlertCircle,
    IconFileUpload,
    IconRefresh,
    IconMaximize,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    getPresignedURL,
    createMediaRecord,
    deleteMedia,
} from "@/lib/actions/media";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MediaDetailsSheet } from "@/components/ui/media-details-sheet";

interface MediaClientProps {
    initialMedia: Media[];
}

interface UploadStatus {
    file: File;
    status: "pending" | "uploading" | "success" | "error";
    progress: number;
    error?: string;
    mediaId?: number;
}

export function MediaClient({ initialMedia }: MediaClientProps) {
    const [media, setMedia] = useState<Media[]>(initialMedia);
    const [uploads, setUploads] = useState<UploadStatus[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (!isImage && !isVideo) {
            return "Only image and video files are allowed";
        }

        const maxSize = isImage ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
        if (file.size > maxSize) {
            return isImage
                ? "Image files must be less than 5MB"
                : "Video files must be less than 50MB";
        }

        return null;
    };

    const uploadFile = async (file: File) => {
        const uploadId = file.name + Date.now();

        // Add to uploads list
        setUploads((prev) => [
            ...prev,
            { file, status: "pending", progress: 0 },
        ]);

        try {
            // Validate file
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

            // Update status to uploading
            setUploads((prev) =>
                prev.map((u) =>
                    u.file === file ? { ...u, status: "uploading" } : u,
                ),
            );

            // Get presigned URL
            const presignedResponse = await getPresignedURL({
                filename: file.name,
                content_type: file.type,
                file_size: file.size,
            });

            console.log("presignedResponse", presignedResponse);

            if (!presignedResponse.ok || !presignedResponse.data) {
                throw new Error("Failed to get upload URL");
            }

            const { upload_url, public_url } = presignedResponse.data;

            // Upload to S3 using fetch (client-side)
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

            // Update progress
            setUploads((prev) =>
                prev.map((u) =>
                    u.file === file ? { ...u, progress: 100 } : u,
                ),
            );

            // Create media record
            const isImage = file.type.startsWith("image/");
            const mediaData = {
                [isImage ? "image" : "video"]: public_url,
                alt: file.name,
                caption: "",
            };

            const createResponse = await createMediaRecord(mediaData);

            console.log("createResponse", createResponse);

            if (!createResponse.ok || !createResponse.data) {
                throw new Error("Failed to create media record");
            }

            // Update status to success
            setUploads((prev) =>
                prev.map((u) =>
                    u.file === file
                        ? {
                              ...u,
                              status: "success",
                              mediaId: createResponse.data!.id,
                          }
                        : u,
                ),
            );

            // Add to media list
            setMedia((prev) => [createResponse.data!, ...prev]);

            // Remove from uploads after 3 seconds
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

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        Array.from(files).forEach((file) => {
            uploadFile(file);
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
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

    const handleRetryUpload = (file: File) => {
        // Remove the failed upload from the list
        setUploads((prev) => prev.filter((u) => u.file !== file));
        // Retry the upload
        uploadFile(file);
    };

    const handleRemoveUpload = (file: File) => {
        setUploads((prev) => prev.filter((u) => u.file !== file));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <div className="space-y-6">
            <MediaDetailsSheet
                media={selectedMedia}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
            />
            {/* Upload Area */}
            <Card
                className={cn(
                    "p-8 border-2 border-dashed transition-all duration-300",
                    isDragging
                        ? "border-primary bg-primary/5 scale-[1.02]"
                        : "border-border hover:border-primary/50",
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="p-4 rounded-full bg-primary/10">
                        <IconFileUpload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">
                            Upload Media Files
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Drag and drop files here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            Images up to 5MB • Videos up to 50MB
                        </p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileSelect(e.target.files)}
                    />
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="gap-2"
                    >
                        <IconUpload className="w-4 h-4" />
                        Choose Files
                    </Button>
                </div>
            </Card>

            {/* Upload Progress */}
            {uploads.length > 0 && (
                <Card className="p-6 space-y-4">
                    <h3 className="font-semibold">Uploading Files</h3>
                    <Separator />
                    <div className="space-y-3">
                        {uploads.map((upload, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                            >
                                <div className="shrink-0">
                                    {upload.status === "uploading" && (
                                        <IconLoader2 className="w-5 h-5 text-primary animate-spin" />
                                    )}
                                    {upload.status === "success" && (
                                        <IconCheck className="w-5 h-5 text-green-500" />
                                    )}
                                    {upload.status === "error" && (
                                        <IconX className="w-5 h-5 text-destructive" />
                                    )}
                                    {upload.status === "pending" && (
                                        <IconLoader2 className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {upload.file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatFileSize(upload.file.size)}
                                    </p>
                                    {upload.error && (
                                        <p className="text-xs text-destructive mt-1">
                                            {upload.error}
                                        </p>
                                    )}
                                </div>

                                {/* Action buttons for failed uploads */}
                                {upload.status === "error" ? (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                handleRetryUpload(upload.file)
                                            }
                                            className="gap-1.5 h-8"
                                        >
                                            <IconRefresh className="w-3.5 h-3.5" />
                                            Retry
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() =>
                                                handleRemoveUpload(upload.file)
                                            }
                                            className="h-8 w-8 p-0"
                                        >
                                            <IconX className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <Badge
                                        variant={
                                            upload.status === "success"
                                                ? "default"
                                                : "secondary"
                                        }
                                        className="shrink-0"
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

            {/* Media Gallery */}
            {media.length === 0 && uploads.length === 0 ? (
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
                            <div className="relative aspect-square bg-muted">
                                {item.media_type === "image" && item.url && (
                                    <Image
                                        src={item.url}
                                        alt={item.alt || "Media"}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                {item.media_type === "video" && item.url && (
                                    <video
                                        src={`${item.url}#t=0.001`}
                                        className="w-full h-full object-cover"
                                        controls={false}
                                        preload="metadata"
                                        playsInline
                                        muted
                                    />
                                )}
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
