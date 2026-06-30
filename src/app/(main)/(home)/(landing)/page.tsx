import { Suspense } from "react";
import { Hero } from "@/app/(main)/(home)/(landing)/hero";
import { Features } from "@/app/(main)/(home)/(landing)/features";
import { Showcase } from "@/app/(main)/(home)/(landing)/showcase";
import { PricingSection } from "@/components/pricing/pricing-section";
import { PricingSkeleton } from "@/components/pricing/pricing-skeleton";
import { Cta } from "@/app/(main)/(home)/(landing)/cta";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Limefolio | Create stunning portfolio websites in minutes.",
    description: "Join thousands of creatives building their online presence with the world's most powerful portfolio engine."
});
export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
            <Hero />
            <Features />
            <Showcase />
            <Suspense fallback={<PricingSkeleton />}>
                <PricingSection />
            </Suspense>
            <Cta />
        </main>
    );
}
