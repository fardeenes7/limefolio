import { getDashboardStats, getAnalyticsOverview } from "@/lib/actions/analytics";
import { DashboardContent } from "./dashboard-content";
import {
    Page,
    PageHeader,
    PageHeading,
    PageTitle,
    PageDescription,
    PageBody,
} from "@/components/ui/page";

export default async function DashboardPage() {
    const [statsResponse, overviewResponse] = await Promise.all([
        getDashboardStats(),
        getAnalyticsOverview(7),
    ]);

    return (
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Dashboard</PageTitle>
                    <PageDescription>
                        Your portfolio at a glance
                    </PageDescription>
                </PageHeading>
            </PageHeader>
            <PageBody>
                <DashboardContent
                    stats={statsResponse.data}
                    overview={overviewResponse.data}
                />
            </PageBody>
        </Page>
    );
}
