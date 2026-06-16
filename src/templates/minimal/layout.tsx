import { LayoutProps } from "@/lib/template-types";
import Link from "next/link";

/**
 * Minimal Template — Layout
 *
 * A slim, border-bottom navbar constrained to the same max-w-3xl column
 * as the page content — nothing chrome-heavy.
 */

function Navbar({ title }: { title: string }) {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
            <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 sm:px-8">
                <Link
                    href="/"
                    className="text-base font-semibold text-foreground transition-colors hover:text-muted-foreground"
                >
                    {title || "Portfolio"}
                </Link>

                {/* Desktop */}
                <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
                    <Link
                        href="/projects"
                        className="transition-colors hover:text-foreground"
                    >
                        Projects
                    </Link>
                    <a
                        href="/#experience"
                        className="transition-colors hover:text-foreground"
                    >
                        Experience
                    </a>
                    <a
                        href="/#skills"
                        className="transition-colors hover:text-foreground"
                    >
                        Skills
                    </a>
                    <a
                        href="/#contact"
                        className="font-medium text-foreground transition-colors hover:text-muted-foreground"
                    >
                        Contact →
                    </a>
                </nav>

                {/* Mobile */}
                <div className="flex items-center gap-4 text-sm sm:hidden">
                    <Link
                        href="/projects"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Projects
                    </Link>
                    <a href="/#contact" className="font-medium text-foreground">
                        Contact
                    </a>
                </div>
            </div>
        </header>
    );
}

function Footer({ title }: { title: string }) {
    return (
        <footer className="border-t border-border py-8">
            <div className="mx-auto max-w-3xl px-6 sm:px-8">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {title || "Portfolio"}. All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default function MinimalLayout({ children, data }: LayoutProps) {
    const title = data?.title || "Portfolio";
    return (
        <>
            <Navbar title={title} />
            {children}
            <Footer title={title} />
        </>
    );
}
