import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth(async function middleware(req) {
    const session = req.auth;
    const { pathname } = req.nextUrl;
    const host = req.headers.get("host") ?? "";
    console.log("");
    console.log("HOST::", host);
    console.log("PATHNAME::", pathname);

    // ── Auth guards ──────────────────────────────────────────────
    if (!session && pathname.startsWith("/app")) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (session && pathname === "/login") {
        return NextResponse.redirect(new URL("/app", req.url));
    }

    // ── Host-based routing ───────────────────────────────────────
    const isMainDomain =
        host === "limefolio.com" ||
        host === "www.limefolio.com" ||
        host === "localhost:3000";

    console.log("isMainDomain::", isMainDomain);

    if (isMainDomain) {
        return NextResponse.next();
    }

    if (host.startsWith("fardeenes7")) {
        const rewritePath = pathname === "/" ? "" : pathname;
        return NextResponse.rewrite(
            new URL(`/sites/fardeenes7${rewritePath}${req.nextUrl.search}`, req.url)
        );
    }

    // Strip .localhost:3000 for local development subdomains
    let domain = host;
    if (domain.endsWith(".localhost:3000")) {
        domain = domain.replace(".localhost:3000", "");
    }

    console.log("DETECTED SUB/CUSTOM DOMAIN:", domain);
    
    // Custom domain or subdomain — rewrite to /sites/[domain]/...
    const rewritePath = pathname === "/" ? "" : pathname;
    return NextResponse.rewrite(new URL(`/sites/${domain}${rewritePath}${req.nextUrl.search}`, req.url));
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
