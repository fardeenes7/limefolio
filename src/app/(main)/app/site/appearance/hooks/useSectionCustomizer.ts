import { useCallback } from "react";
import type { UserPortfolioConfig, SectionInstance } from "@/templates/types";
import { ComponentRegistry } from "@/templates/components";
import { useResolvedSections } from "./useResolvedSections";

export function useSectionCustomizer(
    pageKey: string,
    state: {
        overrides: UserPortfolioConfig['overrides'];
        additions: UserPortfolioConfig['additions'];
        removals: UserPortfolioConfig['removals'];
        ordering: UserPortfolioConfig['ordering'];
        setOverrides: React.Dispatch<React.SetStateAction<UserPortfolioConfig['overrides']>>;
        setAdditions: React.Dispatch<React.SetStateAction<UserPortfolioConfig['additions']>>;
        setRemovals: React.Dispatch<React.SetStateAction<UserPortfolioConfig['removals']>>;
        setOrdering: React.Dispatch<React.SetStateAction<UserPortfolioConfig['ordering']>>;
    },
    resolvedLayoutSections: SectionInstance[]
) {
    const isGlobal = (instanceId: string) => resolvedLayoutSections.some(s => s.instanceId === instanceId);

    const updateVariant = useCallback((instanceId: string, variant: string) => {
        state.setOverrides(prev => {
            const next = { ...prev };
            if (isGlobal(instanceId)) {
                next.layout = { ...next.layout, [instanceId]: { ...next.layout[instanceId], variant } };
            } else {
                next.pages = { ...next.pages };
                next.pages[pageKey] = { ...next.pages[pageKey], [instanceId]: { ...next.pages[pageKey]?.[instanceId], variant } };
            }
            return next;
        });
    }, [pageKey, resolvedLayoutSections, state]);

    const updateInput = useCallback((instanceId: string, inputKey: string, value: unknown) => {
        state.setOverrides(prev => {
            const next = { ...prev };
            if (isGlobal(instanceId)) {
                const existing = next.layout[instanceId] || {};
                next.layout = { ...next.layout, [instanceId]: { ...existing, inputs: { ...existing.inputs, [inputKey]: value } } };
            } else {
                next.pages = { ...next.pages };
                const existingPage = next.pages[pageKey] || {};
                const existing = existingPage[instanceId] || {};
                next.pages[pageKey] = { ...existingPage, [instanceId]: { ...existing, inputs: { ...existing.inputs, [inputKey]: value } } };
            }
            return next;
        });
    }, [pageKey, resolvedLayoutSections, state]);

    const toggleVisibility = useCallback((instanceId: string) => {
        state.setRemovals(prev => {
            const next = { ...prev };
            if (isGlobal(instanceId)) {
                if (next.layout.includes(instanceId)) {
                    next.layout = next.layout.filter(id => id !== instanceId);
                } else {
                    next.layout = [...next.layout, instanceId];
                }
            } else {
                next.pages = { ...next.pages };
                const existing = next.pages[pageKey] || [];
                if (existing.includes(instanceId)) {
                    next.pages[pageKey] = existing.filter(id => id !== instanceId);
                } else {
                    next.pages[pageKey] = [...existing, instanceId];
                }
            }
            return next;
        });
    }, [pageKey, resolvedLayoutSections, state]);

    const reorderSections = useCallback((newOrdering: string[]) => {
        state.setOrdering(prev => {
            const next = { ...prev };
            // Note: reordering unified list is tricky. We'll only reorder page sections.
            // newOrdering passed here will only contain page sections.
            next.pages = { ...next.pages, [pageKey]: newOrdering };
            return next;
        });
    }, [pageKey, state]);

    const addSection = useCallback((componentKey: string) => {
        state.setAdditions(prev => {
            const next = { ...prev };
            const existingAdditions = next.pages[pageKey] || [];
            
            let maxCount = 0;
            existingAdditions.forEach(inst => {
                if (inst.componentKey === componentKey) {
                    const match = inst.instanceId.match(new RegExp(`${componentKey}_(\\d+)`));
                    if (match && match[1]) {
                        maxCount = Math.max(maxCount, parseInt(match[1], 10));
                    }
                }
            });
            const newIdSuffix = Math.max(maxCount + 1, Date.now() % 10000);
            const instanceId = `${componentKey}_added_${newIdSuffix}`;

            const schema = ComponentRegistry[componentKey];
            if (!schema) return next;

            const newInstance: SectionInstance = {
                instanceId,
                componentKey,
                allowedVariants: schema.variants.map(v => v.key),
                defaultVariant: schema.defaultVariant,
                fixed: false,
            };

            next.pages = { ...next.pages, [pageKey]: [...existingAdditions, newInstance] };
            return next;
        });
    }, [pageKey, state]);

    return {
        updateVariant,
        updateInput,
        toggleVisibility,
        reorderSections,
        addSection,
    };
}
