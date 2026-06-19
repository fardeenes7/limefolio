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

import { useTheme } from "next-themes";
import { getFont } from "@/lib/fonts";
import { getTemplate } from "@/templates/registry";

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
    
    const { setTheme } = useTheme();

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
        
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ type: "PREVIEW_READY" }, "*");
        }

        return () => window.removeEventListener("message", handleMessage);
    }, []);

    // Effect to update CSS and Theme on the fly
    useEffect(() => {
        if (previewConfig?.themeKey) {
            setTheme(previewConfig.themeKey);

            fetch(`/api/color-themes/${previewConfig.themeKey}/css`)
                .then(res => res.text())
                .then(css => {
                    let styleEl = document.getElementById("live-preview-theme-css");
                    if (!styleEl) {
                        styleEl = document.createElement("style");
                        styleEl.id = "live-preview-theme-css";
                        document.head.appendChild(styleEl);
                    }
                    styleEl.innerHTML = css;

                    const initialStyle = document.querySelector('style[data-theme]');
                    if (initialStyle) {
                        initialStyle.remove();
                    }
                })
                .catch(err => console.error("Failed to load theme css:", err));
        }

        if (previewConfig?.fontKey) {
            const font = getFont(previewConfig.fontKey);
            document.body.style.fontFamily = `var(${font.variable})`;
        }
    }, [previewConfig?.themeKey, previewConfig?.fontKey, setTheme]);

    // If not actively previewing via postMessage, just render the normal SSR tree
    if (!isPreviewMode) {
        return (
            <LayoutPageRenderer layoutSections={initialLayoutSections} siteData={siteData}>
                {children}
            </LayoutPageRenderer>
        );
    }

    // Dynamically resolve the template definition if it changed in preview
    const activeTemplateDef = previewConfig?.templateKey 
        ? getTemplate(previewConfig.templateKey) 
        : templateDef;

    // Resolve the config using the pure client-side merge function
    const resolvedConfig = resolvePortfolioConfig(activeTemplateDef, previewConfig || initialUserConfig);

    // Find the current page or fallback to the first page (usually 'landing')
    const page = resolvedConfig.pages.find((p) => p.key === previewPageKey) || resolvedConfig.pages[0];

    return (
        <LayoutPageRenderer layoutSections={resolvedConfig.layout} siteData={siteData}>
            <PageRenderer sections={page.sections} siteData={siteData} />
        </LayoutPageRenderer>
    );
}
