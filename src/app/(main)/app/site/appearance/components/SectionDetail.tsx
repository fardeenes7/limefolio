import React from "react";
import { ComponentRegistry } from "@/templates/components";
import type { ResolvedSection, SectionOverride } from "@/templates/types";
import { InputEditor } from "./InputEditor";
import { cn } from "@/lib/utils";

interface SectionDetailProps {
    section: ResolvedSection | null;
    userOverride: SectionOverride;
    onVariantChange: (variantKey: string) => void;
    onInputChange: (inputKey: string, value: unknown) => void;
    onInputReset: (inputKey: string) => void;
}

function variantKeyToLabel(key: string) {
    return key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function SectionDetail({
    section,
    userOverride,
    onVariantChange,
    onInputChange,
    onInputReset,
}: SectionDetailProps) {
    if (!section) return null;

    const schema = ComponentRegistry[section.componentKey];
    if (!schema) return null;

    const currentInputs = section.resolvedInputs;

    const visibleInputs = schema.inputs.filter((input) => {
        if (input.showIf) {
            if (input.showIf.input === 'variant') {
                return section.resolvedVariant === input.showIf.equals;
            }
            return currentInputs[input.showIf.input] === input.showIf.equals;
        }
        return true;
    });

    return (
        <div className="flex flex-col border-t border-border bg-card overflow-y-auto max-h-[240px]">
            <div className="p-3 space-y-4">
                {/* Variants */}
                {schema.variants.length > 1 && (
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[9px] font-medium tracking-widest text-muted-foreground uppercase">
                            Variant
                        </span>
                        <div className={cn(
                            "flex gap-1.5",
                            schema.variants.length >= 8 ? "overflow-x-auto flex-nowrap pb-1" : "flex-wrap"
                        )}>
                            {schema.variants.map((v) => {
                                const isActive = v.key === section.resolvedVariant;
                                // Use allowedVariants check if available
                                const isAllowed = section.allowedVariants?.includes(v.key) ?? true;
                                if (!isAllowed) return null;

                                return (
                                    <button
                                        key={v.key}
                                        onClick={() => onVariantChange(v.key)}
                                        className={cn(
                                            "text-[10px] px-2 py-1 rounded border-[0.5px] transition-colors whitespace-nowrap",
                                            isActive 
                                                ? "bg-foreground text-background border-transparent" 
                                                : "border-border text-muted-foreground bg-transparent hover:text-foreground"
                                        )}
                                    >
                                        {variantKeyToLabel(v.key)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Inputs */}
                {visibleInputs.length > 0 && (
                    <div className="flex flex-col gap-3">
                        <span className="text-[9px] font-medium tracking-widest text-muted-foreground uppercase">
                            Content
                        </span>
                        {visibleInputs.map((input) => {
                            const isModified = userOverride.inputs !== undefined && input.key in userOverride.inputs;
                            const defaultValue = section.inputDefaults?.[input.key] ?? input.default;
                            
                            return (
                                <InputEditor
                                    key={input.key}
                                    input={input}
                                    value={currentInputs[input.key]}
                                    defaultValue={defaultValue}
                                    isModified={isModified}
                                    onChange={(val) => onInputChange(input.key, val)}
                                    onReset={() => onInputReset(input.key)}
                                />
                            );
                        })}
                    </div>
                )}

                {visibleInputs.length === 0 && schema.variants.length <= 1 && (
                    <div className="text-[10px] text-muted-foreground italic text-center py-2">
                        No configurable options for this section.
                    </div>
                )}
            </div>
        </div>
    );
}
