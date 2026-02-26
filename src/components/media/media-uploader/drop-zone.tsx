"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { IconFileUpload } from "@tabler/icons-react";

export interface DropZoneProps {
    onFiles: (files: FileList) => void;
}

export function DropZone({ onFiles }: DropZoneProps) {
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
