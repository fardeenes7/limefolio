import { Suspense } from "react";
import { PricingSection } from "@/components/pricing/pricing-section";
import { PricingSkeleton } from "@/components/pricing/pricing-skeleton";

export default function PricingPage() {
    return (
        <main className="min-h-dvh pt-32 pb-24 bg-background selection:bg-primary/20">
            <Suspense fallback={<PricingSkeleton />}>
                <PricingSection />
            </Suspense>
        </main>
    );
}