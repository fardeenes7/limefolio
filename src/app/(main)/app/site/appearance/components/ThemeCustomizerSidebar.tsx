import React from "react";
import { THEMES_META, FONTS_META } from "@/lib/themes-meta";
import { ThemeSwatch } from "./ThemeSwatch";
import { FontOption } from "./FontOption";
import { UnsavedBanner } from "./UnsavedBanner";
import { Button } from "@/components/ui/button";
import { IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react";

interface ThemeCustomizerSidebarProps {
    selectedTheme: string;
    selectedFont: string;
    setTheme: (themeKey: string) => void;
    setFont: (fontKey: string) => void;
    isDirty: boolean;
    onSave: () => void;
    isSaving: boolean;
}

export function ThemeCustomizerSidebar({
    selectedTheme,
    selectedFont,
    setTheme,
    setFont,
    isDirty,
    onSave,
    isSaving,
}: ThemeCustomizerSidebarProps) {
    return (
        <aside className="w-80 shrink-0 border-r border-border bg-card flex flex-col h-full z-10 relative">
            {/* Header */}
            <div className="p-4 shrink-0 border-b border-border">
                <h1 className="font-semibold text-lg">Appearance</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Design your portfolio's look and feel.
                </p>
            </div>

            {/* Unsaved Banner */}
            <div className="shrink-0">
                <UnsavedBanner isDirty={isDirty} />
            </div>

            {/* Pickers (Scrollable) */}
            <div className="flex-1 overflow-y-auto min-h-0 px-4 py-6 space-y-8">
                {/* Theme Section */}
                <section>
                    <header className="mb-3">
                        <h2 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                            Color Theme
                        </h2>
                    </header>
                    <div className="grid grid-cols-4 gap-3">
                        {THEMES_META.map((theme) => (
                            <ThemeSwatch
                                key={theme.slug}
                                theme={theme}
                                isSelected={selectedTheme === theme.slug}
                                onClick={() => setTheme(theme.slug)}
                            />
                        ))}
                    </div>
                </section>

                {/* Font Section */}
                <section>
                    <header className="mb-3">
                        <h2 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                            Typography
                        </h2>
                    </header>
                    <div className="flex flex-col gap-1">
                        {FONTS_META.map((font) => (
                            <FontOption
                                key={font.slug}
                                font={font}
                                isSelected={selectedFont === font.slug}
                                onClick={() => setFont(font.slug)}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer with Save Button */}
            <div className="p-4 border-t border-border bg-card shrink-0">
                <Button
                    onClick={onSave}
                    disabled={isSaving || !isDirty}
                    className="w-full relative transition-all duration-200"
                >
                    {isSaving ? (
                        <>
                            <IconLoader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <IconDeviceFloppy className="w-4 h-4 mr-2" />
                            Save appearance
                        </>
                    )}
                    {isDirty && !isSaving && (
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-full -translate-y-1/2 translate-x-1/2 shadow-[0_0_0_2px_var(--card)]" />
                    )}
                </Button>
            </div>
        </aside>
    );
}
