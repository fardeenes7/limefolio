import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Template } from "@/templates/types";

interface TemplateCardProps {
    template: Template;
    isActive: boolean;
    onClick: () => void;
}

export function TemplateCard({ template, isActive, onClick }: TemplateCardProps) {
    const thumbnailPath = `/templates/${template.key}/thumbnail.png`;
    const [imgError, setImgError] = useState(false);

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "group w-full flex flex-col items-start px-6 py-4 transition-opacity text-left select-none relative",
                isActive ? "opacity-100 bg-primary/5" : "opacity-60 hover:opacity-80 hover:bg-muted cursor-pointer"
            )}
        >
            {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r-full" />
            )}

            {/* Thumbnail */}
            <div className="relative w-full aspect-16/10 rounded-md overflow-hidden bg-muted mb-3 border border-border transition-colors group-hover:border-border">
                {!imgError ? (
                    <Image
                        src={thumbnailPath}
                        alt={template.label}
                        fill
                        className="object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                        {template.label}
                    </div>
                )}
            </div>

            {/* Label */}
            <div className="w-full flex items-center justify-between">
                <span className="text-[13px] font-medium tracking-tight text-foreground">{template.label}</span>
                {isActive && (
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Active</span>
                )}
            </div>
        </button>
    );
}

