"use client";

import { useState } from "react";
import { useAppearanceState } from "./hooks/useAppearanceState";
import { useSaveAppearance } from "./hooks/useSaveAppearance";
import { ThemeCustomizerSidebar } from "./components/ThemeCustomizerSidebar";
import { LivePreviewPane } from "./components/LivePreviewPane";
import { Site } from "@/types";

interface AppearanceClientProps {
    initialSite: Site;
    initialConfigRaw: any;
}

export function AppearanceClient({ initialSite, initialConfigRaw }: AppearanceClientProps) {
    // Extract saved values from initial payload
    const [savedThemeKey, setSavedThemeKey] = useState(initialConfigRaw.theme_key || "default");
    const [savedFontKey, setSavedFontKey] = useState(initialConfigRaw.font_key || "inter");

    // Manage local UI state
    const {
        selectedTheme,
        selectedFont,
        setTheme,
        setFont,
        isDirty,
        resetToSaved,
    } = useAppearanceState({
        savedThemeKey,
        savedFontKey,
    });

    // Handle PATCH updates
    const { save, isSaving } = useSaveAppearance({
        onSuccess: (newTheme, newFont) => {
            setSavedThemeKey(newTheme);
            setSavedFontKey(newFont);
        }
    });

    // Construct draft config to send to iframe
    const draftConfig = {
        themeKey: selectedTheme,
        fontKey: selectedFont,
    };

    const handleSave = () => {
        save({ themeKey: selectedTheme, fontKey: selectedFont });
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-muted/20 absolute inset-0 z-50">
            <ThemeCustomizerSidebar
                selectedTheme={selectedTheme}
                selectedFont={selectedFont}
                setTheme={setTheme}
                setFont={setFont}
                isDirty={isDirty}
                onSave={handleSave}
                isSaving={isSaving}
            />
            <LivePreviewPane 
                tenant={initialSite.slug || "demo"} 
                draftConfig={draftConfig} 
            />
        </div>
    );
}
