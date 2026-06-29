import Link from "next/link";
import { LimefolioLIcon } from "@/lib/icons";
import { XLogo, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { FooterParallaxWord } from "./landing-interactive";

export function HomeFooter() {
    return (
        <footer className="relative overflow-hidden border-t border-border bg-background pt-40 pb-12">
            <FooterParallaxWord text="Limefolio" />
            
            <div className="container relative z-10 mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-32">
                    <div className="lg:col-span-2 flex flex-col items-start">
                        <Link href="/" className="flex items-center gap-2 mb-8 group">
                            <LimefolioLIcon className="size-8 transition-transform group-hover:rotate-12 duration-500" />
                            <span className="font-semibold text-lg tracking-tight">Limefolio</span>
                        </Link>
                        <p className="text-muted-foreground text-lg max-w-sm leading-relaxed mb-8">
                            The portfolio platform built for creatives who take their work seriously.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-foreground mb-8 tracking-tight uppercase text-xs">Platform</h4>
                        <ul className="space-y-4 text-muted-foreground font-medium text-sm">
                            <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                            <li><Link href="#templates" className="hover:text-foreground transition-colors">Templates</Link></li>
                            <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-8 tracking-tight uppercase text-xs">Connect</h4>
                        <ul className="space-y-4 text-muted-foreground font-medium text-sm">
                            <li><a href="https://x.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors"><XLogo className="size-4" /> Twitter</a></li>
                            <li><a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors"><GithubLogo className="size-4" /> GitHub</a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors"><LinkedinLogo className="size-4" /> LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/40 text-sm text-muted-foreground font-medium">
                    <p>© {new Date().getFullYear()} Limefolio. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
