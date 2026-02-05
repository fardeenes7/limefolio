"use client";

import { useState } from "react";
import { Experience } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    IconDotsVertical,
    IconBuilding,
    IconMapPin,
    IconCalendar,
    IconExternalLink,
    IconEye,
    IconEyeOff,
    IconEdit,
    IconTrash,
} from "@tabler/icons-react";
import {
    toggleExperiencePublished,
    setExperienceCurrent,
    deleteExperience,
} from "@/lib/actions";
import { EditExperienceDialog } from "./edit-experience-dialog";
import { format } from "date-fns";

interface ExperienceCardProps {
    experience: Experience;
    onUpdate: (experience: Experience) => void;
    onDelete: (id: number) => void;
}

export function ExperienceCard({
    experience,
    onUpdate,
    onDelete,
}: ExperienceCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleTogglePublished = async () => {
        const response = await toggleExperiencePublished(
            experience.id,
            !experience.is_published,
        );
        if (response.ok && response.data) {
            onUpdate(response.data);
        }
    };

    const handleToggleCurrent = async () => {
        const response = await setExperienceCurrent(
            experience.id,
            !experience.is_current,
        );
        if (response.ok && response.data) {
            onUpdate(response.data);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Delete ${experience.position} at ${experience.company}?`))
            return;
        setIsDeleting(true);
        const response = await deleteExperience(experience.id);
        if (response.ok) {
            onDelete(experience.id);
        } else {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM yyyy");
        } catch {
            return dateString;
        }
    };

    const duration = experience.is_current
        ? `${formatDate(experience.start_date)} - Present`
        : experience.end_date
          ? `${formatDate(experience.start_date)} - ${formatDate(experience.end_date)}`
          : formatDate(experience.start_date);

    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                            {experience.company_logo && (
                                <img
                                    src={experience.company_logo}
                                    alt={experience.company}
                                    className="w-12 h-12 object-contain rounded"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">
                                            {experience.position}
                                        </h3>
                                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                            <IconBuilding className="h-4 w-4" />
                                            <span>{experience.company}</span>
                                            {experience.url && (
                                                <a
                                                    href={experience.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary"
                                                >
                                                    <IconExternalLink className="h-3 w-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <IconCalendar className="h-4 w-4" />
                                        <span>{duration}</span>
                                    </div>
                                    {experience.location && (
                                        <div className="flex items-center gap-1">
                                            <IconMapPin className="h-4 w-4" />
                                            <span>{experience.location}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <Badge variant="secondary">
                                        {experience.type_display}
                                    </Badge>
                                    {experience.is_current && (
                                        <Badge className="bg-green-500 text-white">
                                            Current
                                        </Badge>
                                    )}
                                    {!experience.is_published && (
                                        <Badge variant="outline">Draft</Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <IconDotsVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => setIsEditOpen(true)}
                                >
                                    <IconEdit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleToggleCurrent}>
                                    <IconCalendar className="mr-2 h-4 w-4" />
                                    {experience.is_current
                                        ? "Mark as Past"
                                        : "Mark as Current"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleTogglePublished}
                                >
                                    {experience.is_published ? (
                                        <IconEyeOff className="mr-2 h-4 w-4" />
                                    ) : (
                                        <IconEye className="mr-2 h-4 w-4" />
                                    )}
                                    {experience.is_published
                                        ? "Unpublish"
                                        : "Publish"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="text-destructive"
                                >
                                    <IconTrash className="mr-2 h-4 w-4" />
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>

                {experience.description && (
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {experience.description}
                        </p>
                    </CardContent>
                )}
            </Card>

            <EditExperienceDialog
                experience={experience}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSuccess={onUpdate}
            />
        </>
    );
}
