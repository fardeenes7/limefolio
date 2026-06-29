import { Suspense } from "react";
import { Hero } from "@/app/(main)/(home)/(landing)/hero";
import { Features } from "@/app/(main)/(home)/(landing)/features";
import { Showcase } from "@/app/(main)/(home)/(landing)/showcase";
import { PricingSection } from "@/components/pricing/pricing-section";
import { PricingSkeleton } from "@/components/pricing/pricing-skeleton";
import { Cta } from "@/app/(main)/(home)/(landing)/cta";

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
