import { notFound } from "next/navigation";
import getSite, { getBlogPost, getMedia, getTemplateConfig } from "@/lib/api";
import { getTemplate } from "@/templates/registry";
import { resolvePortfolioConfig } from "@/templates/merge";
import { userConfigFromRaw } from "@/templates/config";
import { PageRenderer } from "@/components/sections/_renderer/PageRenderer";
import type { Metadata } from "next";
import type { BlogPost } from "@/types/site";

type PublicBlogPost = BlogPost & { error?: unknown };

interface BlogPostPageProps {
    params: Promise<{ domain: string; slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { domain, slug } = await params;
    const post = await getBlogPost(domain, slug);

    if (!post || post.error) return {};

    const typedPost = post as PublicBlogPost;
    const description = typedPost.meta_description || typedPost.excerpt || undefined;
    const image = typedPost.cover_image || typedPost.thumbnail || typedPost.thumbnail_url;

    return {
        title: typedPost.title,
        description,
        openGraph: {
            title: typedPost.title,
            description,
            images: image ? [image] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { domain, slug } = await params;

    const [siteData, post, media] = await Promise.all([
        getSite(domain),
        getBlogPost(domain, slug),
        getMedia(domain),
    ]);

    if (!siteData || siteData.error) return notFound();
    const typedPost = post as PublicBlogPost;
    if (!typedPost || typedPost.error) return notFound();

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
    const pageData = {
        ...siteData,
        blog_post: typedPost,
        blog_posts: siteData.blog_posts?.length ? siteData.blog_posts : [typedPost],
        media
    };

    return (
        <PageRenderer
            sections={resolvedConfig.pages.find(p => p.key === "blog_details")?.sections || []}
            siteData={pageData}
        />
    );
}
