import { useState, useCallback, useMemo } from "react";
import type { UserPortfolioConfig } from "@/templates/types";
import { getTemplate } from "@/templates/registry";

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
            overrides: initialConfigRaw.config_overrides || { layout: {}, pages: {} },
            additions: initialConfigRaw.config_additions || { layout: [], pages: {} },
            removals: initialConfigRaw.config_removals || { layout: [], pages: {} },
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
        const template = getTemplate(newTemplateKey);
        setSelectedTemplate(newTemplateKey);
        setSelectedTheme(template.defaultTheme);
        setSelectedFont(template.defaultFont);
        setOverrides({ layout: {}, pages: {} });
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
