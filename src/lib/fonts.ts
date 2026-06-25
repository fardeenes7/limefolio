import {
    Figtree,
    Geist,
    Geist_Mono,
    Inter,
    JetBrains_Mono,
    Outfit,
    Plus_Jakarta_Sans,
    DM_Sans,
    Nunito,
    Raleway,
    Lato,
    Poppins,
    Space_Grotesk,
    Sora,
    Playfair_Display,
    Lora,
    DM_Serif_Display,
    Cormorant_Garamond,
    Fira_Code,
    Source_Code_Pro,
    Manrope,
    Bricolage_Grotesque,
    Silkscreen,
    Share_Tech_Mono,
    Syne,
    Cinzel,
    Libre_Baskerville,
    Fraunces,
    Fredoka,
    Lexend,
    Righteous,
    Schibsted_Grotesk,
    Onest,
    Work_Sans,
    Gabriela,
    Delius_Swash_Caps,
    Mali,
    Bebas_Neue,
    Comfortaa,
} from "next/font/google";

/**
 * Font configuration interface
 */
export interface FontConfig {
    name: string;
    slug: string;
    variable: string;
    font: any; // Next.js font object
    category: "sans" | "serif" | "mono" | "display";
}

// ── Sans-serif ────────────────────────────────────────────────────────────────

const gabriela = Gabriela({ subsets: ["latin"], weight: ["400"], variable: "--font-gabriela" });

const deliusSwashCaps = Delius_Swash_Caps({ subsets: ["latin"], weight: ["400"], variable: "--font-delius-swash-caps" });

const mali = Mali({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mali" });

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ["400"], variable: "--font-bebas-neue" });

const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-comfortaa" });

const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400"], variable: "--font-silkscreen" });

const shareTechMono = Share_Tech_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-share-tech-mono" });

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-libre-baskerville" });

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["SOFT", "WONK", "opsz"] });

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

const righteous = Righteous({ subsets: ["latin"], weight: ["400"], variable: "--font-righteous" });

const schibstedGrotesk = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted-grotesk" });

const onest = Onest({ subsets: ["latin"], variable: "--font-onest" });

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const figtree = Figtree({
    subsets: ["latin"],
    variable: "--font-figtree",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
});

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-nunito",
});

const raleway = Raleway({
    subsets: ["latin"],
    variable: "--font-raleway",
});

const lato = Lato({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
    variable: "--font-lato",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const bricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-bricolage-grotesque",
});

// ── Serif ─────────────────────────────────────────────────────────────────────

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair-display",
});

const lora = Lora({
    subsets: ["latin"],
    variable: "--font-lora",
});

const dmSerifDisplay = DM_Serif_Display({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-dm-serif-display",
});

const cormorantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant-garamond",
});

// ── Mono ──────────────────────────────────────────────────────────────────────

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

const firaCode = Fira_Code({
    subsets: ["latin"],
    variable: "--font-fira-code",
});

const sourceCodePro = Source_Code_Pro({
    subsets: ["latin"],
    variable: "--font-source-code-pro",
});

/**
 * Fonts Registry
 * Maps font slugs to their configurations
 */
export const Fonts: Record<string, FontConfig> = {
    "gabriela": {
        name: "Gabriela",
        slug: "gabriela",
        variable: "--font-gabriela",
        font: gabriela,
        category: "serif",
    },
    "delius-swash-caps": {
        name: "Delius Swash Caps",
        slug: "delius-swash-caps",
        variable: "--font-delius-swash-caps",
        font: deliusSwashCaps,
        category: "display",
    },
    "mali": {
        name: "Mali",
        slug: "mali",
        variable: "--font-mali",
        font: mali,
        category: "sans",
    },
    "bebas-neue": {
        name: "Bebas Neue",
        slug: "bebas-neue",
        variable: "--font-bebas-neue",
        font: bebasNeue,
        category: "display",
    },
    "comfortaa": {
        name: "Comfortaa",
        slug: "comfortaa",
        variable: "--font-comfortaa",
        font: comfortaa,
        category: "sans",
    },
    "silkscreen": {
        name: "Silkscreen",
        slug: "silkscreen",
        variable: "--font-silkscreen",
        font: silkscreen,
        category: "mono",
    },
    "share-tech-mono": {
        name: "Share Tech Mono",
        slug: "share-tech-mono",
        variable: "--font-share-tech-mono",
        font: shareTechMono,
        category: "mono",
    },
    "syne": {
        name: "Syne",
        slug: "syne",
        variable: "--font-syne",
        font: syne,
        category: "sans",
    },
    "cinzel": {
        name: "Cinzel",
        slug: "cinzel",
        variable: "--font-cinzel",
        font: cinzel,
        category: "serif",
    },
    "libre-baskerville": {
        name: "Libre Baskerville",
        slug: "libre-baskerville",
        variable: "--font-libre-baskerville",
        font: libreBaskerville,
        category: "serif",
    },
    "fraunces": {
        name: "Fraunces",
        slug: "fraunces",
        variable: "--font-fraunces",
        font: fraunces,
        category: "serif",
    },
    "fredoka": {
        name: "Fredoka",
        slug: "fredoka",
        variable: "--font-fredoka",
        font: fredoka,
        category: "sans",
    },
    "lexend": {
        name: "Lexend",
        slug: "lexend",
        variable: "--font-lexend",
        font: lexend,
        category: "sans",
    },
    "righteous": {
        name: "Righteous",
        slug: "righteous",
        variable: "--font-righteous",
        font: righteous,
        category: "display",
    },
    "schibsted-grotesk": {
        name: "Schibsted Grotesk",
        slug: "schibsted-grotesk",
        variable: "--font-schibsted-grotesk",
        font: schibstedGrotesk,
        category: "sans",
    },
    "onest": {
        name: "Onest",
        slug: "onest",
        variable: "--font-onest",
        font: onest,
        category: "sans",
    },
    "work-sans": {
        name: "Work Sans",
        slug: "work-sans",
        variable: "--font-work-sans",
        font: workSans,
        category: "sans",
    },
    // ── Sans ──────────────────────────────────────────────────────────────────
    inter: {
        name: "Inter",
        slug: "inter",
        variable: "--font-inter",
        font: inter,
        category: "sans",
    },
    figtree: {
        name: "Figtree",
        slug: "figtree",
        variable: "--font-figtree",
        font: figtree,
        category: "sans",
    },
    outfit: {
        name: "Outfit",
        slug: "outfit",
        variable: "--font-outfit",
        font: outfit,
        category: "sans",
    },
    "plus-jakarta-sans": {
        name: "Plus Jakarta Sans",
        slug: "plus-jakarta-sans",
        variable: "--font-plus-jakarta-sans",
        font: plusJakartaSans,
        category: "sans",
    },
    "dm-sans": {
        name: "DM Sans",
        slug: "dm-sans",
        variable: "--font-dm-sans",
        font: dmSans,
        category: "sans",
    },
    nunito: {
        name: "Nunito",
        slug: "nunito",
        variable: "--font-nunito",
        font: nunito,
        category: "sans",
    },
    raleway: {
        name: "Raleway",
        slug: "raleway",
        variable: "--font-raleway",
        font: raleway,
        category: "sans",
    },
    lato: {
        name: "Lato",
        slug: "lato",
        variable: "--font-lato",
        font: lato,
        category: "sans",
    },
    poppins: {
        name: "Poppins",
        slug: "poppins",
        variable: "--font-poppins",
        font: poppins,
        category: "sans",
    },
    "space-grotesk": {
        name: "Space Grotesk",
        slug: "space-grotesk",
        variable: "--font-space-grotesk",
        font: spaceGrotesk,
        category: "sans",
    },
    sora: {
        name: "Sora",
        slug: "sora",
        variable: "--font-sora",
        font: sora,
        category: "sans",
    },
    manrope: {
        name: "Manrope",
        slug: "manrope",
        variable: "--font-manrope",
        font: manrope,
        category: "sans",
    },
    "bricolage-grotesque": {
        name: "Bricolage Grotesque",
        slug: "bricolage-grotesque",
        variable: "--font-bricolage-grotesque",
        font: bricolageGrotesque,
        category: "display",
    },
    "geist-sans": {
        name: "Geist Sans",
        slug: "geist-sans",
        variable: "--font-geist-sans",
        font: geistSans,
        category: "sans",
    },

    // ── Serif ─────────────────────────────────────────────────────────────────
    "playfair-display": {
        name: "Playfair Display",
        slug: "playfair-display",
        variable: "--font-playfair-display",
        font: playfairDisplay,
        category: "display",
    },
    lora: {
        name: "Lora",
        slug: "lora",
        variable: "--font-lora",
        font: lora,
        category: "serif",
    },
    "dm-serif-display": {
        name: "DM Serif Display",
        slug: "dm-serif-display",
        variable: "--font-dm-serif-display",
        font: dmSerifDisplay,
        category: "display",
    },
    "cormorant-garamond": {
        name: "Cormorant Garamond",
        slug: "cormorant-garamond",
        variable: "--font-cormorant-garamond",
        font: cormorantGaramond,
        category: "serif",
    },

    // ── Mono ──────────────────────────────────────────────────────────────────
    "geist-mono": {
        name: "Geist Mono",
        slug: "geist-mono",
        variable: "--font-geist-mono",
        font: geistMono,
        category: "mono",
    },
    "jetbrains-mono": {
        name: "JetBrains Mono",
        slug: "jetbrains-mono",
        variable: "--font-jetbrains-mono",
        font: jetbrainsMono,
        category: "mono",
    },
    "fira-code": {
        name: "Fira Code",
        slug: "fira-code",
        variable: "--font-fira-code",
        font: firaCode,
        category: "mono",
    },
    "source-code-pro": {
        name: "Source Code Pro",
        slug: "source-code-pro",
        variable: "--font-source-code-pro",
        font: sourceCodePro,
        category: "mono",
    },
};

/**
 * Get font configuration by slug
 * Falls back to inter if font not found
 */
export function getFont(fontSlug: string | undefined | null): FontConfig {
    if (!fontSlug || !Fonts[fontSlug]) {
        if (fontSlug && !Fonts[fontSlug]) {
            console.warn(
                `Font "${fontSlug}" not found. Falling back to inter.`,
            );
        }
        return Fonts.inter;
    }
    return Fonts[fontSlug];
}

/**
 * Get all available font slugs
 */
export function getAvailableFonts(): string[] {
    return Object.keys(Fonts);
}

/**
 * Get metadata for all available fonts
 */
export function getFontMetadata() {
    return Object.entries(Fonts).map(([slug, config]) => ({
        name: config.name,
        slug: config.slug,
        variable: config.variable,
        category: config.category,
    }));
}

/**
 * Get all font variables as a string for className
 */
export function getAllFontVariables(): string {
    return Object.values(Fonts)
        .map((config) => config.font.variable)
        .join(" ");
}

/**
 * Get font className for a specific font
 */
export function getFontClassName(fontSlug: string | undefined | null): string {
    const font = getFont(fontSlug);
    return font.font.variable;
}
