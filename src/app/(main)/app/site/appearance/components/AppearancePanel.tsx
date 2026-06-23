import React from "react";
import { cn } from "@/lib/utils";
import { SectionList } from "./SectionList";
import { SectionDetail } from "./SectionDetail";
import { ThemeSwatch } from "./ThemeSwatch";
import { FontOption } from "./FontOption";
import { TemplatePicker } from "./TemplatePicker";
import { THEMES_META, FONTS_META } from "@/lib/themes-meta";
import type { UserPortfolioConfig, ResolvedSection } from "@/templates/types";
import { useAppearanceState } from "../hooks/useAppearanceState";
import { useResolvedSections } from "../hooks/useResolvedSections";
import { getTemplate } from "@/templates/registry";
import { useSectionCustomizer } from "../hooks/useSectionCustomizer";

type TabKey = "sections" | "theme" | "font" | "template";

interface AppearancePanelProps {
    activeTab: TabKey;
    onTabChange: (tab: TabKey) => void;
    activePageKey: string;
    activePageLabel: string;
    selectedInstanceId: string | null;
    onSelectInstance: (id: string | null) => void;
    draftConfig: Partial<UserPortfolioConfig>;
    stateHelpers: ReturnType<typeof useAppearanceState>;
}

export function AppearancePanel({
    activeTab,
    onTabChange,
    activePageKey,
    activePageLabel,
    selectedInstanceId,
    onSelectInstance,
    draftConfig,
    stateHelpers,
}: AppearancePanelProps) {
    const TABS: { key: TabKey; label: string }[] = [
        { key: "sections", label: "Sections" },
        { key: "theme", label: "Theme" },
        { key: "font", label: "Font" },
        { key: "template", label: "Template" },
    ];

    // For SectionDetail: we need the resolved section and its overrides
    const resolvedConfig = useResolvedSections(draftConfig);
    const customizer = useSectionCustomizer(activePageKey, stateHelpers, resolvedConfig.layout);
    const isGlobal = activePageKey === "layout";
    const sectionsToRender = isGlobal 
        ? resolvedConfig.layout 
        : resolvedConfig.pages.find(p => p.key === activePageKey)?.sections || [];

    const overridesSource = isGlobal 
        ? stateHelpers.overrides.layout 
        : (stateHelpers.overrides.pages[activePageKey] || {});

    const selectedSection = sectionsToRender.find(s => s.instanceId === selectedInstanceId) || null;
    const selectedOverride = selectedInstanceId ? (overridesSource[selectedInstanceId] || {}) : {};

    return (
        <div className="w-[320px] shrink-0 border-l border-border bg-card flex flex-col h-full overflow-hidden z-10">
            {/* Tab Strip */}
            <div className="h-10 flex shrink-0 border-b border-border bg-background">
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={cn(
                            "flex-1 text-[12px] font-medium transition-colors",
                            activeTab === tab.key 
                                ? "border-b-2 border-primary text-foreground" 
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-background">
                {activeTab === "sections" && (
                    <>
                        <SectionList
                            draftConfig={draftConfig}
                            stateHelpers={stateHelpers}
                            activePageKey={activePageKey}
                            activePageLabel={activePageLabel}
                            selectedInstanceId={selectedInstanceId}
                            onSelectInstance={onSelectInstance}
                        />
                        {selectedSection && (
                            <SectionDetail
                                section={selectedSection}
                                userOverride={selectedOverride}
                                onVariantChange={(v) => customizer.updateVariant(selectedSection.instanceId, v)}
                                onInputChange={(k, v) => customizer.updateInput(selectedSection.instanceId, k, v)}
                                onInputReset={(k) => customizer.updateInput(selectedSection.instanceId, k, undefined)}
                            />
                        )}
                    </>
                )}

                {activeTab === "theme" && (
                    <div className="p-4 overflow-y-auto">
                        <div className="grid grid-cols-4 gap-3">
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

                {activeTab === "font" && (
                    <div className="p-4 overflow-y-auto">
                        <div className="flex flex-col gap-1">
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

                {activeTab === "template" && (
                    <TemplatePicker
                        selectedTemplate={stateHelpers.selectedTemplate}
                        setTemplate={stateHelpers.setTemplate}
                        resetToSaved={stateHelpers.resetToSaved}
                    />
                )}
            </div>
        </div>
    );
}
