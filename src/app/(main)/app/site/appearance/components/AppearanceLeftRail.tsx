"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IconPalette, IconTemplate, IconTypography } from "@tabler/icons-react";

export type DesignTab = "theme" | "template" | "font";

const TABS: { key: DesignTab; label: string; Icon: React.ElementType }[] = [
    { key: "theme",    label: "Color Themes", Icon: IconPalette },
    { key: "template", label: "Templates",    Icon: IconTemplate },
    { key: "font",     label: "Fonts",        Icon: IconTypography },
];

interface AppearanceLeftRailProps {
    activeTab: DesignTab | null;
    onTabChange: (tab: DesignTab | null) => void;
}

export function AppearanceLeftRail({ activeTab, onTabChange }: AppearanceLeftRailProps) {
    return (
        <div className="flex flex-col items-center py-2 gap-0.5 border-r border-border bg-background shrink-0 h-full z-10" style={{ width: 48 }}>
            {TABS.map(({ key, label, Icon }) => {
                const isActive = activeTab === key;
                return (
                    <button
                        key={key}
                        title={label}
                        onClick={() => onTabChange(isActive ? null : key)}
                        className={cn(
                            "relative group w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150",
                            isActive
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                    >
                        <Icon className="w-[15px] h-[15px]" />
                        {/* Tooltip */}
                        <span className="pointer-events-none absolute left-full ml-2.5 px-2 py-1 rounded-md bg-popover border border-border text-[11px] font-medium text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                            {label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
