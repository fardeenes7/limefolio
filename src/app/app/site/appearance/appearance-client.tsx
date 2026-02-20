"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteFormSchema, type SiteFormData } from "@/lib/schemas/site.schema";
import { updateSite } from "@/lib/actions/sites";
import { Site } from "@/types";
import { Button } from "@/components/ui/button";
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
    IconCheck,
    IconX,
    IconPalette,
    IconLayout,
    IconTypography,
    IconExternalLink,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TEMPLATES_META } from "@/lib/templates-meta";
import { THEMES_META, FONTS_META } from "@/lib/themes-meta";
import Link from "next/link";

const PREVIEW_BASE_URL =
    process.env.NEXT_PUBLIC_PREVIEW_URL ?? "http://preview.localhost:3001";

interface AppearanceClientProps {
    initialSite: Site;
}

/** Three small colour swatches shown on each theme card */
function SwatchRow({ swatches }: { swatches: [string, string, string] }) {
    return (
        <div className="flex gap-1.5 shrink-0">
            {swatches.map((color, i) => (
                <span
                    key={i}
                    className="inline-block w-4 h-4 rounded-full border border-black/10 dark:border-white/10"
                    style={{ background: color }}
                />
            ))}
        </div>
    );
}

export function AppearanceClient({ initialSite }: AppearanceClientProps) {
    const [site, setSite] = useState(initialSite);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isSubmitting },
        reset,
        setError,
    } = useForm<SiteFormData>({
        resolver: zodResolver(siteFormSchema),
        defaultValues: {
            template: site.template ?? "default",
            theme: site.theme ?? "default",
            font: site.font ?? "inter",
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
                                message: (value as string[])[0],
                            });
                        }
                    });
                }
                alert("Failed to save appearance settings");
            }
        } catch (err) {
            console.error("Failed to save appearance:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ── Template ──────────────────────────────────────────────── */}
            <Card className="p-6 space-y-6 border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <IconLayout className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Template</h2>
                        <p className="text-sm text-muted-foreground">
                            The overall layout structure of your portfolio
                        </p>
                    </div>
                </div>

                <Separator />

                <FieldGroup>
                    <Field>
                        <Controller
                            control={control}
                            name="template"
                            render={({ field }) => (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {TEMPLATES_META.map((tmpl) => {
                                        const isSelected =
                                            field.value === tmpl.slug;
                                        const previewUrl = `${PREVIEW_BASE_URL}?template=${tmpl.slug}`;

                                        return (
                                            <div
                                                key={tmpl.slug}
                                                className={cn(
                                                    "relative rounded-xl border-2 overflow-hidden transition-all duration-200",
                                                    isSelected
                                                        ? "border-primary shadow-md shadow-primary/10"
                                                        : "border-border hover:border-primary/40",
                                                )}
                                            >
                                                {/* Click-to-select overlay */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        field.onChange(
                                                            tmpl.slug,
                                                        )
                                                    }
                                                    className="w-full text-left focus-visible:outline-none"
                                                >
                                                    {/* Preview strip */}
                                                    <div
                                                        className={cn(
                                                            "h-28 flex items-center justify-center",
                                                            tmpl.slug ===
                                                                "default" &&
                                                                "bg-linear-to-br from-primary/20 via-primary/10 to-transparent",
                                                            tmpl.slug ===
                                                                "minimal" &&
                                                                "bg-linear-to-br from-muted via-muted/50 to-transparent",
                                                            tmpl.slug ===
                                                                "modern" &&
                                                                "bg-linear-to-br from-violet-500/20 via-violet-500/10 to-transparent",
                                                            tmpl.slug ===
                                                                "prism" &&
                                                                "bg-linear-to-br from-fuchsia-500/20 via-cyan-500/10 to-transparent",
                                                        )}
                                                    >
                                                        <span className="text-3xl font-black tracking-tight text-foreground/10 select-none uppercase">
                                                            {tmpl.name}
                                                        </span>
                                                    </div>

                                                    {/* Info */}
                                                    <div className="p-4 space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold text-sm">
                                                                {tmpl.name}
                                                            </p>
                                                            {isSelected && (
                                                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground">
                                                                    <IconCheck className="w-3 h-3" />
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                                            {tmpl.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {tmpl.tags.map(
                                                                (tag) => (
                                                                    <Badge
                                                                        key={
                                                                            tag
                                                                        }
                                                                        variant="secondary"
                                                                        className="text-[10px] px-1.5 py-0 font-normal"
                                                                    >
                                                                        {tag}
                                                                    </Badge>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>

                                                {/* Preview link */}
                                                <div className="px-4 pb-4">
                                                    <Link
                                                        href={previewUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="w-full gap-1.5 text-xs"
                                                        >
                                                            <IconExternalLink className="w-3 h-3" />
                                                            Preview live
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        />
                        <FieldError errors={[errors.template]} />
                    </Field>
                </FieldGroup>
            </Card>

            {/* ── Color Theme ───────────────────────────────────────────── */}
            <Card className="p-6 space-y-6 border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <IconPalette className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Color Theme</h2>
                        <p className="text-sm text-muted-foreground">
                            The color palette applied across your portfolio
                        </p>
                    </div>
                </div>

                <Separator />

                <FieldGroup>
                    <Field>
                        <Controller
                            control={control}
                            name="theme"
                            render={({ field }) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {THEMES_META.map((theme) => {
                                        const isSelected =
                                            field.value === theme.slug;
                                        return (
                                            <button
                                                key={theme.slug}
                                                type="button"
                                                onClick={() =>
                                                    field.onChange(theme.slug)
                                                }
                                                className={cn(
                                                    "relative flex items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                                    isSelected
                                                        ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                                                        : "border-border hover:border-primary/40 hover:bg-muted/40",
                                                )}
                                            >
                                                {/* Large swatch block */}
                                                <div
                                                    className="w-12 h-12 rounded-lg border border-black/10 dark:border-white/10 shrink-0 overflow-hidden grid grid-cols-2"
                                                    aria-hidden
                                                >
                                                    <span
                                                        className="col-span-2"
                                                        style={{
                                                            background:
                                                                theme
                                                                    .swatches[0],
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            background:
                                                                theme
                                                                    .swatches[1],
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            background:
                                                                theme
                                                                    .swatches[2],
                                                        }}
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="font-semibold text-sm">
                                                        {theme.name}
                                                    </p>
                                                    {theme.description && (
                                                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                                            {theme.description}
                                                        </p>
                                                    )}
                                                    {/* inline swatches */}
                                                    <SwatchRow
                                                        swatches={
                                                            theme.swatches
                                                        }
                                                    />
                                                </div>

                                                {isSelected && (
                                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground shrink-0">
                                                        <IconCheck className="w-3 h-3" />
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        />
                        <FieldError errors={[errors.theme]} />
                    </Field>
                </FieldGroup>
            </Card>

            {/* ── Font ──────────────────────────────────────────────────── */}
            <Card className="p-6 space-y-6 border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <IconTypography className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Typography</h2>
                        <p className="text-sm text-muted-foreground">
                            The typeface used throughout your portfolio
                        </p>
                    </div>
                </div>

                <Separator />

                <FieldGroup>
                    <Field>
                        <Controller
                            control={control}
                            name="font"
                            render={({ field }) => (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {FONTS_META.map((font) => {
                                        const isSelected =
                                            field.value === font.slug;
                                        return (
                                            <button
                                                key={font.slug}
                                                type="button"
                                                onClick={() =>
                                                    field.onChange(font.slug)
                                                }
                                                className={cn(
                                                    "relative flex flex-col gap-1.5 rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                                    isSelected
                                                        ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                                                        : "border-border hover:border-primary/40 hover:bg-muted/40",
                                                )}
                                            >
                                                {isSelected && (
                                                    <span className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground">
                                                        <IconCheck className="w-3 h-3" />
                                                    </span>
                                                )}
                                                {/* Live preview using system font stack */}
                                                <span
                                                    className="text-3xl font-semibold leading-none text-foreground/80"
                                                    style={{
                                                        fontFamily:
                                                            font.previewStack,
                                                    }}
                                                >
                                                    Aa
                                                </span>
                                                <span className="text-xs font-medium text-foreground">
                                                    {font.name}
                                                </span>
                                                <span
                                                    className="text-[11px] text-muted-foreground leading-snug"
                                                    style={{
                                                        fontFamily:
                                                            font.previewStack,
                                                    }}
                                                >
                                                    The quick brown fox
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        />
                        <FieldError errors={[errors.font]} />
                    </Field>
                </FieldGroup>
            </Card>

            {/* ── Action bar ────────────────────────────────────────────── */}
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
    );
}
