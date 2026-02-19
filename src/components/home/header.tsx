import Link from "next/link";
import { LimefolioLIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconSparkles } from "@tabler/icons-react";

export function HomeHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <LimefolioLIcon className="size-7 transition-transform group-hover:scale-110 duration-300" />
                    <span className="font-semibold text-base tracking-tight text-foreground">
                        Limefolio
                    </span>
                    <Badge
                        variant="secondary"
                        className="hidden sm:inline-flex"
                    >
                        <IconSparkles className="size-3" />
                        Beta
                    </Badge>
                </Link>

                {/* Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                    <Link
                        href="#features"
                        className="hover:text-foreground transition-colors duration-200"
                    >
                        Features
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="hover:text-foreground transition-colors duration-200"
                    >
                        How it works
                    </Link>
                    <Link
                        href="#pricing"
                        className="hover:text-foreground transition-colors duration-200"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/templates"
                        className="hover:text-foreground transition-colors duration-200"
                    >
                        Templates
                    </Link>
                    <Link
                        href="#testimonials"
                        className="hover:text-foreground transition-colors duration-200"
                    >
                        Testimonials
                    </Link>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-2">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm">Get started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
