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
    /** Default font for this theme */
    defaultFont?: string;
}

/** Full registry — keyed by slug */
export const ColorThemes: Record<string, ColorThemeConfig> = {
    "ghibli": {
        name: "Ghibli",
        slug: "ghibli",
        defaultFont: "mali",
        description: "Soft and magical anime-inspired palette",
        hasDark: true,
        category: "nature",
    },
    "marshmallow": {
        name: "Marshmallow",
        slug: "marshmallow",
        defaultFont: "gabriela",
        description: "Sweet pastel pinks and soft tones",
        hasDark: true,
        category: "colorful",
    },
    "marvel": {
        name: "Marvel",
        slug: "marvel",
        defaultFont: "bebas-neue",
        description: "Bold cinematic comic-book colors",
        hasDark: true,
        category: "retro",
    },
    "art-deco": {
        name: "Art Deco",
        slug: "art-deco",
        defaultFont: "delius-swash-caps",
        description: "Luxurious 1920s gold and dark tones",
        hasDark: true,
        category: "retro",
    },
    "summer": {
        name: "Summer",
        slug: "summer",
        defaultFont: "comfortaa",
        description: "Warm beach vibes and sunshine",
        hasDark: true,
        category: "nature",
    },
    // ── Base ────────────────────────────────────────────────────────────────
    default: {
        name: "Default",
        slug: "default",
        defaultFont: "work-sans",
        description: "Clean neutral light theme",
        hasDark: true,
        category: "minimal",
    },
    neobrutalism: {
        name: "Neobrutalism",
        slug: "neobrutalism",
        defaultFont: "archivo-black",
        description: "High-contrast blocks, heavy outlines, and loud accent color",
        hasDark: false,
        category: "retro",
    },

    // ── Colorful / Playful ───────────────────────────────────────────────────
    "amethyst-haze": {
        name: "Amethyst Haze",
        slug: "amethyst-haze",
        defaultFont: "righteous",
        description: "Soft purple-tinted with elegant shadows",
        hasDark: true,
        category: "colorful",
    },
    bubblegum: {
        name: "Bubblegum",
        slug: "bubblegum",
        defaultFont: "fredoka",
        description: "Playful pink theme with bold shadows",
        hasDark: true,
        category: "colorful",
    },
    "pastel-dreams": {
        name: "Pastel Dreams",
        slug: "pastel-dreams",
        defaultFont: "nunito",
        description: "Dreamy lavender-pink palette with large radius",
        hasDark: true,
        category: "colorful",
    },
    "soft-pop": {
        name: "Soft Pop",
        slug: "soft-pop",
        defaultFont: "lexend",
        description: "Bold but soft popping colors",
        hasDark: true,
        category: "colorful",
    },
    bubblegum2: {
        name: "Bubblegum II",
        slug: "bubblegum-dark",
        defaultFont: "bricolage-grotesque",
        description: "Dark bubblegum with neon accents",
        hasDark: false,
        category: "colorful",
    },

    // ── Minimal / Professional ───────────────────────────────────────────────
    caffeine: {
        name: "Caffeine",
        slug: "caffeine",
        defaultFont: "fraunces",
        description: "Warm off-white with coffee brown accents",
        hasDark: true,
        category: "minimal",
    },
    graphite: {
        name: "Graphite",
        slug: "graphite",
        defaultFont: "schibsted-grotesk",
        description: "Monochrome grey with subtle shadows",
        hasDark: true,
        category: "minimal",
    },
    tangerine: {
        name: "Tangerine",
        slug: "tangerine",
        defaultFont: "sora",
        description: "Warm orange on cool blue-gray",
        hasDark: true,
        category: "minimal",
    },
    "mocha-mousse": {
        name: "Mocha Mousse",
        slug: "mocha-mousse",
        defaultFont: "outfit",
        description: "Rich warm browns, Pantone color of 2025",
        hasDark: true,
        category: "minimal",
    },

    // ── Nature ───────────────────────────────────────────────────────────────
    "cinematic-dark": {
        name: "Cinematic",
        slug: "cinematic-dark",
        defaultFont: "inter",
        description: "Deep dark tones to let video content pop",
        hasDark: false,
        category: "dark-only",
    },
    nature: {
        name: "Nature",
        slug: "nature",
        defaultFont: "work-sans",
        description: "Forest greens with earthy warmth",
        hasDark: true,
        category: "nature",
    },
    "solar-dusk": {
        name: "Solar Dusk",
        slug: "solar-dusk",
        defaultFont: "dm-sans",
        description: "Warm sunset amber palette",
        hasDark: true,
        category: "nature",
    },
    "midnight-bloom": {
        name: "Midnight Bloom",
        slug: "midnight-bloom",
        defaultFont: "raleway",
        description: "Indigo purples with a floral softness",
        hasDark: true,
        category: "nature",
    },

    // ── Retro / Stylized ─────────────────────────────────────────────────────
    catppuccin: {
        name: "Catppuccin",
        slug: "catppuccin",
        defaultFont: "jetbrains-mono",
        description: "The beloved pastel dev theme",
        hasDark: true,
        category: "retro",
    },
    claymorphism: {
        name: "Claymorphism",
        slug: "claymorphism",
        defaultFont: "space-grotesk",
        description: "Puffy clay-look cards with large radius",
        hasDark: true,
        category: "retro",
    },
    "cosmic-night": {
        name: "Cosmic Night",
        slug: "cosmic-night",
        defaultFont: "fira-code",
        description: "Deep space indigo with violet glow",
        hasDark: true,
        category: "retro",
    },
    cyberpunk: {
        name: "Cyberpunk",
        slug: "cyberpunk",
        defaultFont: "syne",
        description: "Neon pink and cyber-green on dark navy",
        hasDark: true,
        category: "retro",
    },
    darkmatter: {
        name: "Darkmatter",
        slug: "darkmatter",
        defaultFont: "share-tech-mono",
        description: "Near-black with amber terminal accents",
        hasDark: true,
        category: "retro",
    },
    "doom-64": {
        name: "Doom 64",
        slug: "doom-64",
        defaultFont: "silkscreen",
        description: "Grey pixel palette with blood-orange",
        hasDark: true,
        category: "retro",
    },
    "starry-night": {
        name: "Starry Night",
        slug: "starry-night",
        defaultFont: "lora",
        description: "Van Gogh midnight blue with golden accents",
        hasDark: true,
        category: "retro",
    },
    "vintage-paper": {
        name: "Vintage Paper",
        slug: "vintage-paper",
        defaultFont: "libre-baskerville",
        description: "Aged parchment with ink-brown text",
        hasDark: true,
        category: "retro",
    },
    // ── Brand-inspired ───────────────────────────────────────────────────────
    "bold-tech": {
        name: "Bold Tech",
        slug: "bold-tech",
        defaultFont: "space-grotesk",
        description: "Electric violet inspired by dev tools",
        hasDark: true,
        category: "brand",
    },
    claude: {
        name: "Claude",
        slug: "claude",
        defaultFont: "lora",
        description: "Warm sand tones inspired by the Claude AI",
        hasDark: true,
        category: "brand",
    },
    "elegant-luxury": {
        name: "Elegant Luxury",
        slug: "elegant-luxury",
        defaultFont: "cinzel",
        description: "Deep crimson and gold luxury palette",
        hasDark: true,
        category: "brand",
    },
    twitter: {
        name: "Twitter",
        slug: "twitter",
        defaultFont: "dm-sans",
        description: "Clean X / Twitter blue with pill radius",
        hasDark: true,
        category: "brand",
    },
    limefolio: {
        name: "Limefolio",
        slug: "limefolio",
        defaultFont: "onest",
        description: "Official Limefolio theme with vibrant lime green",
        hasDark: true,
        category: "brand",
    },
};

/** Lookup a theme config by slug (falls back to default) */
export function getColorTheme(
    slug: string | null | undefined,
): ColorThemeConfig {
    if (!slug) return ColorThemes.default;

    if (ColorThemes[slug]) return ColorThemes[slug];

    // Handle -dark variants by looking up the base theme
    if (slug.endsWith("-dark")) {
        const baseSlug = slug.replace("-dark", "");
        if (ColorThemes[baseSlug]) return ColorThemes[baseSlug];
    }

    // Handle cases where key != slug
    const themeBySlug = Object.values(ColorThemes).find(t => t.slug === slug);
    if (themeBySlug) return themeBySlug;

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
