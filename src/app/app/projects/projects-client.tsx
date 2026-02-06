"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    IconPlus,
    IconPencil,
    IconTrash,
    IconStar,
    IconStarFilled,
    IconPhoto,
} from "@tabler/icons-react";
import { deleteProject, updateProject } from "@/lib/actions/projects";
import Image from "next/image";

interface Project {
    id: number;
    title: string;
    slug: string;
    tagline: string;
    thumbnail: string | null;
    featured: boolean;
    is_published: boolean;
    media_count: number;
    created_at: string;
}

interface ProjectsClientProps {
    initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>(initialProjects);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        const response = await deleteProject(id);
        if (response.ok) {
            setProjects((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const handleToggleFeatured = async (id: number, featured: boolean) => {
        const response = await updateProject(id, { featured: !featured });
        if (response.ok && response.data) {
            setProjects((prev) =>
                prev.map((p) =>
                    p.id === id ? { ...p, featured: !featured } : p,
                ),
            );
        }
    };

    return (
        <div className="space-y-6">
            {/* Projects Grid */}
            {projects.length === 0 ? (
                <Card className="p-12 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-muted">
                            <IconPhoto className="w-8 h-8 text-muted-foreground" />
                        </div>
                    </div>
                    <h3 className="font-semibold mb-2">No projects yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Create your first project to get started
                    </p>
                    <Button onClick={() => router.push("/app/projects/new")}>
                        <IconPlus className="w-4 h-4 mr-2" />
                        Create Project
                    </Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="group overflow-hidden hover:shadow-lg transition-all duration-300 py-0 gap-2"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-muted">
                                {project.thumbnail ? (
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <IconPhoto className="w-12 h-12 text-muted-foreground" />
                                    </div>
                                )}

                                {/* Featured Badge */}
                                {project.featured && (
                                    <div className="absolute top-2 right-2">
                                        <Badge className="bg-yellow-500 text-white">
                                            <IconStarFilled className="w-3 h-3 mr-1" />
                                            Featured
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4 space-y-3">
                                <div>
                                    <h3 className="font-semibold line-clamp-1">
                                        {project.title}
                                    </h3>
                                    {project.tagline && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                            {project.tagline}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        {project.media_count} media
                                    </Badge>
                                    <Badge
                                        variant={
                                            project.is_published
                                                ? "default"
                                                : "outline"
                                        }
                                        className="text-xs"
                                    >
                                        {project.is_published
                                            ? "Published"
                                            : "Draft"}
                                    </Badge>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            handleToggleFeatured(
                                                project.id,
                                                project.featured,
                                            )
                                        }
                                        className="flex-1"
                                    >
                                        {project.featured ? (
                                            <IconStarFilled className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                                        ) : (
                                            <IconStar className="w-3.5 h-3.5 mr-1" />
                                        )}
                                        {project.featured
                                            ? "Unfeature"
                                            : "Feature"}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            router.push(
                                                `/app/projects/${project.id}/edit`,
                                            )
                                        }
                                    >
                                        <IconPencil className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(project.id)}
                                    >
                                        <IconTrash className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
