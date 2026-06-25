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

export type LeftTab = "sections" | "theme" | "font" | "template";

const TABS: { key: LeftTab; label: string; Icon: React.ElementType }[] = [
    { key: "sections", label: "Sections", Icon: IconLayoutGrid },
    { key: "theme",    label: "Theme",    Icon: IconPalette },
    { key: "font",     label: "Font",     Icon: IconTypography },
    { key: "template", label: "Template", Icon: IconTemplate },
];

interface AppearanceLeftSidebarProps {
    activeTab: LeftTab;
    onTabChange: (tab: LeftTab) => void;
    activePageKey: string;
    activePageLabel: string;
    selectedInstanceId: string | null;
    onSelectInstance: (id: string | null) => void;
    draftConfig: Partial<UserPortfolioConfig>;
    stateHelpers: ReturnType<typeof useAppearanceState>;
}

export function AppearanceLeftSidebar({
    activeTab,
    onTabChange,
    activePageKey,
    activePageLabel,
    selectedInstanceId,
    onSelectInstance,
    draftConfig,
    stateHelpers,
}: AppearanceLeftSidebarProps) {
    return (
        <div
            className="flex flex-col h-full border-r border-border bg-background shrink-0 gap-4"
            style={{ width: 260 }}
        >
            {/* Text Only Tab Strip */}
            <div className="shrink-0 bg-background border-b border-border flex items-center justify-between">
                {TABS.map(({ key, label }) => {
                    const isActive = activeTab === key;
                    return (
                        <button
                            key={key}
                            onClick={() => onTabChange(key)}
                            className={cn(
                                "text-[12px] font-medium transition-all duration-150 p-3 relative",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-primary"
                            )}
                        >
                            {label}
                            {isActive && (
                                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary rounded-t-[2px]" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab content */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">

                {/* Sections */}
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

                {/* Theme */}
                {activeTab === "theme" && (
                    <div className="flex-1 overflow-y-auto p-3">
                        <div className="grid grid-cols-3 gap-2.5 mb-6">
                            {THEMES_META.map((theme) => (
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
                )}

                {/* Font */}
                {activeTab === "font" && (
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col">
                            {FONTS_META.map((font) => (
                                <FontOption
                                    key={font.slug}
                                    font={font}
                                    isSelected={stateHelpers.selectedFont === font.slug}
                                    onClick={() => stateHelpers.setFont(font.slug)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Template */}
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
    );
}
