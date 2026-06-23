"use client";

import React, { useState } from "react";
import { ComponentRegistry } from "@/templates/components";
import type { ResolvedSection, SectionOverride, ComponentInput } from "@/templates/types";
import { InputEditor } from "./InputEditor";
import { VariantIcon } from "./VariantIcon";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";

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

/** Collapsible group section with a modified-count badge */
function InputGroup({
    title,
    inputs,
    modifiedCount,
    children,
}: {
    title: string;
    inputs: ComponentInput[];
    modifiedCount: number;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(true);

    return (
        <div className="flex flex-col">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 py-2 px-0 group select-none"
            >
                <span className="text-[11px] font-semibold text-foreground flex-1 text-left">
                    {title}
                </span>
                {modifiedCount > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-primary/15 text-primary text-[9px] font-bold leading-none">
                        {modifiedCount}
                    </span>
                )}
                <IconChevronDown
                    className={cn(
                        "w-3.5 h-3.5 text-muted-foreground/60 transition-transform duration-200",
                        open ? "rotate-0" : "-rotate-90"
                    )}
                />
            </button>
            {/* Animated collapse */}
            <div
                className={cn(
                    "overflow-hidden transition-all duration-200",
                    open ? "opacity-100" : "max-h-0 opacity-0"
                )}
                style={open ? {} : { maxHeight: 0 }}
            >
                <div className="space-y-0.5 pb-2">
                    {children}
                </div>
            </div>
        </div>
    );
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
            if (key.includes('style') || key.includes('color') || key.includes('theme') || key.includes('alignment') || key.includes('background')) {
                group = 'Style';
            } else if (key.includes('show') || key.includes('layout') || key.includes('max') || key.includes('column') || key.includes('hover')) {
                group = 'Layout';
            } else {
                group = 'Content';
            }
        }
        if (!groups[group]) groups[group] = [];
        groups[group].push(input);
    });

    const groupOrder = ['Content', 'Style', 'Layout'];
    const groupKeys = Object.keys(groups).sort((a, b) => {
        const ai = groupOrder.indexOf(a);
        const bi = groupOrder.indexOf(b);
        if (ai === -1 && bi === -1) return a.localeCompare(b);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
    });

    return (
        <div className="flex flex-col bg-background">
            <div className="p-3 space-y-5">
                {/* ── Variants ──────────────────────────────────────── */}
                {schema.variants.length > 1 && (
                    <div className="flex flex-col gap-3">
                        <span className="text-[11px] font-semibold text-foreground">
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

                {/* ── Inputs ────────────────────────────────────────── */}
                {groupKeys.length > 0 && (
                    <div className="w-full flex flex-col divide-y divide-border/30">
                        {groupKeys.map((groupKey) => {
                            const groupInputs = groups[groupKey];
                            const modifiedCount = groupInputs.filter(
                                inp => userOverride.inputs !== undefined && inp.key in userOverride.inputs
                            ).length;

                            return (
                                <InputGroup
                                    key={groupKey}
                                    title={groupKey}
                                    inputs={groupInputs}
                                    modifiedCount={modifiedCount}
                                >
                                    {groupInputs.map((input) => {
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
                                </InputGroup>
                            );
                        })}
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
