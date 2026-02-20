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

    return (
        <div className="container flex flex-col gap-8">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Appearance
                    </h1>
                    <p className="text-muted-foreground">
                        Choose your portfolio's template, color theme, and
                        typography
                    </p>
                </div>
            </div>

            <AppearanceClient initialSite={response.data} />
        </div>
    );
}
