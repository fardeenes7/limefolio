import { getPricingPlans } from "@/lib/actions/public";
import { PricingClient } from "./pricing-client";

export async function PricingSection() {
    const plans = await getPricingPlans();
    return <PricingClient plans={plans} />;
}
