"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SectionList } from "./SectionList";
import { ThemeSwatch } from "./ThemeSwatch";
import { FontOption } from "./FontOption";
import { TemplatePicker } from "./TemplatePicker";
import { THEMES_META, FONTS_META } from "@/lib/themes-meta";
import type { UserPortfolioConfig } from "@/templates/types";
import { useAppearanceState } from "../hooks/useAppearanceState";
import {
    IconLayoutGrid,
    IconPalette,
    IconTypography,
    IconTemplate,
} from "@tabler/icons-react";

type TabKey = "sections" | "theme" | "font" | "template";

const TABS: { key: TabKey; label: string; Icon: React.ElementType }[] = [
    { key: "sections", label: "Sections", Icon: IconLayoutGrid },
    { key: "theme",    label: "Theme",    Icon: IconPalette },
    { key: "font",     label: "Font",     Icon: IconTypography },
    { key: "template", label: "Template", Icon: IconTemplate },
];

interface AppearanceSidebarProps {
    activeTab: TabKey;
    onTabChange: (tab: TabKey) => void;
    activePageKey: string;
    activePageLabel: string;
    selectedInstanceId: string | null;
    onSelectInstance: (id: string | null) => void;
    draftConfig: Partial<UserPortfolioConfig>;
    stateHelpers: ReturnType<typeof useAppearanceState>;
}

export function AppearanceSidebar({
    activeTab,
    onTabChange,
    activePageKey,
    activePageLabel,
    selectedInstanceId,
    onSelectInstance,
    draftConfig,
    stateHelpers,
}: AppearanceSidebarProps) {
    return (
        <div className="flex h-full shrink-0 border-r border-border bg-background" style={{ width: 240 }}>
            {/* Icon Tab Rail */}
            <div className="flex flex-col items-center py-2 gap-0.5 border-r border-border bg-background shrink-0" style={{ width: 44 }}>
                {TABS.map(({ key, label, Icon }) => (
                    <button
                        key={key}
                        title={label}
                        onClick={() => onTabChange(key)}
                        className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 relative group",
                            activeTab === key
                                ? "bg-foreground/10 text-foreground"
                                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                    >
                        <Icon className="w-[15px] h-[15px]" />
                        {/* Tooltip */}
                        <span className="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded-md bg-popover border border-border text-[11px] font-medium text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                            {label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tab Content Panel */}
            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
                {/* Panel Header */}
                <div className="px-3 py-2.5 border-b border-border shrink-0">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {TABS.find(t => t.key === activeTab)?.label}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                    {activeTab === "sections" && (
                        <SectionList
                            draftConfig={draftConfig}
                            stateHelpers={stateHelpers}
                            activePageKey={activePageKey}
                            activePageLabel={activePageLabel}
                            selectedInstanceId={selectedInstanceId}
                            onSelectInstance={onSelectInstance}
                        />
                    )}

                    {activeTab === "theme" && (
                        <div className="flex-1 overflow-y-auto p-3 space-y-4">
                            {([
                                { cat: "minimal",  label: "Minimal" },
                                { cat: "colorful", label: "Colorful" },
                                { cat: "nature",   label: "Nature" },
                                { cat: "retro",    label: "Retro" },
                                { cat: "brand",    label: "Brand" },
                            ] as const).map(({ cat, label }) => {
                                const group = THEMES_META.filter(t => t.category === cat);
                                if (!group.length) return null;
                                return (
                                    <div key={cat} className="flex flex-col gap-2">
                                        <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/70 px-0.5">{label}</span>
                                        <div className="grid grid-cols-3 gap-2">
                                            {group.map((theme) => (
                                                <ThemeSwatch
                                                    key={theme.slug}
                                                    theme={theme}
                                                    isSelected={stateHelpers.selectedTheme === theme.slug || stateHelpers.selectedTheme === `${theme.slug}-dark`}
                                                    onClick={() => {
                                                        if (theme.defaultMode === "dark" && theme.hasDark !== false) {
                                                            stateHelpers.setTheme(`${theme.slug}-dark`);
                                                        } else {
                                                            stateHelpers.setTheme(theme.slug);
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === "font" && (
                        <div className="flex-1 overflow-y-auto p-2">
                            {FONTS_META.map((font) => (
                                <FontOption
                                    key={font.slug}
                                    font={font}
                                    isSelected={stateHelpers.selectedFont === font.slug}
                                    onClick={() => stateHelpers.setFont(font.slug)}
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === "template" && (
                        <div className="flex-1 overflow-hidden flex flex-col">
                            <TemplatePicker
                                selectedTemplate={stateHelpers.selectedTemplate}
                                setTemplate={stateHelpers.setTemplate}
                                resetToSaved={stateHelpers.resetToSaved}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
