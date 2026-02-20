"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteFormSchema, type SiteFormData } from "@/lib/schemas/site.schema";
import { updateSite, toggleSitePublish } from "@/lib/actions/sites";
import { Site } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldTitle,
} from "@/components/ui/field";
import { Card } from "@/components/ui/card";
import {
    IconDeviceFloppy,
    IconWorld,
    IconEye,
    IconEyeOff,
    IconSparkles,
    IconSearch,
    IconInfoCircle,
    IconCheck,
    IconX,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SiteSettingsClientProps {
    initialSite: Site;
}

export function SiteSettingsClient({ initialSite }: SiteSettingsClientProps) {
    const [site, setSite] = useState(initialSite);
    const [isTogglingPublish, setIsTogglingPublish] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
        reset,
        setError,
    } = useForm<SiteFormData>({
        resolver: zodResolver(siteFormSchema),
        defaultValues: {
            subdomain: site.subdomain,
            title: site.title,
            tagline: site.tagline,
            description: site.description,
            meta_title: site.meta_title,
            meta_description: site.meta_description,
            available_for_hire: site.available_for_hire,
        },
    });

    const onSubmit = async (data: SiteFormData) => {
        setSaveSuccess(false);

        try {
            const response = await updateSite(data);
            if (response.ok && response.data) {
                setSite(response.data);
                reset(data);
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            } else {
                if (response.data) {
                    Object.entries(response.data).forEach(([key, value]) => {
                        if (value) {
                            setError(key as keyof SiteFormData, {
                                type: "custom",
                                message: value[0],
                            });
                        }
                    });
                }
                alert("Failed to update site");
            }
        } catch (error) {
            console.error("Failed to update site:", error);
        }
    };

    const handleTogglePublish = async () => {
        setIsTogglingPublish(true);
        try {
            const response = await toggleSitePublish(!site.is_published);
            if (response.ok && response.data) {
                setSite(response.data);
            }
        } catch (error) {
            console.error("Failed to toggle publish:", error);
        } finally {
            setIsTogglingPublish(false);
        }
    };

    const siteUrl = `https://${site.subdomain}.limefolio.com`;

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Information Card */}
                    <Card className="p-6 space-y-6 border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <IconWorld className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Basic Information
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Your site's core identity and branding
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <FieldGroup>
                            <Field>
                                <FieldTitle>Site Title</FieldTitle>
                                <FieldDescription>
                                    The main title of your portfolio site
                                </FieldDescription>
                                <Input
                                    {...register("title")}
                                    placeholder="John Doe - Full Stack Developer"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                />
                                <FieldError errors={[errors.title]} />
                            </Field>

                            <Field>
                                <FieldTitle>Tagline</FieldTitle>
                                <FieldDescription>
                                    A short, catchy description of what you do
                                </FieldDescription>
                                <Input
                                    {...register("tagline")}
                                    placeholder="Building exceptional digital experiences"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                />
                                <FieldError errors={[errors.tagline]} />
                            </Field>

                            <Field>
                                <FieldTitle>Subdomain</FieldTitle>
                                <FieldDescription>
                                    Your unique portfolio URL. Only lowercase
                                    letters, numbers, and hyphens allowed.
                                </FieldDescription>
                                <div className="flex items-center gap-2">
                                    <Input
                                        {...register("subdomain")}
                                        placeholder="johndoe"
                                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                    />
                                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                                        .limefolio.com
                                    </span>
                                </div>
                                <FieldError errors={[errors.subdomain]} />
                            </Field>

                            <Field>
                                <FieldTitle>Description</FieldTitle>
                                <FieldDescription>
                                    A detailed description of your portfolio and
                                    professional background
                                </FieldDescription>
                                <Textarea
                                    {...register("description")}
                                    placeholder="I'm a passionate full-stack developer with 5+ years of experience..."
                                    rows={4}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                                />
                                <FieldError errors={[errors.description]} />
                            </Field>

                            <Field className="flex flex-row items-center justify-between rounded-lg border border-border/40 p-4 transition-all duration-200">
                                <div className="space-y-0.5">
                                    <FieldTitle>Available for Hire</FieldTitle>
                                    <FieldDescription>
                                        Show a badge indicating that you are
                                        open to new opportunities
                                    </FieldDescription>
                                </div>
                                <Controller
                                    control={control}
                                    name="available_for_hire"
                                    render={({ field }) => (
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </Field>
                        </FieldGroup>
                    </Card>

                    {/* SEO Settings Card */}
                    <Card className="p-6 space-y-6 border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <IconSearch className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">
                                    SEO Settings
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Optimize your site for search engines
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <FieldGroup>
                            <Field>
                                <FieldTitle>Meta Title</FieldTitle>
                                <FieldDescription>
                                    The title that appears in search results
                                    (max 60 characters)
                                </FieldDescription>
                                <Input
                                    {...register("meta_title")}
                                    placeholder="John Doe | Full Stack Developer & Designer"
                                    maxLength={60}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                />
                                <FieldError errors={[errors.meta_title]} />
                            </Field>

                            <Field>
                                <FieldTitle>Meta Description</FieldTitle>
                                <FieldDescription>
                                    The description that appears in search
                                    results (max 160 characters)
                                </FieldDescription>
                                <Textarea
                                    {...register("meta_description")}
                                    placeholder="Experienced full-stack developer specializing in React, Node.js, and cloud technologies..."
                                    rows={3}
                                    maxLength={160}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                                />
                                <FieldError
                                    errors={[errors.meta_description]}
                                />
                            </Field>
                        </FieldGroup>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Button
                            type="submit"
                            disabled={!isDirty || isSubmitting}
                            loading={isSubmitting}
                            className="gap-2 transition-all duration-200 hover:scale-105"
                        >
                            {saveSuccess ? (
                                <>
                                    <IconCheck className="w-4 h-4" />
                                    Saved!
                                </>
                            ) : (
                                <>
                                    <IconDeviceFloppy className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>

                        {isDirty && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => reset()}
                                className="gap-2"
                            >
                                <IconX className="w-4 h-4" />
                                Discard
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                {/* Site Status Card */}
                <Card className="p-6 space-y-4 border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <IconSparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Site Status</h3>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Visibility
                            </span>
                            <Badge
                                variant={
                                    site.is_published ? "default" : "secondary"
                                }
                                className={cn(
                                    "gap-1.5 transition-all duration-200",
                                    site.is_published &&
                                        "bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20",
                                )}
                            >
                                {site.is_published ? (
                                    <>
                                        <IconEye className="w-3 h-3" />
                                        Published
                                    </>
                                ) : (
                                    <>
                                        <IconEyeOff className="w-3 h-3" />
                                        Draft
                                    </>
                                )}
                            </Badge>
                        </div>

                        <Button
                            onClick={handleTogglePublish}
                            disabled={isTogglingPublish}
                            variant={site.is_published ? "outline" : "default"}
                            className="w-full gap-2 transition-all duration-200 hover:scale-105"
                        >
                            {isTogglingPublish ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Updating...
                                </>
                            ) : site.is_published ? (
                                <>
                                    <IconEyeOff className="w-4 h-4" />
                                    Unpublish Site
                                </>
                            ) : (
                                <>
                                    <IconEye className="w-4 h-4" />
                                    Publish Site
                                </>
                            )}
                        </Button>

                        {site.is_published && (
                            <div className="p-3 rounded-lg bg-muted/50 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <p className="text-xs text-muted-foreground">
                                    Your site is live at:
                                </p>
                                <a
                                    href={siteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-primary hover:underline break-all transition-colors duration-200"
                                >
                                    {siteUrl}
                                </a>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Info Card */}
                <Card className="p-6 space-y-4 border-2 border-blue-500/20 bg-blue-500/5">
                    <div className="flex items-start gap-3">
                        <IconInfoCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <div className="space-y-2">
                            <h3 className="font-semibold text-sm">
                                Quick Tips
                            </h3>
                            <ul className="text-xs text-muted-foreground space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">
                                        •
                                    </span>
                                    <span>
                                        Keep your title concise and professional
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">
                                        •
                                    </span>
                                    <span>
                                        Use keywords in your meta description
                                        for better SEO
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-0.5">
                                        •
                                    </span>
                                    <span>
                                        Your subdomain cannot be changed once
                                        set
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>

                {/* Site Stats Card */}
                <Card className="p-6 space-y-4 border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                    <h3 className="font-semibold text-sm">Site Information</h3>
                    <Separator />
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                                Created
                            </span>
                            <span className="font-medium">
                                {new Date(site.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                                Last Updated
                            </span>
                            <span className="font-medium">
                                {new Date(site.updated_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                                Site ID
                            </span>
                            <span className="font-mono text-xs">
                                {site.uuid.split("-")[0]}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
