import React from "react";
import { ComponentRegistry } from "@/templates/components";
import type { ResolvedSection, SectionOverride, ComponentInput } from "@/templates/types";
import { InputEditor } from "./InputEditor";
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
        <div className="flex flex-col border-t-2 border-border bg-card overflow-y-auto max-h-[70vh] shadow-inner">
            <div className="p-6 space-y-8">
                {/* Variants */}
                {schema.variants.length > 1 && (
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground/70 uppercase">
                            Visual Variant
                        </span>
                        <div className={cn(
                            "flex gap-2",
                            schema.variants.length >= 6 ? "overflow-x-auto flex-nowrap pb-2 scrollbar-hide" : "flex-wrap"
                        )}>
                            {schema.variants.map((v) => {
                                const isActive = v.key === section.resolvedVariant;
                                const isAllowed = section.allowedVariants?.includes(v.key) ?? true;
                                if (!isAllowed) return null;

                                return (
                                    <button
                                        key={v.key}
                                        onClick={() => onVariantChange(v.key)}
                                        className={cn(
                                            "text-[11px] font-medium px-3.5 py-2 rounded-lg border-2 transition-all whitespace-nowrap",
                                            isActive 
                                                ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                                                : "border-border text-muted-foreground bg-background hover:border-primary/40 hover:text-foreground"
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
                {groupKeys.length > 0 && (
                    <Accordion type="multiple" defaultValue={['Content']} className="w-full space-y-2">
                        {groupKeys.map((groupKey) => (
                            <AccordionItem key={groupKey} value={groupKey} className="border-b-2 border-border/40 last:border-0">
                                <AccordionTrigger className="py-4 hover:no-underline">
                                    <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground/70 uppercase">
                                        {groupKey}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-6 space-y-4">
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
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}

                {visibleInputs.length === 0 && schema.variants.length <= 1 && (
                    <div className="text-[10px] text-muted-foreground italic text-center py-6 border border-dashed rounded-lg">
                        No configurable options for this section.
                    </div>
                )}
            </div>
        </div>
    );
}
