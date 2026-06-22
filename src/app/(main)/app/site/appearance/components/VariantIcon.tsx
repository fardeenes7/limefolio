import React from "react";
import { cn } from "@/lib/utils";

interface VariantIconProps {
    variantKey: string;
    className?: string;
}

export function VariantIcon({ variantKey, className }: VariantIconProps) {
    const renderIcon = () => {
        const key = variantKey.toLowerCase();
        
        if (key.includes("split") || key === "image_split") {
            return (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
                    <rect x="2" y="4" width="9" height="16" rx="1.5" className="fill-current opacity-30" />
                    <rect x="13" y="7" width="9" height="2" rx="1" className="fill-current" />
                    <rect x="13" y="11" width="7" height="2" rx="1" className="fill-current" />
                    <rect x="13" y="15" width="5" height="2" rx="1" className="fill-current" />
                </svg>
            );
        }
        
        if (key.includes("center") || key === "centered" || key === "minimal_text" || key === "typing_animation") {
            return (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
                    <rect x="6" y="8" width="12" height="2" rx="1" className="fill-current" />
                    <rect x="8" y="12" width="8" height="2" rx="1" className="fill-current" />
                    <rect x="9" y="16" width="6" height="2" rx="1" className="fill-current opacity-50" />
                </svg>
            );
        }

        if (key.includes("grid") || key.includes("column")) {
            return (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
                    <rect x="3" y="4" width="7" height="7" rx="1" className="fill-current opacity-50" />
                    <rect x="14" y="4" width="7" height="7" rx="1" className="fill-current opacity-50" />
                    <rect x="3" y="13" width="7" height="7" rx="1" className="fill-current opacity-50" />
                    <rect x="14" y="13" width="7" height="7" rx="1" className="fill-current opacity-50" />
                </svg>
            );
        }

        if (key === "compact") {
            return (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
                    <rect x="2" y="10" width="20" height="4" rx="1" className="fill-current" />
                </svg>
            );
        }
        
        if (key === "modal" || key === "corner_card") {
            return (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
                    <rect x="6" y="6" width="12" height="12" rx="2" className="fill-current opacity-20" />
                    <rect x="8" y="10" width="8" height="2" rx="1" className="fill-current" />
                    <rect x="8" y="14" width="5" height="2" rx="1" className="fill-current" />
                </svg>
            );
        }

        if (key.includes("video") || key.includes("3d") || key.includes("animated")) {
            return (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
                    <rect x="2" y="4" width="20" height="16" rx="2" className="fill-current opacity-20" />
                    <polygon points="10,9 16,12 10,15" className="fill-current opacity-70" />
                </svg>
            );
        }

        // Default or "bar"
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
                <rect x="3" y="6" width="18" height="12" rx="1.5" className="fill-current opacity-20" />
                <rect x="6" y="11" width="12" height="2" rx="1" className="fill-current" />
            </svg>
        );
    };

    return (
        <div className={cn("flex items-center justify-center shrink-0", className)}>
            {renderIcon()}
        </div>
    );
}
