import React from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ComponentRegistry } from "@/templates/components";
import type {
    ResolvedSection,
    SectionOverride,
    UserPortfolioConfig
} from "@/templates/types";
import {
    IconGripVertical,
    IconEye,
    IconEyeOff,
    IconLock,
    IconPlus,
    IconSection,
    IconSparkles,
    IconUser,
    IconFolder,
    IconPhoto,
    IconWriting,
    IconCursorText,
    IconFileDescription,
    IconMessageCircle,
    IconBriefcase,
    IconMail,
    IconChartBar,
    IconSocial,
    IconLayoutNavbar,
    IconLayoutBottombar, // footer
    IconCookie,
    IconRefresh
} from "@tabler/icons-react";

import { useSectionCustomizer } from "../hooks/useSectionCustomizer";
import { useAppearanceState } from "../hooks/useAppearanceState";
import { useResolvedSections } from "../hooks/useResolvedSections";
import { getTemplate } from "@/templates/registry";
import { SectionGallery } from "./SectionGallery";
import { Button } from "@/components/ui/button";

const COMPONENT_ICONS: Record<string, React.ElementType> = {
    hero: IconSparkles,
    about: IconUser,
    skills: IconSection, // fallback since ti-layers is layers
    featured_projects: IconFolder,
    media_gallery: IconPhoto,
    project_details: IconFileDescription,
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
    cookie_banner: IconCookie
};

interface SectionRowBaseProps {
    section: ResolvedSection;
    userOverride: SectionOverride;
    isRemoved: boolean;
    isSelected: boolean;
    onSelect: () => void;
    onToggleVisibility: () => void;
    style?: React.CSSProperties;
    setNodeRef?: (node: HTMLElement | null) => void;
    attributes?: any;
    listeners?: any;
    isDragging?: boolean;
}

function SectionRowBase({
    section,
    userOverride,
    isRemoved,
    isSelected,
    onSelect,
    onToggleVisibility,
    style,
    setNodeRef,
    attributes,
    listeners,
    isDragging
}: SectionRowBaseProps) {
    const schema = ComponentRegistry[section.componentKey];
    if (!schema) return null;

    const Icon = COMPONENT_ICONS[section.componentKey] || IconSection;
    const isVariantModified =
        userOverride.variant !== undefined &&
        userOverride.variant !== section.defaultVariant;

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={onSelect}
            className={cn(
                "flex items-center px-2 h-10 transition-all cursor-pointer group select-none border border-transparent",
                isSelected
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted/70 text-foreground/80",
                isDragging &&
                    "opacity-60 ring-2 ring-primary bg-background shadow-xl z-50",
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
                <Icon
                    className={cn(
                        "w-[15px] h-[15px]",
                        isSelected ? "text-primary" : "text-muted-foreground"
                    )}
                />
            </div>

            {/* Label */}
            <span className="text-[12px] font-medium flex-1 truncate">
                {schema.label}
            </span>

            {/* Variant Pill */}
            {schema.variants.length > 1 && (
                <span
                    className={cn(
                        "text-[10px] ml-2 truncate max-w-[80px] px-1.5 py-px rounded-[4px] border",
                        isVariantModified
                            ? "border-primary/30 bg-primary/5 text-primary font-semibold"
                            : "border-border/50 bg-muted/30 text-muted-foreground font-medium"
                    )}
                >
                    {schema.variants.find(
                        (v) => v.key === section.resolvedVariant
                    )?.label || section.resolvedVariant}
                </span>
            )}

            {/* Actions */}
            <div className="flex items-center ml-2 w-6 justify-end shrink-0">
                {(schema.removable || section.removable) && !section.fixed && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleVisibility();
                        }}
                        className={cn(
                            "p-1 hover:text-foreground transition-opacity",
                            isSelected || isRemoved
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100 focus:opacity-100",
                            isSelected
                                ? "text-primary/70 hover:text-primary"
                                : "text-muted-foreground"
                        )}
                        title={isRemoved ? "Restore section" : "Hide section"}
                    >
                        {isRemoved ? (
                            <IconEyeOff className="w-[15px] h-[15px]" />
                        ) : (
                            <IconEye className="w-[15px] h-[15px]" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

function SortableSectionRow(
    props: Omit<
        SectionRowBaseProps,
        "style" | "setNodeRef" | "attributes" | "listeners" | "isDragging"
    >
) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: props.section.instanceId,
        disabled: props.section.fixed
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1
    };

    return (
        <SectionRowBase
            {...props}
            style={style}
            setNodeRef={setNodeRef}
            attributes={attributes}
            listeners={listeners}
            isDragging={isDragging}
        />
    );
}

function StaticSectionRow(
    props: Omit<
        SectionRowBaseProps,
        "style" | "setNodeRef" | "attributes" | "listeners" | "isDragging"
    >
) {
    return <SectionRowBase {...props} />;
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
    const customizer = useSectionCustomizer(
        activePageKey,
        stateHelpers,
        resolvedConfig.layout
    );

    const layoutSections = resolvedConfig.layout;
    const pageSections =
        resolvedConfig.pages.find((p) => p.key === activePageKey)?.sections ||
        [];

    // Assuming 'header' is the top layout section, everything else is at the bottom.
    const topLayoutSections = layoutSections.filter(
        (s) => s.componentKey === "header"
    );
    const bottomLayoutSections = layoutSections.filter(
        (s) => s.componentKey !== "header"
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            // Find the active section's true index inside pageSections, not sectionsToRender
            const activePageIdx = pageSections.findIndex(
                (s) => s.instanceId === active.id
            );
            const overPageIdx = pageSections.findIndex(
                (s) => s.instanceId === over.id
            );

            // Ignore drags involving layout sections
            if (activePageIdx === -1 || overPageIdx === -1) return;

            const newArray = arrayMove(
                pageSections,
                activePageIdx,
                overPageIdx
            );
            const newOrdering = newArray.map((s) => s.instanceId);
            customizer.reorderSections(newOrdering);
        }
    };

    // Prepare all supported sections for the gallery
    const pageTemplate = template.pages.find((p) => p.key === activePageKey);
    const gallerySections = (pageTemplate?.sections || []).map((s) => {
        const schema = ComponentRegistry[s.componentKey];
        const isRemoved = (
            stateHelpers.removals.pages[activePageKey] || []
        ).includes(s.instanceId);
        const isAlreadyPresent =
            pageSections.some((ps) => ps.instanceId === s.instanceId) &&
            !isRemoved;

        return {
            key: s.componentKey,
            label: schema?.label || s.componentKey,
            isRepeatable: schema?.repeatable || false,
            isAlreadyPresent,
            isRemoved,
            instanceId: s.instanceId
        };
    });

    const hasVariantOverrides =
        Object.values(stateHelpers.overrides.layout).some(
            (override) => override.variant !== undefined
        ) ||
        Object.values(stateHelpers.overrides.pages[activePageKey] || {}).some(
            (override) => override.variant !== undefined
        );

    return (
        <div className="flex flex-col h-full flex-1 min-h-0 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/40 px-2 py-2">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-semibold text-foreground">
                        {activePageLabel}
                    </p>
                    <p className="truncate text-[10px] text-muted-foreground">
                        Reset layout variants to this template&apos;s defaults.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={!hasVariantOverrides}
                    onClick={() => customizer.resetVariantsToTemplateDefaults()}
                    className="h-7 shrink-0 gap-1.5 px-2 text-[11px]"
                    title="Reset variants to template defaults"
                >
                    <IconRefresh className="h-3.5 w-3.5" />
                    Reset variants
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto pb-4">
                <div className="flex flex-col">
                    {topLayoutSections.map((section) => {
                        const isRemoved = stateHelpers.removals.layout.includes(
                            section.instanceId
                        );
                        const override =
                            stateHelpers.overrides.layout[section.instanceId] ||
                            {};
                        return (
                            <StaticSectionRow
                                key={section.instanceId}
                                section={section}
                                userOverride={override}
                                isRemoved={isRemoved}
                                isSelected={
                                    selectedInstanceId === section.instanceId
                                }
                                onSelect={() =>
                                    onSelectInstance(section.instanceId)
                                }
                                onToggleVisibility={() =>
                                    customizer.toggleVisibility(
                                        section.instanceId
                                    )
                                }
                            />
                        );
                    })}
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={pageSections
                            .filter((s) => !s.fixed)
                            .map((s) => s.instanceId)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="flex flex-col">
                            {pageSections.map((section) => {
                                const isRemoved = (
                                    stateHelpers.removals.pages[
                                        activePageKey
                                    ] || []
                                ).includes(section.instanceId);
                                const override =
                                    (stateHelpers.overrides.pages[
                                        activePageKey
                                    ] || {})[section.instanceId] || {};

                                const RowComponent = section.fixed
                                    ? StaticSectionRow
                                    : SortableSectionRow;

                                return (
                                    <RowComponent
                                        key={section.instanceId}
                                        section={section}
                                        userOverride={override}
                                        isRemoved={isRemoved}
                                        isSelected={
                                            selectedInstanceId ===
                                            section.instanceId
                                        }
                                        onSelect={() =>
                                            onSelectInstance(section.instanceId)
                                        }
                                        onToggleVisibility={() =>
                                            customizer.toggleVisibility(
                                                section.instanceId
                                            )
                                        }
                                    />
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>

                <div className="flex flex-col border-t border-border/40 mt-2 pt-2">
                    {bottomLayoutSections.map((section) => {
                        const isRemoved = stateHelpers.removals.layout.includes(
                            section.instanceId
                        );
                        const override =
                            stateHelpers.overrides.layout[section.instanceId] ||
                            {};
                        return (
                            <StaticSectionRow
                                key={section.instanceId}
                                section={section}
                                userOverride={override}
                                isRemoved={isRemoved}
                                isSelected={
                                    selectedInstanceId === section.instanceId
                                }
                                onSelect={() =>
                                    onSelectInstance(section.instanceId)
                                }
                                onToggleVisibility={() =>
                                    customizer.toggleVisibility(
                                        section.instanceId
                                    )
                                }
                            />
                        );
                    })}
                </div>

                <div className="mt-2 pt-2 border-t border-border/40">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="w-full h-[32px] text-[12px] font-medium text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 rounded-[6px] hover:bg-muted/50 transition-colors">
                                <IconPlus className="w-[14px] h-[14px]" /> Add
                                section
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl flex flex-col overflow-hidden">
                            <DialogHeader className="">
                                <DialogTitle>
                                    Section Gallery for {activePageLabel}
                                </DialogTitle>
                                <DialogDescription>
                                    Add new sections or restore hidden ones to
                                    your page.
                                </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-150 pr-4">
                                <SectionGallery
                                    sections={gallerySections}
                                    onAddSection={(key) => {
                                        customizer.addSection(key);
                                    }}
                                    onRestoreSection={(instanceId) => {
                                        customizer.toggleVisibility(instanceId);
                                    }}
                                />
                                <div className="h-6" />
                            </ScrollArea>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" className="w-30">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
