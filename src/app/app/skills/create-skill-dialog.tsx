"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    skillFormSchema,
    SKILL_CATEGORIES,
    SKILL_PROFICIENCY,
} from "@/lib/schemas";
import { createSkill } from "@/lib/actions";
import { Skill, SkillFormData } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldDescription,
    FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    IconCode,
    IconCategory,
    IconChartBar,
    IconFileText,
    IconClock,
    IconPhoto,
    IconStar,
    IconEye,
} from "@tabler/icons-react";

interface CreateSkillDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (skill: Skill) => void;
}

export function CreateSkillDialog({
    open,
    onOpenChange,
    onSuccess,
}: CreateSkillDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<SkillFormData>({
        resolver: zodResolver(skillFormSchema),
        defaultValues: {
            name: "",
            category: "programming",
            proficiency: "intermediate",
            description: "",
            years_of_experience: null,
            icon_url: "",
            is_featured: false,
            is_published: true,
            order: 0,
        },
    });

    const onSubmit = async (data: SkillFormData) => {
        setIsSubmitting(true);
        const response = await createSkill(data);

        if (response.ok && response.data) {
            onSuccess(response.data);
            form.reset();
        } else {
            alert("Failed to create skill. Please try again.");
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Skill</DialogTitle>
                    <DialogDescription>
                        Add a new skill to your portfolio
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FieldGroup>
                        <Field>
                            <FieldLabel>
                                <IconCode className="h-4 w-4" />
                                Skill Name *
                            </FieldLabel>
                            <Input
                                placeholder="e.g., Python, React, Docker"
                                {...form.register("name")}
                            />
                            <FieldError errors={[form.formState.errors.name]} />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>
                                    <IconCategory className="h-4 w-4" />
                                    Category *
                                </FieldLabel>
                                <Select
                                    onValueChange={(value) =>
                                        form.setValue("category", value as any)
                                    }
                                    defaultValue={form.watch("category")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(SKILL_CATEGORIES).map(
                                            ([value, label]) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <FieldError
                                    errors={[form.formState.errors.category]}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    <IconChartBar className="h-4 w-4" />
                                    Proficiency *
                                </FieldLabel>
                                <Select
                                    onValueChange={(value) =>
                                        form.setValue(
                                            "proficiency",
                                            value as any,
                                        )
                                    }
                                    defaultValue={form.watch("proficiency")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select proficiency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(SKILL_PROFICIENCY).map(
                                            ([value, label]) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <FieldError
                                    errors={[form.formState.errors.proficiency]}
                                />
                            </Field>
                        </div>

                        <Field>
                            <FieldLabel>
                                <IconFileText className="h-4 w-4" />
                                Description
                            </FieldLabel>
                            <Textarea
                                placeholder="Describe your experience with this skill..."
                                rows={4}
                                {...form.register("description")}
                            />
                            <FieldError
                                errors={[form.formState.errors.description]}
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>
                                    <IconClock className="h-4 w-4" />
                                    Years of Experience
                                </FieldLabel>
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="0"
                                    {...form.register("years_of_experience", {
                                        setValueAs: (v) =>
                                            v === "" ? null : parseInt(v),
                                    })}
                                />
                                <FieldError
                                    errors={[
                                        form.formState.errors
                                            .years_of_experience,
                                    ]}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    <IconPhoto className="h-4 w-4" />
                                    Icon URL
                                </FieldLabel>
                                <Input
                                    placeholder="https://..."
                                    {...form.register("icon_url")}
                                />
                                <FieldDescription>
                                    Use DevIcons or Simple Icons
                                </FieldDescription>
                                <FieldError
                                    errors={[form.formState.errors.icon_url]}
                                />
                            </Field>
                        </div>

                        <div className="flex gap-6">
                            <Field orientation="horizontal">
                                <Checkbox
                                    checked={form.watch("is_featured")}
                                    onCheckedChange={(checked) =>
                                        form.setValue(
                                            "is_featured",
                                            checked as boolean,
                                        )
                                    }
                                />
                                <FieldLabel className="cursor-pointer font-normal">
                                    <IconStar className="h-4 w-4" />
                                    Featured Skill
                                </FieldLabel>
                            </Field>

                            <Field orientation="horizontal">
                                <Checkbox
                                    checked={form.watch("is_published")}
                                    onCheckedChange={(checked) =>
                                        form.setValue(
                                            "is_published",
                                            checked as boolean,
                                        )
                                    }
                                />
                                <FieldLabel className="cursor-pointer font-normal">
                                    <IconEye className="h-4 w-4" />
                                    Published
                                </FieldLabel>
                            </Field>
                        </div>
                    </FieldGroup>

                    <div className="flex gap-3 justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Skill"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
