"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinkFormSchema, type SocialLinkFormData } from "@/lib/schemas";
import type { SocialLink } from "@/types";
import {
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
} from "@/lib/actions";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    IconExternalLink,
    IconPlus,
    IconTrash,
    IconGripVertical,
} from "@tabler/icons-react";

const SOCIAL_PLATFORMS = [
    { value: "github", label: "GitHub" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitter", label: "Twitter" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "youtube", label: "YouTube" },
    { value: "dribbble", label: "Dribbble" },
    { value: "behance", label: "Behance" },
    { value: "medium", label: "Medium" },
    { value: "dev.to", label: "Dev.to" },
    { value: "stack overflow", label: "Stack Overflow" },
    { value: "codepen", label: "CodePen" },
    { value: "portfolio", label: "Portfolio" },
    { value: "website", label: "Website" },
    { value: "email", label: "Email" },
    { value: "other", label: "Other" },
] as const;

interface SocialLinksClientProps {
    initialLinks: SocialLink[];
}

export function SocialLinksClient({ initialLinks }: SocialLinksClientProps) {
    const [links, setLinks] = useState<SocialLink[]>(initialLinks);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const form = useForm<SocialLinkFormData>({
        resolver: zodResolver(socialLinkFormSchema),
        defaultValues: {
            platform: undefined,
            url: "",
            username: "",
            order: links.length,
        },
    });

    const handleOpenDialog = (link?: SocialLink) => {
        if (link) {
            setEditingLink(link);
            form.reset({
                platform: link.platform as any,
                url: link.url,
                username: link.username,
                order: link.order,
            });
        } else {
            setEditingLink(null);
            form.reset({
                platform: undefined,
                url: "",
                username: "",
                order: links.length,
            });
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingLink(null);
        form.reset();
    };

    const onSubmit = async (data: SocialLinkFormData) => {
        setIsSubmitting(true);
        try {
            let response;
            if (editingLink) {
                response = await updateSocialLink(editingLink.id, data);
            } else {
                response = await createSocialLink(data);
            }

            console.log(response);

            if (response.ok && response.data) {
                if (editingLink) {
                    setLinks(
                        links.map((link) =>
                            link.id === editingLink.id ? response.data! : link,
                        ),
                    );
                } else {
                    setLinks([...links, response.data]);
                }
                handleCloseDialog();
            } else {
                if (response.data) {
                    Object.entries(response.data).forEach(([key, value]) => {
                        form.setError(key as keyof SocialLinkFormData, {
                            type: "manual",
                            message: value[0],
                        });
                    });
                }
            }
        } catch (error) {
            console.error("Failed to save social link:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this social link?"))
            return;

        setIsDeleting(id);
        try {
            const response = await deleteSocialLink(id);
            if (response.ok) {
                setLinks(links.filter((link) => link.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete social link:", error);
        } finally {
            setIsDeleting(null);
        }
    };

    const getPlatformIcon = (platform: string) => {
        // You can add platform-specific icons here
        return <IconExternalLink className="h-4 w-4" />;
    };

    const getPlatformLabel = (value: string) => {
        return SOCIAL_PLATFORMS.find((p) => p.value === value)?.label || value;
    };

    return (
        <div className="space-y-6">
            {/* Add Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => handleOpenDialog()}>
                        <IconPlus className="h-4 w-4 mr-2" />
                        Add Social Link
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editingLink ? "Edit" : "Add"} Social Link
                        </DialogTitle>
                        <DialogDescription>
                            {editingLink
                                ? "Update your social media profile information"
                                : "Add a new social media profile to your portfolio"}
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Platform Select */}
                        <Controller
                            name="platform"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Platform *
                                    </FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Select a platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {SOCIAL_PLATFORMS.map(
                                                (platform) => (
                                                    <SelectItem
                                                        key={platform.value}
                                                        value={platform.value}
                                                    >
                                                        {platform.label}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Username */}
                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Username *
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="johndoe"
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

                        {/* URL */}
                        <Controller
                            name="url"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        URL *
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="url"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="https://github.com/johndoe"
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

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseDialog}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting
                                    ? "Saving..."
                                    : editingLink
                                      ? "Update"
                                      : "Add"}{" "}
                                Link
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Social Links Grid */}
            {links.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="rounded-full bg-muted p-4 mb-4">
                            <IconExternalLink className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">
                            No social links yet
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
                            Add your social media profiles to make it easy for
                            visitors to connect with you
                        </p>
                        <Button onClick={() => handleOpenDialog()}>
                            <IconPlus className="h-4 w-4 mr-2" />
                            Add Your First Link
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {links
                        .sort((a, b) => a.order - b.order)
                        .map((link) => (
                            <Card
                                key={link.id}
                                className="group hover:border-primary/50 transition-colors"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-md bg-primary/10 p-2">
                                                {getPlatformIcon(link.platform)}
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">
                                                    {getPlatformLabel(
                                                        link.platform,
                                                    )}
                                                </CardTitle>
                                                <CardDescription className="text-xs">
                                                    @{link.username}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <IconGripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline flex items-center gap-1 truncate"
                                    >
                                        <span className="truncate">
                                            {link.url}
                                        </span>
                                        <IconExternalLink className="h-3 w-3 shrink-0" />
                                    </a>

                                    <div className="flex items-center gap-2 pt-2 border-t">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() =>
                                                handleOpenDialog(link)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(link.id)
                                            }
                                            disabled={isDeleting === link.id}
                                        >
                                            {isDeleting === link.id ? (
                                                "Deleting..."
                                            ) : (
                                                <IconTrash className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            )}

            {/* Stats */}
            {links.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Total links:</span>
                            <Badge variant="secondary">{links.length}</Badge>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
