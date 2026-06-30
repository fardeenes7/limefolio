import { getProjectList } from "@/lib/actions/projects";
import { ProjectsClient } from "./projects-client";
import { Button } from "@/components/ui/button";
import {
    Page,
    PageAction,
    PageBody,
    PageDescription,
    PageHeader,
    PageHeading,
    PageTitle
} from "@/components/ui/page";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";

export default async function ProjectsPage() {
    const response = await getProjectList();
    const projects = response.ok ? response.data || [] : [];

    return (
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Projects</PageTitle>
                    <PageDescription>
                        Manage your portfolio projects
                    </PageDescription>
                </PageHeading>
                {projects.length > 0 && (
                    <PageAction>
                        <Link href="/app/projects/new">
                            <Button>
                                <IconPlus />
                                New Project
                            </Button>
                        </Link>
                    </PageAction>
                )}
            </PageHeader>

            <PageBody>
                <ProjectsClient initialProjects={projects} />
            </PageBody>
        </Page>
    );
}


export const metadata = {
    title: "Projects",
};
