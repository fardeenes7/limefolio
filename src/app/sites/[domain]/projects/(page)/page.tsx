import { notFound } from "next/navigation";
import getSite, { getProjects, getTemplateConfig } from "@/lib/api";
import { getTemplate } from "@/templates/registry";
import { resolvePortfolioConfig, emptyUserConfig } from "@/templates/merge";
import { PageRenderer } from "@/components/sections/_renderer/PageRenderer";

interface ProjectsPageProps {
    params: Promise<{ domain: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
    const { domain } = await params;

    const [siteData, projects] = await Promise.all([
        getSite(domain),
        getProjects(domain)
    ]);

    if (!siteData || siteData.error) return notFound();

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

    // Provide the projects data to the renderer
    const pageData = { ...siteData, projects };

    return (
        <PageRenderer
            sections={resolvedConfig.pages.find(p => p.key === "all_projects")?.sections || []}
            siteData={pageData}
        />
    );
}
