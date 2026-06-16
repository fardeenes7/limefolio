import { getSiteDetail } from "@/lib/actions/sites";
import { AppearanceClient } from "./appearance-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Appearance",
    description:
        "Customize your portfolio's template, color theme, and typography.",
};

export default async function AppearancePage() {
    const response = await getSiteDetail();

    if (!response.ok || !response.data) {
        return <div>Something went wrong</div>;
    }

    return <AppearanceClient initialSite={response.data} />;
}
