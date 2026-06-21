import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { cn } from "@/lib/utils";
import { ComponentRegistry } from "@/templates/components";
import type { ResolvedSection, SectionOverride, UserPortfolioConfig } from "@/templates/types";
import { 
    IconGripVertical, 
    IconEye, 
    IconEyeOff, 
    IconLock,
    IconPlus,
    IconSection,
    IconSparkles,
    IconUser,
    IconLayersLinked, // Wait, using standard tabler icons...
    IconFolder,
    IconPhoto,
    IconWriting,
    IconCursorText,
    IconMessageCircle,
    IconBriefcase,
    IconTimeline, // or IconHistory
    IconMail,
    IconChartBar,
    IconSocial,
    IconLayoutNavbar,
    IconLayoutBottombar, // footer
    IconCookie
} from "@tabler/icons-react";

import { useSectionCustomizer } from "../hooks/useSectionCustomizer";
import { useAppearanceState } from "../hooks/useAppearanceState";
import { useResolvedSections } from "../hooks/useResolvedSections";
import { getTemplate } from "@/templates/registry";

const COMPONENT_ICONS: Record<string, React.ElementType> = {
    hero: IconSparkles, 
    about: IconUser, 
    skills: IconSection, // fallback since ti-layers is layers
    featured_projects: IconFolder, 
    media_gallery: IconPhoto,
    latest_blogs: IconWriting, 
    cta: IconCursorText, 
    testimonials: IconMessageCircle, 
    services: IconBriefcase,
    experience: IconSection, // timeline fallback
    contact: IconMail,
    stats: IconChartBar, 
    social_feed: IconSocial,
    header: IconLayoutNavbar, 
    footer: IconLayoutBottombar,
    cookie_banner: IconCookie,
};

interface SortableSectionRowProps {
    section: ResolvedSection;
    userOverride: SectionOverride;
    isRemoved: boolean;
    isSelected: boolean;
    onSelect: () => void;
    onToggleVisibility: () => void;
}

function SortableSectionRow({
    section,
    userOverride,
    isRemoved,
    isSelected,
    onSelect,
    onToggleVisibility,
}: SortableSectionRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ 
        id: section.instanceId,
        disabled: section.fixed 
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    const schema = ComponentRegistry[section.componentKey];
    if (!schema) return null;

    const Icon = COMPONENT_ICONS[section.componentKey] || IconSection;
    const isVariantModified = userOverride.variant !== undefined && userOverride.variant !== section.defaultVariant;

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            onClick={onSelect}
            className={cn(
                "flex items-center px-3 h-12 transition-all cursor-pointer group select-none border border-transparent",
                isSelected ? "bg-accent/60 rounded-xl border-accent-foreground/10 shadow-sm" : "hover:bg-muted/50 rounded-xl",
                isDragging && "opacity-50 ring-2 ring-primary bg-background shadow-lg",
                isRemoved && "opacity-40"
            )}
        >
            {/* Drag Handle or Lock */}
            <div className="flex items-center justify-center w-8 h-8 mr-1 shrink-0">
                {section.fixed ? (
                    <IconLock className="w-3 h-3 text-muted-foreground/40" />
                ) : (
                    <div 
                        className="text-muted-foreground/40 hover:text-foreground cursor-grab active:cursor-grabbing p-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                        {...attributes}
                        {...listeners}
                    >
                        <IconGripVertical className="w-4 h-4" />
                    </div>
                )}
            </div>

            {/* Component Icon */}
            <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center shrink-0 mr-3">
                <Icon className="w-4 h-4 text-foreground/80" />
            </div>

            {/* Label */}
            <span className="text-[13px] font-semibold flex-1 truncate text-foreground/90">
                {schema.label}
            </span>

            {/* Variant Pill */}
            {schema.variants.length > 1 && (
                <span className={cn(
                    "text-[10px] ml-2 truncate max-w-[90px] px-1.5 py-0.5 rounded-md bg-muted/50",
                    isVariantModified ? "text-primary font-bold bg-primary/10" : "text-muted-foreground font-medium"
                )}>
                    {schema.variants.find(v => v.key === section.resolvedVariant)?.label || section.resolvedVariant}
                </span>
            )}

            {/* Actions */}
            <div className="flex items-center ml-2 w-8 justify-end shrink-0">
                {(schema.removable || section.removable) && !section.fixed && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
                        className="p-1.5 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                        title={isRemoved ? "Restore section" : "Hide section"}
                    >
                        {isRemoved ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                    </button>
                )}
            </div>
        </div>
    );
}

interface SectionListProps {
    draftConfig: Partial<UserPortfolioConfig>;
    stateHelpers: ReturnType<typeof useAppearanceState>;
    activePageKey: string;
    activePageLabel: string;
    selectedInstanceId: string | null;
    onSelectInstance: (id: string | null) => void;
}

export function SectionList({ 
    draftConfig, 
    stateHelpers, 
    activePageKey, 
    activePageLabel,
    selectedInstanceId,
    onSelectInstance
}: SectionListProps) {
    const template = getTemplate(draftConfig.templateKey);
    const resolvedConfig = useResolvedSections(draftConfig);
    const customizer = useSectionCustomizer(activePageKey, stateHelpers);

    const isGlobal = activePageKey === 'layout';
    const sectionsToRender = isGlobal 
        ? resolvedConfig.layout 
        : resolvedConfig.pages.find(p => p.key === activePageKey)?.sections || [];

    const overridesSource = isGlobal 
        ? stateHelpers.overrides.layout 
        : (stateHelpers.overrides.pages[activePageKey] || {});

    const removalsSource = isGlobal 
        ? stateHelpers.removals.layout 
        : (stateHelpers.removals.pages[activePageKey] || []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = sectionsToRender.findIndex(s => s.instanceId === active.id);
            const newIndex = sectionsToRender.findIndex(s => s.instanceId === over.id);

            const newArray = arrayMove(sectionsToRender, oldIndex, newIndex);
            const newOrdering = newArray.filter(s => !s.fixed).map(s => s.instanceId);
            customizer.reorderSections(newOrdering);
        }
    };

    // Find repeatable components for this page
    const allowedRepeatables = isGlobal ? [] : (template.pages.find(p => p.key === activePageKey)?.sections || [])
        .map(s => ComponentRegistry[s.componentKey])
        .filter(schema => schema?.repeatable);
    
    // Unique repeatable component keys
    const uniqueRepeatables = Array.from(new Set(allowedRepeatables.map(r => r.key)));

    return (
        <div className="flex flex-col h-full flex-1 min-h-0 overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70 px-6 pt-6 pb-4 shrink-0">
                {activePageLabel}
            </p>

            <div className="flex-1 overflow-y-auto px-3 pb-6">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={sectionsToRender.map(s => s.instanceId)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="flex flex-col gap-1.5">
                            {sectionsToRender.map((section) => {
                                const isRemoved = removalsSource.includes(section.instanceId);
                                const override = overridesSource[section.instanceId] || {};
                                
                                return (
                                    <SortableSectionRow
                                        key={section.instanceId}
                                        section={section}
                                        userOverride={override}
                                        isRemoved={isRemoved}
                                        isSelected={selectedInstanceId === section.instanceId}
                                        onSelect={() => onSelectInstance(section.instanceId)}
                                        onToggleVisibility={() => customizer.toggleVisibility(section.instanceId)}
                                    />
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>

                {uniqueRepeatables.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border/60">
                        {/* For simplicity, if there's only 1 repeatable, add it directly, or show a dialog. */}
                        <button 
                            className="w-full text-[12px] font-medium text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                            onClick={() => {
                                // For now just add the first repeatable as a demo, a proper dialog could be added
                                if (uniqueRepeatables.length > 0) {
                                    customizer.addSection(uniqueRepeatables[0]);
                                }
                            }}
                        >
                            <IconPlus className="w-4 h-4" /> Add section
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
