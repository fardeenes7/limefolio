import { useState } from "react";
import { updateSite, updateTemplateConfig } from "@/lib/actions/sites";
import { toast } from "sonner";

interface UseSaveAppearanceProps {
    onSuccess?: (themeKey: string, fontKey: string) => void;
}

export function useSaveAppearance({ onSuccess }: UseSaveAppearanceProps = {}) {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const save = async ({ themeKey, fontKey }: { themeKey: string; fontKey: string }) => {
        setIsSaving(true);
        setError(null);
        try {
            const dataToSave = {
                theme_key: themeKey,
                font_key: fontKey,
            };

            const configPromise = updateTemplateConfig(dataToSave);
            const sitePromise = updateSite({
                theme: themeKey,
                font: fontKey,
            });

            await Promise.all([configPromise, sitePromise]);

            toast.success("Appearance saved");
            if (onSuccess) {
                onSuccess(themeKey, fontKey);
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
