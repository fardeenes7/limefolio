"use client";

import { useState, useEffect } from "react";

interface ColorTheme {
    name: string;
    slug: string;
    description?: string;
}

/**
 * Example component showing how to fetch and display available color themes
 * This can be used in a theme selector UI in the dashboard
 */
export function ColorThemeSelector() {
    const [themes, setThemes] = useState<ColorTheme[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState<string>("default");

    useEffect(() => {
        async function fetchThemes() {
            try {
                const response = await fetch("/api/color-themes");
                const data = await response.json();
                setThemes(data);
            } catch (error) {
                console.error("Failed to fetch color themes:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchThemes();
    }, []);

    if (loading) {
        return <div>Loading themes...</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Choose a Color Theme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                    <button
                        key={theme.slug}
                        onClick={() => setSelectedTheme(theme.slug)}
                        className={`p-4 border rounded-lg text-left transition-all ${
                            selectedTheme === theme.slug
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                        }`}
                    >
                        <h3 className="font-semibold text-lg">{theme.name}</h3>
                        {theme.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                                {theme.description}
                            </p>
                        )}
                        <div className="mt-3 flex gap-2">
                            {/* Color preview boxes */}
                            <div className="w-8 h-8 rounded border border-border bg-background"></div>
                            <div className="w-8 h-8 rounded border border-border bg-primary"></div>
                            <div className="w-8 h-8 rounded border border-border bg-accent"></div>
                        </div>
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                    Selected theme: <strong>{selectedTheme}</strong>
                </p>
            </div>
        </div>
    );
}
