"use client";

/**
 * Template Context
 *
 * Provides the current theme name to all components via React Context.
 * Use the useTemplate hook to access template components.
 */

import { createContext, useContext, ReactNode } from "react";

interface TemplateContextValue {
    theme: string;
}

const TemplateContext = createContext<TemplateContextValue | undefined>(
    undefined,
);

interface TemplateProviderProps {
    theme: string;
    children: ReactNode;
}

export function TemplateProvider({ theme, children }: TemplateProviderProps) {
    return (
        <TemplateContext.Provider value={{ theme }}>
            {children}
        </TemplateContext.Provider>
    );
}

/**
 * Hook to access the current theme name
 * @throws Error if used outside TemplateProvider
 */
export function useTemplateContext(): TemplateContextValue {
    const context = useContext(TemplateContext);

    if (context === undefined) {
        throw new Error(
            "useTemplateContext must be used within a TemplateProvider",
        );
    }

    return context;
}
