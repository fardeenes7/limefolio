"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    IconLoader2,
    IconCheck,
    IconX,
    IconRefresh,
} from "@tabler/icons-react";
import { formatFileSize } from "./helpers";
import type { UploadStatus } from "./types";

export interface UploadItemProps {
    upload: UploadStatus;
    onRetry: (file: File) => void;
    onRemove: (file: File) => void;
}

export function UploadItem({ upload, onRetry, onRemove }: UploadItemProps) {
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

/** Wraps a list of UploadItems in a titled card */
export function UploadQueue({
    uploads,
    onRetry,
    onRemove,
}: {
    uploads: UploadStatus[];
    onRetry: (file: File) => void;
    onRemove: (file: File) => void;
}) {
    if (uploads.length === 0) return null;
    return (
        <Card className="p-4 space-y-2">
            <h4 className="font-semibold text-sm">Uploading</h4>
            {uploads.map((upload, i) => (
                <UploadItem
                    key={i}
                    upload={upload}
                    onRetry={onRetry}
                    onRemove={onRemove}
                />
            ))}
        </Card>
    );
}
