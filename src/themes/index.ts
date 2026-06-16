/**
 * Color Theme Registry
 *
 * Metadata-only registry. CSS variables are defined in the per-theme CSS files
 * under lib/themes/ and applied via CSS class names on <html>.
 *
 * Convention:
 *   - Light variant class:  .<slug>
 *   - Dark variant class:   .<slug>-dark
 *
 * To add a new theme:
 *   1. Create  lib/themes/<slug>.css  with .slug { } and optionally .slug-dark { }
 *   2. Add an @import for it in  lib/themes/index.css
 *   3. Add its metadata entry below
 */

export interface ColorThemeConfig {
    name: string;
    slug: string;
    description?: string;
    /** Whether a -dark variant CSS class exists */
    hasDark?: boolean;
    /** Loose category tag for UI grouping */
    category?:
        | "minimal"
        | "colorful"
        | "retro"
        | "nature"
        | "brand"
        | "dark-only";
}

/** Full registry — keyed by slug */
export const ColorThemes: Record<string, ColorThemeConfig> = {
    // ── Base ────────────────────────────────────────────────────────────────
    default: {
        name: "Default",
        slug: "default",
        description: "Clean neutral light theme",
        hasDark: true,
        category: "minimal",
    },
    dark: {
        name: "Dark",
        slug: "dark",
        description: "High-contrast dark theme",
        hasDark: false,
        category: "minimal",
    },

    // ── Colorful / Playful ───────────────────────────────────────────────────
    "amethyst-haze": {
        name: "Amethyst Haze",
        slug: "amethyst-haze",
        description: "Soft purple-tinted with elegant shadows",
        hasDark: true,
        category: "colorful",
    },
    bubblegum: {
        name: "Bubblegum",
        slug: "bubblegum",
        description: "Playful pink theme with bold shadows",
        hasDark: true,
        category: "colorful",
    },
    candyland: {
        name: "Candyland",
        slug: "candyland",
        description: "Sweet pastel tones inspired by candy",
        hasDark: true,
        category: "colorful",
    },
    "pastel-dreams": {
        name: "Pastel Dreams",
        slug: "pastel-dreams",
        description: "Dreamy lavender-pink palette with large radius",
        hasDark: true,
        category: "colorful",
    },
    "soft-pop": {
        name: "Soft Pop",
        slug: "soft-pop",
        description: "Bold but soft popping colors",
        hasDark: true,
        category: "colorful",
    },
    bubblegum2: {
        name: "Bubblegum II",
        slug: "bubblegum-dark",
        description: "Dark bubblegum with neon accents",
        hasDark: false,
        category: "colorful",
    },

    // ── Minimal / Professional ───────────────────────────────────────────────
    caffeine: {
        name: "Caffeine",
        slug: "caffeine",
        description: "Warm off-white with coffee brown accents",
        hasDark: true,
        category: "minimal",
    },
    "clean-slate": {
        name: "Clean Slate",
        slug: "clean-slate",
        description: "Pure blue-tinted professional white",
        hasDark: true,
        category: "minimal",
    },
    graphite: {
        name: "Graphite",
        slug: "graphite",
        description: "Monochrome grey with subtle shadows",
        hasDark: true,
        category: "minimal",
    },
    "modern-minimal": {
        name: "Modern Minimal",
        slug: "modern-minimal",
        description: "Crisp white with blue-tinted accents",
        hasDark: true,
        category: "minimal",
    },
    tangerine: {
        name: "Tangerine",
        slug: "tangerine",
        description: "Warm orange on cool blue-gray",
        hasDark: true,
        category: "minimal",
    },
    "mocha-mousse": {
        name: "Mocha Mousse",
        slug: "mocha-mousse",
        description: "Rich warm browns, Pantone color of 2025",
        hasDark: true,
        category: "minimal",
    },

    // ── Nature ───────────────────────────────────────────────────────────────
    nature: {
        name: "Nature",
        slug: "nature",
        description: "Forest greens with earthy warmth",
        hasDark: true,
        category: "nature",
    },
    "northern-lights": {
        name: "Northern Lights",
        slug: "northern-lights",
        description: "Aurora-inspired greens and blues",
        hasDark: true,
        category: "nature",
    },
    "ocean-breeze": {
        name: "Ocean Breeze",
        slug: "ocean-breeze",
        description: "Coastal greens on clean blue-white",
        hasDark: true,
        category: "nature",
    },
    "solar-dusk": {
        name: "Solar Dusk",
        slug: "solar-dusk",
        description: "Warm sunset amber palette",
        hasDark: true,
        category: "nature",
    },
    "midnight-bloom": {
        name: "Midnight Bloom",
        slug: "midnight-bloom",
        description: "Indigo purples with a floral softness",
        hasDark: true,
        category: "nature",
    },

    // ── Retro / Stylized ─────────────────────────────────────────────────────
    catppuccin: {
        name: "Catppuccin",
        slug: "catppuccin",
        description: "The beloved pastel dev theme",
        hasDark: true,
        category: "retro",
    },
    claymorphism: {
        name: "Claymorphism",
        slug: "claymorphism",
        description: "Puffy clay-look cards with large radius",
        hasDark: true,
        category: "retro",
    },
    "cosmic-night": {
        name: "Cosmic Night",
        slug: "cosmic-night",
        description: "Deep space indigo with violet glow",
        hasDark: true,
        category: "retro",
    },
    cyberpunk: {
        name: "Cyberpunk",
        slug: "cyberpunk",
        description: "Neon pink and cyber-green on dark navy",
        hasDark: true,
        category: "retro",
    },
    darkmatter: {
        name: "Darkmatter",
        slug: "darkmatter",
        description: "Near-black with amber terminal accents",
        hasDark: true,
        category: "retro",
    },
    "doom-64": {
        name: "Doom 64",
        slug: "doom-64",
        description: "Grey pixel palette with blood-orange",
        hasDark: true,
        category: "retro",
    },
    "starry-night": {
        name: "Starry Night",
        slug: "starry-night",
        description: "Van Gogh midnight blue with golden accents",
        hasDark: true,
        category: "retro",
    },
    "vintage-paper": {
        name: "Vintage Paper",
        slug: "vintage-paper",
        description: "Aged parchment with ink-brown text",
        hasDark: true,
        category: "retro",
    },
    "violet-bloom": {
        name: "Violet Bloom",
        slug: "violet-bloom",
        description: "Vibrant violet with bloom gradients",
        hasDark: true,
        category: "retro",
    },

    // ── Brand-inspired ───────────────────────────────────────────────────────
    "bold-tech": {
        name: "Bold Tech",
        slug: "bold-tech",
        description: "Electric violet inspired by dev tools",
        hasDark: true,
        category: "brand",
    },
    claude: {
        name: "Claude",
        slug: "claude",
        description: "Warm sand tones inspired by the Claude AI",
        hasDark: true,
        category: "brand",
    },
    "elegant-luxury": {
        name: "Elegant Luxury",
        slug: "elegant-luxury",
        description: "Deep crimson and gold luxury palette",
        hasDark: true,
        category: "brand",
    },
    twitter: {
        name: "Twitter",
        slug: "twitter",
        description: "Clean X / Twitter blue with pill radius",
        hasDark: true,
        category: "brand",
    },
    vercel: {
        name: "Vercel",
        slug: "vercel",
        description: "Vercel's own high-contrast black/white brand",
        hasDark: true,
        category: "brand",
    },
};

/** Lookup a theme config by slug (falls back to default) */
export function getColorTheme(
    slug: string | null | undefined,
): ColorThemeConfig {
    if (slug && ColorThemes[slug]) return ColorThemes[slug];
    if (slug)
        console.warn(
            `Color theme "${slug}" not found, falling back to default.`,
        );
    return ColorThemes.default;
}

/** Returns all themes as a flat array (for API responses, dropdowns, etc.) */
export function getColorThemeMetadata(): ColorThemeConfig[] {
    return Object.values(ColorThemes);
}

/** Returns the CSS class name(s) to apply on <html> for a given slug */
export function getColorThemeClass(slug: string | null | undefined): string {
    const theme = getColorTheme(slug);
    return theme.slug;
}
