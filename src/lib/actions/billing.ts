"use server";

import { api } from "../fetcher";
import { publicApi } from "../public-fetcher";
import { revalidatePath } from "next/cache";

export async function getPlans() {
    const response = await publicApi.get("/api/billing/plans/");
    return response.data || [];
}

export async function getBalance() {
    const response = await api.get("/api/billing/balance/");
    return response;
}

export async function validatePromoCode(data: any) {
    const response = await api.post("/api/billing/promo/validate/", data);
    return response;
}

export async function createCheckoutSession(data: any) {
    const response = await api.post("/api/billing/checkout/", data);
    return response;
}

export async function getSubscription() {
    const response = await api.get("/api/billing/subscription/");
    return response;
}

export async function cancelSubscription() {
    const response = await api.post("/api/billing/subscription/cancel/");
    revalidatePath("/app/billing");
    return response;
}

export async function reactivateSubscription() {
    const response = await api.post("/api/billing/subscription/reactivate/");
    revalidatePath("/app/billing");
    return response;
}

export async function upgradeBkashSubscription(data: any) {
    const response = await api.post("/api/billing/subscription/bkash/upgrade/", data);
    return response;
}
