import { notFound } from "next/navigation";
import getSite, { getMedia, getProjects, getTemplateConfig } from "@/lib/api";
import { getTemplate } from "@/templates/registry";
import { resolvePortfolioConfig } from "@/templates/merge";
import { userConfigFromRaw } from "@/templates/config";
import { PageRenderer } from "@/components/sections/_renderer/PageRenderer";

interface ProjectsPageProps {
    params: Promise<{ domain: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
    const { domain } = await params;

    const [siteData, projects, media] = await Promise.all([
        getSite(domain),
        getProjects(domain),
        getMedia(domain),
    ]);

    if (!siteData || siteData.error) return notFound();

    const templateSlug = siteData.template || "default";
    const colorThemeSlug = siteData.theme || "default";
    const fontSlug = siteData.font || "inter";

    const rawConfig = await getTemplateConfig(domain);
    const templateDef = getTemplate(templateSlug);
    
    const userConfig = userConfigFromRaw(rawConfig, templateDef, {
        templateKey: templateSlug,
        themeKey: colorThemeSlug,
        fontKey: fontSlug,
    });

    const resolvedConfig = resolvePortfolioConfig(templateDef, userConfig);

    // Provide the projects data to the renderer
    const pageData = { ...siteData, projects, media };

    return (
        <PageRenderer
            sections={resolvedConfig.pages.find(p => p.key === "all_projects")?.sections || []}
            siteData={pageData}
        />
    );
}
