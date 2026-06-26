'use client';

import { useEffect, useState } from 'react';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function HeroTerminal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'portfolio';
    const subheadline = (i.subheadline as string) || siteData.tagline || 'developer portfolio';
    const body = (i.body as string) || siteData.description;
    const typingStringsStr = (i.typingStrings as string) || 'build --fast, ship --clean, debug --deep';
    const typingStrings = typingStringsStr.split(',').map((item) => item.trim()).filter(Boolean);
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'run projects';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '#projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'open contact';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '/contact';
    const [lineIndex, setLineIndex] = useState(0);
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const target = typingStrings[lineIndex] || '';
        if (typedText.length < target.length) {
            const timeout = setTimeout(() => setTypedText(target.slice(0, typedText.length + 1)), 45);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setTypedText('');
            setLineIndex((current) => (current + 1) % typingStrings.length);
        }, 1800);
        return () => clearTimeout(timeout);
    }, [lineIndex, typedText, typingStrings]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-background py-12 font-mono text-foreground">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/40" />
            <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center px-4 sm:px-6">
                <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/5">
                    <div className="flex items-center justify-between gap-4 border-b border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                        <span className="truncate">~/portfolio</span>
                        <span>{siteData.available_for_hire ? 'available' : 'online'}</span>
                    </div>
                    <div className="space-y-8 p-5 sm:p-8 lg:p-12">
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground"><span className="text-primary">guest@limefolio</span>:~$ whoami</p>
                            <h1 className="max-w-4xl text-4xl font-bold leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">{headline}</h1>
                            <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{subheadline}</p>
                        </div>
                        {body && <p className="max-w-3xl border-l border-primary/50 pl-4 text-base leading-7 text-muted-foreground">{body}</p>}
                        <div className="rounded border border-border bg-background px-4 py-3 text-sm text-primary">
                            $ {typedText}<span className="animate-pulse">_</span>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link href={primaryCtaUrl} className="inline-flex items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">./{primaryCtaLabel}<IconArrowRight size={17} /></Link>
                            <Link href={secondaryCtaUrl} className="inline-flex items-center justify-center rounded border border-border bg-background px-5 py-3 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary">./{secondaryCtaLabel}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
