"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SectionDetail } from "./SectionDetail";
import { ComponentRegistry } from "@/templates/components";
import type { ResolvedSection, SectionOverride } from "@/templates/types";
import { useAppearanceState } from "../hooks/useAppearanceState";
import { useSectionCustomizer } from "../hooks/useSectionCustomizer";
import { useResolvedSections } from "../hooks/useResolvedSections";
import { IconSettings, IconLayoutList, IconX, IconChevronLeft } from "@tabler/icons-react";

interface SectionDetailPanelProps {
    activePageKey: string;
    selectedSection: ResolvedSection | null;
    selectedOverride: SectionOverride;
    stateHelpers: ReturnType<typeof useAppearanceState>;
    onClose: () => void;
}

export function SectionDetailPanel({
    activePageKey,
    selectedSection,
    selectedOverride,
    stateHelpers,
    onClose,
}: SectionDetailPanelProps) {
    const resolvedConfig = useResolvedSections({ overrides: stateHelpers.overrides, additions: stateHelpers.additions, removals: stateHelpers.removals, ordering: stateHelpers.ordering } as any);
    const customizer = useSectionCustomizer(activePageKey, stateHelpers, resolvedConfig.layout);
    const schema = selectedSection ? ComponentRegistry[selectedSection.componentKey] : null;

    const isEmpty = !selectedSection;

    return (
        <div
            className={cn(
                "flex flex-col h-full border-l border-border bg-background shrink-0 transition-all duration-200",
            )}
            style={{ width: 260 }}
        >
            {isEmpty ? (
                /* Empty state */
                <div className="flex flex-col h-full items-center justify-center gap-3 p-6 text-center">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.829 1.172H7v-2a4 4 0 011.172-2.829z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[12px] font-medium text-foreground">No section selected</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Click a section to edit its properties</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className="flex items-center gap-2 px-3 h-9 border-b border-border shrink-0">
                        <button
                            onClick={onClose}
                            className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors shrink-0"
                        >
                            <IconChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[12px] font-semibold text-foreground truncate flex-1">
                            {schema?.label || selectedSection?.componentKey}
                        </span>
                        <button
                            onClick={onClose}
                            className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors shrink-0"
                        >
                            <IconX className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Detail content */}
                    <div className="flex-1 overflow-y-auto min-h-0">
                        <SectionDetail
                            section={selectedSection}
                            userOverride={selectedOverride}
                            onVariantChange={(v) => customizer.updateVariant(selectedSection!.instanceId, v)}
                            onInputChange={(k, v) => customizer.updateInput(selectedSection!.instanceId, k, v)}
                            onInputReset={(k) => customizer.updateInput(selectedSection!.instanceId, k, undefined)}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
