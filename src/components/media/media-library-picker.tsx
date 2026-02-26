"use client";

import { useState, useEffect, useCallback } from "react";
import { getMediaList } from "@/lib/actions/media";
import { Media } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    IconPhoto,
    IconVideo,
    IconCheck,
    IconLoader2,
    IconSearch,
    IconLibrary,
} from "@tabler/icons-react";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface MediaLibraryPickerProps {
    /** IDs of media items already attached — they appear pre-selected */
    selectedIds?: number[];
    /**
     * Called when the user confirms their selection.
     * Receives only the *newly* chosen items (not previously-selected ones).
     */
    onSelect: (media: Media[]) => void;
    /** Allow selecting more than one item at a time (default: true) */
    multiple?: boolean;
    /** Custom trigger element. Defaults to a "Select from Library" button. */
    trigger?: React.ReactNode;
    /** Optional label override for the default trigger button */
    triggerLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MediaLibraryPicker({
    selectedIds = [],
    onSelect,
    multiple = true,
    trigger,
    triggerLabel = "Select from Library",
}: MediaLibraryPickerProps) {
    const [open, setOpen] = useState(false);
    const [allMedia, setAllMedia] = useState<Media[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Local selection state — initialised from already-attached IDs so the
    // user can see what's already linked and deselect if they want.
    const [localSelected, setLocalSelected] = useState<Set<number>>(
        new Set(selectedIds),
    );

    // Search / type filter
    const [query, setQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<"all" | "image" | "video">(
        "all",
    );

    // Load the library once when the dialog opens
    useEffect(() => {
        if (!open) return;
        setLocalSelected(new Set(selectedIds));
        setLoading(true);
        setError(null);
        getMediaList()
            .then((res) => {
                if (res.ok && res.data) setAllMedia(res.data);
                else setError("Failed to load media library");
            })
            .catch(() => setError("Failed to load media library"))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const toggle = useCallback(
        (id: number) => {
            setLocalSelected((prev) => {
                const next = new Set(prev);
                if (next.has(id)) {
                    next.delete(id);
                } else {
                    if (!multiple) next.clear();
                    next.add(id);
                }
                return next;
            });
        },
        [multiple],
    );

    const handleConfirm = () => {
        // Only return items that were NOT already selected — the caller decides
        // whether to append or replace.
        const newlySelected = allMedia.filter(
            (m) => localSelected.has(m.id) && !selectedIds.includes(m.id),
        );
        onSelect(newlySelected);
        setOpen(false);
    };

    // Derived list after search + type filter
    const filtered = allMedia.filter((m) => {
        const matchesType = typeFilter === "all" || m.media_type === typeFilter;
        const matchesQuery =
            !query ||
            m.alt?.toLowerCase().includes(query.toLowerCase()) ||
            m.caption?.toLowerCase().includes(query.toLowerCase());
        return matchesType && matchesQuery;
    });

    const newSelectionCount = [...localSelected].filter(
        (id) => !selectedIds.includes(id),
    ).length;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5 w-full"
                    >
                        <IconLibrary className="w-3.5 h-3.5" />
                        {triggerLabel}
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[720px] max-h-[85vh] flex flex-col gap-0 p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle>Media Library</DialogTitle>
                </DialogHeader>

                {/* Toolbar */}
                <div className="flex items-center gap-2 px-6 py-3 border-b bg-muted/30">
                    <div className="relative flex-1">
                        <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or caption…"
                            className="pl-8 h-8 text-sm"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        {(["all", "image", "video"] as const).map((t) => (
                            <Button
                                key={t}
                                type="button"
                                size="sm"
                                variant={typeFilter === t ? "default" : "ghost"}
                                className="h-8 capitalize text-xs"
                                onClick={() => setTypeFilter(t)}
                            >
                                {t}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {loading && (
                        <div className="flex items-center justify-center h-48">
                            <IconLoader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    )}

                    {error && !loading && (
                        <div className="flex items-center justify-center h-48 text-destructive text-sm">
                            {error}
                        </div>
                    )}

                    {!loading && !error && filtered.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-48 gap-2 text-muted-foreground">
                            <IconPhoto className="w-8 h-8" />
                            <p className="text-sm">
                                {allMedia.length === 0
                                    ? "No media uploaded yet"
                                    : "No results match your search"}
                            </p>
                        </div>
                    )}

                    {!loading && !error && filtered.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {filtered.map((item) => {
                                const isSelected = localSelected.has(item.id);
                                const alreadyAttached = selectedIds.includes(
                                    item.id,
                                );
                                const thumb =
                                    item.thumbnail ??
                                    (item.media_type === "image"
                                        ? item.url
                                        : null);

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => toggle(item.id)}
                                        className={`relative aspect-video rounded-lg overflow-hidden bg-muted border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                            isSelected
                                                ? "border-primary ring-1 ring-primary"
                                                : "border-transparent hover:border-muted-foreground/40"
                                        }`}
                                    >
                                        {/* Thumbnail */}
                                        {thumb ? (
                                            <img
                                                src={thumb}
                                                alt={item.alt || ""}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <IconVideo className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                        )}

                                        {/* Selection checkmark */}
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-primary/20 flex items-start justify-end p-1.5">
                                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                                    <IconCheck className="w-3 h-3 text-primary-foreground" />
                                                </div>
                                            </div>
                                        )}

                                        {/* "Already added" badge */}
                                        {alreadyAttached && !isSelected && (
                                            <div className="absolute inset-0 bg-black/30 flex items-end p-1">
                                                <Badge
                                                    variant="secondary"
                                                    className="text-[9px] h-4 px-1"
                                                >
                                                    Added
                                                </Badge>
                                            </div>
                                        )}

                                        {/* Type indicator */}
                                        <div className="absolute bottom-1 left-1">
                                            {item.media_type === "video" ? (
                                                <IconVideo className="w-3 h-3 text-white drop-shadow" />
                                            ) : (
                                                <IconPhoto className="w-3 h-3 text-white drop-shadow" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <DialogFooter className="px-6 py-4 border-t gap-2">
                    <span className="text-sm text-muted-foreground mr-auto">
                        {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                        {newSelectionCount > 0 && (
                            <>
                                {" "}
                                ·{" "}
                                <span className="text-foreground font-medium">
                                    {newSelectionCount} new
                                </span>
                            </>
                        )}
                    </span>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        disabled={newSelectionCount === 0}
                        onClick={handleConfirm}
                    >
                        Add {newSelectionCount > 0 ? newSelectionCount : ""}{" "}
                        item
                        {newSelectionCount !== 1 ? "s" : ""}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
