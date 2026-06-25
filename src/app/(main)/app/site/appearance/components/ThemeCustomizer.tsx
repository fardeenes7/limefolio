"use client";

import React, { useState, useEffect } from "react";
import { useAppearanceState } from "../hooks/useAppearanceState";
import { IconPalette, IconWand } from "@tabler/icons-react";
import { THEMES_META } from "@/lib/themes-meta";

interface ThemeCustomizerProps {
    stateHelpers: ReturnType<typeof useAppearanceState>;
}

// These are common Shadcn CSS variables we can customize
const CUSTOMIZABLE_VARIABLES = [
    { key: "--background", label: "Background" },
    { key: "--foreground", label: "Foreground" },
    { key: "--card", label: "Card" },
    { key: "--popover", label: "Popover" },
    { key: "--primary", label: "Primary" },
    { key: "--primary-foreground", label: "Primary Foreground" },
    { key: "--secondary", label: "Secondary" },
    { key: "--muted", label: "Muted" },
    { key: "--accent", label: "Accent" },
    { key: "--destructive", label: "Destructive" },
    { key: "--border", label: "Border" },
    { key: "--ring", label: "Ring" },
];

export function ThemeCustomizer({ stateHelpers }: ThemeCustomizerProps) {
    const { themeOverrides, setThemeOverrides, selectedTheme } = stateHelpers;
    const currentThemeMeta = THEMES_META.find(t => t.slug === selectedTheme);
    const [activeColors, setActiveColors] = useState<Record<string, string>>({});

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === "THEME_COLORS") {
                setActiveColors(event.data.colors);
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    const handleColorChange = (variable: string, hexColor: string) => {
        setThemeOverrides({
            ...themeOverrides,
            [variable]: hexColor,
        });
    };

    const handleReset = () => {
        // Clear all overrides
        setThemeOverrides({});
    };

    // A simple suggestion tool: Pick a complementary or predefined color based on base theme swatches
    const handleSuggestPrimary = () => {
        // As a simple example, we can generate a random bright color, or pick the accent of the current theme
        const swatches = currentThemeMeta?.swatches || ["#ffffff", "#000000", "#ff0000"];
        // We'll set primary to the 3rd swatch (accent) for a pop of color, 
        // converting it to hex would be needed if it was oklch, but we can just pass a hardcoded hex for the demo
        // For actual oklch to hex, we'd need a library. Let's just generate a nice vivid hex:
        const randomHex = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
        handleColorChange("--primary", randomHex);
    };

    return (
        <div className="p-3 space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                    Customize Colors
                </span>
                {Object.keys(themeOverrides).length > 0 && (
                    <button 
                        onClick={handleReset}
                        className="text-[10px] text-destructive hover:underline"
                    >
                        Reset All
                    </button>
                )}
            </div>

            <div className="space-y-3">
                {CUSTOMIZABLE_VARIABLES.map((v) => {
                    // Extract current override or fallback to computed active color from iframe
                    const val = themeOverrides[v.key];
                    const activeHex = val || activeColors[v.key] || "#ffffff";
                    
                    return (
                        <div key={v.key} className="flex items-center justify-between gap-3">
                            <label className="text-xs font-medium text-foreground flex-1">
                                {v.label}
                            </label>
                            <div className="flex items-center gap-2">
                                {val && (
                                    <button 
                                        onClick={() => {
                                            const newOverrides = { ...themeOverrides };
                                            delete newOverrides[v.key];
                                            setThemeOverrides(newOverrides);
                                        }}
                                        className="text-[10px] text-muted-foreground hover:text-foreground"
                                    >
                                        Clear
                                    </button>
                                )}
                                <input
                                    type="color"
                                    value={activeHex} // HTML color input needs a valid hex.
                                    onChange={(e) => handleColorChange(v.key, e.target.value)}
                                    className="w-6 h-6 rounded cursor-pointer border-0 p-0"
                                    style={{
                                        // A trick to make the input itself look like a swatch
                                        backgroundColor: activeHex,
                                        opacity: val ? 1 : 0.8
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="pt-4 border-t border-border mt-4 space-y-4">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-foreground">
                            Radius
                        </label>
                        <span className="text-xs text-muted-foreground">
                            {themeOverrides["--radius"] || "Default"}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={themeOverrides["--radius"] ? parseFloat(themeOverrides["--radius"].replace("rem", "")) : currentThemeMeta?.radius ?? 0.5}
                            onChange={(e) => handleColorChange("--radius", `${e.target.value}rem`)}
                            className="flex-1 accent-primary"
                        />
                        {themeOverrides["--radius"] && (
                            <button 
                                onClick={() => {
                                    const newOverrides = { ...themeOverrides };
                                    delete newOverrides["--radius"];
                                    setThemeOverrides(newOverrides);
                                }}
                                className="text-[10px] text-muted-foreground hover:text-foreground shrink-0"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleSuggestPrimary}
                    className="w-full flex items-center justify-center gap-2 h-8 rounded-md bg-muted/50 hover:bg-muted text-xs font-medium text-foreground transition-colors border border-border/50"
                >
                    <IconWand className="w-3.5 h-3.5 text-primary" />
                    Suggest Primary Color
                </button>
            </div>
        </div>
    );
}
