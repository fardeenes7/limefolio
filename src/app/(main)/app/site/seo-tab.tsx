import { useState, useEffect } from "react";
import { useForm, Controller, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSEOFormSchema, type SiteSEOFormData } from "@/lib/schemas/site-seo.schema";
import { updateSiteSEO } from "@/lib/actions/seo";
import type { SiteSEO, Site } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldTitle,
} from "@/components/ui/field";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getTemplate } from "@/templates/registry";
import {
    IconSearch,
    IconPhotoShare,
    IconChartLine,
    IconRobot,
    IconFiles,
    IconUpload,
} from "@tabler/icons-react";

// Hook to manage SEO form state hoisted to the parent header
export function useSeoForm(initialSeo?: SiteSEO) {
    const [saveSuccess, setSaveSuccess] = useState(false);

    const form = useForm<SiteSEOFormData>({
        resolver: zodResolver(siteSEOFormSchema),
        defaultValues: {
            default_meta_title: initialSeo?.default_meta_title || "",
            default_meta_description: initialSeo?.default_meta_description || "",
            og_image: initialSeo?.og_image || "",
            google_analytics_id: initialSeo?.google_analytics_id || "",
            google_tag_manager_id: initialSeo?.google_tag_manager_id || "",
            facebook_pixel_id: initialSeo?.facebook_pixel_id || "",
            robots_default: initialSeo?.robots_default || "index,follow",
            page_meta: initialSeo?.page_meta || {},
        },
    });

    const onSubmit = async (data: SiteSEOFormData) => {
        setSaveSuccess(false);
        try {
            const response = await updateSiteSEO(data);
            if (response.ok && response.data) {
                form.reset(data);
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            } else {
                if (response.data) {
                    Object.entries(response.data).forEach(([key, value]) => {
                        if (value) {
                            form.setError(key as keyof SiteSEOFormData, {
                                type: "custom",
                                message: (value as string[])[0],
                            });
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Failed to update site SEO:", error);
        }
    };

    return {
        ...form,
        isDirty: form.formState.isDirty,
        isSubmitting: form.formState.isSubmitting,
        saveSuccess,
        onSubmit,
        reset: () => form.reset(),
    };
}

export function SeoTab({
    formProps,
    site,
}: {
    formProps: ReturnType<typeof useSeoForm>;
    site: Site;
}) {
    const { register, control, formState: { errors }, handleSubmit, onSubmit } = formProps;
    
    const templateDef = getTemplate(site.template || "default");
    const pages = templateDef.pages || [];

    return (
        <form
            id="site-seo-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 pb-20"
        >
            {/* 1. Defaults */}
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <IconSearch className="w-5 h-5 text-primary" />
                        Site-wide Defaults
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Fallback meta title and description for all pages.</p>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-5">
                        <Field>
                            <FieldTitle>Default Meta Title</FieldTitle>
                            <Input {...register("default_meta_title")} placeholder="John Doe | Full Stack Developer" maxLength={60} />
                            <div className="flex justify-end mt-1">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">max 60</span>
                            </div>
                            <FieldError errors={[errors.default_meta_title]} />
                        </Field>
                        <Field>
                            <FieldTitle>Default Meta Description</FieldTitle>
                            <Textarea
                                {...register("default_meta_description")}
                                placeholder="Experienced developer specializing in React, Node, and Python."
                                rows={4}
                                maxLength={160}
                                className="resize-none"
                            />
                            <div className="flex justify-end mt-1">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">max 160</span>
                            </div>
                            <FieldError errors={[errors.default_meta_description]} />
                        </Field>
                    </div>
                    {/* Google SERP Preview */}
                    <div>
                        <p className="text-sm font-medium mb-3">Google Preview</p>
                        <div className="rounded-lg border bg-background p-4 shadow-sm font-sans max-w-[600px]">
                            <p className="text-[13px] text-[#4d5156] dark:text-[#bdc1c6] truncate mb-1">
                                https://{site.subdomain}.limefolio.com
                            </p>
                            <p className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate mb-1">
                                {formProps.watch("default_meta_title") || "John Doe | Full Stack Developer"}
                            </p>
                            <p className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] leading-snug line-clamp-2">
                                {formProps.watch("default_meta_description") || "Experienced developer specializing in React, Node, and Python..."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Open Graph */}
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <IconPhotoShare className="w-5 h-5 text-primary" />
                        Social Sharing (Open Graph)
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">The image shown when your site is shared on Twitter, LinkedIn, etc.</p>
                </div>
                <Field>
                    <FieldTitle>Global OG Image URL</FieldTitle>
                    <Input {...register("og_image")} placeholder="https://example.com/og.jpg" className="max-w-xl" />
                    <FieldDescription>URL of the image to display. Recommended size: 1200x630px.</FieldDescription>
                    <FieldError errors={[errors.og_image]} />
                </Field>
            </div>

            {/* 3. Analytics */}
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <IconChartLine className="w-5 h-5 text-primary" />
                        Analytics & Tracking
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Connect third-party analytics to track your visitors.</p>
                </div>
                <div className="space-y-5 max-w-xl">
                    <Field>
                        <FieldTitle>Google Analytics (GA4)</FieldTitle>
                        <Input {...register("google_analytics_id")} placeholder="G-XXXXXXXXXX" />
                        <FieldError errors={[errors.google_analytics_id]} />
                    </Field>
                    <Field>
                        <FieldTitle>Google Tag Manager</FieldTitle>
                        <Input {...register("google_tag_manager_id")} placeholder="GTM-XXXXXXX" />
                        <FieldError errors={[errors.google_tag_manager_id]} />
                    </Field>
                    <Field>
                        <FieldTitle>Facebook Pixel</FieldTitle>
                        <Input {...register("facebook_pixel_id")} placeholder="123456789012345" />
                        <FieldError errors={[errors.facebook_pixel_id]} />
                    </Field>
                </div>
            </div>

            {/* 4. Robots */}
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <IconRobot className="w-5 h-5 text-primary" />
                        Robots & Crawling
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Tell search engines how to index your site.</p>
                </div>
                <Controller
                    control={control}
                    name="robots_default"
                    render={({ field }) => (
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-3"
                        >
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="index,follow" id="r1" />
                                <Label htmlFor="r1" className="font-normal">Index, Follow (Recommended - Allow all search engines)</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="noindex,follow" id="r2" />
                                <Label htmlFor="r2" className="font-normal">No Index, Follow (Don't show in search, but follow links)</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="index,nofollow" id="r3" />
                                <Label htmlFor="r3" className="font-normal">Index, No Follow (Show in search, ignore links)</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="noindex,nofollow" id="r4" />
                                <Label htmlFor="r4" className="font-normal">No Index, No Follow (Hide site completely from search)</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
            </div>

            {/* 5. Per-page Overrides */}
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <IconFiles className="w-5 h-5 text-primary" />
                        Per-page Overrides
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Customize SEO metadata for specific pages. Leave blank to use site-wide defaults.</p>
                </div>
                
                <Accordion type="single" collapsible className="w-full border rounded-lg divide-y">
                    {pages.map((page) => (
                        <AccordionItem value={page.key} key={page.key} className="border-b-0">
                            <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{page.label}</span>
                                    <span className="text-xs text-muted-foreground font-normal px-2 py-0.5 rounded-full bg-muted">
                                        /{page.key === "landing" ? "" : page.key}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-4 bg-muted/20 border-t space-y-5">
                                <Field>
                                    <FieldTitle>Meta Title Override</FieldTitle>
                                    <Input {...register(`page_meta.${page.key}.meta_title` as const)} placeholder="Leave blank to use default title" className="bg-background" />
                                </Field>
                                <Field>
                                    <FieldTitle>Meta Description Override</FieldTitle>
                                    <Textarea 
                                        {...register(`page_meta.${page.key}.meta_description` as const)} 
                                        placeholder="Leave blank to use default description" 
                                        className="bg-background resize-none" 
                                        rows={2} 
                                    />
                                </Field>
                                <Field>
                                    <FieldTitle>OG Image URL Override</FieldTitle>
                                    <Input {...register(`page_meta.${page.key}.og_image` as const)} placeholder="Leave blank to use default image" className="bg-background" />
                                </Field>
                                <Field>
                                    <FieldTitle>Robots Override</FieldTitle>
                                    <Controller
                                        control={control}
                                        name={`page_meta.${page.key}.robots` as const}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="">Use Site Default</option>
                                                <option value="index,follow">Index, Follow</option>
                                                <option value="noindex,follow">No Index, Follow</option>
                                                <option value="index,nofollow">Index, No Follow</option>
                                                <option value="noindex,nofollow">No Index, No Follow</option>
                                            </select>
                                        )}
                                    />
                                </Field>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </form>
    );
}
