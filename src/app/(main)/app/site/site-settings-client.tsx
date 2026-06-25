"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteFormSchema, type SiteFormData } from "@/lib/schemas/site.schema";
import { updateSite, toggleSitePublish } from "@/lib/actions/sites";
import { Site, CustomDomain } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useSeoForm } from "./seo-tab";
import { SeoTab } from "./seo-tab";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldTitle,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { DomainsClient } from "./domains/domains-client";
import { CreateDomainDialog } from "./domains/create-domain-dialog";
import Link from "next/link";
import {
    IconDeviceFloppy,
    IconEye,
    IconEyeOff,
    IconSparkles,
    IconSearch,
    IconWorld,
    IconGlobe,
    IconPalette,
    IconCheck,
    IconX,
    IconArrowRight,
    IconInfoCircle,
    IconTemplate,
    IconTypography,
} from "@tabler/icons-react";
import {
    Page,
    PageAction,
    PageBody,
    PageDescription,
    PageHeader,
    PageHeading,
    PageTitle,
} from "@/components/ui/page";

// ─── Types ──────────────────────────────────────────────────────────────────

type TabId = "general" | "seo" | "domains" | "appearance";

interface Tab {
    id: TabId;
    label: string;
    icon: React.ElementType;
    description: string;
}

const TABS: Tab[] = [
    {
        id: "general",
        label: "General",
        icon: IconWorld,
        description: "Basic info",
    },
    {
        id: "seo",
        label: "SEO",
        icon: IconSearch,
        description: "Search visibility",
    },
    {
        id: "domains",
        label: "Domains",
        icon: IconGlobe,
        description: "Custom domains",
    },
    {
        id: "appearance",
        label: "Appearance",
        icon: IconPalette,
        description: "Template & theme",
    },
];

// ─── Props ───────────────────────────────────────────────────────────────────

interface SiteSettingsClientProps {
    initialSite: Site;
    initialDomains: CustomDomain[];
}

// ─── Root component ──────────────────────────────────────────────────────────

export function SiteSettingsClient({
    initialSite,
    initialDomains,
}: SiteSettingsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rawTab = searchParams.get("tab") as TabId | null;
    const activeTab: TabId =
        rawTab && TABS.some((t) => t.id === rawTab) ? rawTab : "general";

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
            available_for_hire: site.available_for_hire,
        },
    });

    const seoFormProps = useSeoForm(site.seo);

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

    const setTab = (id: TabId) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", id);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const siteUrl = `https://${site.subdomain}.limefolio.com`;

    return (
        <Page>
            {/* ── Page header ──────────────────────────────────────────── */}
            <PageHeader>
                <PageHeading>
                    <PageTitle>Site Settings</PageTitle>
                    <PageDescription>
                        Manage your portfolio's configuration, domains, and appearance.
                    </PageDescription>
                </PageHeading>

                <PageAction>
                    <div className="flex items-center gap-3">
                        {/* Publish status */}
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="outline"
                                className={cn(
                                    "gap-1.5 transition-all duration-300 text-xs py-0.5",
                                    site.is_published
                                        ? "border-green-500/30 bg-green-500/8 text-green-700 dark:text-green-400"
                                        : "border-border text-muted-foreground"
                                )}
                            >
                                <span
                                    className={cn(
                                        "inline-block w-1.5 h-1.5 rounded-full",
                                        site.is_published
                                            ? "bg-green-500"
                                            : "bg-muted-foreground/50"
                                    )}
                                />
                                {site.is_published ? "Published" : "Draft"}
                            </Badge>

                            <Button
                                variant={site.is_published ? "outline" : "default"}
                                size="sm"
                                onClick={handleTogglePublish}
                                disabled={isTogglingPublish}
                                className="gap-1.5 transition-all duration-200"
                            >
                                {isTogglingPublish ? (
                                    <>
                                        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Updating…
                                    </>
                                ) : site.is_published ? (
                                    <>
                                        <IconEyeOff className="w-3.5 h-3.5" />
                                        Unpublish
                                    </>
                                ) : (
                                    <>
                                        <IconEye className="w-3.5 h-3.5" />
                                        Publish Site
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* General tab save actions */}
                        {activeTab === "general" && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                                {isDirty && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => reset()}
                                        className="gap-1.5"
                                    >
                                        <IconX className="w-3.5 h-3.5" />
                                        Discard
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    form="site-settings-form"
                                    size="sm"
                                    disabled={!isDirty || isSubmitting}
                                    loading={isSubmitting}
                                    className="gap-1.5 transition-all duration-200"
                                >
                                    {saveSuccess ? (
                                        <>
                                            <IconCheck className="w-3.5 h-3.5" />
                                            Saved!
                                        </>
                                    ) : (
                                        <>
                                            <IconDeviceFloppy className="w-3.5 h-3.5" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* SEO tab save actions */}
                        {activeTab === "seo" && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                                {seoFormProps.isDirty && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => seoFormProps.reset()}
                                        className="gap-1.5"
                                    >
                                        <IconX className="w-3.5 h-3.5" />
                                        Discard
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    form="site-seo-form"
                                    size="sm"
                                    disabled={!seoFormProps.isDirty || seoFormProps.isSubmitting}
                                    loading={seoFormProps.isSubmitting}
                                    className="gap-1.5 transition-all duration-200"
                                >
                                    {seoFormProps.saveSuccess ? (
                                        <>
                                            <IconCheck className="w-3.5 h-3.5" />
                                            Saved!
                                        </>
                                    ) : (
                                        <>
                                            <IconDeviceFloppy className="w-3.5 h-3.5" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Domains tab add domain action */}
                        {activeTab === "domains" && (
                            <div className="animate-in fade-in slide-in-from-right-2 duration-200">
                                <CreateDomainDialog />
                            </div>
                        )}
                    </div>
                </PageAction>
            </PageHeader>

            <PageBody>
                <div className="flex gap-8 items-start">
                    {/* ── Left nav ─────────────────────────────────────── */}
                    <nav className="w-52 shrink-0 sticky top-6 space-y-0.5">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    id={`site-settings-tab-${tab.id}`}
                                    onClick={() => setTab(tab.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group",
                                        isActive
                                            ? "bg-primary/8 text-primary"
                                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all duration-150",
                                            isActive
                                                ? "bg-primary/15 text-primary"
                                                : "bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground"
                                        )}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div
                                            className={cn(
                                                "text-sm font-medium leading-tight",
                                                isActive
                                                    ? "text-primary"
                                                    : "text-foreground"
                                            )}
                                        >
                                            {tab.label}
                                        </div>
                                        <div className="text-xs text-muted-foreground truncate mt-0.5">
                                            {tab.description}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <div className="ml-auto w-1 h-4 bg-primary rounded-full shrink-0" />
                                    )}
                                </button>
                            );
                        })}

                        <Separator className="my-3" />

                        {/* Live site link */}
                        {site.is_published && (
                            <a
                                href={siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                            >
                                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 bg-green-500/10 text-green-600 dark:text-green-400">
                                    <IconEye className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-sm font-medium leading-tight text-foreground">
                                        View Live Site
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate mt-0.5">
                                        {site.subdomain}.limefolio.com
                                    </div>
                                </div>
                                <IconArrowRight className="ml-auto w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                            </a>
                        )}
                    </nav>

                    {/* ── Content area ─────────────────────────────────── */}
                    <div className="flex-1 min-w-0">
                        {activeTab === "general" && (
                            <GeneralTab
                                register={register}
                                control={control}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                onSubmit={onSubmit}
                            />
                        )}
                        {activeTab === "seo" && (
                            <SeoTab formProps={seoFormProps} site={site} />
                        )}
                        {activeTab === "domains" && (
                            <DomainsTab initialDomains={initialDomains} />
                        )}
                        {activeTab === "appearance" && (
                            <AppearanceTab site={site} />
                        )}
                    </div>
                </div>
            </PageBody>
        </Page>
    );
}

// ─── General Tab ─────────────────────────────────────────────────────────────

function GeneralTab({
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
}: {
    register: ReturnType<typeof useForm<SiteFormData>>["register"];
    control: ReturnType<typeof useForm<SiteFormData>>["control"];
    errors: ReturnType<typeof useForm<SiteFormData>>["formState"]["errors"];
    handleSubmit: ReturnType<typeof useForm<SiteFormData>>["handleSubmit"];
    onSubmit: (data: SiteFormData) => Promise<void>;
}) {
    return (
        <form
            id="site-settings-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            {/* Basic Information Card */}
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <IconWorld className="w-5 h-5 text-primary" />
                        Site Identity
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Your site's core identity shown to visitors.</p>
                </div>
                
                <div className="space-y-5">
                    <Field>
                        <FieldTitle>Site Title</FieldTitle>
                        <FieldDescription>The main title of your portfolio site.</FieldDescription>
                        <Input {...register("title")} placeholder="John Doe – Full Stack Developer" className="max-w-xl" />
                        <FieldError errors={[errors.title]} />
                    </Field>

                    <Field>
                        <FieldTitle>Tagline</FieldTitle>
                        <FieldDescription>A short, catchy description of what you do.</FieldDescription>
                        <Input {...register("tagline")} placeholder="Building exceptional digital experiences" className="max-w-xl" />
                        <FieldError errors={[errors.tagline]} />
                    </Field>

                    <Field>
                        <FieldTitle>Subdomain</FieldTitle>
                        <FieldDescription>Your unique portfolio URL. Only lowercase letters, numbers, and hyphens.</FieldDescription>
                        <InputGroup className="max-w-xl">
                            <InputGroupInput {...register("subdomain")} placeholder="johndoe" />
                            <InputGroupAddon align="inline-end">.limefolio.com</InputGroupAddon>
                        </InputGroup>
                        <FieldError errors={[errors.subdomain]} />
                    </Field>
                </div>
            </div>

            {/* About Card */}
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <IconPalette className="w-5 h-5 text-primary" />
                        About
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">A detailed description of your portfolio and professional background.</p>
                </div>
                
                <Field>
                    <FieldTitle>Description</FieldTitle>
                    <Textarea
                        {...register("description")}
                        placeholder="I'm a passionate full-stack developer with 5+ years of experience…"
                        rows={5}
                        className="resize-y"
                    />
                    <FieldError errors={[errors.description]} />
                </Field>
            </div>

            {/* Availability Card */}
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <IconSparkles className="w-5 h-5 text-primary" />
                        Availability
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Signal your openness to new work opportunities.</p>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 py-3.5 gap-6">
                    <div>
                        <p className="text-sm font-medium">Available for Hire</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Show a badge on your portfolio indicating you're open to new
                            opportunities.
                        </p>
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
                </div>
            </div>
        </form>
    );
}

// ─── Domains Tab ──────────────────────────────────────────────────────────────

function DomainsTab({ initialDomains }: { initialDomains: CustomDomain[] }) {
    return (
        <div className="space-y-0 divide-y divide-border/60">
            <SettingsSection
                icon={IconGlobe}
                title="Custom Domains"
                description="Connect your own professional domain name to your portfolio."
            >
                <DomainsClient initialDomains={initialDomains} />
            </SettingsSection>
        </div>
    );
}

// ─── Appearance Tab ───────────────────────────────────────────────────────────

function AppearanceTab({ site }: { site: Site }) {
    return (
        <div className="space-y-0 divide-y divide-border/60">
            <SettingsSection
                icon={IconPalette}
                title="Site Appearance"
                description="Customize your portfolio's look and feel with templates, themes, and fonts."
            >
                <div className="grid gap-4 sm:grid-cols-3">
                    {/* Template */}
                    <AppearanceSummaryCard
                        icon={IconTemplate}
                        label="Template"
                        value={site.template || "Default"}
                    />
                    {/* Theme */}
                    <AppearanceSummaryCard
                        icon={IconPalette}
                        label="Color Theme"
                        value={site.theme || "Default"}
                    />
                    {/* Font */}
                    <AppearanceSummaryCard
                        icon={IconTypography}
                        label="Typography"
                        value={site.font || "Default"}
                    />
                </div>

                <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">Open Appearance Editor</p>
                        <p className="text-xs text-muted-foreground">
                            Use the visual editor to customize templates, colors, fonts, and
                            page sections with a live preview.
                        </p>
                    </div>
                    <Link
                        href="/app/site/appearance"
                        className={buttonVariants({ variant: "default", size: "default" }) + " shrink-0"}
                    >
                        Open Editor
                        <IconArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-start gap-3">
                    <IconInfoCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        The appearance editor opens in a full-screen mode with a live
                        preview of your site. Changes are saved separately from general
                        site settings.
                    </p>
                </div>
            </SettingsSection>
        </div>
    );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function SettingsSection({
    icon: Icon,
    title,
    description,
    children,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <section className="py-8 first:pt-0 last:pb-0">
            <div className="mb-6 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold">{title}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                </div>
            </div>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

function SettingsRow({
    label,
    description,
    children,
}: {
    label: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:items-start">
            <div className="pt-1">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="space-y-1.5">{children}</div>
        </div>
    );
}

function AppearanceSummaryCard({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="w-3.5 h-3.5" />
                <span className="text-xs font-medium uppercase tracking-wide">
                    {label}
                </span>
            </div>
            <p className="text-sm font-semibold capitalize">{value}</p>
        </div>
    );
}
