"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    IconSettings,
    IconTags,
    IconCalendar,
    IconTextCaption,
    IconUser,
    IconVideo,
    IconStarFilled,
    IconStar
} from "@tabler/icons-react";
import { BlogPost, BlogPostFormData, blogPostFormSchema, Media } from "@/lib/schemas/blog.schema";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { TagsInput } from "@/components/ui/tags-input";
import { MediaDetailsSheet } from "@/components/ui/media-details-sheet";
import { MediaUploader, UploadedMedia } from "@/components/media/media-uploader";
import { setMediaFeatured } from "@/lib/actions/media";
import { MediaLibraryPicker } from "@/components/media/media-library-picker";
import { Badge } from "@/components/ui/badge";

interface PostFormProps {
    post?: BlogPost | null;
    onSuccess?: () => void;
}

export function PostForm({ post, onSuccess }: PostFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Initialize uploadedMedia with existing post media
    const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>(
        post?.media?.map((m) => ({
            id: m.id,
            url: m.url,
            media_type: m.media_type,
            alt: m.alt,
            caption: m.caption,
            thumbnail_url: m.thumbnail ?? undefined,
            is_featured: m.is_featured,
        })) || []
    );

    const uploadedMediaRef = useRef<UploadedMedia[]>(uploadedMedia);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
    } = useForm<BlogPostFormData>({
        resolver: zodResolver(blogPostFormSchema),
        defaultValues: post
            ? {
                  ...post,
                  tags: post?.tags ?? [],
                  status: post?.status ?? "draft",
                  slug: post?.slug ?? "",
                  thumbnail_url: post?.thumbnail ?? "",
              }
            : {
                  title: "",
                  slug: "",
                  excerpt: "",
                  content: "",
                  author: "",
                  tags: [],
                  meta_description: "",
                  meta_keywords: "",
                  status: "draft",
                  is_featured: false,
                  thumbnail_url: "",
              },
    });

    const isFeatured = watch("is_featured");
    const status = watch("status");
    const titleValue = watch("title");

    // ── Smart slug: auto-derive from title unless manually edited ────────
    const slugManuallyEdited = useRef(!!post?.slug);

    const slugify = (value: string) =>
        value
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-")
            .replace(/^-+|-+$/g, "");

    useEffect(() => {
        if (slugManuallyEdited.current) return;
        setValue("slug", slugify(titleValue ?? ""), { shouldDirty: true });
    }, [titleValue, setValue]);

    const processSubmit = async (
        data: BlogPostFormData,
        currentMedia: UploadedMedia[]
    ) => {
        setIsLoading(true);

        try {
            const postData = {
                ...data,
                media_ids: currentMedia.map((m) => m.id),
            };

            const response = post
                ? await updateBlogPost(post.id, postData)
                : await createBlogPost(postData);

            if (response.ok) {
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.push("/app/posts");
                }
            } else {
                alert("Failed to save post. Please try again.");
            }
        } catch (error) {
            console.error("Error saving post:", error);
            alert("An error occurred while saving the post");
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: BlogPostFormData) => {
        return processSubmit(data, uploadedMedia);
    };

    // ── Media Handlers ───────────────────────────────────────────────────

    const handleMediaSuccess = useCallback(
        (newMedia: UploadedMedia) => {
            uploadedMediaRef.current = [newMedia];
            setUploadedMedia([newMedia]);
            handleSubmit((data) => processSubmit(data, [newMedia]))();
        },
        [handleSubmit]
    );

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
            is_featured: item.is_featured ?? false,
            media_type: item.media_type as "image" | "video",
            url: item.url,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });
        setIsSheetOpen(true);
    };

    const handleThumbnailUpdate = (
        mediaId: number,
        newThumbnailUrl: string
    ) => {
        setUploadedMedia((prev) =>
            prev.map((m) =>
                m.id === mediaId ? { ...m, thumbnail_url: newThumbnailUrl } : m
            )
        );
        uploadedMediaRef.current = uploadedMediaRef.current.map((m) =>
            m.id === mediaId ? { ...m, thumbnail_url: newThumbnailUrl } : m
        );
        setSelectedMedia((prev) =>
            prev?.id === mediaId
                ? { ...prev, thumbnail: newThumbnailUrl }
                : prev
        );
    };

    const handleLibrarySelect = useCallback((picked: Media[]) => {
        if (picked.length === 0) return;
        const selected = picked[picked.length - 1]; // take the last picked if they somehow picked multiple
        const newItem: UploadedMedia = {
            id: selected.id,
            url: selected.url,
            thumbnail_url: selected.thumbnail ?? undefined,
            media_type: selected.media_type,
            alt: selected.alt,
            caption: selected.caption,
            is_featured: true, // Auto-feature the thumbnail
        };
        uploadedMediaRef.current = [newItem];
        setUploadedMedia([newItem]);
    }, []);

    const handleSetFeatured = useCallback(async (mediaId: number) => {
        const response = await setMediaFeatured(mediaId);
        if (response.ok) {
            setUploadedMedia((prev) =>
                prev.map((m) => ({
                    ...m,
                    is_featured: m.id === mediaId,
                }))
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
                      : null
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

            <div className="flex gap-6 items-start">
                <form
                    id="post-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 min-w-0 space-y-4"
                >
                    {/* ── Basic Information ─────────────────────────────── */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Content</CardTitle>
                            <CardDescription>
                                The main content of your blog post.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
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
                                                placeholder="A Catchy Blog Post Title"
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
                                    name="slug"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="slug">
                                                Slug *
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="slug"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="a-catchy-blog-post-title"
                                                autoComplete="off"
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (val === "") {
                                                        slugManuallyEdited.current = false;
                                                    } else {
                                                        slugManuallyEdited.current = true;
                                                    }
                                                    field.onChange(e);
                                                }}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                {slugManuallyEdited.current
                                                    ? "Manually set — clear to auto-generate again"
                                                    : "Auto-generated from the title"}
                                            </p>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            <Controller
                                name="excerpt"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="excerpt">
                                            Excerpt
                                        </FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="excerpt"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="A brief summary of the post"
                                            rows={2}
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
                                            Content *
                                        </FieldLabel>
                                        <RichTextEditor
                                            id="content"
                                            value={field.value}
                                            onChange={field.onChange}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Write your blog post here..."
                                            minHeight="400px"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* ── Metadata ─────────────────────────────────────────── */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Metadata</CardTitle>
                            <CardDescription>
                                Information for organization and SEO.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="author"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="author">
                                                <IconUser className="size-3.5 inline-block mr-1 opacity-60" />
                                                Author Override
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="author"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Leave blank for default"
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
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="thumbnail_url"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="thumbnail_url">
                                                External Thumbnail URL
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="thumbnail_url"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="https://example.com/image.jpg"
                                                autoComplete="off"
                                                type="url"
                                                value={field.value || ""}
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Overrides the uploaded thumbnail if provided.
                                            </p>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="tags"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="tags">
                                                <IconTags className="size-3.5 inline-block mr-1 opacity-60" />
                                                Tags
                                            </FieldLabel>
                                            <TagsInput
                                                id="tags"
                                                value={field.value ?? []}
                                                onChange={field.onChange}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Type and press Enter..."
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

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="meta_description"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="meta_description">
                                                SEO Description
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="meta_description"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Short description for search engines"
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
                                    name="meta_keywords"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="meta_keywords">
                                                SEO Keywords
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="meta_keywords"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Comma separated keywords"
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
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── Settings ──────────────────────────────────────── */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <IconSettings className="size-4 inline-block mr-1.5 opacity-60" />
                                Settings
                            </CardTitle>
                            <CardDescription>
                                Control visibility and publishing status.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-0 divide-y divide-border">
                            <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                <div>
                                    <Label htmlFor="status" className="font-medium">
                                        Status
                                    </Label>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        Set the publishing status of the post
                                    </p>
                                </div>
                                <select
                                    id="status"
                                    className="flex h-9 w-32 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={status}
                                    onChange={(e) => setValue("status", e.target.value as any)}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                <div>
                                    <Label htmlFor="is_featured" className="font-medium">
                                        Featured Post
                                    </Label>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        Show this post prominently on your blog
                                    </p>
                                </div>
                                <Switch
                                    id="is_featured"
                                    checked={isFeatured}
                                    onCheckedChange={(checked) =>
                                        setValue("is_featured", checked)
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                </form>

                <div className="w-88 shrink-0 sticky top-6 space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Thumbnail</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {uploadedMedia.length > 0 ? (
                                <div className="space-y-3">
                                    <div className="relative aspect-video rounded-md overflow-hidden bg-muted group border">
                                        {(uploadedMedia[0].thumbnail_url ??
                                        (uploadedMedia[0].media_type === "image"
                                            ? uploadedMedia[0].url
                                            : null)) ? (
                                            <img
                                                src={
                                                    uploadedMedia[0].thumbnail_url ??
                                                    uploadedMedia[0].url
                                                }
                                                alt={uploadedMedia[0].alt}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <IconVideo className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button size="sm" variant="secondary" onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewMedia(uploadedMedia[0]);
                                            }}>
                                                View
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={(e) => {
                                                e.stopPropagation();
                                                setUploadedMedia([]);
                                                uploadedMediaRef.current = [];
                                            }}>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <MediaUploader
                                        onSuccess={handleMediaSuccess}
                                        maxFiles={1}
                                        mode="dialog"
                                    />
                                    <MediaLibraryPicker
                                        selectedIds={[]}
                                        onSelect={handleLibrarySelect}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>



                    <div className="flex flex-col gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            className="w-full"
                            disabled={isLoading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push("/app/posts")}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
