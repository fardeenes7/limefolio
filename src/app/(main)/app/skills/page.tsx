import { getSkillList } from "@/lib/actions";
import { SkillsClient } from "./skills-client";

export default async function SkillsPage() {
    const response = await getSkillList();
    const skills = response.ok && response.data ? response.data : [];

    return <SkillsClient initialSkills={skills} />;
}
