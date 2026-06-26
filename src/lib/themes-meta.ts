/**
 * Themes & Fonts Metadata (client app)
 *
 * A lightweight, static copy of appearance metadata for the site-settings UI.
 * Kept separate from the public app's registries (which import Next.js font
 * objects and React components) to avoid coupling the two Next.js apps at
 * build time.
 *
 * Keep in sync with:
 *   /public/src/themes/index.ts  — when you add a new color theme
 *   /public/src/themes/<slug>.css — source of truth for swatches
 *   /public/src/lib/fonts.ts     — when you add a new font
 */

// ── Color themes ─────────────────────────────────────────────────────────────

export interface ThemeMeta {
    name: string;
    slug: string;
    description?: string;
    category?: "minimal" | "colorful" | "retro" | "nature" | "brand";
    hasDark?: boolean;
    /** Representative CSS color swatches [background, primary, accent] */
    swatches: [string, string, string];
    /** Default radius for this theme */
    radius?: number;
    /** Default mode if the theme works better in a specific mode */
    defaultMode?: "light" | "dark";
    /** Array of suggested primary hex colors for this theme */
    suggestedPrimaryColors?: string[];
    /** Default font for this theme */
    defaultFont?: string;
}

export const THEMES_META: ThemeMeta[] = [
    {
        name: "Ghibli",
        slug: "ghibli",
        defaultFont: "mali",
        radius: 1,
        description: "Soft and magical anime-inspired palette",
        category: "nature",
        hasDark: true,
        swatches: ["oklch(0.91 0.05 82.69)", "oklch(0.71 0.10 111.99)", "oklch(0.88 0.05 83.41)"]
    },
    {
        name: "Marshmallow",
        slug: "marshmallow",
        defaultFont: "gabriela",
        radius: 1.5,
        description: "Sweet pastel pinks and soft tones",
        category: "colorful",
        hasDark: true,
        swatches: ["oklch(0.97 0.01 264.53)", "oklch(0.80 0.14 349.25)", "oklch(0.83 0.09 248.95)"]
    },
    {
        name: "Marvel",
        slug: "marvel",
        defaultFont: "bebas-neue",
        radius: 0.625,
        description: "Bold cinematic comic-book colors",
        category: "retro",
        hasDark: true,
        swatches: ["oklch(0.98 0.01 25.23)", "oklch(0.55 0.22 27.03)", "oklch(0.52 0.14 247.51)"]
    },
    {
        name: "Art Deco",
        slug: "art-deco",
        defaultFont: "delius-swash-caps",
        radius: 0,
        description: "Luxurious 1920s gold and dark tones",
        category: "retro",
        hasDark: true,
        swatches: ["oklch(0.96 0.03 106.96)", "oklch(0.77 0.14 91.05)", "oklch(0.93 0.03 106.91)"]
    },
    {
        name: "Summer",
        slug: "summer",
        defaultFont: "comfortaa",
        radius: 1,
        description: "Warm beach vibes and sunshine",
        category: "nature",
        hasDark: true,
        swatches: ["oklch(0.98 0.01 78.24)", "oklch(0.70 0.17 28.12)", "oklch(0.81 0.15 72.19)"]
    },
    // ── Base ──────────────────────────────────────────────────────────────────
    {
        name: "Default",
        slug: "default",
        defaultFont: "work-sans",
        radius: 0.625,
        description: "Clean and minimal light theme",
        category: "minimal",
        hasDark: true,
        suggestedPrimaryColors: ["#000000", "#2563eb", "#16a34a", "#dc2626"],
        swatches: ["oklch(1 0 0)", "oklch(0.205 0 0)", "oklch(0.97 0 0)"]
    },
    {
        name: "Neobrutalism",
        slug: "neobrutalism",
        defaultFont: "archivo-black",
        radius: 0,
        description: "High-contrast blocks, heavy outlines, and loud accent color",
        category: "retro",
        hasDark: false,
        suggestedPrimaryColors: ["oklch(0.83 0.17 86)", "oklch(0.71 0.20 352)", "oklch(0.74 0.15 196)", "oklch(0.68 0.23 36)"],
        swatches: ["oklch(0.96 0.06 98)", "oklch(0.83 0.17 86)", "oklch(0.71 0.20 352)"]
    },
   
    // ── Minimal / Professional ────────────────────────────────────────────────
    {
        name: "Caffeine",
        slug: "caffeine",
        defaultFont: "fraunces",
        radius: 0.5,
        description: "Warm off-white with coffee brown accents",
        category: "minimal",
        hasDark: true,
        suggestedPrimaryColors: ["#78350f", "#b45309", "#451a03", "#9a3412"],
        swatches: [
            "oklch(0.9821 0 0)",
            "oklch(0.4341 0.0392 41.9938)",
            "oklch(0.9310 0 0)"
        ]
    },

    {
        name: "Graphite",
        slug: "graphite",
        defaultFont: "schibsted-grotesk",
        radius: 0.35,
        description: "Monochrome grey with subtle shadows",
        category: "minimal",
        hasDark: true,
        suggestedPrimaryColors: ["#111827", "#374151", "#4b5563", "#000000"],
        swatches: [
            "oklch(0.9551 0 0)",
            "oklch(0.4891 0 0)",
            "oklch(0.8078 0 0)"
        ]
    },

    {
        name: "Mocha Mousse",
        slug: "mocha-mousse",
        defaultFont: "outfit",
        radius: 0.5,
        description: "Rich warm browns, Pantone color of 2025",
        category: "minimal",
        hasDark: true,
        suggestedPrimaryColors: ["#451a03", "#78350f", "#b45309", "#92400e"],
        swatches: [
            "oklch(0.9529 0.0146 102.4597)",
            "oklch(0.6083 0.0623 44.3588)",
            "oklch(0.8502 0.0389 49.0874)"
        ]
    },
    {
        name: "Tangerine",
        slug: "tangerine",
        defaultFont: "sora",
        radius: 0.75,
        description: "Warm orange on cool blue-gray",
        category: "minimal",
        hasDark: true,
        suggestedPrimaryColors: ["#ea580c", "#f97316", "#c2410c", "#9a3412"],
        swatches: [
            "oklch(0.9383 0.0042 236.4993)",
            "oklch(0.6397 0.1720 36.4421)",
            "oklch(0.9119 0.0222 243.8174)"
        ]
    },
    {
        name: "Cinematic",
        slug: "cinematic",
        defaultFont: "space-grotesk",
        radius: 0.35,
        description: "Warm film palette with projector-gold accents",
        category: "retro",
        hasDark: true,
        defaultMode: "dark",
        suggestedPrimaryColors: ["oklch(0.78 0.14 82)", "oklch(0.56 0.22 24)", "oklch(0.66 0.12 245)", "oklch(0.72 0.10 135)"],
        swatches: ["oklch(0.09 0.018 255)", "oklch(0.78 0.14 82)", "oklch(0.56 0.22 24)"]
    },

    // ── Colorful / Playful ────────────────────────────────────────────────────
    {
        name: "Amethyst Haze",
        slug: "amethyst-haze",
        defaultFont: "righteous",
        radius: 0.5,
        description: "Soft purple-tinted with elegant shadows",
        category: "colorful",
        hasDark: true,
        suggestedPrimaryColors: ["#7e22ce", "#9333ea", "#a855f7", "#6b21a8"],
        swatches: [
            "oklch(0.9777 0.0041 301.4256)",
            "oklch(0.6104 0.0767 299.7335)",
            "oklch(0.7889 0.0802 359.9375)"
        ]
    },
    {
        name: "Bubblegum",
        slug: "bubblegum",
        defaultFont: "fredoka",
        radius: 0.4,
        description: "Playful pink theme with bold shadows",
        category: "colorful",
        hasDark: true,
        suggestedPrimaryColors: ["#db2777", "#ec4899", "#be185d", "#9d174d"],
        swatches: [
            "oklch(0.9399 0.0203 345.6985)",
            "oklch(0.6209 0.1801 348.1385)",
            "oklch(0.9195 0.0801 87.667)"
        ]
    },

    {
        name: "Pastel Dreams",
        slug: "pastel-dreams",
        defaultFont: "nunito",
        radius: 1.5,
        description: "Dreamy lavender-pink palette with large radius",
        category: "colorful",
        hasDark: true,
        suggestedPrimaryColors: ["#f472b6", "#c084fc", "#818cf8", "#fbbf24"],
        swatches: [
            "oklch(0.9689 0.0090 314.7819)",
            "oklch(0.7090 0.1592 293.5412)",
            "oklch(0.9376 0.0260 321.9388)"
        ]
    },
    {
        name: "Soft Pop",
        slug: "soft-pop",
        defaultFont: "lexend",
        radius: 1,
        description: "Bold but soft popping colors",
        category: "colorful",
        hasDark: true,
        suggestedPrimaryColors: ["#fbbf24", "#34d399", "#60a5fa", "#f472b6"],
        swatches: [
            "oklch(0.9789 0.0082 121.6272)",
            "oklch(0.5106 0.2301 276.9656)",
            "oklch(0.7686 0.1647 70.0804)"
        ]
    },

    // ── Nature ────────────────────────────────────────────────────────────────
    {
        name: "Nature",
        slug: "nature",
        defaultFont: "work-sans",
        radius: 0.5,
        description: "Forest greens with earthy warmth",
        category: "nature",
        hasDark: true,
        suggestedPrimaryColors: ["#15803d", "#16a34a", "#10b981", "#047857"],
        swatches: [
            "oklch(0.9711 0.0074 80.7211)",
            "oklch(0.5234 0.1347 144.1672)",
            "oklch(0.8952 0.0504 146.0366)"
        ]
    },

    {
        name: "Solar Dusk",
        slug: "solar-dusk",
        defaultFont: "dm-sans",
        radius: 0.3,
        description: "Warm sunset amber palette",
        category: "nature",
        hasDark: true,
        suggestedPrimaryColors: ["#eab308", "#f59e0b", "#d97706", "#b45309"],
        swatches: [
            "oklch(0.9885 0.0057 84.5659)",
            "oklch(0.5553 0.1455 48.9975)",
            "oklch(0.9000 0.0500 74.9889)"
        ]
    },
    {
        name: "Midnight Bloom",
        slug: "midnight-bloom",
        defaultFont: "raleway",
        radius: 0.5,
        description: "Indigo purples with a floral softness",
        category: "nature",
        hasDark: true,
        suggestedPrimaryColors: ["#4338ca", "#4f46e5", "#3730a3", "#312e81"],
        swatches: [
            "oklch(0.9821 0 0)",
            "oklch(0.5676 0.2021 283.0838)",
            "oklch(0.6475 0.0642 117.4260)"
        ]
    },

    // ── Retro / Stylized ──────────────────────────────────────────────────────
    {
        name: "Catppuccin",
        slug: "catppuccin",
        defaultFont: "jetbrains-mono",
        radius: 0.35,
        description: "The beloved pastel dev theme",
        category: "retro",
        hasDark: true,
        suggestedPrimaryColors: ["#cba6f7", "#f38ba8", "#a6e3a1", "#89b4fa"],
        swatches: [
            "oklch(0.9578 0.0058 264.5321)",
            "oklch(0.5547 0.2503 297.0156)",
            "oklch(0.6820 0.1448 235.3822)"
        ]
    },
    {
        name: "Claymorphism",
        slug: "claymorphism",
        defaultFont: "space-grotesk",
        radius: 1.25,
        description: "Puffy clay-look cards with large radius",
        category: "retro",
        hasDark: true,
        suggestedPrimaryColors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
        swatches: [
            "oklch(0.9232 0.0026 48.7171)",
            "oklch(0.5854 0.2041 277.1173)",
            "oklch(0.9376 0.0260 321.9388)"
        ]
    },
    {
        name: "Cosmic Night",
        slug: "cosmic-night",
        defaultFont: "fira-code",
        radius: 0.5,
        description: "Deep space indigo with violet glow",
        category: "retro",
        hasDark: true,
        defaultMode: "dark",
        suggestedPrimaryColors: ["#8b5cf6", "#a855f7", "#c084fc", "#3b82f6"],
        swatches: [
            "oklch(0.9730 0.0133 286.1503)",
            "oklch(0.5417 0.1790 288.0332)",
            "oklch(0.9221 0.0373 262.1410)"
        ]
    },
    {
        name: "Cyberpunk",
        slug: "cyberpunk",
        defaultFont: "syne",
        radius: 0.5,
        description: "Neon pink and cyber-green on dark navy",
        category: "retro",
        hasDark: true,
        defaultMode: "dark",
        suggestedPrimaryColors: ["#fdf001", "#ff003c", "#00ff00", "#00f0ff"],
        swatches: [
            "oklch(0.9816 0.0017 247.8390)",
            "oklch(0.6726 0.2904 341.4084)",
            "oklch(0.8903 0.1739 171.2690)"
        ]
    },
    {
        name: "Darkmatter",
        slug: "darkmatter",
        defaultFont: "share-tech-mono",
        radius: 0.75,
        description: "Near-black with amber terminal accents",
        category: "retro",
        hasDark: true,
        defaultMode: "dark",
        suggestedPrimaryColors: ["#f59e0b", "#fbbf24", "#d97706", "#ea580c"],
        swatches: [
            "oklch(1 0 0)",
            "oklch(0.6716 0.1368 48.5130)",
            "oklch(0.9491 0 0)"
        ]
    },
    {
        name: "Doom 64",
        slug: "doom-64",
        defaultFont: "silkscreen",
        radius: 0,
        description: "Grey pixel palette with blood-orange",
        category: "retro",
        hasDark: true,
        defaultMode: "dark",
        suggestedPrimaryColors: ["#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"],
        swatches: [
            "oklch(0.8452 0 0)",
            "oklch(0.5016 0.1887 27.4816)",
            "oklch(0.5880 0.0993 245.7394)"
        ]
    },
    {
        name: "Starry Night",
        slug: "starry-night",
        defaultFont: "lora",
        radius: 0.5,
        description: "Van Gogh midnight blue with golden accents",
        category: "retro",
        hasDark: true,
        defaultMode: "dark",
        suggestedPrimaryColors: ["#facc15", "#eab308", "#ca8a04", "#a16207"],
        swatches: [
            "oklch(0.9755 0.0045 258.3245)",
            "oklch(0.4815 0.1178 263.3758)",
            "oklch(0.6896 0.0714 234.0387)"
        ]
    },
    {
        name: "Vintage Paper",
        slug: "vintage-paper",
        defaultFont: "libre-baskerville",
        radius: 0.25,
        description: "Aged parchment with ink-brown text",
        category: "retro",
        hasDark: true,
        suggestedPrimaryColors: ["#78350f", "#92400e", "#b45309", "#d97706"],
        swatches: [
            "oklch(0.9582 0.0152 90.2357)",
            "oklch(0.6180 0.0778 65.5444)",
            "oklch(0.8348 0.0426 88.8064)"
        ]
    },
    // ── Brand-inspired ────────────────────────────────────────────────────────
    {
        name: "Bold Tech",
        slug: "bold-tech",
        defaultFont: "space-grotesk",
        radius: 0.625,
        description: "Electric violet inspired by dev tools",
        category: "brand",
        hasDark: true,
        suggestedPrimaryColors: ["#8b5cf6", "#7c3aed", "#6d28d9", "#4f46e5"],
        swatches: [
            "oklch(1 0 0)",
            "oklch(0.6056 0.2189 292.7172)",
            "oklch(0.9319 0.0316 255.5855)"
        ]
    },
    {
        name: "Claude",
        slug: "claude",
        defaultFont: "lora",
        radius: 0.5,
        description: "Warm sand tones inspired by the Claude AI",
        category: "brand",
        hasDark: true,
        suggestedPrimaryColors: ["#d97706", "#b45309", "#92400e", "#78350f"],
        swatches: [
            "oklch(0.9818 0.0054 95.0986)",
            "oklch(0.6171 0.1375 39.0427)",
            "oklch(0.9245 0.0138 92.9892)"
        ]
    },
    {
        name: "Elegant Luxury",
        slug: "elegant-luxury",
        defaultFont: "cinzel",
        radius: 0.375,
        description: "Deep crimson and gold luxury palette",
        category: "brand",
        hasDark: true,
        suggestedPrimaryColors: ["#b91c1c", "#991b1b", "#7f1d1d", "#b45309"],
        swatches: [
            "oklch(0.9779 0.0042 56.3756)",
            "oklch(0.4650 0.1470 24.9381)",
            "oklch(0.9619 0.0580 95.6174)"
        ]
    },
    {
        name: "Twitter",
        slug: "twitter",
        defaultFont: "dm-sans",
        radius: 1.3,
        description: "Clean X / Twitter blue with pill radius",
        category: "brand",
        hasDark: true,
        suggestedPrimaryColors: ["#1d9bf0", "#1da1f2", "#0c85d0", "#005fd1"],
        swatches: [
            "oklch(1 0 0)",
            "oklch(0.6723 0.1606 244.9955)",
            "oklch(0.9392 0.0166 250.8453)"
        ]
    },
    {
        name: "Limefolio",
        slug: "limefolio",
        defaultFont: "onest",
        radius: 0.5,
        description: "Official Limefolio theme with vibrant lime green",
        category: "brand",
        hasDark: true,
        suggestedPrimaryColors: ["#65a30d", "#84cc16", "#4d7c0f", "#3f6212"],
        swatches: [
            "oklch(0.99 0 0)",
            "oklch(0.8 0.18 135)",
            "oklch(0.94 0.05 135)"
        ]
    }
];

// ── Fonts ─────────────────────────────────────────────────────────────────────

export interface FontMeta {
    name: string;
    slug: string;
    category: "sans" | "serif" | "mono" | "display";
    /** Generic CSS font stack used only for preview text in the picker */
    previewStack: string;
}

export const FONTS_META: FontMeta[] = [
    {
        name: "Archivo Black",
        slug: "archivo-black",
        category: "display",
        previewStack: "'Archivo Black', Impact, sans-serif"
    },
    {
        name: "Gabriela",
        slug: "gabriela",
        category: "serif",
        previewStack: "'Gabriela', serif"
    },
    {
        name: "Delius Swash Caps",
        slug: "delius-swash-caps",
        category: "display",
        previewStack: "'Delius Swash Caps', cursive"
    },
    {
        name: "Mali",
        slug: "mali",
        category: "display",
        previewStack: "'Mali', cursive"
    },
    {
        name: "Bebas Neue",
        slug: "bebas-neue",
        category: "display",
        previewStack: "'Bebas Neue', sans-serif"
    },
    {
        name: "Comfortaa",
        slug: "comfortaa",
        category: "sans",
        previewStack: "'Comfortaa', sans-serif"
    },
    {
        name: "Silkscreen",
        slug: "silkscreen",
        category: "display",
        previewStack: "'Silkscreen', monospace"
    },
    {
        name: "Share Tech Mono",
        slug: "share-tech-mono",
        category: "mono",
        previewStack: "'Share Tech Mono', monospace"
    },
    {
        name: "Syne",
        slug: "syne",
        category: "display",
        previewStack: "'Syne', sans-serif"
    },
    {
        name: "Cinzel",
        slug: "cinzel",
        category: "serif",
        previewStack: "'Cinzel', serif"
    },
    {
        name: "Libre Baskerville",
        slug: "libre-baskerville",
        category: "serif",
        previewStack: "'Libre Baskerville', serif"
    },
    {
        name: "Fraunces",
        slug: "fraunces",
        category: "serif",
        previewStack: "'Fraunces', serif"
    },
    {
        name: "Fredoka",
        slug: "fredoka",
        category: "sans",
        previewStack: "'Fredoka', sans-serif"
    },
    {
        name: "Lexend",
        slug: "lexend",
        category: "sans",
        previewStack: "'Lexend', sans-serif"
    },
    {
        name: "Righteous",
        slug: "righteous",
        category: "display",
        previewStack: "'Righteous', sans-serif"
    },
    {
        name: "Schibsted Grotesk",
        slug: "schibsted-grotesk",
        category: "sans",
        previewStack: "'Schibsted Grotesk', sans-serif"
    },
    {
        name: "Onest",
        slug: "onest",
        category: "sans",
        previewStack: "'Onest', sans-serif"
    },
    {
        name: "Work Sans",
        slug: "work-sans",
        category: "sans",
        previewStack: "'Work Sans', sans-serif"
    },
    // ── Sans ──────────────────────────────────────────────────────────────────
    {
        name: "Inter",
        slug: "inter",
        category: "sans",
        previewStack: "'Inter', sans-serif"
    },
    {
        name: "Figtree",
        slug: "figtree",
        category: "sans",
        previewStack: "'Figtree', sans-serif"
    },
    {
        name: "Outfit",
        slug: "outfit",
        category: "sans",
        previewStack: "'Outfit', sans-serif"
    },
    {
        name: "Plus Jakarta Sans",
        slug: "plus-jakarta-sans",
        category: "sans",
        previewStack: "'Plus Jakarta Sans', sans-serif"
    },
    {
        name: "DM Sans",
        slug: "dm-sans",
        category: "sans",
        previewStack: "'DM Sans', sans-serif"
    },
    {
        name: "Nunito",
        slug: "nunito",
        category: "sans",
        previewStack: "'Nunito', sans-serif"
    },
    {
        name: "Raleway",
        slug: "raleway",
        category: "sans",
        previewStack: "'Raleway', sans-serif"
    },
    {
        name: "Lato",
        slug: "lato",
        category: "sans",
        previewStack: "'Lato', sans-serif"
    },
    {
        name: "Poppins",
        slug: "poppins",
        category: "sans",
        previewStack: "'Poppins', sans-serif"
    },
    {
        name: "Space Grotesk",
        slug: "space-grotesk",
        category: "sans",
        previewStack: "'Space Grotesk', sans-serif"
    },
    {
        name: "Sora",
        slug: "sora",
        category: "sans",
        previewStack: "'Sora', sans-serif"
    },
    {
        name: "Manrope",
        slug: "manrope",
        category: "sans",
        previewStack: "'Manrope', sans-serif"
    },
    {
        name: "Geist Sans",
        slug: "geist-sans",
        category: "sans",
        previewStack: "'Geist', 'GeistSans', sans-serif"
    },

    // ── Display ───────────────────────────────────────────────────────────────
    {
        name: "Bricolage Grotesque",
        slug: "bricolage-grotesque",
        category: "display",
        previewStack: "'Bricolage Grotesque', sans-serif"
    },
    {
        name: "Playfair Display",
        slug: "playfair-display",
        category: "display",
        previewStack: "'Playfair Display', Georgia, serif"
    },
    {
        name: "DM Serif Display",
        slug: "dm-serif-display",
        category: "display",
        previewStack: "'DM Serif Display', Georgia, serif"
    },

    // ── Serif ─────────────────────────────────────────────────────────────────
    {
        name: "Lora",
        slug: "lora",
        category: "serif",
        previewStack: "'Lora', Georgia, serif"
    },
    {
        name: "Cormorant Garamond",
        slug: "cormorant-garamond",
        category: "serif",
        previewStack: "'Cormorant Garamond', Georgia, serif"
    },

    // ── Mono ──────────────────────────────────────────────────────────────────
    {
        name: "Geist Mono",
        slug: "geist-mono",
        category: "mono",
        previewStack: "'Geist Mono', 'GeistMono', monospace"
    },
    {
        name: "JetBrains Mono",
        slug: "jetbrains-mono",
        category: "mono",
        previewStack: "'JetBrains Mono', monospace"
    },
    {
        name: "Fira Code",
        slug: "fira-code",
        category: "mono",
        previewStack: "'Fira Code', monospace"
    },
    {
        name: "Source Code Pro",
        slug: "source-code-pro",
        category: "mono",
        previewStack: "'Source Code Pro', monospace"
    }
];

const byName = <T extends { name: string }>(a: T, b: T) => a.name.localeCompare(b.name);

export const SORTED_THEMES_META = [...THEMES_META].sort(byName);
export const SORTED_FONTS_META = [...FONTS_META].sort(byName);
