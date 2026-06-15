import { getCustomDomains } from "@/lib/actions/custom-domains";
import { DomainsClient } from "./domains-client";
import { Metadata } from "next";
import {
    Page,
    PageAction,
    PageBody,
    PageDescription,
    PageHeader,
    PageHeading,
    PageTitle
} from "@/components/ui/page";
import { CreateDomainDialog } from "./create-domain-dialog";

export const metadata: Metadata = {
    title: "Custom Domains | Limefolio",
    description: "Manage your custom domains",
};

export default async function DomainsPage() {
    const response = await getCustomDomains();
    const customDomains = response.ok ? response.data || [] : [];

    return (
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Custom Domains</PageTitle>
                    <PageDescription>
                        Connect a personalized domain to your portfolio site.
                    </PageDescription>
                </PageHeading>
                {customDomains.length > 0 && (
                    <PageAction>
                        <CreateDomainDialog />
                    </PageAction>
                )}
            </PageHeader>

            <PageBody>
                <DomainsClient initialDomains={customDomains} />
            </PageBody>
        </Page>
    );
}
