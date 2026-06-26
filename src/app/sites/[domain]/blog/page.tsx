import { notFound } from "next/navigation";
import getSite, { getBlogPosts, getMedia, getTemplateConfig } from "@/lib/api";
import { getTemplate } from "@/templates/registry";
import { resolvePortfolioConfig } from "@/templates/merge";
import { userConfigFromRaw } from "@/templates/config";
import { PageRenderer } from "@/components/sections/_renderer/PageRenderer";
import type { Metadata } from "next";

interface BlogPageProps {
    params: Promise<{ domain: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { domain } = await params;
    const siteData = await getSite(domain);

    if (!siteData || siteData.error) return {};

    const seo = siteData.seo;
    const pageMeta = seo?.page_meta?.["all_blog"];
    const title = pageMeta?.meta_title || `Blog | ${siteData.title}`;
    const description = pageMeta?.meta_description || seo?.default_meta_description || siteData.description;

    return {
        title,
        description: description || undefined,
        openGraph: {
            title,
            description: description || undefined,
            images: seo?.og_image ? [seo.og_image] : [],
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { domain } = await params;

    const [siteData, posts, media] = await Promise.all([
        getSite(domain),
        getBlogPosts(domain),
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
    const pageData = { ...siteData, blog_posts: posts, media };

    return (
        <PageRenderer
            sections={resolvedConfig.pages.find(p => p.key === "all_blog")?.sections || []}
            siteData={pageData}
        />
    );
}
