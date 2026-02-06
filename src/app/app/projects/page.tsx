import { getProjectList } from "@/lib/actions/projects";
import { ProjectsClient } from "./projects-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";

export default async function ProjectsPage() {
    const response = await getProjectList();
    const projects = response.ok ? response.data || [] : [];

    return (
        <div className="container space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your portfolio projects
                    </p>
                </div>
                <Link href="/app/projects/new">
                    <Button>
                        <IconPlus />
                        New Project
                    </Button>
                </Link>
            </div>

            <ProjectsClient initialProjects={projects} />
        </div>
    );
}
