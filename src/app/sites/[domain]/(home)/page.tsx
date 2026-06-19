import getSite, { getTemplateConfig } from "@/lib/api";
import { notFound } from "next/navigation";
import { getTemplate } from "@/templates/registry";
import { resolvePortfolioConfig, emptyUserConfig } from "@/templates/merge";
import { PageRenderer } from "@/components/sections/_renderer/PageRenderer";
import type { Metadata } from "next";

export async function generateMetadata({
    params
}: {
    params: Promise<{ domain: string }>;
}): Promise<Metadata> {
    const { domain } = await params;
    const siteData = await getSite(domain);

    if (!siteData) return {};

    return {
        title: siteData.meta_title || siteData.title,
        description: siteData.meta_description || siteData.description,
        openGraph: {
            title: siteData.title,
            description: siteData.description || undefined,
            images: siteData.logo ? [siteData.logo] : []
        }
    };
}

export default async function SiteHomePage({
    params
}: {
    params: Promise<{ domain: string }>;
}) {
    const { domain } = await params;
    const siteData = await getSite(domain);

    if (!siteData || siteData.error) {
        return notFound();
    }

    const templateSlug = siteData.template || "default";
    const colorThemeSlug = siteData.theme || "default";
    const fontSlug = siteData.font || "inter";

    // Resolve config just for this page
    // Next.js deduplicates this fetch since layout.tsx also calls it
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

    return (
        <PageRenderer
            sections={resolvedConfig.pages.find(p => p.key === "landing")?.sections || []}
            siteData={siteData}
        />
    );
}
