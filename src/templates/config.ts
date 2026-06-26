import type { Template, UserPortfolioConfig } from './types';
import { emptyUserConfig } from './merge';

type RawTemplateConfig = Partial<{
    error: unknown;
    template_key: string;
    theme_key: string;
    font_key: string;
    template_version: string;
    theme_overrides: Record<string, string>;
    config_overrides: UserPortfolioConfig['overrides'];
    config_additions: UserPortfolioConfig['additions'];
    config_removals: UserPortfolioConfig['removals'];
    config_ordering: UserPortfolioConfig['ordering'];
}> | null | undefined;

export function userConfigFromRaw(
    rawConfig: RawTemplateConfig,
    template: Template,
    fallback: {
        templateKey?: string | null;
        themeKey?: string | null;
        fontKey?: string | null;
    },
): UserPortfolioConfig {
    const templateKey = fallback.templateKey || rawConfig?.template_key || template.key;
    const themeKey = fallback.themeKey || rawConfig?.theme_key || template.defaultTheme;
    const fontKey = fallback.fontKey || rawConfig?.font_key || template.defaultFont;

    if (!rawConfig || rawConfig.error) {
        return emptyUserConfig(templateKey, themeKey, fontKey, template.version);
    }

    return {
        templateKey,
        themeKey,
        fontKey,
        templateVersion: rawConfig.template_version || template.version,
        themeOverrides: rawConfig.theme_overrides || {},
        overrides: rawConfig.config_overrides || { layout: {}, pages: {} },
        additions: rawConfig.config_additions || { layout: [], pages: {} },
        removals: rawConfig.config_removals || { layout: [], pages: {} },
        ordering: rawConfig.config_ordering || {},
    };
}
