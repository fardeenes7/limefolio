import React from "react";
import { ThemeMeta } from "@/lib/themes-meta";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";

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
            className={cn(
                "group relative flex flex-col gap-1.5 focus:outline-none text-left",
            )}
        >
            {/* ── Color preview card ─────────────────────────────────── */}
            <div
                className={cn(
                    "w-full aspect-[4/3] rounded-lg overflow-hidden transition-all duration-200 relative",
                    isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-md"
                        : "ring-1 ring-border/50 hover:ring-border hover:shadow-sm group-hover:scale-[1.02]"
                )}
            >
                {/* Background fill */}
                <div className="absolute inset-0" style={{ backgroundColor: bg }} />

                {/* Primary accent — diagonal slash */}
                <div
                    className="absolute"
                    style={{
                        bottom: 0,
                        right: 0,
                        width: "55%",
                        height: "45%",
                        backgroundColor: primary,
                        clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                />

                {/* Accent color — small corner triangle */}
                <div
                    className="absolute bottom-0 right-0"
                    style={{
                        width: "28%",
                        height: "28%",
                        backgroundColor: accent,
                        clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)",
                    }}
                />

                {/* Selected checkmark */}
                {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-sm">
                        <IconCheck className="w-2.5 h-2.5 text-primary-foreground" strokeWidth={3} />
                    </div>
                )}
            </div>

            {/* ── Name label ─────────────────────────────────────────── */}
            <span className={cn(
                "text-[10.5px] font-medium truncate w-full transition-colors leading-none",
                isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
            )}>
                {theme.name}
            </span>
        </button>
    );
}
