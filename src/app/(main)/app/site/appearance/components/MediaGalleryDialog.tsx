"use client";

import React, { useState, useEffect } from "react";
import { getMediaList } from "@/lib/actions/media";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { IconCheck, IconFilePlus, IconSearch } from "@tabler/icons-react";
import { MediaUploader } from "@/components/media/media-uploader";
import type { Media } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MediaGalleryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (media: Media | Media[]) => void;
    accepts?: "image" | "video";
    multiple?: boolean;
    selectedIds?: number[];
}

export function MediaGalleryDialog({ open, onOpenChange, onSelect, accepts, multiple = false, selectedIds = [] }: MediaGalleryDialogProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const selectedKey = selectedIds.join(",");
    const [localSelectedIds, setLocalSelectedIds] = useState<Set<number>>(() => new Set(selectedIds));

    const [allMedia, setAllMedia] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!open) return;

        const timer = window.setTimeout(() => {
            setIsLoading(true);
            getMediaList().then(res => {
                if (res.ok && res.data) {
                    setAllMedia(res.data);
                    setError(false);
                } else {
                    setError(true);
                }
            }).catch(() => setError(true)).finally(() => setIsLoading(false));
        }, 0);

        return () => window.clearTimeout(timer);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const ids = selectedKey
            ? selectedKey.split(",").map((id) => Number(id)).filter(Number.isFinite)
            : [];
        const timer = window.setTimeout(() => setLocalSelectedIds(new Set(ids)), 0);
        return () => window.clearTimeout(timer);
    }, [open, selectedKey]);

    const loadMedia = () => {
        if (!open) return;
        setIsLoading(true);
        getMediaList().then(res => {
            if (res.ok && res.data) {
                setAllMedia(res.data);
                setError(false);
            } else {
                setError(true);
            }
        }).catch(() => setError(true)).finally(() => setIsLoading(false));
    };

    const toggleSelection = (media: Media) => {
        if (!multiple) {
            onSelect(media);
            return;
        }

        setLocalSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(media.id)) next.delete(media.id);
            else next.add(media.id);
            return next;
        });
    };

    const confirmSelection = () => {
        const selectedMedia = allMedia.filter((media) => localSelectedIds.has(media.id));
        onSelect(selectedMedia);
    };

    // Filter by type and search query
    const filteredMedia = allMedia.filter(m => {
        if (accepts === "image" && m.media_type !== "image" && !m.image) return false;
        if (accepts === "video" && m.media_type !== "video" && !m.video) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                (m.alt && m.alt.toLowerCase().includes(query)) ||
                (m.caption && m.caption.toLowerCase().includes(query)) ||
                (m.url && m.url.toLowerCase().includes(query))
            );
        }
        return true;
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] md:max-w-[800px] h-[80vh] flex flex-col p-0 overflow-hidden">
                <DialogHeader className="px-6 py-4 border-b shrink-0">
                    <DialogTitle>Media Gallery</DialogTitle>
                    <DialogDescription className="sr-only">
                        Select or upload media for your site.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="user" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 border-b flex items-center justify-between shrink-0">
                        <TabsList className="bg-transparent border-b-0 -mb-px">
                            <TabsTrigger 
                                value="user" 
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                            >
                                User Uploads
                            </TabsTrigger>
                            <TabsTrigger 
                                value="system"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                            >
                                System Media
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="user" className="flex-1 flex flex-col overflow-hidden mt-0 data-[state=inactive]:hidden">
                        {/* Toolbar */}
                        <div className="px-6 py-3 flex items-center gap-3 border-b shrink-0 bg-muted/30">
                            <div className="relative flex-1 max-w-sm">
                                <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search media..."
                                    className="pl-9 bg-background h-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <MediaUploader
                                mode="dialog"
                                accepts={accepts}
                                buttonLabel="Upload New Media"
                                onUploadComplete={() => {
                                    loadMedia();
                                }}
                            />
                        </div>

                        {/* Grid */}
                        <div className="flex-1 p-6 overflow-y-auto">
                            {isLoading ? (
                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="aspect-square bg-muted animate-pulse rounded-md" />
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                                    <p>Failed to load media.</p>
                                </div>
                            ) : filteredMedia.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-center">
                                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                                        <IconFilePlus className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-semibold text-lg text-foreground mb-1">No media found</h3>
                                    <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                                        {searchQuery ? "No media matches your search query." : "Upload images or videos to use them across your portfolio."}
                                    </p>
                                    {!searchQuery && (
                                        <MediaUploader
                                            mode="dialog"
                                            accepts={accepts}
                                            buttonLabel="Upload your first file"
                                            onUploadComplete={() => {
                                                loadMedia();
                                            }}
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {filteredMedia.map(media => {
                                        const isSelected = localSelectedIds.has(media.id);

                                        return (
                                        <button
                                            key={media.id}
                                            type="button"
                                            className={cn(
                                                "group relative aspect-square rounded-md overflow-hidden bg-muted border hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-left",
                                                isSelected ? "border-primary ring-2 ring-primary/40" : "border-border/50"
                                            )}
                                            onClick={() => toggleSelection(media)}
                                        >
                                            {media.media_type === "video" ? (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 group-hover:bg-black/40 transition-colors">
                                                    <div className="w-8 h-8 rounded-full bg-background/90 flex items-center justify-center">
                                                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-foreground border-b-[5px] border-b-transparent ml-1" />
                                                    </div>
                                                </div>
                                            ) : null}
                                            <img
                                                src={media.thumbnail || media.image || media.url}
                                                alt={media.alt || "Media"}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-[10px] text-white truncate drop-shadow-md">
                                                    {media.alt || media.url.split('/').pop()}
                                                </p>
                                            </div>
                                            {isSelected && (
                                                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                                                    <IconCheck className="h-3.5 w-3.5" />
                                                </div>
                                            )}
                                        </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="system" className="flex-1 flex flex-col items-center justify-center mt-0 data-[state=inactive]:hidden">
                        <div className="text-center">
                            <h3 className="font-semibold text-lg text-foreground mb-1">Coming Soon</h3>
                            <p className="text-sm text-muted-foreground">
                                High-quality stock media integration is on the way.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>

                {multiple && (
                    <div className="flex items-center justify-between border-t px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                            {localSelectedIds.size} selected
                        </span>
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="button" onClick={confirmSelection}>
                                Use Selected
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
