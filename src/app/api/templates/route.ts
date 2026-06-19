import { NextResponse } from "next/server";
import { TemplateRegistry } from "@/templates/registry";

/**
 * GET /api/templates
 * Returns list of all available templates with their metadata.
 * Derived from the live TemplateRegistry — any registered template automatically appears.
 */
export async function GET() {
    try {
        const templates = Object.values(TemplateRegistry).map((t) => ({
            key: t.key,
            label: t.label,
            version: t.version,
            defaultTheme: t.defaultTheme,
            defaultFont: t.defaultFont,
        }));

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
