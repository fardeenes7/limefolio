import Link from "next/link";
import { LimefolioLIcon } from "@/lib/icons";

export function HomeHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <LimefolioLIcon className="size-6 transition-transform group-hover:rotate-12 duration-500" />
                    <span className="font-semibold text-sm tracking-tight">Limefolio</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-medium tracking-tight">
                    <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
                    <Link href="/templates" className="hover:text-foreground transition-colors">Templates</Link>
                    <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                </nav>

                <div className="flex items-center gap-4 text-sm font-medium tracking-tight">
                    <Link href="/login" className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
                        Log in
                    </Link>
                    <Link href="/login" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:scale-105 transition-transform active:scale-95 flex items-center gap-2 shadow-lg shadow-primary/20">
                        Get started
                    </Link>
                </div>
            </div>
        </header>
    );
}
