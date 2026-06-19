import React from "react";
import Link from "next/link";
import { 
    IconDeviceDesktop, 
    IconDeviceTablet, 
    IconDeviceMobile, 
    IconLoader2 
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface AppearanceTopbarProps {
    siteDomain: string;
    deviceSize: 'desktop' | 'tablet' | 'mobile';
    onDeviceChange: (size: 'desktop' | 'tablet' | 'mobile') => void;
    isDirty: boolean;
    isSaving: boolean;
    onSave: () => void;
    onDiscard: () => void;
}

export function AppearanceTopbar({
    siteDomain,
    deviceSize,
    onDeviceChange,
    isDirty,
    isSaving,
    onSave,
    onDiscard
}: AppearanceTopbarProps) {
    return (
        <div className="h-[44px] shrink-0 border-b border-border bg-background flex items-center justify-between px-4 z-10 w-full relative">
            {/* Left */}
            <div className="flex items-center gap-3">
                <Link 
                    href="/app/site/" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    &larr; Dashboard
                </Link>
                <div className="h-4 w-px bg-border" />
                <span className="text-sm font-medium">Appearance</span>
            </div>

            {/* Center */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-muted rounded-md p-1">
                <button
                    onClick={() => onDeviceChange("desktop")}
                    className={`p-1 rounded-sm transition-colors ${
                        deviceSize === "desktop" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Desktop"
                >
                    <IconDeviceDesktop className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDeviceChange("tablet")}
                    className={`p-1 rounded-sm transition-colors ${
                        deviceSize === "tablet" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Tablet"
                >
                    <IconDeviceTablet className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDeviceChange("mobile")}
                    className={`p-1 rounded-sm transition-colors ${
                        deviceSize === "mobile" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Mobile"
                >
                    <IconDeviceMobile className="w-4 h-4" />
                </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {isDirty && (
                    <>
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2" />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onDiscard}
                            disabled={isSaving}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Discard
                        </Button>
                    </>
                )}
                <Button
                    size="sm"
                    onClick={onSave}
                    disabled={!isDirty || isSaving}
                >
                    {isSaving ? (
                        <>
                            <IconLoader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save"
                    )}
                </Button>
            </div>
        </div>
    );
}
