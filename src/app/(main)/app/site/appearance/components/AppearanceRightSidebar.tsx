"use client";

import React from "react";
import { SectionDetail } from "./SectionDetail";
import { ComponentRegistry } from "@/templates/components";
import type { ResolvedSection, SectionOverride } from "@/templates/types";
import { useAppearanceState } from "../hooks/useAppearanceState";
import { useSectionCustomizer } from "../hooks/useSectionCustomizer";
import { useResolvedSections } from "../hooks/useResolvedSections";
import { IconChevronLeft, IconAdjustments } from "@tabler/icons-react";

interface AppearanceRightSidebarProps {
    activePageKey: string;
    selectedSection: ResolvedSection | null;
    selectedOverride: SectionOverride;
    stateHelpers: ReturnType<typeof useAppearanceState>;
    onClose: () => void;
}

export function AppearanceRightSidebar({
    activePageKey,
    selectedSection,
    selectedOverride,
    stateHelpers,
    onClose,
}: AppearanceRightSidebarProps) {
    const resolvedConfig = useResolvedSections({ overrides: stateHelpers.overrides, additions: stateHelpers.additions, removals: stateHelpers.removals, ordering: stateHelpers.ordering } as any);
    const customizer = useSectionCustomizer(activePageKey, stateHelpers, resolvedConfig.layout);
    const schema = selectedSection ? ComponentRegistry[selectedSection.componentKey] : null;

    return (
        <div
            className="flex flex-col h-full border-l border-border bg-background shrink-0"
            style={{ width: 280 }}
        >
            {selectedSection ? (
                <>
                    {/* Header with breadcrumb back */}
                    <div className="flex items-center gap-2 px-3 h-12 border-b border-border bg-background shrink-0">
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                            <IconChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-[13px] font-medium text-foreground tracking-tight truncate">
                            {schema?.label ?? selectedSection.componentKey}
                        </span>
                    </div>

                    {/* Section detail */}
                    <div className="flex-1 overflow-y-auto min-h-0">
                        <SectionDetail
                            section={selectedSection}
                            userOverride={selectedOverride}
                            onVariantChange={(v) =>
                                customizer.updateVariant(selectedSection.instanceId, v)
                            }
                            onInputChange={(k, v) =>
                                customizer.updateInput(selectedSection.instanceId, k, v)
                            }
                            onInputReset={(k) =>
                                customizer.updateInput(selectedSection.instanceId, k, undefined)
                            }
                        />
                    </div>
                </>
            ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center">
                    <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                        <IconAdjustments className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-[11px] font-medium text-foreground">Section options</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                            Select a section from the left to edit its options
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
