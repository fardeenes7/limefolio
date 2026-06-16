import { getExperienceList } from "@/lib/actions";
import { ExperiencesClient } from "./experiences-client";

export default async function ExperiencesPage() {
    const response = await getExperienceList();
    const experiences = response.ok && response.data ? response.data : [];

    return <ExperiencesClient initialExperiences={experiences} />;
}
