import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

/**
 * Route handler to revalidate caches in the public application.
 * This can be called from the dashboard or backend when data changes.
 *
 * Usage:
 * /api/revalidate?secret=YOUR_TOKEN&tag=some-tag
 * /api/revalidate?secret=YOUR_TOKEN&path=/some-path
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const tag = searchParams.get("tag");
    const path = searchParams.get("path");

    // Check for secret to prevent unauthorized revalidation
    // Ensure you add REVALIDATION_TOKEN to your .env file
    if (secret !== process.env.REVALIDATION_TOKEN) {
        return NextResponse.json(
            { message: "Invalid secret token" },
            { status: 401 },
        );
    }

    try {
        if (tag) {
            revalidateTag(tag, "max");
            return NextResponse.json({
                revalidated: true,
                now: Date.now(),
                type: "tag",
                target: tag,
            });
        }

        if (path) {
            // By default, revalidatePath revalidates all segments under the path (layout)
            revalidatePath(path, "layout");
            return NextResponse.json({
                revalidated: true,
                now: Date.now(),
                type: "path",
                target: path,
            });
        }

        return NextResponse.json(
            {
                revalidated: false,
                now: Date.now(),
                message: "Missing 'tag' or 'path' parameter",
            },
            { status: 400 },
        );
    } catch (err) {
        return NextResponse.json(
            {
                message: "Error revalidating",
                error: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
        );
    }
}
