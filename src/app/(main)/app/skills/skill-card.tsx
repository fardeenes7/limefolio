"use client";

import { useState } from "react";
import { Skill } from "@/types";
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
    IconStar,
    IconEye,
    IconEyeOff,
    IconEdit,
    IconTrash,
} from "@tabler/icons-react";
import {
    toggleSkillFeatured,
    toggleSkillPublished,
    deleteSkill,
} from "@/lib/actions";
import { PROFICIENCY_COLORS } from "@/lib/schemas";
import { EditSkillDialog } from "./edit-skill-dialog";

interface SkillCardProps {
    skill: Skill;
    onUpdate: (skill: Skill) => void;
    onDelete: (id: number) => void;
}

export function SkillCard({ skill, onUpdate, onDelete }: SkillCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleToggleFeatured = async () => {
        const response = await toggleSkillFeatured(
            skill.id,
            !skill.is_featured,
        );
        if (response.ok && response.data) {
            onUpdate(response.data);
        }
    };

    const handleTogglePublished = async () => {
        const response = await toggleSkillPublished(
            skill.id,
            !skill.is_published,
        );
        if (response.ok && response.data) {
            onUpdate(response.data);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Delete ${skill.name}?`)) return;
        setIsDeleting(true);
        const response = await deleteSkill(skill.id);
        if (response.ok) {
            onDelete(skill.id);
        } else {
            setIsDeleting(false);
        }
    };

    const proficiencyColor =
        PROFICIENCY_COLORS[skill.proficiency] || "bg-gray-500";

    return (
        <>
            <Card className="relative">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3 flex-1">
                            {skill.icon_url && (
                                <img
                                    src={skill.icon_url}
                                    alt={skill.name}
                                    className="w-10 h-10 object-contain"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg truncate">
                                    {skill.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {skill.category_display}
                                </p>
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
                                <DropdownMenuItem
                                    onClick={handleToggleFeatured}
                                >
                                    <IconStar className="mr-2 h-4 w-4" />
                                    {skill.is_featured
                                        ? "Unfeature"
                                        : "Feature"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleTogglePublished}
                                >
                                    {skill.is_published ? (
                                        <IconEyeOff className="mr-2 h-4 w-4" />
                                    ) : (
                                        <IconEye className="mr-2 h-4 w-4" />
                                    )}
                                    {skill.is_published
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

                <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`${proficiencyColor} text-white`}>
                            {skill.proficiency_display}
                        </Badge>
                        {skill.is_featured && (
                            <Badge variant="secondary">
                                <IconStar className="mr-1 h-3 w-3" />
                                Featured
                            </Badge>
                        )}
                        {!skill.is_published && (
                            <Badge variant="outline">Draft</Badge>
                        )}
                    </div>

                    {skill.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {skill.description}
                        </p>
                    )}

                    {skill.years_of_experience !== null && (
                        <p className="text-xs text-muted-foreground">
                            {skill.years_of_experience}{" "}
                            {skill.years_of_experience === 1 ? "year" : "years"}{" "}
                            of experience
                        </p>
                    )}
                </CardContent>
            </Card>

            <EditSkillDialog
                skill={skill}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSuccess={onUpdate}
            />
        </>
    );
}
