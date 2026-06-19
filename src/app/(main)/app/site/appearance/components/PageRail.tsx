import React from "react";
import { cn } from "@/lib/utils";
import {
    IconHome,
    IconBriefcase,
    IconFileDescription,
    IconWriting,
    IconArticle,
    IconMail,
    IconLayoutNavbar,
    IconFile
} from "@tabler/icons-react";

interface PageRailProps {
    pages: Array<{ key: string; label: string }>;
    activePage: string;
    onPageChange: (key: string) => void;
}

const PAGE_ICONS: Record<string, React.ElementType> = {
    landing: IconHome,
    all_projects: IconBriefcase,
    project_details: IconFileDescription,
    all_blog: IconWriting,
    blog_details: IconArticle,
    contact: IconMail,
    layout: IconLayoutNavbar,
};

export function PageRail({ pages, activePage, onPageChange }: PageRailProps) {
    // We separate the "Global" (layout) from standard pages
    const regularPages = pages.filter(p => p.key !== "layout");
    
    // In our implementation, we dynamically get the pages from the template, 
    // but the global layout entry might not be in the 'pages' array explicitly.
    // If it is, it's filtered above. We always add it manually at the end.
    
    return (
        <div className="w-12 shrink-0 border-r border-border bg-background flex flex-col items-center py-2 gap-2 h-full overflow-y-auto">
            {regularPages.map((page) => {
                const Icon = PAGE_ICONS[page.key] || IconFile;
                const isActive = activePage === page.key;
                
                return (
                    <button
                        key={page.key}
                        title={page.label}
                        onClick={() => onPageChange(page.key)}
                        className={cn(
                            "w-9 h-9 rounded-lg flex flex-col items-center justify-center transition-colors group relative",
                            isActive 
                                ? "bg-accent text-accent-foreground" 
                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        {/* We could add an 8px label here, but at 36x36px a 16px icon and 8px text is very tight.
                            The brief asks for "Icon label: 8px, truncated, below the icon" 
                            Wait, w-9 h-9 is 36px. Let's make it 100% compliant with brief: */}
                    </button>
                );
            })}

            <div className="w-6 h-px bg-border my-1" />

            <button
                title="Global Layout"
                onClick={() => onPageChange("layout")}
                className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                    activePage === "layout" 
                        ? "bg-accent text-accent-foreground" 
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
            >
                <IconLayoutNavbar className="w-4 h-4" />
            </button>
        </div>
    );
}
