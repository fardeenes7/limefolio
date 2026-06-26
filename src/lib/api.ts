"use server";

import { SAMPLE_DATA } from "@/lib/sample-data";

const REVALIDATE_TIME = 86400;

const isPreview = (domain: string) => {
    return domain === "preview" || domain.startsWith("preview.")
}

async function fetcher(pathname: string, options: RequestInit = {}) {
    const apiUrl = `${process.env.API_URL?.replace(/\/$/, "")}/api/public`;
    const reqUrl = `${apiUrl}/${pathname.replace(/^\//, "")}`;
    try {
        const res = await fetch(reqUrl, options);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

function domainHeaders(domain: string) {
    return { "x-public-domain": domain };
}

export default async function getSite(domain: string) {
    // Preview domain — return static sample data without hitting the API.
    // Template can be overridden via ?template=<slug> in the page component.
    console.log("domain::", domain);
    if (isPreview(domain)) {
        return SAMPLE_DATA;
    }

    const res = await fetcher("/", {
        headers: domainHeaders(domain),
        next: {
            revalidate: REVALIDATE_TIME,
            tags: [`${domain}-site`]
        }
    });
    return res;
}

export async function getProjects(domain: string) {
    if (isPreview(domain)) {
        return SAMPLE_DATA.projects.map(normalizeProject);
    }

    const res = await fetcher("/projects/", {
        headers: domainHeaders(domain),
        next: {
            revalidate: REVALIDATE_TIME,
            tags: [`${domain}-projects`]
        }
    });
    const projects = Array.isArray(res) ? res : (res?.results ?? []);
    return projects.map(normalizeProject);
}

export async function getProject(domain: string, slug: string) {
    if (isPreview(domain)) {
        return normalizeProject(
            SAMPLE_DATA.projects.find((p: any) => p.slug === slug) ??
            SAMPLE_DATA.projects[0]
        );
    }

    const res = await fetcher(`/projects/${slug}/`, {
        headers: domainHeaders(domain),
        next: {
            revalidate: REVALIDATE_TIME,
            tags: [`${domain}-project-${slug}`]
        }
    });
    return normalizeProject(res);
}

function normalizeMediaItem(item: any) {
    if (!item) return item;
    return {
        ...item,
        url: item.url ?? item.image ?? item.video ?? item.thumbnail ?? null,
    };
}

function normalizeProject(project: any) {
    if (!project) return project;
    return {
        ...project,
        media: (project.media || []).map(normalizeMediaItem),
    };
}

function normalizeBlogPost(post: any) {
    if (!post) return post;
    return {
        ...post,
        cover_image: post.cover_image ?? post.thumbnail ?? post.thumbnail_url ?? null,
        reading_time_minutes: post.reading_time_minutes ?? post.reading_time ?? null,
        media: (post.media || []).map(normalizeMediaItem),
    };
}

export async function getMedia(domain: string) {
    if (isPreview(domain)) {
        const sample = SAMPLE_DATA as unknown as {
            media?: unknown[];
            projects: Array<{ media?: unknown[] }>;
            blog_posts: Array<{ media?: unknown[] }>;
        };

        return [
            ...(sample.media || []),
            ...sample.projects.flatMap((project) => project.media || []),
            ...sample.blog_posts.flatMap((post) => post.media || []),
        ].map(normalizeMediaItem);
    }

    const res = await fetcher("/media/", {
        headers: domainHeaders(domain),
        next: {
            revalidate: REVALIDATE_TIME,
            tags: [`${domain}-media`]
        }
    });
    const media = Array.isArray(res) ? res : (res?.results ?? []);
    return media.map(normalizeMediaItem);
}

export async function getBlogPosts(domain: string) {
    if (isPreview(domain)) {
        return (SAMPLE_DATA.blog_posts || []).map(normalizeBlogPost);
    }

    const res = await fetcher("/blog/", {
        headers: domainHeaders(domain),
        next: {
            revalidate: REVALIDATE_TIME,
            tags: [`${domain}-blog`]
        }
    });
    const posts = Array.isArray(res) ? res : (res?.results ?? []);
    return posts.map(normalizeBlogPost);
}

export async function getBlogPost(domain: string, slug: string) {
    if (isPreview(domain)) {
        const posts = SAMPLE_DATA.blog_posts || [];
        return normalizeBlogPost(
            posts.find((p: any) => p.slug === slug) ?? posts[0]
        );
    }

    const res = await fetcher(`/blog/${slug}/`, {
        headers: domainHeaders(domain),
        next: {
            revalidate: REVALIDATE_TIME,
            tags: [`${domain}-blog-${slug}`]
        }
    });
    return normalizeBlogPost(res);
}

export async function getTemplateConfig(domain: string) {
    if (isPreview(domain)) {
        return null;
    }

    const res = await fetcher("/template-config/", {
        headers: domainHeaders(domain),
        next: {
            revalidate: REVALIDATE_TIME,
            tags: [`${domain}-template-config`]
        }
    });
    return res;
}
