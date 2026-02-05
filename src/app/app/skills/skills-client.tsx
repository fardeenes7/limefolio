"use client";

import { useState } from "react";
import { Skill } from "@/types";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { SkillCard } from "./skill-card";
import { CreateSkillDialog } from "./create-skill-dialog";
import { SKILL_CATEGORIES } from "@/lib/schemas";

interface SkillsClientProps {
    initialSkills: Skill[];
}

export function SkillsClient({ initialSkills }: SkillsClientProps) {
    const [skills, setSkills] = useState<Skill[]>(initialSkills);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const handleSkillCreated = (newSkill: Skill) => {
        setSkills([newSkill, ...skills]);
        setIsCreateOpen(false);
    };

    const handleSkillUpdated = (updatedSkill: Skill) => {
        setSkills(
            skills.map((s) => (s.id === updatedSkill.id ? updatedSkill : s)),
        );
    };

    const handleSkillDeleted = (id: number) => {
        setSkills(skills.filter((s) => s.id !== id));
    };

    // Group skills by category
    const groupedSkills = skills.reduce(
        (acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        },
        {} as Record<string, Skill[]>,
    );

    // Filter by selected category
    const filteredGroups =
        selectedCategory === "all"
            ? groupedSkills
            : { [selectedCategory]: groupedSkills[selectedCategory] || [] };

    const featuredSkills = skills.filter((s) => s.is_featured);

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2 flex-wrap">
                    <Button
                        variant={
                            selectedCategory === "all" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory("all")}
                    >
                        All ({skills.length})
                    </Button>
                    {Object.entries(SKILL_CATEGORIES).map(([value, label]) => {
                        const count = groupedSkills[value]?.length || 0;
                        if (count === 0) return null;
                        return (
                            <Button
                                key={value}
                                variant={
                                    selectedCategory === value
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCategory(value)}
                            >
                                {label} ({count})
                            </Button>
                        );
                    })}
                </div>

                <Button onClick={() => setIsCreateOpen(true)}>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Skill
                </Button>
            </div>

            {featuredSkills.length > 0 && selectedCategory === "all" && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Featured Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {featuredSkills.map((skill) => (
                            <SkillCard
                                key={skill.id}
                                skill={skill}
                                onUpdate={handleSkillUpdated}
                                onDelete={handleSkillDeleted}
                            />
                        ))}
                    </div>
                </div>
            )}

            {Object.entries(filteredGroups).map(
                ([category, categorySkills]) => {
                    if (!categorySkills || categorySkills.length === 0)
                        return null;

                    return (
                        <div key={category}>
                            <h2 className="text-xl font-semibold mb-4 capitalize">
                                {SKILL_CATEGORIES[
                                    category as keyof typeof SKILL_CATEGORIES
                                ] || category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {categorySkills.map((skill) => (
                                    <SkillCard
                                        key={skill.id}
                                        skill={skill}
                                        onUpdate={handleSkillUpdated}
                                        onDelete={handleSkillDeleted}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                },
            )}

            {skills.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground mb-4">
                        No skills yet. Add your first skill!
                    </p>
                    <Button onClick={() => setIsCreateOpen(true)}>
                        <IconPlus className="mr-2 h-4 w-4" />
                        Add Your First Skill
                    </Button>
                </div>
            )}

            <CreateSkillDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                onSuccess={handleSkillCreated}
            />
        </>
    );
}
