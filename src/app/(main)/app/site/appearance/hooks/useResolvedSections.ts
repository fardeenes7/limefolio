import { useMemo } from "react";
import { getTemplate } from "@/templates/registry";
import { resolvePortfolioConfig } from "@/templates/merge";
import type { UserPortfolioConfig, ResolvedPortfolioConfig } from "@/templates/types";

export function useResolvedSections(draftConfig: Partial<UserPortfolioConfig>): ResolvedPortfolioConfig {
    return useMemo(() => {
        const template = getTemplate(draftConfig.templateKey);
        return resolvePortfolioConfig(template, draftConfig);
    }, [draftConfig]);
}
