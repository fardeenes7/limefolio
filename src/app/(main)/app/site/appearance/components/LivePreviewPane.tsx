import React, { useState, useEffect, useRef } from "react";
import { IconDeviceDesktop, IconDeviceTablet, IconDeviceMobile, IconExternalLink } from "@tabler/icons-react";
import { UserPortfolioConfig } from "@/templates/types";

const PREVIEW_BASE_URL = process.env.NEXT_PUBLIC_PREVIEW_URL ?? "http://preview.localhost:3000";

type DeviceSize = "desktop" | "tablet" | "mobile";

interface LivePreviewPaneProps {
    tenant: string;
    draftConfig: Partial<UserPortfolioConfig>;
}

export function LivePreviewPane({ tenant, draftConfig }: LivePreviewPaneProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop");

    // Sync draft config to iframe on change
    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: "UPDATE_CONFIG",
                    config: draftConfig,
                },
                "*"
            );
        }
    }, [draftConfig]);

    const getIframeWidthClass = () => {
        switch (deviceSize) {
            case "mobile":
                return "w-[390px]";
            case "tablet":
                return "w-[768px]";
            case "desktop":
                return "w-full";
            default:
                return "w-full";
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-muted/30 relative">
            {/* Top Toolbar */}
            <div className="h-14 border-b border-border bg-background flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-1 bg-muted rounded-md p-1">
                    <button
                        onClick={() => setDeviceSize("desktop")}
                        className={`p-1.5 rounded-sm transition-colors ${
                            deviceSize === "desktop" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-label="Desktop preview"
                    >
                        <IconDeviceDesktop className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDeviceSize("tablet")}
                        className={`p-1.5 rounded-sm transition-colors ${
                            deviceSize === "tablet" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-label="Tablet preview"
                    >
                        <IconDeviceTablet className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDeviceSize("mobile")}
                        className={`p-1.5 rounded-sm transition-colors ${
                            deviceSize === "mobile" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-label="Phone preview"
                    >
                        <IconDeviceMobile className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href={PREVIEW_BASE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                    >
                        Open in new tab
                        <IconExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

            {/* Preview Container */}
            <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center motion-safe:transition-all motion-safe:duration-300">
                <div
                    className={`bg-background shadow-lg rounded-t-xl rounded-b-lg border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-300 flex flex-col h-full max-h-[900px] ${getIframeWidthClass()}`}
                >
                    {/* Browser Chrome Mockup */}
                    <div className="h-10 bg-muted border-b border-border flex items-center px-4 gap-2 shrink-0">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-destructive/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="mx-auto bg-background border border-border rounded-md px-3 py-1 text-[10px] text-muted-foreground flex items-center justify-center w-full max-w-[200px] truncate">
                            {tenant}.limefolio.com
                        </div>
                        <div className="w-11" /> {/* spacer to balance traffic lights */}
                    </div>

                    {/* Iframe */}
                    <div className="flex-1 relative bg-background">
                        <iframe
                            ref={iframeRef}
                            src={PREVIEW_BASE_URL}
                            className="w-full h-full border-0"
                            title="Portfolio preview"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
