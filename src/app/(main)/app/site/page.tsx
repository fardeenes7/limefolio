import { getSiteDetail } from "@/lib/actions/sites";
import { SiteSettingsClient } from "./site-settings-client";

export default async function SiteSettingsPage() {
    const response = await getSiteDetail();

    if (!response.ok || !response.data) {
        return <div>Something went wrong</div>;
    }

    return <SiteSettingsClient initialSite={response.data} />;
}
