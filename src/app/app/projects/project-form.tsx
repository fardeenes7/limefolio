"use client";

import { useState, useRef, useCallback } from "react";
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
import { Card } from "@/components/ui/card";
import {
    IconArrowLeft,
    IconX,
    IconVideo,
    IconPhoto,
    IconMaximize,
    IconStar,
    IconStarFilled,
} from "@tabler/icons-react";
import { MediaDetailsSheet } from "@/components/ui/media-details-sheet";
import { Media } from "@/types";
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
import {
    uploadMediaFile,
    getMediaList,
    setMediaFeatured,
} from "@/lib/actions/media";
import { MediaLibraryPicker } from "@/components/media/media-library-picker";
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
            thumbnail_url: m.thumbnail ?? undefined,
            is_featured: m.is_featured,
        })) || [],
    );

    // Ref mirrors state so concurrent upload callbacks never see stale closures
    const uploadedMediaRef = useRef<UploadedMedia[]>(uploadedMedia);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
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

    const processSubmit = async (
        data: ProjectFormData,
        currentMedia: UploadedMedia[],
    ) => {
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
                media_ids: currentMedia.map((m) => m.id),
            };

            const response = project
                ? await updateProject(project.id, projectData)
                : await createProject(projectData);

            if (response.ok) {
                if (onSuccess) {
                    onSuccess();
                } else {
                    // router.push("/app/projects");
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

    const onSubmit = async (data: ProjectFormData) => {
        return processSubmit(data, uploadedMedia);
    };

    // Called once per successfully uploaded file — appends, never replaces
    const handleMediaSuccess = useCallback(
        (newMedia: UploadedMedia) => {
            uploadedMediaRef.current = [...uploadedMediaRef.current, newMedia];
            const updated = uploadedMediaRef.current;
            setUploadedMedia(updated);
            handleSubmit((data) => processSubmit(data, updated))();
        },
        [handleSubmit],
    );

    const handleRemoveMedia = (id: number) => {
        const updated = uploadedMedia.filter((m) => m.id !== id);
        uploadedMediaRef.current = updated;
        setUploadedMedia(updated);
        handleSubmit((data) => processSubmit(data, updated))();
    };

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleViewMedia = (item: UploadedMedia) => {
        setSelectedMedia({
            id: item.id,
            image: item.media_type === "image" ? item.url : null,
            video: item.media_type === "video" ? item.url : null,
            thumbnail: item.thumbnail_url ?? null,
            alt: item.alt,
            caption: item.caption,
            order: 0,
            is_featured: false,
            media_type: item.media_type as "image" | "video",
            url: item.url,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });
        setIsSheetOpen(true);
    };

    const handleThumbnailUpdate = (
        mediaId: number,
        newThumbnailUrl: string,
    ) => {
        setUploadedMedia((prev) =>
            prev.map((m) =>
                m.id === mediaId ? { ...m, thumbnail_url: newThumbnailUrl } : m,
            ),
        );
        uploadedMediaRef.current = uploadedMediaRef.current.map((m) =>
            m.id === mediaId ? { ...m, thumbnail_url: newThumbnailUrl } : m,
        );
        setSelectedMedia((prev) =>
            prev?.id === mediaId
                ? { ...prev, thumbnail: newThumbnailUrl }
                : prev,
        );
    };

    /** Called when the user picks items from the media library picker */
    const handleLibrarySelect = useCallback((picked: Media[]) => {
        const currentIds = new Set(uploadedMediaRef.current.map((m) => m.id));
        const newItems: UploadedMedia[] = picked
            .filter((m) => !currentIds.has(m.id))
            .map((m) => ({
                id: m.id,
                url: m.url,
                thumbnail_url: m.thumbnail,
                media_type: m.media_type,
                alt: m.alt,
                caption: m.caption,
                is_featured: m.is_featured,
            }));
        if (newItems.length === 0) return;
        uploadedMediaRef.current = [...uploadedMediaRef.current, ...newItems];
        setUploadedMedia((prev) => [...prev, ...newItems]);
    }, []);

    const handleSetFeatured = useCallback(async (mediaId: number) => {
        const response = await setMediaFeatured(mediaId);
        if (response.ok) {
            setUploadedMedia((prev) =>
                prev.map((m) => ({
                    ...m,
                    is_featured: m.id === mediaId,
                })),
            );
            uploadedMediaRef.current = uploadedMediaRef.current.map((m) => ({
                ...m,
                is_featured: m.id === mediaId,
            }));
            setSelectedMedia((prev) =>
                prev && prev.id === mediaId
                    ? { ...prev, is_featured: true }
                    : prev
                      ? { ...prev, is_featured: false }
                      : null,
            );
        }
    }, []);

    return (
        <>
            <MediaDetailsSheet
                media={selectedMedia}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                onThumbnailUpdate={handleThumbnailUpdate}
                onFeaturedUpdate={handleSetFeatured}
            />
            {/* Two-column layout: form left, media sidebar right */}
            <div className="flex gap-6 items-start">
                {/* ── Left: form fields ───────────────────────────────── */}
                <form
                    id="project-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 min-w-0 space-y-6"
                >
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <Controller
                            name="title"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="title">
                                        Title *
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="My Awesome Project"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="tagline"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="tagline">
                                        Tagline
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="tagline"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="A brief one-liner about your project"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="end_date"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="end_date">
                                        End Date
                                    </FieldLabel>
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                        ariaInvalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <Separator />

                    {/* Settings */}
                    <div className="space-y-4">
                        <h3 className="font-semibold">Settings</h3>

                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="featured">
                                    Featured Project
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Show this project prominently on your
                                    portfolio
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
                                    Make this project visible on your public
                                    portfolio
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
                </form>
                {/* ── Right: media sidebar ─────────────────────────────── */}
                <div className="w-96 shrink-0 sticky top-6 space-y-4">
                    <Card className="p-4 space-y-3">
                        <div>
                            <h3 className="font-semibold text-sm">
                                Project Media
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Images &amp; videos are auto-saved on upload
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <MediaUploader
                                onSuccess={handleMediaSuccess}
                                maxFiles={10}
                                mode="inline"
                            />
                            <MediaLibraryPicker
                                selectedIds={uploadedMedia.map((m) => m.id)}
                                onSelect={handleLibrarySelect}
                            />
                        </div>
                    </Card>

                    {/* Uploaded media grid */}
                    {uploadedMedia.length > 0 && (
                        <Card className="p-4 space-y-3">
                            <h3 className="font-semibold text-sm">
                                Attached ({uploadedMedia.length})
                            </h3>
                            <div className="grid grid-cols-2 gap-1.5">
                                {uploadedMedia.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative aspect-video rounded-md overflow-hidden bg-muted group cursor-pointer border"
                                        onClick={() => handleViewMedia(item)}
                                    >
                                        {/* thumbnail or fallback */}
                                        {(item.thumbnail_url ??
                                        (item.media_type === "image"
                                            ? item.url
                                            : null)) ? (
                                            <img
                                                src={
                                                    item.thumbnail_url ??
                                                    item.url
                                                }
                                                alt={item.alt}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <IconVideo className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                        )}

                                        {/* featured badge */}
                                        {item.is_featured && (
                                            <div className="absolute top-1 left-1 z-10">
                                                <Badge
                                                    variant="default"
                                                    className="px-1 h-5 bg-yellow-500 hover:bg-yellow-600 border-none"
                                                >
                                                    <IconStarFilled className="w-3 h-3 mr-0.5" />
                                                    <span className="text-[10px]">
                                                        Featured
                                                    </span>
                                                </Badge>
                                            </div>
                                        )}

                                        {/* hover overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                            <button
                                                type="button"
                                                title={
                                                    item.is_featured
                                                        ? "Featured"
                                                        : "Set as featured"
                                                }
                                                className={`p-1 rounded transition-colors ${
                                                    item.is_featured
                                                        ? "bg-yellow-500 hover:bg-yellow-600"
                                                        : "bg-white/20 hover:bg-white/40"
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSetFeatured(item.id);
                                                }}
                                            >
                                                {item.is_featured ? (
                                                    <IconStarFilled className="w-3 h-3 text-white" />
                                                ) : (
                                                    <IconStar className="w-3 h-3 text-white" />
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                title="View"
                                                className="p-1 rounded bg-white/20 hover:bg-white/40 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewMedia(item);
                                                }}
                                            >
                                                <IconMaximize className="w-3 h-3 text-white" />
                                            </button>
                                            <button
                                                type="button"
                                                title="Remove from project"
                                                className="p-1 rounded bg-white/20 hover:bg-red-500/80 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveMedia(item.id);
                                                }}
                                            >
                                                <IconX className="w-3 h-3 text-white" />
                                            </button>
                                        </div>

                                        {/* type badge */}
                                        <div className="absolute bottom-1 left-1">
                                            {item.media_type === "video" ? (
                                                <IconVideo className="w-3 h-3 text-white drop-shadow" />
                                            ) : (
                                                <IconPhoto className="w-3 h-3 text-white drop-shadow" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>{" "}
                {/* end sidebar */}
            </div>{" "}
            {/* end two-column flex */}
            {/* ── Sticky bottom action bar ─────────────────────────────── */}
            <div className="sticky bottom-0 z-10 flex justify-between items-center gap-2 px-6 py-6 -mx-6 border-t bg-background/80 backdrop-blur-sm">
                <Button
                    type="button"
                    variant="ghost"
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
                    <Button
                        form="project-form"
                        type="submit"
                        loading={isLoading}
                        disabled={!isDirty}
                    >
                        {project ? "Update Project" : "Create Project"}
                    </Button>
                </div>
            </div>
        </>
    );
}
