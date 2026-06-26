import type { UserPortfolioConfig } from '@/templates/types';

export function useDebouncedConfig(
    config: Partial<UserPortfolioConfig>,
    _delay = 400,
    _immediateKey?: string | number,
) {
    return config;
}
