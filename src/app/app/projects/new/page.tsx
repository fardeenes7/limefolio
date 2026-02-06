import { Button } from "@/components/ui/button";
import { ProjectForm } from "../project-form";
import Link from "next/link";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";

export default function NewProjectPage() {
    return (
        <div className="container space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Create New Project</h1>
                    <p className="text-muted-foreground mt-1">
                        Add a new project to your portfolio
                    </p>
                </div>
                <Link href="/app/projects">
                    <Button>
                        <IconChevronLeft />
                        Back to Projects
                    </Button>
                </Link>
            </div>

            <div>
                <ProjectForm />
            </div>
        </div>
    );
}
