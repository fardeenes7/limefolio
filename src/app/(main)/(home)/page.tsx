import { PricingSection } from "@/components/home/pricing-section";
import {
    HomeHero,
    HomeStats,
    HomeFeatures,
    HomeSteps,
    HomeTestimonials,
    HomeIntegrations,
    HomeFinalCta
} from "@/components/home/home-sections";

// ─── Data Fetching ────────────────────────────────────────────────────────────

async function getLatestPromotion() {
    try {
        const apiUrl = process.env.API_URL || "http://localhost:8001";
        const res = await fetch(`${apiUrl}/api/billing/promotions/latest/`, {
            next: { revalidate: 3600 }
        });
        if (res.ok && res.status !== 204) {
            return await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch promotion:", e);
    }
    return null;
}

async function getPlans() {
    try {
        const apiUrl = process.env.API_URL || "http://localhost:8001";
        const res = await fetch(`${apiUrl}/api/billing/plans/`, {
            next: { revalidate: 300 }
        });
        if (res.ok && res.status !== 204) {
            return await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch plans:", e);
    }
    return [];
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
    const [promotion, plans] = await Promise.all([
        getLatestPromotion(),
        getPlans()
    ]);

    return (
        <div className="flex flex-col">
            <HomeHero promotion={promotion} />
            <HomeStats />
            <HomeFeatures />
            <HomeSteps />
            <HomeTestimonials />
            <PricingSection plans={plans} />
            <HomeIntegrations />
            <HomeFinalCta />
        </div>
    );
}
