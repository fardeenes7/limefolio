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
        return SAMPLE_DATA.projects;
    }

    const res = await fetcher("/projects/", {
        headers: domainHeaders(domain),
        next: {
            revalidate: REVALIDATE_TIME,
            tags: [`${domain}-projects`]
        }
    });
    return Array.isArray(res) ? res : (res?.results ?? []);
}

export async function getProject(domain: string, slug: string) {
    if (isPreview(domain)) {
        return (
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
    return res;
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
