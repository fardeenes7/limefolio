import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
    IconLoader2,
    IconHome,
    IconBriefcase,
    IconFileDescription,
    IconWriting,
    IconArticle,
    IconMail,
    IconLayoutNavbar,
    IconFile,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const PAGE_ICONS: Record<string, React.ElementType> = {
    landing: IconHome,
    all_projects: IconBriefcase,
    project_details: IconFileDescription,
    all_blog: IconWriting,
    blog_details: IconArticle,
    contact: IconMail,
    layout: IconLayoutNavbar,
};

interface AppearanceTopbarProps {
    siteDomain: string;
    isDirty: boolean;
    isSaving: boolean;
    onSave: () => void;
    onDiscard: () => void;
    pages: Array<{ key: string; label: string }>;
    activePage: string;
    onPageChange: (key: string) => void;
}

export function AppearanceTopbar({
    siteDomain,
    isDirty,
    isSaving,
    onSave,
    onDiscard,
    pages,
    activePage,
    onPageChange,
}: AppearanceTopbarProps) {
    return (
        <div className="h-11 shrink-0 border-b border-border bg-background flex items-center px-4 z-10 w-full relative justify-between">
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

            {/* Center: Page Selector */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
                {/* Page Selector Pills */}
                <div className="flex items-center gap-0.5 bg-muted/40 border border-border/40 rounded-[8px] p-[3px]">
                    {pages.map((page) => {
                        const Icon = PAGE_ICONS[page.key] || IconFile;
                        const isActive = activePage === page.key;
                        return (
                            <button
                                key={page.key}
                                title={page.label}
                                onClick={() => onPageChange(page.key)}
                                className={cn(
                                    "flex items-center gap-1.5 px-2.5 h-[26px] rounded-[5px] text-[11px] font-medium transition-all duration-150 whitespace-nowrap",
                                    isActive
                                        ? "bg-background text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/5"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                <Icon className="w-[14px] h-[14px] shrink-0" />
                                <span className="hidden sm:inline">{page.label}</span>
                            </button>
                        );
                    })}
                </div>
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
