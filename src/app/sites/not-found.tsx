import Link from "next/link";
import { IconMoodEmpty, IconArrowLeft } from "@tabler/icons-react";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"] });

export default function NotFoundComponent() {
    return (
        <html lang="en" className={`${figtree.className}`}>
            <body className="font-figtree">
                <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground">
                    {/* Background Decorations */}
                    <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[100px]">
                        <div className="h-full w-full rounded-full bg-linear-to-br from-lime-400 to-green-500 opacity-20 dark:opacity-10" />
                    </div>

                    <div className="z-10 flex flex-col items-center px-4 text-center animate-in fade-in zoom-in duration-500 ease-out">
                        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-muted shadow-sm">
                            <IconMoodEmpty
                                className="h-12 w-12 text-muted-foreground"
                                stroke={1.5}
                            />
                            <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500">
                                <span className="font-mono text-xs font-bold">
                                    404
                                </span>
                            </div>
                        </div>

                        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Site not found
                        </h1>
                        <p className="mb-8 max-w-[400px] text-muted-foreground">
                            The page you are looking for might have been
                            removed, had its name changed, or is temporarily
                            unavailable.
                        </p>

                        <div className="flex gap-4">
                            <Link
                                href="/"
                                className="group flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                            >
                                <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Go Back Home
                            </Link>
                        </div>
                    </div>

                    <div className="absolute bottom-8 text-xs text-muted-foreground">
                        Limefolio
                    </div>
                </div>
            </body>
        </html>
    );
}
