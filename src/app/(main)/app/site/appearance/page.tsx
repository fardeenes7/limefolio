import { getSiteDetail, getTemplateConfig } from "@/lib/actions/sites";
import { AppearanceClient } from "./appearance-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Appearance",
    description:
        "Customize your portfolio's template, color theme, and typography.",
};

export default async function AppearancePage() {
    const [siteResponse, configResponse] = await Promise.all([
        getSiteDetail(),
        getTemplateConfig()
    ]);

    if (!siteResponse.ok || !siteResponse.data || !configResponse.ok || !configResponse.data) {
        return <div>Something went wrong loading appearance settings</div>;
    }

    return <AppearanceClient initialSite={siteResponse.data} initialConfigRaw={configResponse.data} />;
}
