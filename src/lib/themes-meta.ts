/**
 * Themes & Fonts Metadata (client app)
 *
 * A lightweight, static copy of appearance metadata for the site-settings UI.
 * Kept separate from the public app's registries (which import Next.js font
 * objects and React components) to avoid coupling the two Next.js apps at
 * build time.
 *
 * Keep in sync with:
 *   /public/src/lib/color-themes.ts  — when you add a new color theme
 *   /public/src/lib/fonts.ts         — when you add a new font
 */

// ── Color themes ─────────────────────────────────────────────────────────────

export interface ThemeMeta {
    name: string;
    slug: string;
    description?: string;
    /** Representative CSS color swatches [background, primary, accent] */
    swatches: [string, string, string];
}

export const THEMES_META: ThemeMeta[] = [
    {
        name: "Default",
        slug: "default",
        description: "Clean and minimal light theme",
        swatches: ["oklch(1 0 0)", "oklch(0.205 0 0)", "oklch(0.97 0 0)"],
    },
    {
        name: "Dark",
        slug: "dark",
        description: "Dark theme with high contrast",
        swatches: ["oklch(0.145 0 0)", "oklch(0.87 0 0)", "oklch(0.371 0 0)"],
    },
    {
        name: "Amethyst Haze",
        slug: "amethyst-haze",
        description: "Soft purple-tinted theme with elegant shadows",
        swatches: [
            "oklch(0.9777 0.0041 301.4256)",
            "oklch(0.6104 0.0767 299.7335)",
            "oklch(0.7889 0.0802 359.9375)",
        ],
    },
    {
        name: "Bubblegum",
        slug: "bubblegum",
        description: "Playful pink theme with bold shadows",
        swatches: [
            "oklch(0.9399 0.0203 345.6985)",
            "oklch(0.6209 0.1801 348.1385)",
            "oklch(0.9195 0.0801 87.667)",
        ],
    },
];

// ── Fonts ─────────────────────────────────────────────────────────────────────

export interface FontMeta {
    name: string;
    slug: string;
    /** Generic CSS font stack used only for preview text in the picker */
    previewStack: string;
}

export const FONTS_META: FontMeta[] = [
    {
        name: "Inter",
        slug: "inter",
        previewStack: "'Inter', sans-serif",
    },
    {
        name: "Figtree",
        slug: "figtree",
        previewStack: "'Figtree', sans-serif",
    },
    {
        name: "Geist Sans",
        slug: "geist-sans",
        previewStack: "'Geist', 'GeistSans', sans-serif",
    },
    {
        name: "Geist Mono",
        slug: "geist-mono",
        previewStack: "'Geist Mono', 'GeistMono', monospace",
    },
    {
        name: "Outfit",
        slug: "outfit",
        previewStack: "'Outfit', sans-serif",
    },
    {
        name: "JetBrains Mono",
        slug: "jetbrains-mono",
        previewStack: "'JetBrains Mono', monospace",
    },
];
