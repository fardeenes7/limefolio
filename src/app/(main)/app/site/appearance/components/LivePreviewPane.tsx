import React, { useEffect, useRef } from "react";
import { UserPortfolioConfig } from "@/templates/types";

const PREVIEW_BASE_URL = process.env.NEXT_PUBLIC_PREVIEW_URL ?? "http://preview.localhost:3000";

interface LivePreviewPaneProps {
    tenant: string;
    draftConfig: Partial<UserPortfolioConfig>;
    activePage: string;
}

export function LivePreviewPane({ tenant, draftConfig, activePage }: LivePreviewPaneProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

    // Sync active page
    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: "NAVIGATE",
                    page: activePage,
                },
                "*"
            );
        }
    }, [activePage]);

    return (
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 flex items-start justify-center bg-muted/20 relative w-full h-full">
            <div className="bg-background shadow-lg rounded-t-xl rounded-b-lg border border-border overflow-hidden flex flex-col w-full h-full max-h-[900px] max-w-6xl">
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
                    {/* TODO: section highlight overlay — waiting on preview app postMessage support */}
                </div>
            </div>
        </div>
    );
}
