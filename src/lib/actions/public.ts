"use server";

export async function getPricingPlans() {
    try {
        const apiUrl = process.env.API_URL;
        const res = await fetch(`${apiUrl}/api/billing/plans/`, {
            next: { revalidate: 3600 }
        });
        if (res.ok && res.status !== 204) {
            return await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch plans:", e);
    }
    return [];
}
