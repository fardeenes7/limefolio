import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(async function middleware(req) {
    const session = req.auth;
    const { pathname } = req.nextUrl;
    const host = req.headers.get("host") ?? "";

    console.log("\nHOST::", host, "\nPATHNAME::", pathname);

    // ── 1. API domain — hard passthrough, touch nothing ──────────
    if (host === "api.limefolio.com") {
        return NextResponse.next();
    }

    // ── 2. Main domain passthrough (must be first) ───────────────
    const isMainDomain = [
        "limefolio.com",
        "www.limefolio.com",
        "localhost:3000"
    ].includes(host);

    if (isMainDomain) {
        // Auth guards only apply on the main domain
        if (!session && pathname.startsWith("/app")) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("next", pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (session && pathname === "/login") {
            return NextResponse.redirect(new URL("/app", req.url));
        }

        return NextResponse.next();
    }

    // ── 3. Subdomain / custom domain rewrite ─────────────────────
    let domain = host
        .replace(/\.localhost(:\d+)?$/, "") // strip .localhost:3000 or .localhost
        .replace(/\.limefolio\.com$/, ""); // strip .limefolio.com for subdomains

    // For custom domains, keep the full host as the domain key
    // e.g. www.alviclicks.com stays as-is
    if (host.includes(".limefolio.com")) {
        domain = host.replace(/\.limefolio\.com$/, ""); // just the subdomain slug
    } else if (!host.includes("localhost")) {
        domain = host; // custom domain — use full host
    }

    console.log("DETECTED DOMAIN:", domain);

    const rewritePath = pathname === "/" ? "" : pathname;
    return NextResponse.rewrite(
        new URL(`/sites/${domain}${rewritePath}${req.nextUrl.search}`, req.url)
    );
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
