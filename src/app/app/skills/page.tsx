import { getSkillList } from "@/lib/actions";
import { SkillsClient } from "./skills-client";

export default async function SkillsPage() {
    const response = await getSkillList();
    const skills = response.ok && response.data ? response.data : [];

    return (
        <div className="container flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Skills
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your technical and professional skills
                    </p>
                </div>
            </div>

            <SkillsClient initialSkills={skills} />
        </div>
    );
}
