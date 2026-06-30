"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
import { getLayoutWidthValue } from "@/lib/utils";

export const PreviewContext = React.createContext<{
    selectedInstanceId: string | null;
    isPreviewMode: boolean;
}>({ selectedInstanceId: null, isPreviewMode: false });

export function LivePreviewProvider({
    templateDef,
    initialUserConfig,
    initialLayoutSections,
    siteData,
    children,
}: LivePreviewProviderProps) {
    return (
        <Suspense fallback={<LayoutPageRenderer layoutSections={initialLayoutSections} siteData={siteData}>{children}</LayoutPageRenderer>}>
            <LivePreviewProviderInner
                templateDef={templateDef}
                initialUserConfig={initialUserConfig}
                initialLayoutSections={initialLayoutSections}
                siteData={siteData}
            >
                {children}
            </LivePreviewProviderInner>
        </Suspense>
    );
}

function LivePreviewProviderInner({
    templateDef,
    initialUserConfig,
    initialLayoutSections,
    siteData,
    children,
}: LivePreviewProviderProps) {
    const searchParams = useSearchParams();
    const isUrlPreview = searchParams.get("preview") === "true";

    const [previewConfig, setPreviewConfig] = useState<Partial<UserPortfolioConfig> | null>(() => {
        if (isUrlPreview) {
            return {
                templateKey: searchParams.get("template") || undefined,
                themeKey: searchParams.get("theme") || undefined,
                fontKey: searchParams.get("font") || undefined,
            };
        }
        return null;
    });
    const [previewPageKey, setPreviewPageKey] = useState<string>("landing");
    const [isPreviewMode, setIsPreviewMode] = useState(isUrlPreview);
    const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
    
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
            } else if (event.data?.type === "NAVIGATE") {
                if (event.data.page) {
                    setPreviewPageKey(event.data.page);
                }
            } else if (event.data?.type === "SET_SELECTED_INSTANCE") {
                setSelectedInstanceId(event.data.instanceId);
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
    }, [previewConfig?.themeKey, setTheme]);

    // Apply active font and theme
    useEffect(() => {
        if (!isPreviewMode) return;

        const fontToApply = previewConfig?.fontKey || initialUserConfig.fontKey;
        const font = getFont(fontToApply || templateDef.defaultFont);
        if (font && font.variable) {
            document.body.style.fontFamily = `var(${font.variable})`;
        }

        const themeToApply = previewConfig?.themeKey || initialUserConfig.themeKey;
        if (themeToApply) {
            setTheme(themeToApply);
        }
    }, [previewConfig?.fontKey, previewConfig?.themeKey, isPreviewMode, initialUserConfig.fontKey, initialUserConfig.themeKey, templateDef.defaultFont, setTheme]);

    // Apply layout width directly to body inline styles to override SSR layout
    useEffect(() => {
        if (!isPreviewMode) return;
        const activeTemplate = previewConfig?.templateKey ? getTemplate(previewConfig.templateKey) : templateDef;
        const layoutWidth = previewConfig?.layoutWidth || initialUserConfig.layoutWidth || activeTemplate.defaultLayoutWidth || 'default';
        document.body.style.setProperty('--theme-layout-width', getLayoutWidthValue(layoutWidth));
    }, [previewConfig?.layoutWidth, previewConfig?.templateKey, initialUserConfig.layoutWidth, templateDef, isPreviewMode]);

    // Send computed hex colors back to the customizer
    useEffect(() => {
        if (!isPreviewMode) return;
        
        const sendColors = () => {
            const computed = getComputedStyle(document.body);
            const canvas = document.createElement("canvas");
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            
            if (!ctx) return;

            const vars = [
                "--background", "--foreground", "--card", "--popover", 
                "--primary", "--primary-foreground", "--secondary", 
                "--muted", "--accent", "--destructive", "--border", "--ring"
            ];
            
            const colors: Record<string, string> = {};
            
            vars.forEach(v => {
                const raw = computed.getPropertyValue(v).trim();
                if (!raw) return;
                
                ctx.clearRect(0, 0, 1, 1);
                // raw might be "oklch(0.5 0 0)"
                ctx.fillStyle = raw;
                ctx.fillRect(0, 0, 1, 1);
                const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                colors[v] = "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
            });
            
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: "THEME_COLORS", colors }, "*");
            }
        };

        const timeout = setTimeout(sendColors, 150);
        return () => clearTimeout(timeout);
    }, [previewConfig?.themeKey, previewConfig?.themeOverrides, isPreviewMode]);

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
    const previewSiteData = page.key === "project_details"
        ? { ...siteData, project: siteData.project ?? siteData.projects?.[0] }
        : page.key === "blog_details"
            ? { ...siteData, blog_post: siteData.blog_post ?? siteData.blog_posts?.[0] }
            : siteData;

    return (
        <PreviewContext.Provider value={{ selectedInstanceId, isPreviewMode: true }}>
            {previewConfig?.themeOverrides && Object.keys(previewConfig.themeOverrides).length > 0 && (
                <style dangerouslySetInnerHTML={{
                    __html: `:root, .dark, .default, body, html {
                        ${Object.entries(previewConfig.themeOverrides)
                            .filter(([_, v]) => v)
                            .map(([k, v]) => `${k}: ${v};`)
                            .join('\n                        ')}
                    }
                    * {
                        ${previewConfig.themeOverrides['--radius'] ? `--radius: ${previewConfig.themeOverrides['--radius']};` : ''}
                    }`
                }} />
            )}
            <LayoutPageRenderer layoutSections={resolvedConfig.layout} siteData={previewSiteData}>
                <PageRenderer sections={page.sections} siteData={previewSiteData} />
            </LayoutPageRenderer>
        </PreviewContext.Provider>
    );
}
