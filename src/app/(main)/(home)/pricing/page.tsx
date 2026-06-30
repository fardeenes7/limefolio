import { Suspense } from "react";
import { PricingSection } from "@/components/pricing/pricing-section";
import { PricingSkeleton } from "@/components/pricing/pricing-skeleton";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Pricing | Limefolio",
    description: "Simple, transparent pricing. Build your portfolio today."
});

export default function PricingPage() {
    return (
        <main className="min-h-dvh pt-32 pb-24 bg-background selection:bg-primary/20">
            <Suspense fallback={<PricingSkeleton />}>
                <PricingSection />
            </Suspense>
        </main>
    );
}