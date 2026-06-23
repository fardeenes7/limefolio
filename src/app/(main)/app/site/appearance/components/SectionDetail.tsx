import React from "react";
import { ComponentRegistry } from "@/templates/components";
import type { ResolvedSection, SectionOverride, ComponentInput } from "@/templates/types";
import { InputEditor } from "./InputEditor";
import { VariantIcon } from "./VariantIcon";
import { cn } from "@/lib/utils";
import { 
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger 
} from "@/components/ui/accordion";

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

    // Group inputs
    const groups: Record<string, ComponentInput[]> = {};
    visibleInputs.forEach(input => {
        let group = input.group;
        if (!group) {
            const key = input.key.toLowerCase();
            if (key.includes('style') || key.includes('color') || key.includes('theme') || key.includes('alignment')) {
                group = 'Style';
            } else {
                group = 'Content';
            }
        }
        if (!groups[group]) groups[group] = [];
        groups[group].push(input);
    });

    const groupKeys = Object.keys(groups).sort((a, b) => {
        if (a === 'Content') return -1;
        if (b === 'Content') return 1;
        return a.localeCompare(b);
    });

    return (
        <div className="flex flex-col bg-background">
            <div className="p-3 space-y-5">
                {/* Variants */}
                {schema.variants.length > 1 && (
                    <div className="flex flex-col gap-3">
                        <span className="text-[11px] font-medium text-foreground">
                            Layout Variant
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                            {schema.variants.map((v) => {
                                const isActive = v.key === section.resolvedVariant;
                                const isAllowed = section.allowedVariants?.includes(v.key) ?? true;
                                if (!isAllowed) return null;

                                return (
                                    <button
                                        key={v.key}
                                        onClick={() => onVariantChange(v.key)}
                                        className={cn(
                                            "flex flex-col items-center gap-2 py-2.5 px-2 rounded-lg transition-all text-center group select-none border",
                                            isActive 
                                                ? "bg-primary/5 text-primary border-primary/30" 
                                                : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/50"
                                        )}
                                    >
                                        <VariantIcon 
                                            variantKey={v.key} 
                                            className={cn("size-8 transition-opacity", isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100")} 
                                        />
                                        <span className="text-[11px] font-medium leading-tight line-clamp-1">
                                            {variantKeyToLabel(v.key)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Inputs */}
                {groupKeys.length > 0 && (
                    <div className="w-full flex flex-col gap-6">
                        {groupKeys.map((groupKey) => (
                            <div key={groupKey} className="flex flex-col">
                                <div className="py-2 mb-3 border-b border-border/40">
                                    <span className="text-[11px] font-medium text-foreground">
                                        {groupKey}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {groups[groupKey].map((input) => {
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
                                                compact
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {visibleInputs.length === 0 && schema.variants.length <= 1 && (
                    <div className="text-[9px] text-muted-foreground italic text-center py-4 border border-dashed rounded-md">
                        No configurable options for this section.
                    </div>
                )}
            </div>
        </div>
    );
}
