import { getSiteDetail } from "@/lib/actions/sites";
import { SiteSettingsClient } from "./site-settings-client";

export default async function SiteSettingsPage() {
    const response = await getSiteDetail();

    if (!response.ok || !response.data) {
        return <div>Something went wrong</div>;
    }

    return (
        <div className="container flex flex-col gap-8">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Site Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Configure your portfolio site's basic information and
                        SEO settings
                    </p>
                </div>
            </div>

            <SiteSettingsClient initialSite={response.data} />
        </div>
    );
}
