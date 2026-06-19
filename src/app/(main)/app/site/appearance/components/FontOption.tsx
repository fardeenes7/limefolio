import React from "react";
import { FontMeta } from "@/lib/themes-meta";
import { IconCheck } from "@tabler/icons-react";

interface FontOptionProps {
    font: FontMeta;
    isSelected: boolean;
    onClick: () => void;
}

export function FontOption({ font, isSelected, onClick }: FontOptionProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center justify-between p-3 rounded-md transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isSelected ? "bg-accent text-accent-foreground" : "hover:bg-muted/50"
            }`}
        >
            <div className="flex flex-col gap-1 overflow-hidden">
                <span
                    className="text-sm truncate"
                    style={{ fontFamily: font.previewStack }}
                >
                    Aa — The quick brown fox
                </span>
                <span className="text-xs opacity-70 truncate">{font.name}</span>
            </div>
            {isSelected && (
                <div className="shrink-0 ml-3">
                    <IconCheck className="w-4 h-4" />
                </div>
            )}
        </button>
    );
}
