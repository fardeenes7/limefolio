"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";

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
    initialLink: SocialLink;
}

export function SocialLinksClient({ initialLink }: SocialLinksClientProps) {
    const { refresh } = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

    const defaultValues = initialLink || {
        platform: undefined,
        url: "",
        username: "",
        order: 0,
    };

    const form = useForm<SocialLinkFormData>({
        resolver: zodResolver(socialLinkFormSchema),
        defaultValues: defaultValues as any,
    });

    useEffect(() => {
        form.reset(defaultValues as any);
    }, [initialLink, form]);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingLink(null);
        form.reset();
    };

    const onSubmit = async (data: SocialLinkFormData) => {
        try {
            let response;
            if (editingLink) {
                response = await updateSocialLink(editingLink.id, data);
            } else {
                response = await createSocialLink(data);
            }

            console.log(response);

            if (response.ok && response.data) {
                refresh();
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
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <IconPlus />
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
                                        {SOCIAL_PLATFORMS.map((platform) => (
                                            <SelectItem
                                                key={platform.value}
                                                value={platform.value}
                                            >
                                                {platform.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
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
                                    <FieldError errors={[fieldState.error]} />
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
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseDialog}
                            disabled={form.formState.isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
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
    );
}
