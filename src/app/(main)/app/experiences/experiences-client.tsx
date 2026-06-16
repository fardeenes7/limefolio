"use client";

import { useState } from "react";
import { Experience } from "@/types";
import { Button } from "@/components/ui/button";
import { IconPlus, IconBriefcase } from "@tabler/icons-react";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Page,
    PageAction,
    PageBody,
    PageDescription,
    PageHeader,
    PageHeading,
    PageTitle
} from "@/components/ui/page";
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
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Experience</PageTitle>
                    <PageDescription>
                        Manage your work experience and professional history
                    </PageDescription>
                </PageHeading>
                {experiences.length > 0 && (
                    <PageAction>
                        <Button onClick={() => setIsCreateOpen(true)}>
                            <IconPlus />
                            Add Experience
                        </Button>
                    </PageAction>
                )}
            </PageHeader>

            <PageBody>
                {experiences.length > 0 && (
                    <div className="flex gap-2 mb-6">
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
                        <div className={currentExperiences.length > 0 ? "mt-8" : ""}>
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
                    <Empty className="border-2 border-dashed">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <IconBriefcase className="w-12 h-12 text-muted-foreground" />
                            </EmptyMedia>
                            <EmptyTitle>No experience added yet</EmptyTitle>
                            <EmptyDescription>
                                Add your first position to build your profile.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button onClick={() => setIsCreateOpen(true)}>
                                <IconPlus className="mr-2 h-4 w-4" />
                                Add Your First Experience
                            </Button>
                        </EmptyContent>
                    </Empty>
                )}

                <CreateExperienceDialog
                    open={isCreateOpen}
                    onOpenChange={setIsCreateOpen}
                    onSuccess={handleExperienceCreated}
                />
            </PageBody>
        </Page>
    );
}
