"use client";

import React, { useEffect, useState } from "react";
import { resolvePortfolioConfig } from "@/templates/merge";
import type { Template, UserPortfolioConfig, ResolvedSection } from "@/templates/types";
import type { SiteData } from "@/types/site";
import { LayoutPageRenderer, PageRenderer } from "@/components/sections/_renderer/PageRenderer";

interface LivePreviewProviderProps {
    templateDef: Template;
    initialUserConfig: Partial<UserPortfolioConfig>;
    initialLayoutSections: ResolvedSection[];
    siteData: SiteData;
    children: React.ReactNode;
}

export function LivePreviewProvider({
    templateDef,
    initialUserConfig,
    initialLayoutSections,
    siteData,
    children,
}: LivePreviewProviderProps) {
    const [previewConfig, setPreviewConfig] = useState<Partial<UserPortfolioConfig> | null>(null);
    const [previewPageKey, setPreviewPageKey] = useState<string>("landing");
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === "UPDATE_CONFIG") {
                setIsPreviewMode(true);
                if (event.data.config) {
                    setPreviewConfig(event.data.config);
                }
                if (event.data.pageKey) {
                    setPreviewPageKey(event.data.pageKey);
                }
            }
        };

        window.addEventListener("message", handleMessage);
        
        // Notify parent window that we are ready to receive config updates
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ type: "PREVIEW_READY" }, "*");
        }

        return () => window.removeEventListener("message", handleMessage);
    }, []);

    // If not actively previewing via postMessage, just render the normal SSR tree
    if (!isPreviewMode) {
        return (
            <LayoutPageRenderer layoutSections={initialLayoutSections} siteData={siteData}>
                {children}
            </LayoutPageRenderer>
        );
    }

    // Resolve the config using the pure client-side merge function
    const resolvedConfig = resolvePortfolioConfig(templateDef, previewConfig || initialUserConfig);

    // Find the current page or fallback to the first page (usually 'landing')
    const page = resolvedConfig.pages.find((p) => p.key === previewPageKey) || resolvedConfig.pages[0];

    return (
        <LayoutPageRenderer layoutSections={resolvedConfig.layout} siteData={siteData}>
            <PageRenderer sections={page.sections} siteData={siteData} />
        </LayoutPageRenderer>
    );
}
