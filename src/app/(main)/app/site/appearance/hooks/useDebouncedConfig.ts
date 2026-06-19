import { useState, useEffect } from 'react';
import type { UserPortfolioConfig } from '@/templates/types';

export function useDebouncedConfig(config: Partial<UserPortfolioConfig>, delay = 400) {
    const [debouncedConfig, setDebouncedConfig] = useState(config);
    
    useEffect(() => {
        const id = setTimeout(() => setDebouncedConfig(config), delay);
        return () => clearTimeout(id);
    }, [config, delay]);
    
    return debouncedConfig;
}
