"use client";

import { LayoutProps } from "@/lib/template-types";
import Link from "next/link";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";

/**
 * Prism Template — Layout
 *
 * Design language:
 *  • Deep slate navbar with frosted glass and a subtle rainbow shimmer border
 *  • Animated gradient underline on active links
 *  • CTA button with the signature Prism gradient
 *  • Rich footer with gradient text logo and social grid
 */

function Navbar({ title }: { title: string }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            {/* Frosted glass bar */}
            <div className="border-b border-border/40 bg-background/80 backdrop-blur-2xl">
                <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-extrabold tracking-tight"
                        style={{
                            background:
                                "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {title || "Portfolio"}
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground sm:flex">
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
                            className="relative inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                            style={{
                                background:
                                    "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                                boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                            }}
                        >
                            Hire Me
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="flex items-center justify-center sm:hidden text-muted-foreground hover:text-foreground"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {open ? <IconX size={22} /> : <IconMenu2 size={22} />}
                    </button>
                </nav>

                {/* Mobile drawer */}
                {open && (
                    <div className="border-t border-border/40 px-6 pb-6 pt-4 sm:hidden">
                        <div className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
                            <Link
                                href="/projects"
                                onClick={() => setOpen(false)}
                                className="hover:text-foreground"
                            >
                                Projects
                            </Link>
                            <a
                                href="/#experience"
                                onClick={() => setOpen(false)}
                                className="hover:text-foreground"
                            >
                                Experience
                            </a>
                            <a
                                href="/#skills"
                                onClick={() => setOpen(false)}
                                className="hover:text-foreground"
                            >
                                Skills
                            </a>
                            <a
                                href="/#contact"
                                onClick={() => setOpen(false)}
                                className="inline-flex w-fit items-center rounded-full px-5 py-2 font-semibold text-primary-foreground"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                                }}
                            >
                                Hire Me
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

function Footer({ title }: { title: string }) {
    return (
        <footer className="border-t border-border/40 bg-background py-12">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <span
                        className="text-2xl font-extrabold tracking-tight"
                        style={{
                            background:
                                "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {title || "Portfolio"}
                    </span>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {title || "Portfolio"}.
                        Crafted with care.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default function PrismLayout({ children, data }: LayoutProps) {
    const title = data?.title || "Portfolio";
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar title={title} />
            <div className="pt-16">{children}</div>
            <Footer title={title} />
        </div>
    );
}
