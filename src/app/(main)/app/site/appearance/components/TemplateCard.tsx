import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Template } from "@/templates/types";

interface TemplateCardProps {
    template: Template;
    isActive: boolean;
    onClick: () => void;
}

export function TemplateCard({ template, isActive, onClick }: TemplateCardProps) {
    // Attempt to load the thumbnail, otherwise fallback to placeholder
    // Thumbnails live at /public/templates/[templateKey]/thumbnail.png
    const thumbnailPath = `/templates/${template.key}/thumbnail.png`;

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "group relative shrink-0 flex flex-col text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-48",
                isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
            )}
        >
            <div className={cn(
                "relative h-32 w-full rounded-md overflow-hidden border bg-muted/50 mb-2 transition-all",
                isActive ? "ring-2 ring-ring ring-offset-2 border-primary" : "border-border group-hover:border-primary/50"
            )}>
                {/* Image component can handle missing images if we use a try/catch or handleError, 
                    but a simple img with onError might be easier for local public files that may not exist. 
                    Next.js Image requires width/height. */}
                <Image
                    src={thumbnailPath}
                    alt={template.label}
                    fill
                    className="object-cover"
                    onError={(e) => {
                        // Fallback to placeholder on error
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                            const div = document.createElement('div');
                            div.className = 'fallback-text absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground bg-muted';
                            div.innerText = template.label;
                            parent.appendChild(div);
                        }
                    }}
                />
                
                {isActive && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        Current
                    </div>
                )}
            </div>
            <div className="font-medium text-sm text-foreground">{template.label}</div>
            {/* If template had description, it would go here */}
        </button>
    );
}
