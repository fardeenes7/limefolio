"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { IconLoader2, IconArrowLeft } from "@tabler/icons-react";
import {
    createProject,
    updateProject,
    getProjectDetail,
    Project,
} from "@/lib/actions/projects";
import {
    MediaUploader,
    UploadedMedia,
} from "@/components/media/media-uploader";
import { Badge } from "@/components/ui/badge";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { DatePicker } from "@/components/ui/date-picker";

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    tagline: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    content: z.string().optional(),
    project_url: z
        .url("Must be a valid URL")
        .optional()
        .nullable()
        .or(z.literal("")),
    github_url: z
        .url("Must be a valid URL")
        .optional()
        .nullable()
        .or(z.literal("")),
    youtube_url: z
        .url("Must be a valid URL")
        .optional()
        .nullable()
        .or(z.literal("")),
    technologies: z.string().optional(),
    featured: z.boolean(),
    is_published: z.boolean(),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    project?: Project | null;
    onSuccess?: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    // Initialize uploadedMedia with existing project media
    const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>(
        project?.media?.map((m) => ({
            id: m.id,
            url: m.url,
            media_type: m.media_type,
            alt: m.alt,
            caption: m.caption,
        })) || [],
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: project
            ? {
                  ...project,
                  technologies: project?.technologies?.join(", "),
                  start_date: project?.start_date
                      ? new Date(project.start_date)
                      : undefined,
                  end_date: project?.end_date
                      ? new Date(project.end_date)
                      : undefined,
              }
            : {
                  title: "",
                  tagline: "",
                  description: "",
                  content: "",
                  project_url: "",
                  github_url: "",
                  youtube_url: "",
                  technologies: "",
                  featured: false,
                  is_published: true,
                  start_date: undefined,
                  end_date: undefined,
              },
    });

    const featured = watch("featured");
    const isPublished = watch("is_published");

    const onSubmit = async (data: ProjectFormData) => {
        setIsLoading(true);

        try {
            // Parse technologies from comma-separated string to array
            const technologies = data.technologies
                ? data.technologies
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                : [];

            const projectData = {
                ...data,
                technologies,
                media_ids: uploadedMedia.map((m) => m.id),
            };

            const response = project
                ? await updateProject(project.id, projectData)
                : await createProject(projectData);

            if (response.ok) {
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.push("/app/projects");
                }
            } else {
                alert("Failed to save project. Please try again.");
            }
        } catch (error) {
            console.error("Error saving project:", error);
            alert("An error occurred while saving the project");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMediaUpload = (media: UploadedMedia[]) => {
        setUploadedMedia(media);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
                <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="title">Title *</FieldLabel>
                            <Input
                                {...field}
                                id="title"
                                aria-invalid={fieldState.invalid}
                                placeholder="My Awesome Project"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="tagline"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="tagline">Tagline</FieldLabel>
                            <Input
                                {...field}
                                id="tagline"
                                aria-invalid={fieldState.invalid}
                                placeholder="A brief one-liner about your project"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="description">
                                Description *
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="description"
                                aria-invalid={fieldState.invalid}
                                placeholder="Describe your project..."
                                rows={4}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="content"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="content">
                                Detailed Content
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="content"
                                aria-invalid={fieldState.invalid}
                                placeholder="Add more detailed information about your project..."
                                rows={6}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <Separator />

            {/* Links */}
            <div className="space-y-4">
                <h3 className="font-semibold">Links</h3>
                <Controller
                    name="project_url"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="project_url">
                                Project URL
                            </FieldLabel>
                            <Input
                                {...field}
                                id="project_url"
                                aria-invalid={fieldState.invalid}
                                placeholder="https://example.com"
                                type="url"
                                autoComplete="off"
                                value={field.value || ""}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="github_url"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="github_url">
                                GitHub URL
                            </FieldLabel>
                            <Input
                                {...field}
                                id="github_url"
                                aria-invalid={fieldState.invalid}
                                placeholder="https://github.com/username/repo"
                                type="url"
                                autoComplete="off"
                                value={field.value || ""}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="youtube_url"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="youtube_url">
                                YouTube URL
                            </FieldLabel>
                            <Input
                                {...field}
                                id="youtube_url"
                                aria-invalid={fieldState.invalid}
                                placeholder="https://youtube.com/watch?v=..."
                                type="url"
                                autoComplete="off"
                                value={field.value || ""}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <Separator />

            {/* Technologies */}
            <Controller
                name="technologies"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="technologies">
                            Technologies
                        </FieldLabel>
                        <Input
                            {...field}
                            id="technologies"
                            aria-invalid={fieldState.invalid}
                            placeholder="React, Node.js, PostgreSQL (comma-separated)"
                            autoComplete="off"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Separate technologies with commas
                        </p>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Separator />

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
                <Controller
                    name="start_date"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel htmlFor="start_date">
                                Start Date
                            </FieldLabel>
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                                ariaInvalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="end_date"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel htmlFor="end_date">End Date</FieldLabel>
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                                ariaInvalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <Separator />

            {/* Media Upload */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-1">Project Media</h3>
                    <p className="text-sm text-muted-foreground">
                        Upload images and videos for your project
                    </p>
                </div>

                <MediaUploader
                    initialMedia={
                        project?.media?.map((m) => ({
                            id: m.id,
                            url: m.url,
                            media_type: m.media_type,
                            alt: m.alt,
                            caption: m.caption,
                        })) || []
                    }
                    onUploadComplete={handleMediaUpload}
                    maxFiles={10}
                    showPreview={true}
                />
            </div>

            <Separator />

            {/* Settings */}
            <div className="space-y-4">
                <h3 className="font-semibold">Settings</h3>

                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="featured">Featured Project</Label>
                        <p className="text-sm text-muted-foreground">
                            Show this project prominently on your portfolio
                        </p>
                    </div>
                    <Switch
                        id="featured"
                        checked={featured}
                        onCheckedChange={(checked) =>
                            setValue("featured", checked)
                        }
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="is_published">Published</Label>
                        <p className="text-sm text-muted-foreground">
                            Make this project visible on your public portfolio
                        </p>
                    </div>
                    <Switch
                        id="is_published"
                        checked={isPublished}
                        onCheckedChange={(checked) =>
                            setValue("is_published", checked)
                        }
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center gap-2 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    <IconArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/app/projects")}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" loading={isLoading}>
                        {project ? "Update Project" : "Create Project"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
