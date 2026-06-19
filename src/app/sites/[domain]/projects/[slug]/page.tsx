import { notFound } from "next/navigation";
import getSite, { getProject, getTemplateConfig } from "@/lib/api";
import { getTemplate } from "@/templates/registry";
import { resolvePortfolioConfig, emptyUserConfig } from "@/templates/merge";
import { PageRenderer } from "@/components/sections/_renderer/PageRenderer";
import type { Metadata } from "next";

interface SingleProjectProps {
    params: Promise<{ domain: string; slug: string }>;
}

export async function generateMetadata({
    params
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
            images: project.cover_image ? [project.cover_image] : []
        }
    };
}

export default async function SingleProjectPage({ params }: SingleProjectProps) {
    const { domain, slug } = await params;

    const [siteData, project] = await Promise.all([
        getSite(domain),
        getProject(domain, slug)
    ]);

    if (!siteData || siteData.error) return notFound();
    if (!project || project.error) return notFound();

    const templateSlug = siteData.template || "default";
    const colorThemeSlug = siteData.theme || "default";
    const fontSlug = siteData.font || "inter";

    const rawConfig = await getTemplateConfig(domain);
    const templateDef = getTemplate(templateSlug);
    
    const userConfig = rawConfig && !rawConfig.error ? {
        templateKey: templateSlug,
        themeKey: colorThemeSlug,
        fontKey: fontSlug,
        templateVersion: rawConfig.template_version || '1.0.0',
        overrides: rawConfig.config_overrides || { layout: {}, pages: {} },
        additions: rawConfig.config_additions || { layout: [], pages: {} },
        removals: rawConfig.config_removals || { layout: [], pages: {} },
        ordering: rawConfig.config_ordering || {},
    } : emptyUserConfig(templateSlug, colorThemeSlug, fontSlug, templateDef.version);

    const resolvedConfig = resolvePortfolioConfig(templateDef, userConfig);

    // Provide the specific project nested under `project`
    const pageData = { ...siteData, project };

    return (
        <PageRenderer
            sections={resolvedConfig.pages.find(p => p.key === "project_details")?.sections || []}
            siteData={pageData}
        />
    );
}
