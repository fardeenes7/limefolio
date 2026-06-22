import React from "react";
import { FontMeta } from "@/lib/themes-meta";
import { cn } from "@/lib/utils";

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
            className={cn(
                "w-full flex flex-col items-start px-6 py-3 transition-opacity text-left select-none relative",
                isSelected ? "opacity-100 bg-primary/10" : "opacity-70 hover:opacity-90 hover:bg-muted"
            )}
        >
            {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r-full" />
            )}
            <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase mb-1.5">
                {font.name}
            </span>
            <span 
                className="text-lg truncate w-full text-foreground leading-none"
                style={{ fontFamily: font.previewStack }}
            >
                {font.name}
            </span>
            <span 
                className="text-[13px] truncate w-full text-muted-foreground mt-1.5"
                style={{ fontFamily: font.previewStack }}
            >
                Aa Bb Cc Dd Ee Ff Gg
            </span>
        </button>
    );
}
