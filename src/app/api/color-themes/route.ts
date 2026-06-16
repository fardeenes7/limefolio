import { NextResponse } from "next/server";
import { getColorThemeMetadata } from "@/themes/index";

/**
 * GET /api/color-themes
 * Returns list of all available color themes with their metadata
 * This automatically reads from the ColorThemes registry
 */
export async function GET() {
    try {
        const themes = getColorThemeMetadata();

        return NextResponse.json(themes, {
            status: 200,
            headers: {
                "Cache-Control":
                    "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Error fetching color themes:", error);
        return NextResponse.json(
            { error: "Failed to fetch color themes" },
            { status: 500 },
        );
    }
}
