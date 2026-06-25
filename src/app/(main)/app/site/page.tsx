import { getSiteDetail } from "@/lib/actions/sites";
import { getCustomDomains } from "@/lib/actions/custom-domains";
import { SiteSettingsClient } from "./site-settings-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Site Settings",
    description: "Configure your portfolio site's information, domains, and appearance.",
};

export default async function SiteSettingsPage() {
    const [siteResponse, domainsResponse] = await Promise.all([
        getSiteDetail(),
        getCustomDomains(),
    ]);

    if (!siteResponse.ok || !siteResponse.data) {
        return <div>Something went wrong loading site settings.</div>;
    }

    const customDomains = domainsResponse.ok ? domainsResponse.data || [] : [];

    return (
        <SiteSettingsClient
            initialSite={siteResponse.data}
            initialDomains={customDomains}
        />
    );
}
