"use client";

import { useState, useEffect } from "react";

interface Font {
    name: string;
    slug: string;
    variable: string;
}

/**
 * Example component showing how to fetch and display available fonts
 * This can be used in a font selector UI in the dashboard
 */
export function FontSelector() {
    const [fonts, setFonts] = useState<Font[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedFont, setSelectedFont] = useState<string>("figtree");

    useEffect(() => {
        async function fetchFonts() {
            try {
                // Using Next.js API route that automatically reads from Fonts registry
                const response = await fetch("/api/fonts");
                const data = await response.json();
                setFonts(data);
            } catch (error) {
                console.error("Failed to fetch fonts:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchFonts();
    }, []);

    if (loading) {
        return <div>Loading fonts...</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Choose a Font</h2>
            <div className="grid grid-cols-1 gap-4">
                {fonts.map((font) => (
                    <button
                        key={font.slug}
                        onClick={() => setSelectedFont(font.slug)}
                        className={`p-4 border rounded-lg text-left transition-all ${
                            selectedFont === font.slug
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                        }`}
                        style={{
                            fontFamily: `var(${font.variable})`,
                        }}
                    >
                        <h3 className="font-semibold text-lg">{font.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            The quick brown fox jumps over the lazy dog
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            Variable: {font.variable}
                        </p>
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                    Selected font: <strong>{selectedFont}</strong>
                </p>
            </div>
        </div>
    );
}
