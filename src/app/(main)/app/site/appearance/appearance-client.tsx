"use client";

import { useState } from "react";
import { useAppearanceState } from "./hooks/useAppearanceState";
import { useSaveAppearance } from "./hooks/useSaveAppearance";
import { useDebouncedConfig } from "./hooks/useDebouncedConfig";
import { getTemplate } from "@/templates/registry";

import { AppearanceTopbar } from "./components/AppearanceTopbar";
import { PageRail } from "./components/PageRail";
import { AppearancePanel } from "./components/AppearancePanel";
import { LivePreviewPane } from "./components/LivePreviewPane";
import { Site } from "@/types";

interface AppearanceClientProps {
    initialSite: Site;
    initialConfigRaw: any;
}

export function AppearanceClient({ initialSite, initialConfigRaw }: AppearanceClientProps) {
    // Manage local UI state with the expanded hook
    const stateHelpers = useAppearanceState({ initialConfigRaw });

    // Handle PATCH updates
    const { save, isSaving } = useSaveAppearance({
        onSuccess: () => {
            // onSuccess handles nothing now since state is mostly derived or we can reset isDirty manually.
        }
    });

    // Construct draft config to send to iframe and to save
    const draftConfig = {
        templateKey: stateHelpers.selectedTemplate,
        themeKey: stateHelpers.selectedTheme,
        fontKey: stateHelpers.selectedFont,
        overrides: stateHelpers.overrides,
        additions: stateHelpers.additions,
        removals: stateHelpers.removals,
        ordering: stateHelpers.ordering,
    };

    // Debounce the draft config for the iframe to prevent jitter
    const debouncedConfig = useDebouncedConfig(draftConfig, 400);

    const handleSave = () => {
        save(draftConfig);
    };

    const handleDiscard = () => {
        stateHelpers.resetToSaved();
    };

    // Layout and Navigation State
    const template = getTemplate(stateHelpers.selectedTemplate);
    
    // Add "layout" as the global pseudo-page at the end
    const pagesForRail = [
        ...template.pages.map(p => ({ key: p.key, label: p.label })),
        { key: "layout", label: "Global Layout" }
    ];

    const [activePage, setActivePage] = useState<string>("landing");
    const [activeTab, setActiveTab] = useState<"sections" | "theme" | "font" | "template">("sections");
    const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
    const [deviceSize, setDeviceSize] = useState<"desktop" | "tablet" | "mobile">("desktop");

    // We must reset selectedInstanceId when page changes
    const handlePageChange = (key: string) => {
        setActivePage(key);
        setSelectedInstanceId(null);
        if (activeTab !== "sections") {
            setActiveTab("sections");
        }
    };

    const activePageLabel = pagesForRail.find(p => p.key === activePage)?.label || "Page";

    return (
        <div 
            className="flex flex-col -mx-6 -my-10 lg:-my-20 bg-muted/20 overflow-hidden" 
            style={{ height: 'calc(100vh - 0px)' }}
        >
            <AppearanceTopbar
                siteDomain={initialSite.subdomain || "demo"}
                deviceSize={deviceSize}
                onDeviceChange={setDeviceSize}
                isDirty={stateHelpers.isDirty}
                isSaving={isSaving}
                onSave={handleSave}
                onDiscard={handleDiscard}
            />

            <div className="flex flex-1 overflow-hidden">
                <PageRail
                    pages={pagesForRail}
                    activePage={activePage}
                    onPageChange={handlePageChange}
                />

                <LivePreviewPane
                    tenant={initialSite.subdomain || "demo"}
                    draftConfig={debouncedConfig}
                    activePage={activePage}
                />

                <AppearancePanel
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    activePageKey={activePage}
                    activePageLabel={activePageLabel}
                    selectedInstanceId={selectedInstanceId}
                    onSelectInstance={setSelectedInstanceId}
                    draftConfig={draftConfig}
                    stateHelpers={stateHelpers}
                />
            </div>
        </div>
    );
}
