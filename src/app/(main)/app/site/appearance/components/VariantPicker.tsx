import React from "react";
import { cn } from "@/lib/utils";
import type { ComponentSchema } from "@/templates/types";

interface VariantPickerProps {
    schema: ComponentSchema;
    allowedVariants: string[];
    selectedVariant: string;
    onVariantChange: (variantKey: string) => void;
}

export function VariantPicker({ schema, allowedVariants, selectedVariant, onVariantChange }: VariantPickerProps) {
    if (allowedVariants.length <= 1) return null;

    const availableVariants = schema.variants.filter(v => allowedVariants.includes(v.key));

    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">Variant</span>
            <div className="flex flex-wrap gap-2">
                {availableVariants.map(variant => {
                    const isSelected = variant.key === selectedVariant;
                    return (
                        <button
                            key={variant.key}
                            onClick={() => onVariantChange(variant.key)}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                                isSelected 
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                            )}
                        >
                            {variant.label}
                        </button>
                    );
                })}
            </div>
            {/* If we had variant thumbnails, we could render them here based on selectedVariant */}
        </div>
    );
}
