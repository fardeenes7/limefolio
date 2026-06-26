import { notFound } from "next/navigation";
import getSite, { getMedia, getTemplateConfig } from "@/lib/api";
import { getTemplate } from "@/templates/registry";
import { resolvePortfolioConfig } from "@/templates/merge";
import { userConfigFromRaw } from "@/templates/config";
import { PageRenderer } from "@/components/sections/_renderer/PageRenderer";
import type { Metadata } from "next";

interface ContactPageProps {
    params: Promise<{ domain: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
    const { domain } = await params;
    const siteData = await getSite(domain);

    if (!siteData || siteData.error) return {};

    const seo = siteData.seo;
    const pageMeta = seo?.page_meta?.["contact"];
    const title = pageMeta?.meta_title || `Contact | ${siteData.title}`;
    const description = pageMeta?.meta_description || seo?.default_meta_description || siteData.description;
    const ogImage = pageMeta?.og_image || seo?.og_image || siteData.logo;

    return {
        title,
        description: description || undefined,
        openGraph: {
            title,
            description: description || undefined,
            images: ogImage ? [ogImage] : [],
        },
    };
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { domain } = await params;
    const [siteData, media] = await Promise.all([
        getSite(domain),
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

    return (
        <PageRenderer
            sections={resolvedConfig.pages.find(p => p.key === "contact")?.sections || []}
            siteData={{ ...siteData, media }}
        />
    );
}
