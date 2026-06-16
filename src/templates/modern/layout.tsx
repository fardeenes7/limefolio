import { LayoutProps } from "@/lib/template-types";
import Link from "next/link";

/**
 * Modern Template — Layout
 *
 * Floating pill navbar with backdrop-blur and a primary glow shadow.
 * "Projects" links to the /projects listing; section anchors use /#hash
 * so they work from any page (e.g. the single-project page).
 */

function Navbar({ title }: { title: string }) {
    return (
        <div className="px-4 pt-4">
            <nav className="sticky top-4 z-50 mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-primary/20 bg-background/70 px-6 py-3 shadow-xl shadow-primary/10 backdrop-blur-xl">
                <Link
                    href="/"
                    className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
                >
                    {title || "Portfolio"}
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
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
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-primary-foreground transition-all hover:bg-primary/90"
                    >
                        Contact
                    </a>
                </div>

                {/* Mobile nav */}
                <div className="flex items-center gap-3 sm:hidden">
                    <Link
                        href="/projects"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Projects
                    </Link>
                    <a
                        href="/#contact"
                        className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                    >
                        Contact
                    </a>
                </div>
            </nav>
        </div>
    );
}

function Footer({ title }: { title: string }) {
    return (
        <footer className="border-t border-border bg-muted/20 py-8">
            <div className="container mx-auto px-6">
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {title || "Portfolio"}. All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default function ModernLayout({ children, data }: LayoutProps) {
    const title = data?.title || "Portfolio";
    return (
        <>
            <Navbar title={title} />
            {children}
            <Footer title={title} />
        </>
    );
}
