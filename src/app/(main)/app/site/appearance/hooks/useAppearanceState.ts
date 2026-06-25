import { useState, useCallback, useMemo } from "react";
import type { UserPortfolioConfig } from "@/templates/types";
import { getTemplate } from "@/templates/registry";
import { ComponentRegistry } from "@/templates/components";

interface UseAppearanceStateProps {
    initialConfigRaw: Record<string, any>;
}

function deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        if (Array.isArray(a)) {
            if (!Array.isArray(b) || a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (!deepEqual(a[i], b[i])) return false;
            }
            return true;
        }
        const keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) return false;
        for (const k of keys) {
            if (!deepEqual(a[k], b[k])) return false;
        }
        return true;
    }
    return false;
}

export function useAppearanceState({ initialConfigRaw }: UseAppearanceStateProps) {
    const savedState = useMemo(() => {
        const templateKey = initialConfigRaw.template_key || "default";
        const template = getTemplate(templateKey);
        
        return {
            templateKey,
            themeKey: initialConfigRaw.theme_key || template.defaultTheme,
            fontKey: initialConfigRaw.font_key || template.defaultFont,
            overrides: { layout: {}, pages: {}, ...(initialConfigRaw.config_overrides || {}) },
            additions: { layout: [], pages: {}, ...(initialConfigRaw.config_additions || {}) },
            removals: { layout: [], pages: {}, ...(initialConfigRaw.config_removals || {}) },
            ordering: initialConfigRaw.config_ordering || {},
        };
    }, [initialConfigRaw]);

    const [selectedTemplate, setSelectedTemplate] = useState(savedState.templateKey);
    const [selectedTheme, setSelectedTheme] = useState(savedState.themeKey);
    const [selectedFont, setSelectedFont] = useState(savedState.fontKey);
    const [overrides, setOverrides] = useState<UserPortfolioConfig['overrides']>(savedState.overrides);
    const [additions, setAdditions] = useState<UserPortfolioConfig['additions']>(savedState.additions);
    const [removals, setRemovals] = useState<UserPortfolioConfig['removals']>(savedState.removals);
    const [ordering, setOrdering] = useState<UserPortfolioConfig['ordering']>(savedState.ordering);

    const isDirty = useMemo(() => {
        return (
            selectedTemplate !== savedState.templateKey ||
            selectedTheme !== savedState.themeKey ||
            selectedFont !== savedState.fontKey ||
            !deepEqual(overrides, savedState.overrides) ||
            !deepEqual(additions, savedState.additions) ||
            !deepEqual(removals, savedState.removals) ||
            !deepEqual(ordering, savedState.ordering)
        );
    }, [
        selectedTemplate, selectedTheme, selectedFont, overrides, additions, removals, ordering,
        savedState
    ]);

    const resetToSaved = useCallback(() => {
        setSelectedTemplate(savedState.templateKey);
        setSelectedTheme(savedState.themeKey);
        setSelectedFont(savedState.fontKey);
        setOverrides(savedState.overrides);
        setAdditions(savedState.additions);
        setRemovals(savedState.removals);
        setOrdering(savedState.ordering);
    }, [savedState]);

    const handleTemplateSwitch = useCallback((newTemplateKey: string) => {
        const newTemplate = getTemplate(newTemplateKey);

        const newInstanceMap = new Map<string, string>();
        newTemplate.layout.forEach(s => newInstanceMap.set(s.instanceId, s.componentKey));
        newTemplate.pages.forEach(p => p.sections.forEach(s => newInstanceMap.set(s.instanceId, s.componentKey)));

        setOverrides(currentOverrides => {
            const newOverrides: UserPortfolioConfig['overrides'] = { layout: {}, pages: {} };

            const migrateOverrides = (oldGroup: Record<string, any>, newGroup: Record<string, any>) => {
                Object.entries(oldGroup).forEach(([instanceId, override]) => {
                    const componentKey = newInstanceMap.get(instanceId);
                    if (!componentKey) return; 

                    const schema = ComponentRegistry[componentKey as keyof typeof ComponentRegistry];
                    if (!schema) return;

                    const validInputKeys = new Set(schema.inputs.map(i => i.key));
                    
                    const newInputs: Record<string, any> = {};
                    if (override.inputs) {
                        Object.entries(override.inputs).forEach(([k, v]) => {
                            if (validInputKeys.has(k)) {
                                newInputs[k] = v;
                            }
                        });
                    }

                    if (Object.keys(newInputs).length > 0) {
                        newGroup[instanceId] = { inputs: newInputs };
                    }
                });
            };

            if (currentOverrides?.layout) {
                migrateOverrides(currentOverrides.layout, newOverrides.layout!);
            }

            if (currentOverrides?.pages) {
                Object.entries(currentOverrides.pages).forEach(([pageKey, pageOverrides]) => {
                    newOverrides.pages![pageKey] = {};
                    migrateOverrides(pageOverrides, newOverrides.pages![pageKey]);
                });
            }
            
            return newOverrides;
        });

        setSelectedTemplate(newTemplateKey);
        setSelectedTheme(newTemplate.defaultTheme);
        setSelectedFont(newTemplate.defaultFont);
        
        setAdditions({ layout: [], pages: {} });
        setRemovals({ layout: [], pages: {} });
        setOrdering({});
    }, []);

    return {
        selectedTemplate,
        selectedTheme,
        selectedFont,
        overrides,
        additions,
        removals,
        ordering,
        setTemplate: handleTemplateSwitch,
        setTheme: setSelectedTheme,
        setFont: setSelectedFont,
        setOverrides,
        setAdditions,
        setRemovals,
        setOrdering,
        isDirty,
        resetToSaved,
    };
}
