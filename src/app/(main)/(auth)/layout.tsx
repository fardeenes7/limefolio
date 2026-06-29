import { LimefolioLIcon } from "@/lib/icons";
import Link from "next/link";
import { AuthBackground } from "./auth-background";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-dvh bg-background selection:bg-primary/20">
            {/* Left side - Visual/Editorial */}
            <div className="hidden lg:flex w-1/2 bg-foreground text-background relative flex-col justify-between p-12 overflow-hidden">
                <AuthBackground />
                
                <Link href="/" className="flex items-center gap-3 font-medium z-10 w-fit hover:opacity-80 transition-opacity">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-background text-foreground shadow-lg">
                        <LimefolioLIcon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl tracking-tight">limefolio</span>
                </Link>
                
                <div className="z-10 max-w-xl drop-shadow-xl">
                    <h1 className="text-5xl lg:text-7xl font-medium tracking-tight mb-8 leading-[1.05] text-background">
                        Your best work belongs <span className="italic text-primary">here.</span>
                    </h1>
                    <p className="text-xl text-background/80 leading-relaxed">
                        Join thousands of creatives building their online presence with the world's most powerful portfolio engine.
                    </p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-[400px] flex flex-col">
                    {/* Mobile Logo */}
                    <div className="flex lg:hidden justify-center mb-12">
                        <Link href="/" className="flex items-center gap-3 font-medium hover:opacity-80 transition-opacity">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background shadow-lg">
                                <LimefolioLIcon className="w-5 h-5" />
                            </div>
                            <span className="text-2xl tracking-tight">limefolio</span>
                        </Link>
                    </div>
                    
                    {children}
                </div>
            </div>
        </div>
    );
}
