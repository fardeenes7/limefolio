import { IconRocket, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ComingSoonProps {
    title: string;
    description?: string;
}

export function ComingSoon({
    title,
    description = "We're working hard to bring this feature to your dashboard. Stay tuned for updates!",
}: ComingSoonProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 overflow-hidden">
            <div className="relative mb-8 animate-fade-in-up fill-mode-[forwards]">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative bg-card border border-border p-6 rounded-3xl shadow-xl ring-1 ring-primary/5">
                    <IconRocket className="w-12 h-12 text-primary animate-bounce-slow" />
                </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4 animate-fade-in-up opacity-0 [animation-delay:100ms] fill-mode-[forwards]">
                {title} <span className="text-primary italic">Coming Soon</span>
            </h1>

            <p className="max-w-md text-lg text-muted-foreground mb-10 animate-fade-in-up opacity-0 [animation-delay:200ms] fill-mode-[forwards]">
                {description}
            </p>    

            <div className="animate-fade-in-up opacity-0 [animation-delay:300ms] fill-mode-[forwards]">
                <Link href="/app">
                    <Button variant="outline" className="rounded-full px-8">
                        <IconArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            {/* Decorative background tokens */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-lg aspect-square">
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
