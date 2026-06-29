
import { getPlans } from "@/lib/actions";
import { PricingClient } from "./pricing-client";

export async function PricingSection() {
    const plans = await getPlans();
    return <PricingClient plans={plans} />;
}
