"use client";

import { useState } from "react";
import { Experience } from "@/types";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { ExperienceCard } from "./experience-card";
import { CreateExperienceDialog } from "./create-experience-dialog";

interface ExperiencesClientProps {
    initialExperiences: Experience[];
}

export function ExperiencesClient({
    initialExperiences,
}: ExperiencesClientProps) {
    const [experiences, setExperiences] =
        useState<Experience[]>(initialExperiences);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [filter, setFilter] = useState<"all" | "current" | "past">("all");

    const handleExperienceCreated = (newExperience: Experience) => {
        setExperiences([newExperience, ...experiences]);
        setIsCreateOpen(false);
    };

    const handleExperienceUpdated = (updatedExperience: Experience) => {
        setExperiences(
            experiences.map((e) =>
                e.id === updatedExperience.id ? updatedExperience : e,
            ),
        );
    };

    const handleExperienceDeleted = (id: number) => {
        setExperiences(experiences.filter((e) => e.id !== id));
    };

    // Filter experiences
    const filteredExperiences = experiences.filter((exp) => {
        if (filter === "current") return exp.is_current;
        if (filter === "past") return !exp.is_current;
        return true;
    });

    // Separate current and past experiences
    const currentExperiences = filteredExperiences.filter((e) => e.is_current);
    const pastExperiences = filteredExperiences.filter((e) => !e.is_current);

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                {experiences.length > 0 && (
                    <div className="flex gap-2">
                        <Button
                            variant={filter === "all" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter("all")}
                        >
                            All ({experiences.length})
                        </Button>
                        <Button
                            variant={
                                filter === "current" ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setFilter("current")}
                        >
                            Current ({currentExperiences.length})
                        </Button>
                        <Button
                            variant={filter === "past" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter("past")}
                        >
                            Past ({pastExperiences.length})
                        </Button>
                    </div>
                )}

                <Button onClick={() => setIsCreateOpen(true)}>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Experience
                </Button>
            </div>

            {currentExperiences.length > 0 &&
                (filter === "all" || filter === "current") && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Current Positions
                        </h2>
                        <div className="space-y-4">
                            {currentExperiences.map((experience) => (
                                <ExperienceCard
                                    key={experience.id}
                                    experience={experience}
                                    onUpdate={handleExperienceUpdated}
                                    onDelete={handleExperienceDeleted}
                                />
                            ))}
                        </div>
                    </div>
                )}

            {pastExperiences.length > 0 &&
                (filter === "all" || filter === "past") && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Past Experience
                        </h2>
                        <div className="space-y-4">
                            {pastExperiences.map((experience) => (
                                <ExperienceCard
                                    key={experience.id}
                                    experience={experience}
                                    onUpdate={handleExperienceUpdated}
                                    onDelete={handleExperienceDeleted}
                                />
                            ))}
                        </div>
                    </div>
                )}

            {experiences.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground mb-4">
                        No experience added yet. Add your first position!
                    </p>
                    <Button onClick={() => setIsCreateOpen(true)}>
                        <IconPlus className="mr-2 h-4 w-4" />
                        Add Your First Experience
                    </Button>
                </div>
            )}

            <CreateExperienceDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                onSuccess={handleExperienceCreated}
            />
        </>
    );
}
