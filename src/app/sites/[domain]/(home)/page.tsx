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

    const seo = siteData.seo;
    const pageMeta = seo?.page_meta?.["landing"];

    const title = pageMeta?.meta_title || seo?.default_meta_title || siteData.title;
    const description = pageMeta?.meta_description || seo?.default_meta_description || siteData.description;
    const ogImage = pageMeta?.og_image || seo?.og_image || siteData.logo;
    const robotsStr = pageMeta?.robots || seo?.robots_default || "index,follow";
    
    // Parse robots "index,follow" to { index: true, follow: true }
    const index = robotsStr.includes("index") && !robotsStr.includes("noindex");
    const follow = robotsStr.includes("follow") && !robotsStr.includes("nofollow");

    return {
        title,
        description,
        openGraph: {
            title,
            description: description || undefined,
            images: ogImage ? [ogImage] : [],
        },
        robots: {
            index,
            follow,
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
