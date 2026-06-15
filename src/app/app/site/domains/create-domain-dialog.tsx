"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { createCustomDomain } from "@/lib/actions/custom-domains";
import { IconPlus } from "@tabler/icons-react";

const domainSchema = z.object({
    domain: z
        .string()
        .min(1, "Domain is required")
        .regex(
            /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/,
            "Please enter a valid domain (e.g. example.com or www.example.com)"
        ),
});

type DomainFormData = z.infer<typeof domainSchema>;

export function CreateDomainDialog() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        setError,
    } = useForm<DomainFormData>({
        resolver: zodResolver(domainSchema),
        defaultValues: {
            domain: "",
        },
    });

    const onSubmit = async (data: DomainFormData) => {
        setIsLoading(true);
        try {
            const response = await createCustomDomain({ domain: data.domain });
            if (response.ok) {
                setOpen(false);
                reset();
            } else {
                // If API returns an error for duplicate/invalid domain
                const errData = response.data as any;
                setError("domain", { message: errData?.error || errData?.domain?.[0] || "Failed to add domain." });
            }
        } catch (error) {
            setError("domain", { message: "An unexpected error occurred." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) reset();
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <IconPlus className="w-4 h-4 mr-2" />
                    Add Domain
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add Custom Domain</DialogTitle>
                        <DialogDescription>
                            Enter the domain you want to connect to your portfolio.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                        <Controller
                            name="domain"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="domain">Domain Name *</FieldLabel>
                                    <Input
                                        {...field}
                                        id="domain"
                                        placeholder="portfolio.example.com"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add Domain"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
