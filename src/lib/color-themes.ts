/**
 * Color Theme Definitions
 *
 * Each theme is defined as a JSON object with CSS variable values.
 * These are applied dynamically via inline styles in the layout.
 */

export interface ColorThemeVariables {
    // Base colors
    background: string;
    foreground: string;

    // Card
    card: string;
    cardForeground: string;

    // Popover
    popover: string;
    popoverForeground: string;

    // Primary
    primary: string;
    primaryForeground: string;

    // Secondary
    secondary: string;
    secondaryForeground: string;

    // Muted
    muted: string;
    mutedForeground: string;

    // Accent
    accent: string;
    accentForeground: string;

    // Destructive
    destructive: string;
    destructiveForeground?: string;

    // Border & Input
    border: string;
    input: string;
    ring: string;

    // Charts
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;

    // Sidebar
    sidebar: string;
    sidebarForeground: string;
    sidebarPrimary: string;
    sidebarPrimaryForeground: string;
    sidebarAccent: string;
    sidebarAccentForeground: string;
    sidebarBorder: string;
    sidebarRing: string;

    // Optional: Custom properties
    radius?: string;
    shadowX?: string;
    shadowY?: string;
    shadowBlur?: string;
    shadowSpread?: string;
    shadowOpacity?: string;
    shadowColor?: string;
}

export interface ColorThemeConfig {
    name: string;
    slug: string;
    description?: string;
    variables: ColorThemeVariables;
}

/**
 * Color Themes Registry
 */
export const ColorThemes: Record<string, ColorThemeConfig> = {
    default: {
        name: "Default",
        slug: "default",
        description: "Clean and minimal light theme",
        variables: {
            background: "oklch(1 0 0)",
            foreground: "oklch(0.145 0 0)",
            card: "oklch(1 0 0)",
            cardForeground: "oklch(0.145 0 0)",
            popover: "oklch(1 0 0)",
            popoverForeground: "oklch(0.145 0 0)",
            primary: "oklch(0.205 0 0)",
            primaryForeground: "oklch(0.985 0 0)",
            secondary: "oklch(0.97 0 0)",
            secondaryForeground: "oklch(0.205 0 0)",
            muted: "oklch(0.97 0 0)",
            mutedForeground: "oklch(0.556 0 0)",
            accent: "oklch(0.97 0 0)",
            accentForeground: "oklch(0.205 0 0)",
            destructive: "oklch(0.58 0.22 27)",
            border: "oklch(0.922 0 0)",
            input: "oklch(0.922 0 0)",
            ring: "oklch(0.708 0 0)",
            chart1: "oklch(0.809 0.105 251.813)",
            chart2: "oklch(0.623 0.214 259.815)",
            chart3: "oklch(0.546 0.245 262.881)",
            chart4: "oklch(0.488 0.243 264.376)",
            chart5: "oklch(0.424 0.199 265.638)",
            sidebar: "oklch(0.985 0 0)",
            sidebarForeground: "oklch(0.145 0 0)",
            sidebarPrimary: "oklch(0.205 0 0)",
            sidebarPrimaryForeground: "oklch(0.985 0 0)",
            sidebarAccent: "oklch(0.97 0 0)",
            sidebarAccentForeground: "oklch(0.205 0 0)",
            sidebarBorder: "oklch(0.922 0 0)",
            sidebarRing: "oklch(0.708 0 0)",
            radius: "0.625rem",
        },
    },
    dark: {
        name: "Dark",
        slug: "dark",
        description: "Dark theme with high contrast",
        variables: {
            background: "oklch(0.145 0 0)",
            foreground: "oklch(0.985 0 0)",
            card: "oklch(0.205 0 0)",
            cardForeground: "oklch(0.985 0 0)",
            popover: "oklch(0.205 0 0)",
            popoverForeground: "oklch(0.985 0 0)",
            primary: "oklch(0.87 0 0)",
            primaryForeground: "oklch(0.205 0 0)",
            secondary: "oklch(0.269 0 0)",
            secondaryForeground: "oklch(0.985 0 0)",
            muted: "oklch(0.269 0 0)",
            mutedForeground: "oklch(0.708 0 0)",
            accent: "oklch(0.371 0 0)",
            accentForeground: "oklch(0.985 0 0)",
            destructive: "oklch(0.704 0.191 22.216)",
            border: "oklch(1 0 0 / 10%)",
            input: "oklch(1 0 0 / 15%)",
            ring: "oklch(0.556 0 0)",
            chart1: "oklch(0.809 0.105 251.813)",
            chart2: "oklch(0.623 0.214 259.815)",
            chart3: "oklch(0.546 0.245 262.881)",
            chart4: "oklch(0.488 0.243 264.376)",
            chart5: "oklch(0.424 0.199 265.638)",
            sidebar: "oklch(0.205 0 0)",
            sidebarForeground: "oklch(0.985 0 0)",
            sidebarPrimary: "oklch(0.488 0.243 264.376)",
            sidebarPrimaryForeground: "oklch(0.985 0 0)",
            sidebarAccent: "oklch(0.269 0 0)",
            sidebarAccentForeground: "oklch(0.985 0 0)",
            sidebarBorder: "oklch(1 0 0 / 10%)",
            sidebarRing: "oklch(0.556 0 0)",
        },
    },
    "amethyst-haze": {
        name: "Amethyst Haze",
        slug: "amethyst-haze",
        description: "Soft purple-tinted theme with elegant shadows",
        variables: {
            background: "oklch(0.9777 0.0041 301.4256)",
            foreground: "oklch(0.3651 0.0325 287.0807)",
            card: "oklch(1 0 0)",
            cardForeground: "oklch(0.3651 0.0325 287.0807)",
            popover: "oklch(1 0 0)",
            popoverForeground: "oklch(0.3651 0.0325 287.0807)",
            primary: "oklch(0.6104 0.0767 299.7335)",
            primaryForeground: "oklch(0.9777 0.0041 301.4256)",
            secondary: "oklch(0.8957 0.0265 300.2416)",
            secondaryForeground: "oklch(0.3651 0.0325 287.0807)",
            muted: "oklch(0.8906 0.0139 299.7754)",
            mutedForeground: "oklch(0.5288 0.0375 290.7895)",
            accent: "oklch(0.7889 0.0802 359.9375)",
            accentForeground: "oklch(0.3394 0.0441 1.7583)",
            destructive: "oklch(0.6332 0.1578 22.6734)",
            destructiveForeground: "oklch(0.9777 0.0041 301.4256)",
            border: "oklch(0.8447 0.0226 300.1421)",
            input: "oklch(0.9329 0.0124 301.2783)",
            ring: "oklch(0.6104 0.0767 299.7335)",
            chart1: "oklch(0.6104 0.0767 299.7335)",
            chart2: "oklch(0.7889 0.0802 359.9375)",
            chart3: "oklch(0.7321 0.0749 169.867)",
            chart4: "oklch(0.854 0.0882 76.8292)",
            chart5: "oklch(0.7857 0.0645 258.0839)",
            sidebar: "oklch(0.9554 0.0082 301.3541)",
            sidebarForeground: "oklch(0.3651 0.0325 287.0807)",
            sidebarPrimary: "oklch(0.6104 0.0767 299.7335)",
            sidebarPrimaryForeground: "oklch(0.9777 0.0041 301.4256)",
            sidebarAccent: "oklch(0.7889 0.0802 359.9375)",
            sidebarAccentForeground: "oklch(0.3394 0.0441 1.7583)",
            sidebarBorder: "oklch(0.8719 0.0198 302.169)",
            sidebarRing: "oklch(0.6104 0.0767 299.7335)",
            radius: "0.5rem",
        },
    },
    bubblegum: {
        name: "Bubblegum",
        slug: "bubblegum",
        description: "Playful pink theme with bold shadows",
        variables: {
            background: "oklch(0.9399 0.0203 345.6985)",
            foreground: "oklch(0.4712 0 0)",
            card: "oklch(0.9498 0.05 86.8891)",
            cardForeground: "oklch(0.4712 0 0)",
            popover: "oklch(1 0 0)",
            popoverForeground: "oklch(0.4712 0 0)",
            primary: "oklch(0.6209 0.1801 348.1385)",
            primaryForeground: "oklch(1 0 0)",
            secondary: "oklch(0.8095 0.0694 198.1863)",
            secondaryForeground: "oklch(0.3211 0 0)",
            muted: "oklch(0.88 0.0504 212.0952)",
            mutedForeground: "oklch(0.5795 0 0)",
            accent: "oklch(0.9195 0.0801 87.667)",
            accentForeground: "oklch(0.3211 0 0)",
            destructive: "oklch(0.7091 0.1697 21.9551)",
            destructiveForeground: "oklch(1 0 0)",
            border: "oklch(0.6209 0.1801 348.1385)",
            input: "oklch(0.9189 0 0)",
            ring: "oklch(0.7002 0.1597 350.7532)",
            chart1: "oklch(0.7002 0.1597 350.7532)",
            chart2: "oklch(0.8189 0.0799 212.0892)",
            chart3: "oklch(0.9195 0.0801 87.667)",
            chart4: "oklch(0.7998 0.111 348.1791)",
            chart5: "oklch(0.6197 0.1899 353.9091)",
            sidebar: "oklch(0.914 0.0424 343.0913)",
            sidebarForeground: "oklch(0.3211 0 0)",
            sidebarPrimary: "oklch(0.6559 0.2118 354.3084)",
            sidebarPrimaryForeground: "oklch(1 0 0)",
            sidebarAccent: "oklch(0.8228 0.1095 346.0184)",
            sidebarAccentForeground: "oklch(0.3211 0 0)",
            sidebarBorder: "oklch(0.9464 0.0327 307.1745)",
            sidebarRing: "oklch(0.6559 0.2118 354.3084)",
            radius: "0.4rem",
        },
    },
};

/**
 * Get theme configuration by slug
 */
export function getColorTheme(
    themeSlug: string | undefined | null,
): ColorThemeConfig {
    if (!themeSlug || !ColorThemes[themeSlug]) {
        if (themeSlug && !ColorThemes[themeSlug]) {
            console.warn(
                `Color theme "${themeSlug}" not found. Falling back to default.`,
            );
        }
        return ColorThemes.default;
    }
    return ColorThemes[themeSlug];
}

/**
 * Get metadata for all available themes
 */
export function getColorThemeMetadata() {
    return Object.entries(ColorThemes).map(([slug, config]) => ({
        name: config.name,
        slug: config.slug,
        description: config.description,
    }));
}

/**
 * Convert theme variables to CSS custom properties object
 */
export function themeVariablesToCSSProperties(
    variables: ColorThemeVariables,
): Record<string, string> {
    return {
        "--background": variables.background,
        "--foreground": variables.foreground,
        "--card": variables.card,
        "--card-foreground": variables.cardForeground,
        "--popover": variables.popover,
        "--popover-foreground": variables.popoverForeground,
        "--primary": variables.primary,
        "--primary-foreground": variables.primaryForeground,
        "--secondary": variables.secondary,
        "--secondary-foreground": variables.secondaryForeground,
        "--muted": variables.muted,
        "--muted-foreground": variables.mutedForeground,
        "--accent": variables.accent,
        "--accent-foreground": variables.accentForeground,
        "--destructive": variables.destructive,
        ...(variables.destructiveForeground && {
            "--destructive-foreground": variables.destructiveForeground,
        }),
        "--border": variables.border,
        "--input": variables.input,
        "--ring": variables.ring,
        "--chart-1": variables.chart1,
        "--chart-2": variables.chart2,
        "--chart-3": variables.chart3,
        "--chart-4": variables.chart4,
        "--chart-5": variables.chart5,
        "--sidebar": variables.sidebar,
        "--sidebar-foreground": variables.sidebarForeground,
        "--sidebar-primary": variables.sidebarPrimary,
        "--sidebar-primary-foreground": variables.sidebarPrimaryForeground,
        "--sidebar-accent": variables.sidebarAccent,
        "--sidebar-accent-foreground": variables.sidebarAccentForeground,
        "--sidebar-border": variables.sidebarBorder,
        "--sidebar-ring": variables.sidebarRing,
        ...(variables.radius && { "--radius": variables.radius }),
    } as Record<string, string>;
}
