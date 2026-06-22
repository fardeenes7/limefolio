import React from "react";
import { ThemeMeta } from "@/lib/themes-meta";
import { cn } from "@/lib/utils";

interface ThemeSwatchProps {
    theme: ThemeMeta;
    isSelected: boolean;
    onClick: () => void;
}

export function ThemeSwatch({ theme, isSelected, onClick }: ThemeSwatchProps) {
    const [bg, primary, accent] = theme.swatches;

    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex flex-col gap-1.5 focus:outline-none text-left"
        >
            <div
                className={cn(
                    "w-full aspect-[3/2] rounded-[6px] overflow-hidden transition-all duration-200",
                    isSelected 
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-sm" 
                        : "border border-border/60 hover:border-border hover:shadow-sm"
                )}
            >
                <div className="w-full h-full flex flex-col" style={{ backgroundColor: bg }}>
                    <div className="flex-1" style={{ backgroundColor: bg }} />
                    <div className="flex-1 flex">
                        <div className="flex-1" style={{ backgroundColor: primary }} />
                        <div className="flex-1" style={{ backgroundColor: accent }} />
                    </div>
                </div>
            </div>
            <span className={cn(
                "text-[11px] font-medium truncate w-full transition-colors",
                isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
            )}>
                {theme.name}
            </span>
        </button>
    );
}
