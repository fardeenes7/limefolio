import getSite from "@/lib/api";
import { notFound } from "next/navigation";
import { getTemplate } from "@/templates";

interface HomeProps {
    params: Promise<{ domain: string }>;
    searchParams: Promise<{ template?: string }>;
}

export default async function Home({ params, searchParams }: HomeProps) {
    const { domain } = await params;
    const siteData = await getSite(domain);
    console.log("here");
    console.log(siteData)

    if (!siteData || siteData.error) {
        return notFound();
    }

    // When previewing, allow ?template=<slug> to override the template.
    // For real sites, always use what the site has configured.
    const { template: templateOverride } = await searchParams;
    const templateSlug =
        domain === "preview" && templateOverride
            ? templateOverride
            : siteData.template;

            console.log(templateSlug)

    const template = getTemplate(templateSlug);
    return <template.home data={siteData} />;
}
