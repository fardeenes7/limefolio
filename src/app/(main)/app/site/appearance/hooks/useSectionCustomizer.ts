import { useCallback } from "react";
import type { UserPortfolioConfig, SectionInstance, SectionOverride } from "@/templates/types";
import { ComponentRegistry } from "@/templates/components";

function withoutVariantOverride(
    override: SectionOverride | undefined,
): SectionOverride | undefined {
    if (!override) return undefined;

    const next: SectionOverride = {
        ...(override.inputs !== undefined ? { inputs: override.inputs } : {}),
    };

    return Object.keys(next).length > 0 ? next : undefined;
}

function withInputOverride(
    override: SectionOverride | undefined,
    inputKey: string,
    value: unknown,
): SectionOverride | undefined {
    const inputs = { ...(override?.inputs ?? {}) };

    if (value === undefined) {
        delete inputs[inputKey];
    } else {
        inputs[inputKey] = value;
    }

    const next: SectionOverride = {
        ...(override?.variant !== undefined ? { variant: override.variant } : {}),
        ...(Object.keys(inputs).length > 0 ? { inputs } : {}),
    };

    return Object.keys(next).length > 0 ? next : undefined;
}

function setOrDeleteOverride(
    overrides: Record<string, SectionOverride>,
    instanceId: string,
    override: SectionOverride | undefined,
): Record<string, SectionOverride> {
    const next = { ...overrides };
    if (override) {
        next[instanceId] = override;
    } else {
        delete next[instanceId];
    }
    return next;
}

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
                next.layout = setOrDeleteOverride(
                    next.layout,
                    instanceId,
                    withInputOverride(existing, inputKey, value),
                );
            } else {
                next.pages = { ...next.pages };
                const existingPage = next.pages[pageKey] || {};
                const existing = existingPage[instanceId] || {};
                next.pages[pageKey] = setOrDeleteOverride(
                    existingPage,
                    instanceId,
                    withInputOverride(existing, inputKey, value),
                );
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

    const resetVariantsToTemplateDefaults = useCallback(() => {
        state.setOverrides(prev => {
            const next = { ...prev };

            next.layout = Object.entries(next.layout).reduce<Record<string, SectionOverride>>(
                (acc, [instanceId, override]) => {
                    const nextOverride = withoutVariantOverride(override);
                    if (nextOverride) acc[instanceId] = nextOverride;
                    return acc;
                },
                {},
            );

            const existingPage = next.pages[pageKey] || {};
            next.pages = { ...next.pages };
            const resetPage = Object.entries(existingPage).reduce<Record<string, SectionOverride>>(
                (acc, [instanceId, override]) => {
                    const nextOverride = withoutVariantOverride(override);
                    if (nextOverride) acc[instanceId] = nextOverride;
                    return acc;
                },
                {},
            );

            if (Object.keys(resetPage).length > 0) {
                next.pages[pageKey] = resetPage;
            } else {
                delete next.pages[pageKey];
            }

            return next;
        });
    }, [pageKey, state]);

    return {
        updateVariant,
        updateInput,
        toggleVisibility,
        reorderSections,
        addSection,
        resetVariantsToTemplateDefaults,
    };
}
