"use client";

import { useSearchParams } from "next/navigation";
import { getTemplate } from "@/templates";
import { ReactNode, Suspense } from "react";

function LayoutInner({ data, children }: { data: any; children: ReactNode }) {
    const searchParams = useSearchParams();

    let templateSlug = data?.template || "default";
    const templateOverride = searchParams.get("template");

    if (templateOverride) {
        templateSlug = templateOverride;
    }

    const template = getTemplate(templateSlug);
    const TemplateLayout = template.layout;

    return <TemplateLayout data={data}>{children}</TemplateLayout>;
}

export function DynamicLayout({
    children,
    data,
    domain,
}: {
    children: ReactNode;
    data: any;
    domain: string;
}) {
    // Only wrap with dynamic LayoutInner if we are in preview domain
    if (domain === "preview") {
        const defaultTemplate = getTemplate(data?.template || "default");
        const DefaultLayout = defaultTemplate.layout;
        return (
            <Suspense
                fallback={<DefaultLayout data={data}>{children}</DefaultLayout>}
            >
                <LayoutInner data={data}>{children}</LayoutInner>
            </Suspense>
        );
    }

    // Otherwise, render standard default template to avoid any dynamic client hooks
    const template = getTemplate(data?.template || "default");
    const TemplateLayout = template.layout;
    return <TemplateLayout data={data}>{children}</TemplateLayout>;
}
