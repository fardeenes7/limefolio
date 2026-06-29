import { Skeleton } from "@/components/ui/skeleton";

export function PricingSkeleton() {
    return (
        <section className="relative z-10 py-24 bg-background">
            <div className="container px-4 max-w-7xl mx-auto">
                <div className="max-w-3xl mb-16 md:mb-24 mx-auto text-center flex flex-col items-center">
                    <Skeleton className="h-[60px] md:h-[80px] w-3/4 mb-6 rounded-2xl" />
                    <Skeleton className="h-6 w-full max-w-2xl mb-10 rounded-full" />
                    <Skeleton className="h-10 w-[250px] rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="relative rounded-3xl p-8 md:p-10 flex flex-col border border-border/50 bg-muted/20">
                            <Skeleton className="h-8 w-1/2 mb-2 rounded-xl" />
                            <Skeleton className="h-4 w-3/4 mb-6 rounded-full" />
                            <Skeleton className="h-16 w-24 mb-10 rounded-2xl" />
                            <div className="space-y-4 mb-10">
                                {[1, 2, 3, 4, 5, 6].map((j) => (
                                    <div key={j} className="flex items-center gap-3">
                                        <Skeleton className="w-5 h-5 rounded-full" />
                                        <Skeleton className="h-4 w-3/4 rounded-full" />
                                    </div>
                                ))}
                            </div>
                            <Skeleton className="h-14 w-full rounded-full mt-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
