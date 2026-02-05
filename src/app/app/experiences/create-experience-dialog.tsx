"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceFormSchema } from "@/lib/schemas";
import { createExperience } from "@/lib/actions";
import { Experience, ExperienceFormData } from "@/types";
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
    IconBriefcase,
    IconBuilding,
    IconFileText,
    IconCategory,
    IconMapPin,
    IconCalendar,
    IconWorld,
    IconPhoto,
    IconClock,
    IconEye,
} from "@tabler/icons-react";

interface CreateExperienceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (experience: Experience) => void;
}

const EMPLOYMENT_TYPES = [
    "Full Time",
    "Part Time",
    "Internship",
    "Freelance",
] as const;

export function CreateExperienceDialog({
    open,
    onOpenChange,
    onSuccess,
}: CreateExperienceDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ExperienceFormData>({
        resolver: zodResolver(experienceFormSchema),
        defaultValues: {
            company: "",
            position: "",
            description: "",
            type: "Full Time",
            company_logo: null,
            url: null,
            location: null,
            start_date: "",
            end_date: null,
            is_current: false,
            is_published: true,
            order: 0,
        },
    });

    const isCurrent = form.watch("is_current");

    const onSubmit = async (data: ExperienceFormData) => {
        setIsSubmitting(true);

        // If current, remove end_date
        if (data.is_current) {
            data.end_date = null;
        }

        const response = await createExperience(data);

        if (response.ok && response.data) {
            onSuccess(response.data);
            form.reset();
        } else {
            alert("Failed to create experience. Please try again.");
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Experience</DialogTitle>
                    <DialogDescription>
                        Add a new work experience to your portfolio
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FieldGroup>
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>
                                    <IconBriefcase className="h-4 w-4" />
                                    Position *
                                </FieldLabel>
                                <Input
                                    placeholder="e.g., Software Engineer"
                                    {...form.register("position")}
                                />
                                <FieldError
                                    errors={[form.formState.errors.position]}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    <IconBuilding className="h-4 w-4" />
                                    Company *
                                </FieldLabel>
                                <Input
                                    placeholder="e.g., Google"
                                    {...form.register("company")}
                                />
                                <FieldError
                                    errors={[form.formState.errors.company]}
                                />
                            </Field>
                        </div>

                        <Field>
                            <FieldLabel>
                                <IconFileText className="h-4 w-4" />
                                Description *
                            </FieldLabel>
                            <Textarea
                                placeholder="Describe your responsibilities and achievements..."
                                rows={5}
                                {...form.register("description")}
                            />
                            <FieldError
                                errors={[form.formState.errors.description]}
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>
                                    <IconCategory className="h-4 w-4" />
                                    Employment Type
                                </FieldLabel>
                                <Select
                                    onValueChange={(value) =>
                                        form.setValue("type", value as any)
                                    }
                                    defaultValue={form.watch("type")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {EMPLOYMENT_TYPES.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FieldError
                                    errors={[form.formState.errors.type]}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    <IconMapPin className="h-4 w-4" />
                                    Location
                                </FieldLabel>
                                <Input
                                    placeholder="e.g., San Francisco, CA"
                                    {...form.register("location")}
                                />
                                <FieldError
                                    errors={[form.formState.errors.location]}
                                />
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>
                                    <IconCalendar className="h-4 w-4" />
                                    Start Date *
                                </FieldLabel>
                                <Input
                                    type="date"
                                    {...form.register("start_date")}
                                />
                                <FieldError
                                    errors={[form.formState.errors.start_date]}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    <IconCalendar className="h-4 w-4" />
                                    End Date
                                </FieldLabel>
                                <Input
                                    type="date"
                                    {...form.register("end_date")}
                                    disabled={isCurrent}
                                />
                                <FieldDescription>
                                    Leave empty if current position
                                </FieldDescription>
                                <FieldError
                                    errors={[form.formState.errors.end_date]}
                                />
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>
                                    <IconWorld className="h-4 w-4" />
                                    Company Website
                                </FieldLabel>
                                <Input
                                    placeholder="https://..."
                                    {...form.register("url")}
                                />
                                <FieldError
                                    errors={[form.formState.errors.url]}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    <IconPhoto className="h-4 w-4" />
                                    Company Logo URL
                                </FieldLabel>
                                <Input
                                    placeholder="https://..."
                                    {...form.register("company_logo")}
                                />
                                <FieldError
                                    errors={[
                                        form.formState.errors.company_logo,
                                    ]}
                                />
                            </Field>
                        </div>

                        <div className="flex gap-6">
                            <Field orientation="horizontal">
                                <Checkbox
                                    checked={form.watch("is_current")}
                                    onCheckedChange={(checked) =>
                                        form.setValue(
                                            "is_current",
                                            checked as boolean,
                                        )
                                    }
                                />
                                <FieldLabel className="cursor-pointer font-normal">
                                    <IconClock className="h-4 w-4" />I currently
                                    work here
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
                            {isSubmitting ? "Creating..." : "Create Experience"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
