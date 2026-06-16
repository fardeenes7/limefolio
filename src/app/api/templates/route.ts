import { NextResponse } from "next/server";
import { getTemplateMetadata } from "@/templates";

/**
 * GET /api/templates
 * Returns list of all available templates with their metadata
 * This automatically reads from the Templates registry
 */
export async function GET() {
    try {
        const templates = getTemplateMetadata();

        return NextResponse.json(templates, {
            status: 200,
            headers: {
                "Cache-Control":
                    "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Error fetching templates:", error);
        return NextResponse.json(
            { error: "Failed to fetch templates" },
            { status: 500 },
        );
    }
}
