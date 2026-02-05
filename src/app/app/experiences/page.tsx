import { getExperienceList } from "@/lib/actions";
import { ExperiencesClient } from "./experiences-client";

export default async function ExperiencesPage() {
    const response = await getExperienceList();
    const experiences = response.ok && response.data ? response.data : [];

    return (
        <div className="container flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Experience
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your work experience and professional history
                    </p>
                </div>
            </div>

            <ExperiencesClient initialExperiences={experiences} />
        </div>
    );
}
