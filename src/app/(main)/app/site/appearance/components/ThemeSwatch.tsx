import React from "react";
import { ThemeMeta } from "@/lib/themes-meta";

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
            className={`group flex flex-col gap-1.5 focus:outline-none text-left`}
        >
            <div
                className={`w-full aspect-[3/2] rounded-md overflow-hidden transition-transform duration-200 motion-safe:group-hover:scale-105 ${
                    isSelected ? "ring-2 ring-ring ring-offset-1 ring-offset-background" : "border border-border"
                }`}
            >
                <div className="w-full h-full flex flex-col" style={{ backgroundColor: bg }}>
                    <div className="flex-1" style={{ backgroundColor: bg }} />
                    <div className="flex-1 flex">
                        <div className="flex-1" style={{ backgroundColor: primary }} />
                        <div className="flex-1" style={{ backgroundColor: accent }} />
                    </div>
                </div>
            </div>
            <span className="text-xs text-muted-foreground truncate w-full group-hover:text-foreground transition-colors">
                {theme.name}
            </span>
        </button>
    );
}
