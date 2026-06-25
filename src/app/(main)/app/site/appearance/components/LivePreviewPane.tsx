import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { UserPortfolioConfig } from "@/templates/types";
import { cn } from "@/lib/utils";
import {
    IconDeviceDesktop,
    IconDeviceTablet,
    IconDeviceMobile
} from "@tabler/icons-react";

const PREVIEW_BASE_URL =
    process.env.NEXT_PUBLIC_PREVIEW_URL ?? "http://preview.localhost:3000";

const DEVICE_WIDTHS = {
    desktop: "100%",
    tablet: "768px",
    mobile: "390px"
};

interface LivePreviewPaneProps {
    tenant: string;
    draftConfig: Partial<UserPortfolioConfig>;
    activePage: string;
    selectedInstanceId: string | null;
    onSelectInstance: (instanceId: string) => void;
    deviceSize: "desktop" | "tablet" | "mobile";
    onDeviceChange: (size: "desktop" | "tablet" | "mobile") => void;
}

export function LivePreviewPane({
    tenant,
    draftConfig,
    activePage,
    selectedInstanceId,
    onSelectInstance,
    deviceSize,
    onDeviceChange
}: LivePreviewPaneProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mockupRef = useRef<HTMLDivElement>(null);
    const [mockupLayout, setMockupLayout] = useState({ scale: 1, width: '100%', height: '100%' });
    const [isIframeReady, setIsIframeReady] = useState(false);

    useLayoutEffect(() => {
        let animationFrameId: number;
        const resizeObserver = new ResizeObserver((entries) => {
            if (!entries.length) return;
            const entry = entries[0];
            const contentWidth = entry.contentRect.width;
            const contentHeight = entry.contentRect.height;
            
            animationFrameId = requestAnimationFrame(() => {
                if (deviceSize === "desktop") {
                    if (contentWidth < 1440) {
                        const newScale = contentWidth / 1440;
                        setMockupLayout({
                            scale: newScale,
                            width: '1440px',
                            height: `${contentHeight / newScale}px`
                        });
                    } else {
                        setMockupLayout({ scale: 1, width: '100%', height: '100%' });
                    }
                    return;
                }

                const mockupHeight = 840;
                const mockupWidth = parseInt(DEVICE_WIDTHS[deviceSize]);

                const verticalScale = contentHeight / mockupHeight;
                const horizontalScale = contentWidth / mockupWidth;

                const newScale = Math.min(verticalScale, horizontalScale, 1);
                setMockupLayout({
                    scale: newScale,
                    width: DEVICE_WIDTHS[deviceSize],
                    height: '840px'
                });
            });
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
        };
    }, [deviceSize]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (
                event.data?.type === "SELECT_SECTION" &&
                event.data.instanceId
            ) {
                onSelectInstance(event.data.instanceId);
            } else if (event.data?.type === "PREVIEW_READY") {
                setIsIframeReady(true);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [onSelectInstance]);

    // Reset ready state when template changes
    useEffect(() => {
        setIsIframeReady(false);
    }, [draftConfig.templateKey]);

    // Sync draft config to iframe on change or when iframe becomes ready
    useEffect(() => {
        if (isIframeReady && iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: "UPDATE_CONFIG",
                    config: draftConfig
                },
                "*"
            );
        }
    }, [draftConfig, isIframeReady]);

    // Sync active page
    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: "NAVIGATE",
                    page: activePage
                },
                "*"
            );
        }
    }, [activePage]);
    return (
        <div
            ref={containerRef}
            className="borderflex-1 overflow-hidden p-4 md:p-6 lg:p-8 flex items-center justify-center bg-muted/30 relative w-full h-full"
        >
            <div
                ref={mockupRef}
                className={cn(
                    "bg-background shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-t-2xl rounded-b-xl border overflow-hidden flex flex-col transition-all duration-500 ease-in-out shrink-0",
                    deviceSize === "desktop" && mockupLayout.scale === 1 && "max-w-[1440px]"
                )}
                style={{
                    width: mockupLayout.width,
                    height: mockupLayout.height,
                    zoom: mockupLayout.scale
                }}
            >
                {/* Browser Chrome Mockup */}
                <div className="h-12 bg-muted/50 border-b flex items-center justify-between px-6 gap-3 shrink-0">
                    <div className="flex items-center gap-2 w-20">
                        <div className="w-3.5 h-3.5 rounded-full bg-destructive/60" />
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-500/60" />
                        <div className="w-3.5 h-3.5 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 max-w-[280px]">
                        <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-1.5 text-[11px] font-medium text-muted-foreground flex items-center justify-center truncate shadow-sm">
                            {tenant}.limefolio.com
                        </div>
                    </div>
                    <div className="flex items-center justify-end w-auto min-w-20">
                        <div className="flex items-center gap-0.5 bg-background/50 border border-border/40 rounded-[8px] p-[3px] shadow-sm">
                            {(["desktop", "tablet", "mobile"] as const).map(
                                (size) => {
                                    const Icon =
                                        size === "desktop"
                                            ? IconDeviceDesktop
                                            : size === "tablet"
                                              ? IconDeviceTablet
                                              : IconDeviceMobile;
                                    const isActive = deviceSize === size;
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => onDeviceChange(size)}
                                            title={
                                                size.charAt(0).toUpperCase() +
                                                size.slice(1)
                                            }
                                            className={cn(
                                                "w-[26px] h-[26px] rounded-[5px] flex items-center justify-center transition-all duration-150",
                                                isActive
                                                    ? "bg-background text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/5"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                            )}
                                        >
                                            <Icon className="w-3.5 h-3.5" />
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>

                {/* Iframe */}
                <div className="flex-1 relative bg-background">
                    {!isIframeReady && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                        </div>
                    )}
                    <iframe
                        ref={iframeRef}
                        src={`${PREVIEW_BASE_URL}?preview=true&template=${draftConfig.templateKey}`}
                        className={cn("w-full h-full border-0 transition-opacity duration-500", isIframeReady ? "opacity-100" : "opacity-0")}
                        title="Portfolio preview"
                    />

                    {/* Section selection syncing */}
                    <SyncSelectedInstance
                        iframeRef={iframeRef}
                        selectedInstanceId={selectedInstanceId}
                    />
                </div>
            </div>

            {/* Zoom Indicator */}
            {mockupLayout.scale < 1 && (
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-[10px] font-medium text-muted-foreground shadow-sm">
                    {Math.round(mockupLayout.scale * 100)}% zoom
                </div>
            )}
        </div>
    );
}

function SyncSelectedInstance({
    iframeRef,
    selectedInstanceId
}: {
    iframeRef: React.RefObject<HTMLIFrameElement | null>;
    selectedInstanceId: string | null;
}) {
    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: "SET_SELECTED_INSTANCE",
                    instanceId: selectedInstanceId
                },
                "*"
            );
        }
    }, [selectedInstanceId, iframeRef]);

    return null;
}
