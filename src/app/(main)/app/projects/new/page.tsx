import { Button } from "@/components/ui/button";
import { ProjectForm } from "../project-form";
import {
    Page,
    PageAction,
    PageBody,
    PageDescription,
    PageHeader,
    PageHeading,
    PageTitle,
} from "@/components/ui/page";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

export default function NewProjectPage() {
    return (
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Create New Project</PageTitle>
                    <PageDescription>
                        Add a new project to your portfolio
                    </PageDescription>
                </PageHeading>
                <PageAction>
                    <Link href="/app/projects">
                        <Button variant="outline">
                            <IconChevronLeft />
                            Back to Projects
                        </Button>
                    </Link>
                </PageAction>
            </PageHeader>

            <PageBody>
                <ProjectForm />
            </PageBody>
        </Page>
    );
}
