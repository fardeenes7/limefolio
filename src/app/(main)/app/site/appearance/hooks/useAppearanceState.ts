import { useState, useCallback } from "react";

interface UseAppearanceStateProps {
    savedThemeKey: string;
    savedFontKey: string;
}

export function useAppearanceState({ savedThemeKey, savedFontKey }: UseAppearanceStateProps) {
    const [selectedTheme, setSelectedTheme] = useState(savedThemeKey);
    const [selectedFont, setSelectedFont] = useState(savedFontKey);

    const isDirty = selectedTheme !== savedThemeKey || selectedFont !== savedFontKey;

    const resetToSaved = useCallback(() => {
        setSelectedTheme(savedThemeKey);
        setSelectedFont(savedFontKey);
    }, [savedThemeKey, savedFontKey]);

    return {
        selectedTheme,
        selectedFont,
        setTheme: setSelectedTheme,
        setFont: setSelectedFont,
        isDirty,
        resetToSaved,
    };
}
