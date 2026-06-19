"use client";

import { useState, useEffect, useRef } from "react";
import { Site } from "@/types";
import { updateSite, updateTemplateConfig } from "@/lib/actions/sites";
import { Button } from "@/components/ui/button";
import { IconDeviceFloppy, IconCheck } from "@tabler/icons-react";
import { CustomizerSidebar } from "./components/CustomizerSidebar";
import { UserPortfolioConfig } from "@/templates/types";
import { getTemplate } from "@/templates/registry";
import { emptyUserConfig } from "@/templates/merge";

const PREVIEW_BASE_URL = process.env.NEXT_PUBLIC_PREVIEW_URL ?? "http://preview.localhost:3000";

interface AppearanceClientProps {
    initialSite: Site;
    initialConfigRaw: any;
}

export function AppearanceClient({ initialSite, initialConfigRaw }: AppearanceClientProps) {
    const [site, setSite] = useState(initialSite);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Parse the raw backend config into our frontend UserPortfolioConfig shape
    const initialConfig: UserPortfolioConfig = {
        templateKey: initialConfigRaw.template_key || "default",
        themeKey: initialConfigRaw.theme_key || "default",
        fontKey: initialConfigRaw.font_key || "inter",
        templateVersion: initialConfigRaw.template_version || "1.0.0",
        overrides: {
            layout: initialConfigRaw.config_overrides?.layout || {},
            pages: initialConfigRaw.config_overrides?.pages || {}
        },
        additions: {
            layout: initialConfigRaw.config_additions?.layout || [],
            pages: initialConfigRaw.config_additions?.pages || {}
        },
        removals: {
            layout: initialConfigRaw.config_removals?.layout || [],
            pages: initialConfigRaw.config_removals?.pages || {}
        },
        ordering: {
            layout: initialConfigRaw.config_ordering?.layout || [],
            pages: initialConfigRaw.config_ordering?.pages || {}
        },
    };

    const [draftConfig, setDraftConfig] = useState<UserPortfolioConfig>(initialConfig);
    const [selectedPageKey, setSelectedPageKey] = useState<string>("landing");
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const templateDef = getTemplate(draftConfig.templateKey);

    // Sync draft config to iframe on change
    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type: 'UPDATE_CONFIG',
                config: draftConfig,
                pageKey: selectedPageKey
            }, "*");
        }
    }, [draftConfig, selectedPageKey]);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            // Map our frontend UserPortfolioConfig shape back to the Django model fields
            const dataToSave = {
                template_key: draftConfig.templateKey,
                theme_key: draftConfig.themeKey,
                font_key: draftConfig.fontKey,
                template_version: draftConfig.templateVersion,
                config_overrides: draftConfig.overrides,
                config_additions: draftConfig.additions,
                config_removals: draftConfig.removals,
                config_ordering: draftConfig.ordering,
            };

            const configPromise = updateTemplateConfig(dataToSave);
            // Also sync the top-level site fields for consistency
            const sitePromise = updateSite({
                template: draftConfig.templateKey,
                theme: draftConfig.themeKey,
                font: draftConfig.fontKey,
            });

            await Promise.all([configPromise, sitePromise]);

            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            console.error("Failed to save appearance:", err);
            alert("Failed to save appearance settings");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-muted/20 absolute inset-0 z-50">
            {/* Left Sidebar Customizer */}
            <CustomizerSidebar
                draftConfig={draftConfig}
                setDraftConfig={setDraftConfig}
                templateDef={templateDef}
                selectedPageKey={selectedPageKey}
                setSelectedPageKey={setSelectedPageKey}
                selectedSectionId={selectedSectionId}
                setSelectedSectionId={setSelectedSectionId}
            />

            {/* Right Preview Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="h-14 border-b bg-background flex items-center justify-between px-4 shrink-0 shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Live Preview</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {draftConfig.templateKey} / {draftConfig.themeKey}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="gap-2 transition-all duration-200"
                            size="sm"
                        >
                            {saveSuccess ? (
                                <>
                                    <IconCheck className="w-4 h-4" />
                                    Saved!
                                </>
                            ) : (
                                <>
                                    <IconDeviceFloppy className="w-4 h-4" />
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </>
                            )}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard'}>
                            Exit
                        </Button>
                    </div>
                </div>
                
                <div className="flex-1 bg-muted p-4 md:p-8 overflow-hidden flex justify-center">
                    <div className="w-full h-full max-w-[1200px] bg-background shadow-lg rounded-lg border overflow-hidden transition-all duration-300">
                        <iframe
                            ref={iframeRef}
                            src={`${PREVIEW_BASE_URL}`}
                            className="w-full h-full border-0"
                            title="Live Preview"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
