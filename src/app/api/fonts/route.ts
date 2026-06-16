import { NextResponse } from "next/server";
import { getFontMetadata } from "@/lib/fonts";

/**
 * GET /api/fonts
 * Returns list of all available fonts with their metadata
 * This automatically reads from the Fonts registry
 */
export async function GET() {
    try {
        const fonts = getFontMetadata();

        return NextResponse.json(fonts, {
            status: 200,
            headers: {
                "Cache-Control":
                    "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Error fetching fonts:", error);
        return NextResponse.json(
            { error: "Failed to fetch fonts" },
            { status: 500 },
        );
    }
}
