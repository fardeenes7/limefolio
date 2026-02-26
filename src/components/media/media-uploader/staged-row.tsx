"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    IconLoader2,
    IconVideo,
    IconFileUpload,
    IconTrash,
    IconEdit,
    IconRefresh,
} from "@tabler/icons-react";
import { formatFileSize } from "./helpers";
import type { StagedFile } from "./types";

export interface StagedRowProps {
    item: StagedFile;
    onRemove: (file: File) => void;
    onCustomThumb: (file: File, thumbFile: File) => void;
    onRemoveCustomThumb: (file: File) => void;
}

export function StagedRow({
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
