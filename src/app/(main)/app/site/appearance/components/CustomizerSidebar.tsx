import React from "react";
import { UserPortfolioConfig, Template, SectionInstance } from "@/templates/types";
import { ComponentRegistry } from "@/templates/components";
import { SectionEditor } from "./SectionEditor";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { THEMES_META, FONTS_META } from "@/lib/themes-meta";
import { getAvailableTemplates, getTemplate } from "@/templates/registry";
import { IconLayout, IconPalette, IconTypography, IconSettings, IconGripVertical, IconTrash, IconPlus } from "@tabler/icons-react";

interface CustomizerSidebarProps {
    draftConfig: UserPortfolioConfig;
    setDraftConfig: React.Dispatch<React.SetStateAction<UserPortfolioConfig>>;
    templateDef: Template;
    selectedPageKey: string;
    setSelectedPageKey: (key: string) => void;
    selectedSectionId: string | null;
    setSelectedSectionId: (id: string | null) => void;
}

export function CustomizerSidebar({
    draftConfig,
    setDraftConfig,
    templateDef,
    selectedPageKey,
    setSelectedPageKey,
    selectedSectionId,
    setSelectedSectionId,
}: CustomizerSidebarProps) {
    
    // Find the currently selected section instance
    const getActiveSectionInstance = () => {
        if (!selectedSectionId) return null;
        
        // Search layout
        let section = templateDef.layout.find((s) => s.instanceId === selectedSectionId) ||
                      draftConfig.additions.layout?.find((s) => s.instanceId === selectedSectionId);
        if (section) return { section, context: 'layout' };
        
        // Search current page
        const page = templateDef.pages.find(p => p.key === selectedPageKey);
        if (page) {
            section = page.sections.find((s) => s.instanceId === selectedSectionId) ||
                      (draftConfig.additions.pages?.[selectedPageKey] || []).find((s) => s.instanceId === selectedSectionId);
            if (section) return { section, context: `pages.${selectedPageKey}` };
        }
        return null;
    };

    const activeSection = getActiveSectionInstance();

    // Handling global settings
    const updateGlobal = (key: keyof UserPortfolioConfig, value: string) => {
        setDraftConfig(prev => ({ ...prev, [key]: value }));
    };

    if (activeSection) {
        const { section, context } = activeSection;
        let override = {};
        if (context === 'layout') {
            override = draftConfig.overrides.layout[section.instanceId] || {};
        } else {
            override = draftConfig.overrides.pages[selectedPageKey]?.[section.instanceId] || {};
        }

        return (
            <div className="flex flex-col h-full bg-card border-r w-80 shrink-0">
                <div className="p-4 border-b flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedSectionId(null)}>
                        ← Back
                    </Button>
                    <span className="font-semibold">{ComponentRegistry[section.componentKey]?.label || section.componentKey}</span>
                </div>
                <div className="p-4 overflow-y-auto flex-1">
                    <SectionEditor
                        instance={section}
                        override={override}
                        onChange={(newOverride) => {
                            setDraftConfig(prev => {
                                const next = { ...prev };
                                if (context === 'layout') {
                                    next.overrides.layout = { ...next.overrides.layout, [section.instanceId]: newOverride };
                                } else {
                                    next.overrides.pages = { ...next.overrides.pages };
                                    next.overrides.pages[selectedPageKey] = {
                                        ...next.overrides.pages[selectedPageKey],
                                        [section.instanceId]: newOverride
                                    };
                                }
                                return next;
                            });
                        }}
                    />
                </div>
            </div>
        );
    }

    const renderSectionList = (sections: SectionInstance[], additions: SectionInstance[], removals: string[], context: 'layout' | 'page') => {
        const removalSet = new Set(removals);
        
        // We need the order
        let ordering = context === 'layout' 
            ? draftConfig.ordering.layout 
            : draftConfig.ordering.pages?.[selectedPageKey];
            
        let ordered = [...sections];
        if (ordering && ordering.length > 0) {
            const map = new Map(sections.map(s => [s.instanceId, s]));
            ordered = [];
            ordering.forEach(id => {
                if (map.has(id)) ordered.push(map.get(id)!);
            });
            sections.forEach(s => {
                if (!ordering!.includes(s.instanceId)) ordered.push(s);
            });
        }
        
        const activeList = [...ordered.filter(s => !removalSet.has(s.instanceId)), ...(additions || [])];

        return (
            <div className="space-y-1">
                {activeList.map((s, idx) => {
                    const schema = ComponentRegistry[s.componentKey];
                    return (
                        <div key={s.instanceId} className="flex items-center gap-2 group p-2 rounded-md hover:bg-muted/50 transition-colors">
                            <button
                                className="flex-1 text-left flex items-center gap-2"
                                onClick={() => setSelectedSectionId(s.instanceId)}
                            >
                                <span className="p-1 rounded bg-background shadow-xs text-muted-foreground"><IconSettings size={14} /></span>
                                <span className="text-sm font-medium">{schema?.label || s.componentKey}</span>
                            </button>
                            <div className="opacity-0 group-hover:opacity-100 flex items-center">
                                {/* Basic up/down order controls could go here. For now, rely on clicks. */}
                                {(schema?.removable && !s.fixed) && (
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => {
                                        setDraftConfig(prev => {
                                            const next = { ...prev };
                                            if (context === 'layout') {
                                                if (additions.find(a => a.instanceId === s.instanceId)) {
                                                    next.additions.layout = next.additions.layout.filter(a => a.instanceId !== s.instanceId);
                                                } else {
                                                    next.removals.layout = [...next.removals.layout, s.instanceId];
                                                }
                                            } else {
                                                next.removals.pages = { ...next.removals.pages };
                                                const pgRemovals = next.removals.pages[selectedPageKey] || [];
                                                if (additions.find(a => a.instanceId === s.instanceId)) {
                                                    next.additions.pages = { ...next.additions.pages };
                                                    next.additions.pages[selectedPageKey] = (next.additions.pages[selectedPageKey] || []).filter(a => a.instanceId !== s.instanceId);
                                                } else {
                                                    next.removals.pages[selectedPageKey] = [...pgRemovals, s.instanceId];
                                                }
                                            }
                                            return next;
                                        });
                                    }}>
                                        <IconTrash size={14} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-card border-r w-80 shrink-0 overflow-y-auto">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Site Customizer</h2>
                <p className="text-sm text-muted-foreground">Edit your site appearance</p>
            </div>
            
            <Accordion type="multiple" defaultValue={["global", "layout", "pages"]} className="w-full">
                <AccordionItem value="global" className="border-b-0 px-4">
                    <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold">Global Settings</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Template</label>
                            <div className="grid grid-cols-2 gap-2">
                                {getAvailableTemplates().map(key => (
                                    <button
                                        key={key}
                                        onClick={() => updateGlobal('templateKey', key)}
                                        className={`p-2 border rounded-md text-sm text-left ${draftConfig.templateKey === key ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border'}`}
                                    >
                                        {getTemplate(key).label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Theme</label>
                            <div className="grid grid-cols-2 gap-2">
                                {THEMES_META.map(theme => (
                                    <button
                                        key={theme.slug}
                                        onClick={() => updateGlobal('themeKey', theme.slug)}
                                        className={`p-2 border rounded-md text-sm text-left flex items-center gap-2 ${draftConfig.themeKey === theme.slug ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border'}`}
                                    >
                                        <span className="w-4 h-4 rounded-full" style={{ background: theme.swatches[0] }} />
                                        <span className="truncate">{theme.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Font</label>
                            <div className="grid grid-cols-2 gap-2">
                                {FONTS_META.map(font => (
                                    <button
                                        key={font.slug}
                                        onClick={() => updateGlobal('fontKey', font.slug)}
                                        className={`p-2 border rounded-md text-sm text-left ${draftConfig.fontKey === font.slug ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border'}`}
                                        style={{ fontFamily: font.previewStack }}
                                    >
                                        {font.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="layout" className="border-b-0 px-4">
                    <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold">Layout Sections</AccordionTrigger>
                    <AccordionContent>
                        {renderSectionList(templateDef.layout, draftConfig.additions.layout || [], draftConfig.removals.layout || [], 'layout')}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pages" className="border-b-0 px-4">
                    <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold">Pages</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Select Page</label>
                            <select 
                                className="w-full p-2 text-sm border rounded-md bg-background"
                                value={selectedPageKey}
                                onChange={(e) => setSelectedPageKey(e.target.value)}
                            >
                                {templateDef.pages.map(p => (
                                    <option key={p.key} value={p.key}>{p.label}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Page Sections</label>
                            {renderSectionList(
                                templateDef.pages.find(p => p.key === selectedPageKey)?.sections || [], 
                                draftConfig.additions.pages?.[selectedPageKey] || [], 
                                draftConfig.removals.pages?.[selectedPageKey] || [], 
                                'page'
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
