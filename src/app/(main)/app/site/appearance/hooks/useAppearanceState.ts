import { useState, useCallback, useMemo } from "react";
import type { UserPortfolioConfig } from "@/templates/types";
import { getTemplate } from "@/templates/registry";
import { getColorTheme } from "@/themes/index";

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
            layoutWidth: initialConfigRaw.layout_width || template.defaultLayoutWidth || 'default',
            themeOverrides: initialConfigRaw.theme_overrides || {},
            overrides: { layout: {}, pages: {}, ...(initialConfigRaw.config_overrides || {}) },
            additions: { layout: [], pages: {}, ...(initialConfigRaw.config_additions || {}) },
            removals: { layout: [], pages: {}, ...(initialConfigRaw.config_removals || {}) },
            ordering: initialConfigRaw.config_ordering || {},
        };
    }, [initialConfigRaw]);

    const [selectedTemplate, setSelectedTemplate] = useState(savedState.templateKey);
    const [selectedTheme, setSelectedTheme] = useState(savedState.themeKey);
    const [selectedFont, setSelectedFont] = useState(savedState.fontKey);
    const [selectedLayoutWidth, setSelectedLayoutWidth] = useState(savedState.layoutWidth);
    const [themeOverrides, setThemeOverrides] = useState(savedState.themeOverrides);
    const [overrides, setOverrides] = useState<UserPortfolioConfig['overrides']>(savedState.overrides);
    const [additions, setAdditions] = useState<UserPortfolioConfig['additions']>(savedState.additions);
    const [removals, setRemovals] = useState<UserPortfolioConfig['removals']>(savedState.removals);
    const [ordering, setOrdering] = useState<UserPortfolioConfig['ordering']>(savedState.ordering);
    const [templateResetRevision, setTemplateResetRevision] = useState(0);

    const isDirty = useMemo(() => {
        return (
            selectedTemplate !== savedState.templateKey ||
            selectedTheme !== savedState.themeKey ||
            selectedFont !== savedState.fontKey ||
            selectedLayoutWidth !== savedState.layoutWidth ||
            !deepEqual(themeOverrides, savedState.themeOverrides) ||
            !deepEqual(overrides, savedState.overrides) ||
            !deepEqual(additions, savedState.additions) ||
            !deepEqual(removals, savedState.removals) ||
            !deepEqual(ordering, savedState.ordering)
        );
    }, [
        selectedTemplate, selectedTheme, selectedFont, selectedLayoutWidth, themeOverrides, overrides, additions, removals, ordering,
        savedState
    ]);

    const resetToSaved = useCallback(() => {
        setSelectedTemplate(savedState.templateKey);
        setSelectedTheme(savedState.themeKey);
        setSelectedFont(savedState.fontKey);
        setSelectedLayoutWidth(savedState.layoutWidth);
        setThemeOverrides(savedState.themeOverrides);
        setOverrides(savedState.overrides);
        setAdditions(savedState.additions);
        setRemovals(savedState.removals);
        setOrdering(savedState.ordering);
        setTemplateResetRevision((revision) => revision + 1);
    }, [savedState]);

    const handleTemplateSwitch = useCallback((newTemplateKey: string) => {
        const newTemplate = getTemplate(newTemplateKey);

        setSelectedTemplate(newTemplateKey);
        setSelectedTheme(newTemplate.defaultTheme);
        setSelectedFont(newTemplate.defaultFont);
        setThemeOverrides({});
        setOverrides({ layout: {}, pages: {} });
        setAdditions({ layout: [], pages: {} });
        setRemovals({ layout: [], pages: {} });
        setOrdering({});
        setTemplateResetRevision((revision) => revision + 1);
    }, []);

    const handleThemeSwitch = useCallback((newThemeKey: string) => {
        setSelectedTheme(newThemeKey);
        setThemeOverrides({});
        
        const theme = getColorTheme(newThemeKey);
        if (theme.defaultFont) {
            setSelectedFont(theme.defaultFont);
        }
    }, []);

    return {
        selectedTemplate,
        selectedTheme,
        selectedFont,
        selectedLayoutWidth,
        themeOverrides,
        overrides,
        additions,
        removals,
        ordering,
        setTemplate: handleTemplateSwitch,
        setTheme: handleThemeSwitch,
        setFont: setSelectedFont,
        setLayoutWidth: setSelectedLayoutWidth,
        setThemeOverrides,
        setOverrides,
        setAdditions,
        setRemovals,
        setOrdering,
        templateResetRevision,
        isDirty,
        resetToSaved,
    };
}
