import { getAnalyticsOverview, getAnalyticsBreakdown } from "@/lib/actions/analytics";
import { AnalyticsContent } from "./analytics-content";
import {
    Page,
    PageHeader,
    PageHeading,
    PageTitle,
    PageDescription,
    PageBody,
} from "@/components/ui/page";

export default async function AnalyticsPage() {
    const [overviewRes, breakdownRes] = await Promise.all([
        getAnalyticsOverview(30),
        getAnalyticsBreakdown(30),
    ]);

    return (
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Analytics</PageTitle>
                    <PageDescription>
                        Visitor insights for your public portfolio
                    </PageDescription>
                </PageHeading>
            </PageHeader>
            <PageBody>
                <AnalyticsContent
                    overview={overviewRes.data}
                    breakdown={breakdownRes.data}
                />
            </PageBody>
        </Page>
    );
}
