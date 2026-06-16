import { notFound } from "next/navigation";
import getSite, { getProject } from "@/lib/api";
import { getTemplate } from "@/templates";
import type { Metadata } from "next";

interface SingleProjectProps {
    params: Promise<{ domain: string; slug: string }>;
    searchParams: Promise<{ template?: string }>;
}

// ── Dynamic metadata ──────────────────────────────────────────────────────────

export async function generateMetadata({
    params,
}: SingleProjectProps): Promise<Metadata> {
    const { domain, slug } = await params;
    const project = await getProject(domain, slug);

    if (!project) return {};

    return {
        title: project.title,
        description: project.tagline ?? project.description ?? undefined,
        openGraph: {
            title: project.title,
            description: project.tagline ?? project.description ?? undefined,
            images: project.cover_image ? [project.cover_image] : [],
        },
    };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function SingleProjectPage({
    params,
    searchParams,
}: SingleProjectProps) {
    const { domain, slug } = await params;
    const { template: templateOverride } = await searchParams;

    const [siteData, project] = await Promise.all([
        getSite(domain),
        getProject(domain, slug),
    ]);

    if (!siteData || siteData.error) return notFound();
    if (!project || project.error) return notFound();

    const templateSlug =
        domain === "preview" && templateOverride
            ? templateOverride
            : siteData.template;

    const template = getTemplate(templateSlug);

    // The template's "single-project" component receives the site payload
    // with the specific project nested under `data.project`.
    const pageData = { ...siteData, project };

    const TemplateComponent = template["single-project"];

    return <TemplateComponent data={pageData} />;
}
