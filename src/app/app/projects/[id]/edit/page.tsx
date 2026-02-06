import { getProjectDetail } from "@/lib/actions";
import { ProjectForm } from "../../project-form";

export default async function EditProjectPage({
    params,
}: PageProps<"/app/projects/[id]/edit">) {
    const projectId = parseInt((await params).id);
    const project = await getProjectDetail(projectId);
    return (
        <div className="container space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Edit Project</h1>
                <p className="text-muted-foreground mt-1">
                    Update your project details
                </p>
            </div>

            <ProjectForm project={project.data} />
        </div>
    );
}
