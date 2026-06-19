/**
 * Cookie Banner — Bar Variant
 *
 * Sticky bar positioned at either the top or bottom of the viewport.
 * Uses local state to dismiss. Does not use cookies itself to store dismissal,
 * just localStorage.
 */
'use client';

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { useEffect, useState } from 'react';
import { IconCookie, IconX } from '@tabler/icons-react';

export default function CookieBannerBar({ section }: SectionProps) {
    const [isVisible, setIsVisible] = useState(false);

    const i = section.resolvedInputs as Record<string, unknown>;
    const text = (i.text as string) || 'We use cookies to ensure you get the best experience on our website.';
    const buttonText = (i.buttonText as string) || 'Got it!';
    const position = (i.position as string) || 'bottom';

    useEffect(() => {
        // Only show if they haven't dismissed it
        const dismissed = localStorage.getItem('cookie-banner-dismissed');
        if (!dismissed) {
            // Small delay so it animates in
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('cookie-banner-dismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed left-0 right-0 z-50 flex transform transition-transform duration-500 ease-in-out ${
                position === 'top' ? 'top-0' : 'bottom-0'
            } ${isVisible ? 'translate-y-0' : position === 'top' ? '-translate-y-full' : 'translate-y-full'}`}
        >
            <div className="w-full bg-foreground text-background shadow-2xl">
                <div className="container max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-sm font-medium">
                        <IconCookie size={20} className="shrink-0 text-primary" />
                        <p>{text}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={handleDismiss}
                            className="whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            {buttonText}
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="p-2 text-background/60 hover:text-background transition-colors"
                            aria-label="Close"
                        >
                            <IconX size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
