import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;
    const baseSlug = slug.endsWith("-dark") ? slug.slice(0, -5) : slug;
    const cssPath = path.join(process.cwd(), "src", "themes", `${baseSlug}.css`);

    try {
        const css = await readFile(cssPath, "utf-8");
        return new NextResponse(css, {
            headers: {
                "Content-Type": "text/css",
            },
        });
    } catch {
        // Fallback to default
        const defaultPath = path.join(process.cwd(), "src", "themes", "default.css");
        try {
            const css = await readFile(defaultPath, "utf-8");
            return new NextResponse(css, {
                headers: {
                    "Content-Type": "text/css",
                },
            });
        } catch {
            return new NextResponse("", { status: 404 });
        }
    }
}
