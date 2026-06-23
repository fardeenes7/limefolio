import React from "react";
import { FontMeta } from "@/lib/themes-meta";
import { cn } from "@/lib/utils";

interface FontOptionProps {
    font: FontMeta;
    isSelected: boolean;
    onClick: () => void;
}

const CATEGORY_LABELS: Record<FontMeta["category"], string> = {
    sans:    "Sans",
    serif:   "Serif",
    mono:    "Mono",
    display: "Display",
};

export function FontOption({ font, isSelected, onClick }: FontOptionProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "w-full flex flex-col text-left select-none relative group transition-all duration-150",
                "px-3 py-3 border",
                isSelected
                    ? "bg-primary/5 border-primary/30"
                    : "border-transparent hover:bg-muted/50 hover:border-border/40"
            )}
        >
            {/* Active indicator bar */}
            {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
            )}

            {/* Font name rendered in the font itself — this is the specimen */}
            <span
                className={cn(
                    "text-[22px] leading-tight font-semibold truncate w-full transition-colors",
                    isSelected
                        ? "text-foreground"
                        : "text-foreground/75 group-hover:text-foreground"
                )}
                style={{ fontFamily: font.previewStack }}
            >
                {font.name}
            </span>

            {/* Meta row: system-font label + category tag */}
            <div className="flex items-center gap-1.5 mt-1">
                <span
                    className="text-[11px] text-muted-foreground truncate"
                    style={{ fontFamily: font.previewStack }}
                >
                    Aa Bb Cc 123
                </span>
                <span className={cn(
                    "ml-auto shrink-0 text-[8.5px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full",
                    isSelected
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                )}>
                    {CATEGORY_LABELS[font.category]}
                </span>
            </div>
        </button>
    );
}
