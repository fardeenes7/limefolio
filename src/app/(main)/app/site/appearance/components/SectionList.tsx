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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
                "flex items-center px-2 h-9 transition-all cursor-pointer group select-none border border-transparent",
                isSelected ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20" : "hover:bg-muted/70 text-foreground/80",
                isDragging && "opacity-60 ring-2 ring-primary bg-background shadow-xl z-50",
                isRemoved && "opacity-40"
            )}
        >
            {/* Drag Handle or Lock */}
            <div className="flex items-center justify-center w-6 h-6 mr-0.5 shrink-0 -ml-1">
                {section.fixed ? (
                    <IconLock className="w-3.5 h-3.5 text-muted-foreground/40" />
                ) : (
                    <div 
                        className="text-muted-foreground/40 hover:text-foreground cursor-grab active:cursor-grabbing p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                        {...attributes}
                        {...listeners}
                    >
                        <IconGripVertical className="w-3.5 h-3.5" />
                    </div>
                )}
            </div>

            {/* Component Icon */}
            <div className="flex items-center justify-center shrink-0 mr-2.5">
                <Icon className={cn("w-[15px] h-[15px]", isSelected ? "text-primary" : "text-muted-foreground")} />
            </div>

            {/* Label */}
            <span className="text-[12px] font-medium flex-1 truncate">
                {schema.label}
            </span>

            {/* Variant Pill */}
            {schema.variants.length > 1 && (
                <span className={cn(
                    "text-[10px] ml-2 truncate max-w-[80px] px-1.5 py-px rounded-[4px] border",
                    isVariantModified 
                        ? "border-primary/30 bg-primary/5 text-primary font-semibold" 
                        : "border-border/50 bg-muted/30 text-muted-foreground font-medium"
                )}>
                    {schema.variants.find(v => v.key === section.resolvedVariant)?.label || section.resolvedVariant}
                </span>
            )}

            {/* Actions */}
            <div className="flex items-center ml-2 w-6 justify-end shrink-0">
                {(schema.removable || section.removable) && !section.fixed && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
                        className={cn(
                            "p-1 hover:text-foreground transition-opacity",
                            isSelected || isRemoved ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus:opacity-100",
                            isSelected ? "text-primary/70 hover:text-primary" : "text-muted-foreground"
                        )}
                        title={isRemoved ? "Restore section" : "Hide section"}
                    >
                        {isRemoved ? <IconEyeOff className="w-[15px] h-[15px]" /> : <IconEye className="w-[15px] h-[15px]" />}
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
            <div className="flex-1 overflow-y-auto pb-4">
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
                    <div className="mt-2 pt-2 border-t border-border/40">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button 
                                    className="w-full h-[32px] text-[12px] font-medium text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 rounded-[6px] hover:bg-muted/50 transition-colors"
                                >
                                    <IconPlus className="w-[14px] h-[14px]" /> Add section
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Section Gallery</DialogTitle>
                                </DialogHeader>
                                {/* TODO: add section gallery */}
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </div>
        </div>
    );
}
