// export { auth as middleware } from "@/auth";

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
    const session = await auth();
    const { pathname } = req.nextUrl;

    // Protect /app routes
    if (!session && pathname.startsWith("/app")) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("next", pathname);

        return NextResponse.redirect(loginUrl);
    }

    // Redirect to /app if already logged in
    if (session && pathname === "/login") {
        return NextResponse.redirect(new URL("/app", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // "/app/:path*"
        "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    ],
};
