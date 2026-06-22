"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Design content
import { ThemeSwatch } from "./ThemeSwatch";
import { FontOption } from "./FontOption";
import { TemplatePicker } from "./TemplatePicker";
import { SectionList } from "./SectionList";
import { SectionDetail } from "./SectionDetail";

import { THEMES_META, FONTS_META } from "@/lib/themes-meta";
import type { UserPortfolioConfig } from "@/templates/types";
import { useAppearanceState } from "../hooks/useAppearanceState";
import { useResolvedSections } from "../hooks/useResolvedSections";
import { useSectionCustomizer } from "../hooks/useSectionCustomizer";
import { ComponentRegistry } from "@/templates/components";

import {
    IconChevronLeft,
    IconPalette,
    IconTemplate,
    IconTypography,
} from "@tabler/icons-react";

export type DesignTab = "theme" | "template" | "font";

const DESIGN_TAB_LABELS: Record<DesignTab, string> = {
    theme:    "Color Themes",
    template: "Templates",
    font:     "Fonts",
};

const DESIGN_TAB_ICONS: Record<DesignTab, React.ElementType> = {
    theme:    IconPalette,
    template: IconTemplate,
    font:     IconTypography,
};

interface AppearanceRightPanelProps {
    activeDesignTab: DesignTab | null;
    activePageKey: string;
    activePageLabel: string;
    selectedInstanceId: string | null;
    onSelectInstance: (id: string | null) => void;
    draftConfig: Partial<UserPortfolioConfig>;
    stateHelpers: ReturnType<typeof useAppearanceState>;
}

export function AppearanceRightPanel({
    activeDesignTab,
    activePageKey,
    activePageLabel,
    selectedInstanceId,
    onSelectInstance,
    draftConfig,
    stateHelpers,
}: AppearanceRightPanelProps) {
    // Resolve selected section
    const resolvedConfig = useResolvedSections(draftConfig);
    const isGlobal = activePageKey === "layout";
    const sectionsToRender = isGlobal
        ? resolvedConfig.layout
        : resolvedConfig.pages.find(p => p.key === activePageKey)?.sections || [];
    const overridesSource = isGlobal
        ? stateHelpers.overrides.layout
        : (stateHelpers.overrides.pages[activePageKey] || {});

    const selectedSection = sectionsToRender.find(s => s.instanceId === selectedInstanceId) ?? null;
    const selectedOverride = selectedInstanceId ? (overridesSource[selectedInstanceId] || {}) : {};
    const schema = selectedSection ? ComponentRegistry[selectedSection.componentKey] : null;
    const customizer = useSectionCustomizer(activePageKey, stateHelpers);

    const hasSection = !!selectedSection;
    const hasDesign = !!activeDesignTab;

    // ─── Section Detail Mode ───────────────────────────────────────────────
    if (hasSection) {
        return (
            <div className="flex flex-col h-full border-l border-border bg-background shrink-0" style={{ width: 280 }}>
                {/* Header */}
                <div className="flex items-center gap-2 px-3 h-9 border-b border-border shrink-0">
                    <button
                        onClick={() => onSelectInstance(null)}
                        className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <IconChevronLeft className="w-3.5 h-3.5" />
                        <span>Sections</span>
                    </button>
                    <span className="text-muted-foreground/40 mx-0.5">/</span>
                    <span className="text-[11px] font-semibold text-foreground truncate">
                        {schema?.label || selectedSection?.componentKey}
                    </span>
                </div>

                {/* Section detail content */}
                <div className="flex-1 overflow-y-auto min-h-0">
                    <SectionDetail
                        section={selectedSection}
                        userOverride={selectedOverride}
                        onVariantChange={(v) => customizer.updateVariant(selectedSection!.instanceId, v)}
                        onInputChange={(k, v) => customizer.updateInput(selectedSection!.instanceId, k, v)}
                        onInputReset={(k) => customizer.updateInput(selectedSection!.instanceId, k, undefined)}
                    />
                </div>
            </div>
        );
    }

    // ─── Default Mode: Design picker (if any) + Section list ──────────────
    return (
        <div className="flex flex-col h-full border-l border-border bg-background shrink-0 overflow-hidden" style={{ width: 280 }}>

            {/* Design picker panel — shown when a left-rail tab is active */}
            {hasDesign && (
                <div
                    className={cn(
                        "flex flex-col border-b border-border shrink-0 overflow-hidden",
                        // Takes ~45% of panel height so section list is still visible
                        activeDesignTab === "font" ? "max-h-[45%]" : "max-h-[45%]"
                    )}
                >
                    {/* Design panel header */}
                    <div className="flex items-center gap-2 px-3 h-9 shrink-0 bg-muted/30">
                        {React.createElement(DESIGN_TAB_ICONS[activeDesignTab!], { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" })}
                        <span className="text-[11px] font-semibold text-foreground">
                            {DESIGN_TAB_LABELS[activeDesignTab!]}
                        </span>
                    </div>

                    {/* Design panel content */}
                    <div className="flex-1 overflow-y-auto min-h-0">
                        {activeDesignTab === "theme" && (
                            <div className="p-3">
                                <div className="grid grid-cols-3 gap-2">
                                    {THEMES_META.map((theme) => (
                                        <ThemeSwatch
                                            key={theme.slug}
                                            theme={theme}
                                            isSelected={stateHelpers.selectedTheme === theme.slug}
                                            onClick={() => stateHelpers.setTheme(theme.slug)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeDesignTab === "font" && (
                            <div className="p-1.5">
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

                        {activeDesignTab === "template" && (
                            <div className="flex flex-col h-full">
                                <TemplatePicker
                                    selectedTemplate={stateHelpers.selectedTemplate}
                                    setTemplate={stateHelpers.setTemplate}
                                    resetToSaved={stateHelpers.resetToSaved}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Section list — always visible below design panel */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                {/* Sections header */}
                <div className="flex items-center px-3 h-9 shrink-0 bg-muted/30 border-b border-border">
                    <span className="text-[11px] font-semibold text-foreground">Sections</span>
                    <span className="ml-auto text-[10px] text-muted-foreground">{activePageLabel}</span>
                </div>

                <SectionList
                    draftConfig={draftConfig}
                    stateHelpers={stateHelpers}
                    activePageKey={activePageKey}
                    activePageLabel={activePageLabel}
                    selectedInstanceId={selectedInstanceId}
                    onSelectInstance={onSelectInstance}
                />
            </div>
        </div>
    );
}
