import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconLoader2, IconDeviceDesktop, IconDeviceTablet, IconDeviceMobile } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type DeviceSize = "desktop" | "tablet" | "mobile";

interface AppearanceTopbarProps {
    siteDomain: string;
    isDirty: boolean;
    isSaving: boolean;
    onSave: () => void;
    onDiscard: () => void;
    pages: Array<{ key: string; label: string }>;
    activePage: string;
    onPageChange: (key: string) => void;
    deviceSize?: DeviceSize;
    onDeviceChange?: (size: DeviceSize) => void;
}

const DEVICE_OPTIONS: { size: DeviceSize; Icon: React.ElementType; label: string }[] = [
    { size: "desktop", Icon: IconDeviceDesktop, label: "Desktop" },
    { size: "tablet",  Icon: IconDeviceTablet,  label: "Tablet" },
    { size: "mobile",  Icon: IconDeviceMobile,  label: "Mobile" },
];

export function AppearanceTopbar({
    siteDomain,
    isDirty,
    isSaving,
    onSave,
    onDiscard,
    pages,
    activePage,
    onPageChange,
    deviceSize = "desktop",
    onDeviceChange,
}: AppearanceTopbarProps) {
    return (
        <div className="h-11 shrink-0 border-b border-border bg-background flex items-center px-4 z-10 w-full relative justify-between gap-4">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-2.5 shrink-0">
                <Link 
                    href="/app/site/" 
                    className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    title="Back to Dashboard"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div className="h-3.5 w-px bg-border/60" />
                <span className="text-[12px] font-semibold text-foreground tracking-tight">Appearance</span>
            </div>

            {/* Center: Page tabs + Viewport switcher */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
                {/* Page tabs */}
                <div className="flex items-center gap-0.5">
                    {pages.map((page) => {
                        const isActive = activePage === page.key;
                        return (
                            <button
                                key={page.key}
                                title={page.label}
                                onClick={() => onPageChange(page.key)}
                                className={cn(
                                    "relative px-3 h-11 flex items-center justify-center text-[12px] font-medium transition-colors whitespace-nowrap",
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {page.label}
                                {isActive && (
                                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-primary rounded-t-full" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Separator */}
                {onDeviceChange && (
                    <>
                        <div className="w-px h-4 bg-border/60" />

                        {/* Viewport switcher */}
                        <div className="flex items-center gap-0.5 bg-muted/50 border border-border/50 rounded-lg p-[3px]">
                            {DEVICE_OPTIONS.map(({ size, Icon, label }) => {
                                const isActive = deviceSize === size;
                                return (
                                    <button
                                        key={size}
                                        onClick={() => onDeviceChange(size)}
                                        title={label}
                                        className={cn(
                                            "w-[26px] h-[26px] rounded-[5px] flex items-center justify-center transition-all duration-150",
                                            isActive
                                                ? "bg-background text-foreground shadow-sm ring-1 ring-black/8 dark:ring-white/8"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Right: Dirty indicator + Actions */}
            <div className="flex items-center gap-2 shrink-0">
                {isDirty && (
                    <div className="flex items-center gap-2 mr-1 animate-in fade-in zoom-in duration-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onDiscard}
                            disabled={isSaving}
                            className="h-7 px-2.5 text-[11px] font-medium text-muted-foreground hover:text-foreground rounded-md"
                        >
                            Discard
                        </Button>
                    </div>
                )}
                <Button
                    size="sm"
                    onClick={onSave}
                    disabled={!isDirty || isSaving}
                    className="h-7 px-3.5 text-[11px] font-medium rounded-md shadow-sm transition-all"
                >
                    {isSaving ? (
                        <>
                            <IconLoader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            Saving…
                        </>
                    ) : (
                        "Publish"
                    )}
                </Button>
            </div>
        </div>
    );
}
