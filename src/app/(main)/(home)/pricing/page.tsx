import { PricingClient } from "./pricing-client";

async function getPlans() {
    try {
        const apiUrl = process.env.API_URL || "http://localhost:8001";
        const res = await fetch(`${apiUrl}/api/billing/plans/`, { next: { revalidate: 300 } });
        if (res.ok && res.status !== 204) {
            return await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch plans:", e);
    }
    return [];
}

export default async function PricingPage() {
    const plans = await getPlans();
    return <PricingClient plans={plans} />;
}