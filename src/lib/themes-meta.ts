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
}

export const THEMES_META: ThemeMeta[] = [
    // ── Base ──────────────────────────────────────────────────────────────────
    {
        name: "Default",
        slug: "default",
        description: "Clean and minimal light theme",
        category: "minimal",
        hasDark: true,
        swatches: ["oklch(1 0 0)", "oklch(0.205 0 0)", "oklch(0.97 0 0)"],
    },
    {
        name: "Dark",
        slug: "dark",
        description: "High-contrast dark theme",
        category: "minimal",
        hasDark: false,
        swatches: ["oklch(0.145 0 0)", "oklch(0.87 0 0)", "oklch(0.371 0 0)"],
    },

    // ── Minimal / Professional ────────────────────────────────────────────────
    {
        name: "Caffeine",
        slug: "caffeine",
        description: "Warm off-white with coffee brown accents",
        category: "minimal",
        hasDark: true,
        swatches: [
            "oklch(0.9821 0 0)",
            "oklch(0.4341 0.0392 41.9938)",
            "oklch(0.9310 0 0)",
        ],
    },
    {
        name: "Clean Slate",
        slug: "clean-slate",
        description: "Pure blue-tinted professional white",
        category: "minimal",
        hasDark: true,
        swatches: [
            "oklch(0.9842 0.0034 247.8575)",
            "oklch(0.5854 0.2041 277.1173)",
            "oklch(0.9299 0.0334 272.7879)",
        ],
    },
    {
        name: "Graphite",
        slug: "graphite",
        description: "Monochrome grey with subtle shadows",
        category: "minimal",
        hasDark: true,
        swatches: [
            "oklch(0.9551 0 0)",
            "oklch(0.4891 0 0)",
            "oklch(0.8078 0 0)",
        ],
    },
    {
        name: "Modern Minimal",
        slug: "modern-minimal",
        description: "Crisp white with blue-tinted accents",
        category: "minimal",
        hasDark: true,
        swatches: [
            "oklch(1 0 0)",
            "oklch(0.6231 0.1880 259.8145)",
            "oklch(0.9514 0.0250 236.8242)",
        ],
    },
    {
        name: "Mocha Mousse",
        slug: "mocha-mousse",
        description: "Rich warm browns, Pantone color of 2025",
        category: "minimal",
        hasDark: true,
        swatches: [
            "oklch(0.9529 0.0146 102.4597)",
            "oklch(0.6083 0.0623 44.3588)",
            "oklch(0.8502 0.0389 49.0874)",
        ],
    },
    {
        name: "Tangerine",
        slug: "tangerine",
        description: "Warm orange on cool blue-gray",
        category: "minimal",
        hasDark: true,
        swatches: [
            "oklch(0.9383 0.0042 236.4993)",
            "oklch(0.6397 0.1720 36.4421)",
            "oklch(0.9119 0.0222 243.8174)",
        ],
    },

    // ── Colorful / Playful ────────────────────────────────────────────────────
    {
        name: "Amethyst Haze",
        slug: "amethyst-haze",
        description: "Soft purple-tinted with elegant shadows",
        category: "colorful",
        hasDark: true,
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
        category: "colorful",
        hasDark: true,
        swatches: [
            "oklch(0.9399 0.0203 345.6985)",
            "oklch(0.6209 0.1801 348.1385)",
            "oklch(0.9195 0.0801 87.667)",
        ],
    },
    {
        name: "Candyland",
        slug: "candyland",
        description: "Sweet pastel tones inspired by candy",
        category: "colorful",
        hasDark: true,
        swatches: [
            "oklch(0.9809 0.0025 228.7836)",
            "oklch(0.8677 0.0735 7.0855)",
            "oklch(0.9680 0.2110 109.7692)",
        ],
    },
    {
        name: "Pastel Dreams",
        slug: "pastel-dreams",
        description: "Dreamy lavender-pink palette with large radius",
        category: "colorful",
        hasDark: true,
        swatches: [
            "oklch(0.9689 0.0090 314.7819)",
            "oklch(0.7090 0.1592 293.5412)",
            "oklch(0.9376 0.0260 321.9388)",
        ],
    },
    {
        name: "Soft Pop",
        slug: "soft-pop",
        description: "Bold but soft popping colors",
        category: "colorful",
        hasDark: true,
        swatches: [
            "oklch(0.9789 0.0082 121.6272)",
            "oklch(0.5106 0.2301 276.9656)",
            "oklch(0.7686 0.1647 70.0804)",
        ],
    },

    // ── Nature ────────────────────────────────────────────────────────────────
    {
        name: "Nature",
        slug: "nature",
        description: "Forest greens with earthy warmth",
        category: "nature",
        hasDark: true,
        swatches: [
            "oklch(0.9711 0.0074 80.7211)",
            "oklch(0.5234 0.1347 144.1672)",
            "oklch(0.8952 0.0504 146.0366)",
        ],
    },
    {
        name: "Northern Lights",
        slug: "northern-lights",
        description: "Aurora-inspired greens and blues",
        category: "nature",
        hasDark: true,
        swatches: [
            "oklch(0.9824 0.0013 286.3757)",
            "oklch(0.6487 0.1538 150.3071)",
            "oklch(0.8269 0.1080 211.9627)",
        ],
    },
    {
        name: "Ocean Breeze",
        slug: "ocean-breeze",
        description: "Coastal greens on clean blue-white",
        category: "nature",
        hasDark: true,
        swatches: [
            "oklch(0.9751 0.0127 244.2507)",
            "oklch(0.7227 0.1920 149.5793)",
            "oklch(0.9505 0.0507 163.0508)",
        ],
    },
    {
        name: "Solar Dusk",
        slug: "solar-dusk",
        description: "Warm sunset amber palette",
        category: "nature",
        hasDark: true,
        swatches: [
            "oklch(0.9885 0.0057 84.5659)",
            "oklch(0.5553 0.1455 48.9975)",
            "oklch(0.9000 0.0500 74.9889)",
        ],
    },
    {
        name: "Midnight Bloom",
        slug: "midnight-bloom",
        description: "Indigo purples with a floral softness",
        category: "nature",
        hasDark: true,
        swatches: [
            "oklch(0.9821 0 0)",
            "oklch(0.5676 0.2021 283.0838)",
            "oklch(0.6475 0.0642 117.4260)",
        ],
    },

    // ── Retro / Stylized ──────────────────────────────────────────────────────
    {
        name: "Catppuccin",
        slug: "catppuccin",
        description: "The beloved pastel dev theme",
        category: "retro",
        hasDark: true,
        swatches: [
            "oklch(0.9578 0.0058 264.5321)",
            "oklch(0.5547 0.2503 297.0156)",
            "oklch(0.6820 0.1448 235.3822)",
        ],
    },
    {
        name: "Claymorphism",
        slug: "claymorphism",
        description: "Puffy clay-look cards with large radius",
        category: "retro",
        hasDark: true,
        swatches: [
            "oklch(0.9232 0.0026 48.7171)",
            "oklch(0.5854 0.2041 277.1173)",
            "oklch(0.9376 0.0260 321.9388)",
        ],
    },
    {
        name: "Cosmic Night",
        slug: "cosmic-night",
        description: "Deep space indigo with violet glow",
        category: "retro",
        hasDark: true,
        swatches: [
            "oklch(0.9730 0.0133 286.1503)",
            "oklch(0.5417 0.1790 288.0332)",
            "oklch(0.9221 0.0373 262.1410)",
        ],
    },
    {
        name: "Cyberpunk",
        slug: "cyberpunk",
        description: "Neon pink and cyber-green on dark navy",
        category: "retro",
        hasDark: true,
        swatches: [
            "oklch(0.9816 0.0017 247.8390)",
            "oklch(0.6726 0.2904 341.4084)",
            "oklch(0.8903 0.1739 171.2690)",
        ],
    },
    {
        name: "Darkmatter",
        slug: "darkmatter",
        description: "Near-black with amber terminal accents",
        category: "retro",
        hasDark: true,
        swatches: [
            "oklch(1 0 0)",
            "oklch(0.6716 0.1368 48.5130)",
            "oklch(0.9491 0 0)",
        ],
    },
    {
        name: "Doom 64",
        slug: "doom-64",
        description: "Grey pixel palette with blood-orange",
        category: "retro",
        hasDark: true,
        swatches: [
            "oklch(0.8452 0 0)",
            "oklch(0.5016 0.1887 27.4816)",
            "oklch(0.5880 0.0993 245.7394)",
        ],
    },
    {
        name: "Starry Night",
        slug: "starry-night",
        description: "Van Gogh midnight blue with golden accents",
        category: "retro",
        hasDark: true,
        swatches: [
            "oklch(0.9755 0.0045 258.3245)",
            "oklch(0.4815 0.1178 263.3758)",
            "oklch(0.6896 0.0714 234.0387)",
        ],
    },
    {
        name: "Vintage Paper",
        slug: "vintage-paper",
        description: "Aged parchment with ink-brown text",
        category: "retro",
        hasDark: true,
        swatches: [
            "oklch(0.9582 0.0152 90.2357)",
            "oklch(0.6180 0.0778 65.5444)",
            "oklch(0.8348 0.0426 88.8064)",
        ],
    },
    {
        name: "Violet Bloom",
        slug: "violet-bloom",
        description: "Vibrant violet with bloom gradients",
        category: "retro",
        hasDark: true,
        swatches: [
            "oklch(0.9940 0 0)",
            "oklch(0.5393 0.2713 286.7462)",
            "oklch(0.9393 0.0288 266.3680)",
        ],
    },

    // ── Brand-inspired ────────────────────────────────────────────────────────
    {
        name: "Bold Tech",
        slug: "bold-tech",
        description: "Electric violet inspired by dev tools",
        category: "brand",
        hasDark: true,
        swatches: [
            "oklch(1 0 0)",
            "oklch(0.6056 0.2189 292.7172)",
            "oklch(0.9319 0.0316 255.5855)",
        ],
    },
    {
        name: "Claude",
        slug: "claude",
        description: "Warm sand tones inspired by the Claude AI",
        category: "brand",
        hasDark: true,
        swatches: [
            "oklch(0.9818 0.0054 95.0986)",
            "oklch(0.6171 0.1375 39.0427)",
            "oklch(0.9245 0.0138 92.9892)",
        ],
    },
    {
        name: "Elegant Luxury",
        slug: "elegant-luxury",
        description: "Deep crimson and gold luxury palette",
        category: "brand",
        hasDark: true,
        swatches: [
            "oklch(0.9779 0.0042 56.3756)",
            "oklch(0.4650 0.1470 24.9381)",
            "oklch(0.9619 0.0580 95.6174)",
        ],
    },
    {
        name: "Twitter",
        slug: "twitter",
        description: "Clean X / Twitter blue with pill radius",
        category: "brand",
        hasDark: true,
        swatches: [
            "oklch(1 0 0)",
            "oklch(0.6723 0.1606 244.9955)",
            "oklch(0.9392 0.0166 250.8453)",
        ],
    },
    {
        name: "Vercel",
        slug: "vercel",
        description: "Vercel's high-contrast black/white brand",
        category: "brand",
        hasDark: true,
        swatches: ["oklch(0.99 0 0)", "oklch(0 0 0)", "oklch(0.94 0 0)"],
    },
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
    // ── Sans ──────────────────────────────────────────────────────────────────
    {
        name: "Inter",
        slug: "inter",
        category: "sans",
        previewStack: "'Inter', sans-serif",
    },
    {
        name: "Figtree",
        slug: "figtree",
        category: "sans",
        previewStack: "'Figtree', sans-serif",
    },
    {
        name: "Outfit",
        slug: "outfit",
        category: "sans",
        previewStack: "'Outfit', sans-serif",
    },
    {
        name: "Plus Jakarta Sans",
        slug: "plus-jakarta-sans",
        category: "sans",
        previewStack: "'Plus Jakarta Sans', sans-serif",
    },
    {
        name: "DM Sans",
        slug: "dm-sans",
        category: "sans",
        previewStack: "'DM Sans', sans-serif",
    },
    {
        name: "Nunito",
        slug: "nunito",
        category: "sans",
        previewStack: "'Nunito', sans-serif",
    },
    {
        name: "Raleway",
        slug: "raleway",
        category: "sans",
        previewStack: "'Raleway', sans-serif",
    },
    {
        name: "Lato",
        slug: "lato",
        category: "sans",
        previewStack: "'Lato', sans-serif",
    },
    {
        name: "Poppins",
        slug: "poppins",
        category: "sans",
        previewStack: "'Poppins', sans-serif",
    },
    {
        name: "Space Grotesk",
        slug: "space-grotesk",
        category: "sans",
        previewStack: "'Space Grotesk', sans-serif",
    },
    {
        name: "Sora",
        slug: "sora",
        category: "sans",
        previewStack: "'Sora', sans-serif",
    },
    {
        name: "Manrope",
        slug: "manrope",
        category: "sans",
        previewStack: "'Manrope', sans-serif",
    },
    {
        name: "Geist Sans",
        slug: "geist-sans",
        category: "sans",
        previewStack: "'Geist', 'GeistSans', sans-serif",
    },

    // ── Display ───────────────────────────────────────────────────────────────
    {
        name: "Bricolage Grotesque",
        slug: "bricolage-grotesque",
        category: "display",
        previewStack: "'Bricolage Grotesque', sans-serif",
    },
    {
        name: "Playfair Display",
        slug: "playfair-display",
        category: "display",
        previewStack: "'Playfair Display', Georgia, serif",
    },
    {
        name: "DM Serif Display",
        slug: "dm-serif-display",
        category: "display",
        previewStack: "'DM Serif Display', Georgia, serif",
    },

    // ── Serif ─────────────────────────────────────────────────────────────────
    {
        name: "Lora",
        slug: "lora",
        category: "serif",
        previewStack: "'Lora', Georgia, serif",
    },
    {
        name: "Cormorant Garamond",
        slug: "cormorant-garamond",
        category: "serif",
        previewStack: "'Cormorant Garamond', Georgia, serif",
    },

    // ── Mono ──────────────────────────────────────────────────────────────────
    {
        name: "Geist Mono",
        slug: "geist-mono",
        category: "mono",
        previewStack: "'Geist Mono', 'GeistMono', monospace",
    },
    {
        name: "JetBrains Mono",
        slug: "jetbrains-mono",
        category: "mono",
        previewStack: "'JetBrains Mono', monospace",
    },
    {
        name: "Fira Code",
        slug: "fira-code",
        category: "mono",
        previewStack: "'Fira Code', monospace",
    },
    {
        name: "Source Code Pro",
        slug: "source-code-pro",
        category: "mono",
        previewStack: "'Source Code Pro', monospace",
    },
];
