"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
    IconPhoto,
    IconVideo,
    IconSparkles,
    IconBan,
} from "@tabler/icons-react";

// ─── Background Type Picker ───────────────────────────────────────────────────

const BG_TYPES = [
    { value: "none",   label: "None",   icon: IconBan },
    { value: "effect", label: "Effect", icon: IconSparkles },
    { value: "image",  label: "Image",  icon: IconPhoto },
    { value: "video",  label: "Video",  icon: IconVideo },
] as const;

interface BackgroundTypePickerProps {
    value: string;
    onChange: (v: string) => void;
}

export function BackgroundTypePicker({ value, onChange }: BackgroundTypePickerProps) {
    return (
        <div className="grid grid-cols-4 gap-1.5">
            {BG_TYPES.map(({ value: v, label, icon: Icon }) => {
                const active = value === v;
                return (
                    <button
                        key={v}
                        onClick={() => onChange(v)}
                        className={cn(
                            "flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-lg border transition-all duration-150 select-none group",
                            active
                                ? "bg-primary/8 border-primary/40 text-primary shadow-sm"
                                : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted/40"
                        )}
                    >
                        <Icon className={cn("w-4 h-4 transition-transform duration-150", active ? "" : "group-hover:scale-110")} />
                        <span className="text-[9px] font-medium leading-none">{label}</span>
                    </button>
                );
            })}
        </div>
    );
}

// ─── Effect Preview Mini-Components ──────────────────────────────────────────

/** Each entry: value key → a tiny inline CSS preview rendered in the card */
const EFFECT_PREVIEWS: Record<string, React.ReactNode> = {
    meteors: (
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="absolute h-px rounded-full bg-gradient-to-r from-foreground/60 to-transparent"
                    style={{
                        top: `${15 + i * 20}%`,
                        left: `-10%`,
                        width: "60%",
                        transform: `rotate(-35deg)`,
                        opacity: 0.7 - i * 0.15,
                    }}
                />
            ))}
        </div>
    ),
    dot_pattern: (
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "8px 8px",
                color: "oklch(from var(--foreground) l c h / 0.25)",
            }}
        />
    ),
    retro_grid: (
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `
                    linear-gradient(oklch(from var(--foreground) l c h / 0.2) 1px, transparent 1px),
                    linear-gradient(90deg, oklch(from var(--foreground) l c h / 0.2) 1px, transparent 1px)
                `,
                backgroundSize: "10px 10px",
                transform: "perspective(40px) rotateX(10deg)",
                transformOrigin: "bottom",
            }}
        />
    ),
    flickering_grid: (
        <div
            className="absolute inset-0 grid"
            style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", padding: "4px" }}
        >
            {[...Array(28)].map((_, i) => (
                <div
                    key={i}
                    className="rounded-sm bg-foreground/20"
                    style={{ opacity: i % 2 === 0 ? 0.6 : 0.15 }}
                />
            ))}
        </div>
    ),
    animated_grid: (
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `
                    linear-gradient(oklch(from var(--foreground) l c h / 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, oklch(from var(--foreground) l c h / 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "12px 12px",
            }}
        >
            <div className="absolute rounded bg-primary/20" style={{ top: "20%", left: "30%", width: 20, height: 20 }} />
            <div className="absolute rounded bg-primary/20" style={{ top: "55%", left: "60%", width: 14, height: 14 }} />
        </div>
    ),
    ripple: (
        <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full border border-foreground/20"
                    style={{ width: `${30 + i * 20}%`, height: `${30 + i * 20}%`, opacity: 1 - i * 0.25 }}
                />
            ))}
        </div>
    ),
    grid_pattern: (
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(oklch(from var(--foreground) l c h / 0.12) 1px, transparent 1px), linear-gradient(90deg, oklch(from var(--foreground) l c h / 0.12) 1px, transparent 1px)`,
                backgroundSize: "14px 14px",
            }}
        />
    ),
    hexagon_pattern: (
        <div className="absolute inset-0 flex items-center justify-center">
            {[0, 60, 120].map((rot, i) => (
                <div
                    key={i}
                    className="absolute w-5 h-5 border border-foreground/25"
                    style={{ transform: `rotate(${rot}deg) translateX(${i * 8}px)`, clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                />
            ))}
        </div>
    ),
    striped_pattern: (
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `repeating-linear-gradient(45deg, oklch(from var(--foreground) l c h / 0.15) 0px, oklch(from var(--foreground) l c h / 0.15) 1px, transparent 1px, transparent 8px)`,
            }}
        />
    ),
    interactive_grid: (
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(oklch(from var(--foreground) l c h / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(from var(--foreground) l c h / 0.1) 1px, transparent 1px)`,
                backgroundSize: "10px 10px",
            }}
        >
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, oklch(from var(--primary) l c h / 0.2) 0%, transparent 60%)" }} />
        </div>
    ),
    noise_texture: (
        <div
            className="absolute inset-0 bg-foreground/10"
            style={{ filter: "contrast(200%) brightness(100%)" }}
        />
    ),
    gradient_animation: (
        <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, oklch(from var(--primary) l c h / 0.5) 0%, oklch(from var(--secondary) l c h / 0.3) 50%, oklch(from var(--accent) l c h / 0.4) 100%)" }}
        />
    ),
    wavy_background: (
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-full border-t border-foreground/20 rounded-[50%]"
                    style={{ bottom: `${15 + i * 18}%`, height: `${30 + i * 15}%`, borderRadius: "50%" }}
                />
            ))}
        </div>
    ),
    background_boxes: (
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "2px", padding: "4px" }}>
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="rounded-sm border border-foreground/10"
                    style={{ background: `oklch(from var(--foreground) l c h / ${0.03 + (i % 3) * 0.04})` }}
                />
            ))}
        </div>
    ),
    background_beams: (
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bottom-0 w-px"
                    style={{
                        left: `${25 + i * 25}%`,
                        height: "80%",
                        background: `linear-gradient(to top, oklch(from var(--primary) l c h / 0.5), transparent)`,
                        transform: `rotate(${-5 + i * 5}deg)`,
                        transformOrigin: "bottom",
                    }}
                />
            ))}
        </div>
    ),
    beams_with_collision: (
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bottom-0 w-px"
                    style={{
                        left: `${20 + i * 30}%`,
                        height: "60%",
                        background: `linear-gradient(to top, oklch(from var(--primary) l c h / 0.6), transparent)`,
                    }}
                />
            ))}
            <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
    ),
    background_lines: (
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute top-0 bottom-0 w-px"
                    style={{
                        left: `${10 + i * 20}%`,
                        background: `linear-gradient(to bottom, transparent, oklch(from var(--foreground) l c h / 0.15), transparent)`,
                    }}
                />
            ))}
        </div>
    ),
    aurora_background: (
        <div
            className="absolute inset-0"
            style={{
                background: "linear-gradient(135deg, oklch(from var(--primary) l c h / 0.4) 0%, oklch(from var(--ring) l c h / 0.3) 40%, oklch(from var(--accent) l c h / 0.35) 80%)",
                filter: "blur(4px)",
            }}
        />
    ),
    stars_background: (
        <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => {
                // Deterministic pseudo-random positions using index
                const x = ((i * 47 + 13) % 90);
                const y = ((i * 31 + 7) % 90);
                const size = i % 3 === 0 ? 2 : 1;
                const opacity = 0.3 + (i % 4) * 0.18;
                return (
                    <div
                        key={i}
                        className="absolute rounded-full bg-foreground"
                        style={{ width: size, height: size, top: `${y}%`, left: `${x}%`, opacity }}
                    />
                );
            })}
        </div>
    ),
    spotlight: (
        <div
            className="absolute inset-0"
            style={{
                background: "conic-gradient(from 200deg at 50% 0%, oklch(from var(--primary) l c h / 0.5) 0deg, transparent 60deg)",
            }}
        />
    ),
    lamp: (
        <div className="absolute inset-0 overflow-hidden flex items-end justify-center">
            <div
                style={{
                    width: "80%",
                    height: "70%",
                    background: "conic-gradient(from 250deg at 50% 120%, oklch(from var(--primary) l c h / 0.7) 0deg, transparent 60deg)",
                    filter: "blur(6px)",
                }}
            />
        </div>
    ),
};

const BACKGROUND_EFFECTS = [
    { value: "meteors",            label: "Meteors" },
    { value: "dot_pattern",        label: "Dot Pattern" },
    { value: "retro_grid",         label: "Retro Grid" },
    { value: "flickering_grid",    label: "Flickering Grid" },
    { value: "animated_grid",      label: "Animated Grid" },
    { value: "ripple",             label: "Ripple" },
    { value: "grid_pattern",       label: "Grid" },
    { value: "hexagon_pattern",    label: "Hexagons" },
    { value: "striped_pattern",    label: "Stripes" },
    { value: "interactive_grid",   label: "Interactive Grid" },
    { value: "noise_texture",      label: "Noise" },
    { value: "gradient_animation", label: "Gradient" },
    { value: "wavy_background",    label: "Waves" },
    { value: "background_boxes",   label: "Boxes" },
    { value: "background_beams",   label: "Beams" },
    { value: "beams_with_collision", label: "Beams+" },
    { value: "background_lines",   label: "Lines" },
    { value: "aurora_background",  label: "Aurora" },
    { value: "stars_background",   label: "Stars" },
    { value: "spotlight",          label: "Spotlight" },
    { value: "lamp",               label: "Lamp" },
] as const;

interface BackgroundEffectPickerProps {
    value: string;
    onChange: (v: string) => void;
}

export function BackgroundEffectPicker({ value, onChange }: BackgroundEffectPickerProps) {
    return (
        <div className="grid grid-cols-3 gap-1.5">
            {BACKGROUND_EFFECTS.map(({ value: v, label }) => {
                const active = value === v;
                const preview = EFFECT_PREVIEWS[v];
                return (
                    <button
                        key={v}
                        onClick={() => onChange(v)}
                        title={label}
                        className={cn(
                            "relative flex flex-col items-center gap-1 pt-0 pb-1.5 rounded-lg border transition-all duration-150 select-none overflow-hidden group",
                            active
                                ? "border-primary/50 ring-1 ring-primary/30 shadow-sm"
                                : "border-border/50 hover:border-border hover:shadow-sm"
                        )}
                    >
                        {/* Preview area */}
                        <div
                            className={cn(
                                "relative w-full h-12 overflow-hidden transition-all duration-150",
                                active ? "bg-primary/5" : "bg-muted/40 group-hover:bg-muted/60"
                            )}
                        >
                            {preview}
                            {active && (
                                <div className="absolute inset-0 ring-1 ring-inset ring-primary/20 rounded-t-lg pointer-events-none" />
                            )}
                        </div>
                        {/* Label */}
                        <span
                            className={cn(
                                "text-[8.5px] font-medium leading-none px-0.5 text-center truncate w-full",
                                active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )}
                        >
                            {label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
