import { getProjectDetail } from "@/lib/actions";
import { ProjectForm } from "../../project-form";
import {
    Page,
    PageAction,
    PageBody,
    PageDescription,
    PageHeader,
    PageHeading,
    PageTitle,
} from "@/components/ui/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

export default async function EditProjectPage({
    params,
}: PageProps<"/app/projects/[id]/edit">) {
    const projectId = parseInt((await params).id);
    const project = await getProjectDetail(projectId);

    return (
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Edit Project</PageTitle>
                    <PageDescription>
                        Update your project details
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
                <ProjectForm project={project.data} />
            </PageBody>
        </Page>
    );
}
