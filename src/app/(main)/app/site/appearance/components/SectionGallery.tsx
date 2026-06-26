import React from "react";
import { ComponentRegistry } from "@/templates/components";
import { SectionWireframe } from "./SectionWireframe";
import { IconPlus, IconRotate } from "@tabler/icons-react";

interface SectionGalleryProps {
    sections: {
        key: string;
        label: string;
        isRepeatable: boolean;
        isAlreadyPresent: boolean;
        isRemoved: boolean;
        instanceId?: string;
    }[];
    onAddSection: (componentKey: string) => void;
    onRestoreSection: (instanceId: string) => void;
}

export function SectionGallery({
    sections,
    onAddSection,
    onRestoreSection
}: SectionGalleryProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {sections.map((section) => {
                    const schema = ComponentRegistry[section.key];
                    if (!schema) return null;

                    const canAdd =
                        section.isRepeatable || !section.isAlreadyPresent;
                    const canRestore = section.isRemoved && section.instanceId;

                    return (
                        <div
                            key={section.instanceId || section.key}
                            className="group relative flex flex-col items-start p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-all text-left"
                        >
                            <div className="w-full aspect-[48/32] mb-3 rounded-lg border border-border/50 bg-muted/20 overflow-hidden flex items-center justify-center group-hover:bg-muted/40 transition-colors">
                                <SectionWireframe
                                    componentKey={section.key}
                                    className="w-full h-full p-4 opacity-60 group-hover:opacity-100 transition-opacity"
                                />
                            </div>

                            <div className="flex items-center justify-between w-full">
                                <div className="min-w-0 pr-2">
                                    <h4 className="text-[13px] font-medium text-foreground truncate">
                                        {section.label}
                                    </h4>
                                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                                        {section.isRemoved
                                            ? "Hidden from page"
                                            : section.isRepeatable
                                              ? "Can add multiple"
                                              : "Standard section"}
                                    </p>
                                </div>

                                {canRestore ? (
                                    <button
                                        onClick={() =>
                                            onRestoreSection(
                                                section.instanceId!
                                            )
                                        }
                                        className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                                        title="Restore section"
                                    >
                                        <IconRotate className="w-3.5 h-3.5 text-primary" />
                                    </button>
                                ) : canAdd ? (
                                    <button
                                        onClick={() =>
                                            onAddSection(section.key)
                                        }
                                        className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                                        title="Add section"
                                    >
                                        <IconPlus className="w-3.5 h-3.5 text-primary" />
                                    </button>
                                ) : (
                                    <div className="shrink-0 w-7 h-7 flex items-center justify-center">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full bg-green-500/50"
                                            title="Present on page"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
