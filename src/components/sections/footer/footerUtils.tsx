const SUPPORTED_BACKGROUND_CLASSES = new Set([
    'bg-background',
    'bg-primary',
    'bg-secondary',
    'bg-muted',
    'bg-accent',
    'bg-card',
    'bg-destructive',
    'bg-popover',
]);

export function getFooterBackgroundClass(backgroundStyle: unknown, backgroundColor: unknown, fallback = 'bg-background') {
    if (backgroundStyle === 'muted') return 'bg-muted/20';
    if (backgroundStyle === 'solid' && typeof backgroundColor === 'string') {
        return SUPPORTED_BACKGROUND_CLASSES.has(backgroundColor) ? backgroundColor : fallback;
    }
    return fallback;
}

export function getFooterGapClass(linkDensity: unknown) {
    if (linkDensity === 'compact') return 'gap-3';
    if (linkDensity === 'spacious') return 'gap-6';
    return 'gap-4';
}

export function LimefolioAttribution({ className = '' }: { className?: string }) {
    return (
        <a
            href="https://limefolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-medium text-muted-foreground transition-colors hover:text-foreground ${className}`}
        >
            Created with Limefolio
        </a>
    );
}
