"use client";

import { useMemo, useState } from "react";
import { useAppearanceState } from "./hooks/useAppearanceState";
import { useSaveAppearance } from "./hooks/useSaveAppearance";
import { useDebouncedConfig } from "./hooks/useDebouncedConfig";
import { useResolvedSections } from "./hooks/useResolvedSections";
import { getTemplate } from "@/templates/registry";

import { AppearanceTopbar } from "./components/AppearanceTopbar";
import { AppearanceLeftSidebar } from "./components/AppearanceLeftSidebar";
import { AppearanceRightSidebar } from "./components/AppearanceRightSidebar";
import { LivePreviewPane } from "./components/LivePreviewPane";
import type { LeftTab } from "./components/AppearanceLeftSidebar";
import { Site } from "@/types";
import { SidebarAutoCollapse } from "@/components/navigation/sidebar/sidebar-auto-collapse";

interface AppearanceClientProps {
    initialSite: Site;
    initialConfigRaw: any;
}

export function AppearanceClient({ initialSite, initialConfigRaw }: AppearanceClientProps) {
    const stateHelpers = useAppearanceState({ initialConfigRaw });
    const { save, isSaving } = useSaveAppearance({ onSuccess: () => {} });

    const draftConfig = useMemo(() => ({
        templateKey:    stateHelpers.selectedTemplate,
        themeKey:       stateHelpers.selectedTheme,
        fontKey:        stateHelpers.selectedFont,
        themeOverrides: stateHelpers.themeOverrides,
        overrides:      stateHelpers.overrides,
        additions:      stateHelpers.additions,
        removals:       stateHelpers.removals,
        ordering:       stateHelpers.ordering,
    }), [
        stateHelpers.selectedTemplate,
        stateHelpers.selectedTheme,
        stateHelpers.selectedFont,
        stateHelpers.themeOverrides,
        stateHelpers.overrides,
        stateHelpers.additions,
        stateHelpers.removals,
        stateHelpers.ordering,
    ]);

    const debouncedConfig = useDebouncedConfig(
        draftConfig,
        400,
        `${stateHelpers.selectedTemplate}:${stateHelpers.templateResetRevision}`,
    );
    const handleSave    = () => save(draftConfig);
    const handleDiscard = () => stateHelpers.resetToSaved();

    // Page navigation
    const template = getTemplate(stateHelpers.selectedTemplate);
    const pagesForNav = [
        ...template.pages.map(p => ({ key: p.key, label: p.label })),
    ];

    const [activePage,         setActivePage]         = useState<string>("landing");
    const [activeLeftTab,      setActiveLeftTab]      = useState<LeftTab>("sections");
    const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
    const [deviceSize,         setDeviceSize]         = useState<"desktop" | "tablet" | "mobile">("desktop");

    const handlePageChange = (key: string) => {
        setActivePage(key);
        setSelectedInstanceId(null);
        // Switch back to sections tab when page changes
        if (activeLeftTab !== "sections") setActiveLeftTab("sections");
    };

    const handleSelectInstance = (id: string | null) => {
        setSelectedInstanceId(id);
    };

    const activePageLabel = pagesForNav.find(p => p.key === activePage)?.label ?? "Page";

    // Resolve selected section for the right sidebar
    const resolvedConfig   = useResolvedSections(draftConfig);
    const pageSections = resolvedConfig.pages.find(p => p.key === activePage)?.sections ?? [];
    const layoutSections = resolvedConfig.layout;

    const allSections = [...layoutSections, ...pageSections];
    const selectedSection = allSections.find(s => s.instanceId === selectedInstanceId) ?? null;

    const isLayoutSection = selectedSection ? layoutSections.some(s => s.instanceId === selectedSection.instanceId) : false;
    
    const overridesSource = isLayoutSection
        ? (stateHelpers.overrides?.layout ?? {})
        : (stateHelpers.overrides?.pages?.[activePage] ?? {});

    const selectedOverride = selectedInstanceId ? (overridesSource[selectedInstanceId] ?? {}) : {};

    return (
        <div
            className="flex flex-col -mx-6 -my-10 lg:-my-20 overflow-hidden bg-muted/20"
            style={{ height: "calc(100vh - 0px)" }}
        >
            {/* Collapses the app sidebar to icon-only while the appearance editor is open */}
            <SidebarAutoCollapse />
            {/* Topbar: back link + page selector + device + save */}
            <AppearanceTopbar
                siteDomain={initialSite.subdomain || "demo"}
                isDirty={stateHelpers.isDirty}
                isSaving={isSaving}
                onSave={handleSave}
                onDiscard={handleDiscard}
                pages={pagesForNav}
                activePage={activePage}
                onPageChange={handlePageChange}
            />

            {/* Body: left sidebar | preview | right sidebar */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left: full-width sidebar — Sections / Theme / Font / Template */}
                <AppearanceLeftSidebar
                    activeTab={activeLeftTab}
                    onTabChange={setActiveLeftTab}
                    activePageKey={activePage}
                    activePageLabel={activePageLabel}
                    selectedInstanceId={selectedInstanceId}
                    onSelectInstance={handleSelectInstance}
                    draftConfig={draftConfig}
                    stateHelpers={stateHelpers}
                />

                {/* Center: live preview */}
                <LivePreviewPane
                    key={`${stateHelpers.selectedTemplate}:${stateHelpers.templateResetRevision}`}
                    tenant={initialSite.subdomain || "demo"}
                    draftConfig={debouncedConfig}
                    activePage={activePage}
                    selectedInstanceId={selectedInstanceId}
                    onSelectInstance={handleSelectInstance}
                    deviceSize={deviceSize}
                    onDeviceChange={setDeviceSize}
                />

                {/* Right: section detail options */}
                <AppearanceRightSidebar
                    activeLeftTab={activeLeftTab}
                    activePageKey={activePage}
                    selectedSection={selectedSection}
                    selectedOverride={selectedOverride}
                    stateHelpers={stateHelpers}
                    onClose={() => setSelectedInstanceId(null)}
                />
            </div>
        </div>
    );
}
