import { useState } from "react";
import { updateSite, updateTemplateConfig } from "@/lib/actions/sites";
import { toast } from "sonner";
import { getTemplate } from "@/templates/registry";
import type { UserPortfolioConfig } from "@/templates/types";

interface UseSaveAppearanceProps {
    onSuccess?: (config: Partial<UserPortfolioConfig>) => void;
}

export function useSaveAppearance({ onSuccess }: UseSaveAppearanceProps = {}) {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const save = async (draftConfig: Partial<UserPortfolioConfig>) => {
        setIsSaving(true);
        setError(null);
        try {
            const template = getTemplate(draftConfig.templateKey);

            const dataToSave = {
                template_key: draftConfig.templateKey,
                theme_key: draftConfig.themeKey,
                font_key: draftConfig.fontKey,
                template_version: template.version,
                config_overrides: draftConfig.overrides,
                config_additions: draftConfig.additions,
                config_removals: draftConfig.removals,
                config_ordering: draftConfig.ordering,
            };

            const configPromise = updateTemplateConfig(dataToSave);
            // Only update theme and font on the Site model for top-level access
            const sitePromise = updateSite({
                theme: draftConfig.themeKey,
                font: draftConfig.fontKey,
            });

            await Promise.all([configPromise, sitePromise]);

            toast.success("Appearance saved");
            if (onSuccess) {
                onSuccess(draftConfig);
            }
        } catch (err) {
            console.error("Failed to save appearance:", err);
            const errorObj = err instanceof Error ? err : new Error("Failed to save appearance settings");
            setError(errorObj);
            toast.error(errorObj.message);
        } finally {
            setIsSaving(false);
        }
    };

    return { save, isSaving, error };
}
