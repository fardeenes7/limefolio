'use client';

import { useEffect, useState } from 'react';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function HeroTerminalSplit({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'portfolio';
    const subheadline = (i.subheadline as string) || siteData.tagline || 'developer portfolio';
    const body = (i.body as string) || siteData.description || 'A compact system map of recent work, notes, and shipped experiments.';
    const typingStringsStr = (i.typingStrings as string) || 'build --fast, ship --clean, debug --deep';
    const typingStrings = typingStringsStr.split(',').map((item) => item.trim()).filter(Boolean);
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'run projects';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '#projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'open contact';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '/contact';
    const [lineIndex, setLineIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const profileRows = [
        ['name', headline],
        ['role', subheadline],
        ['projects', `${siteData.projects?.length || 0}`],
        ['skills', `${siteData.skills?.length || 0}`],
        ['status', siteData.available_for_hire ? 'available' : 'online'],
    ];

    useEffect(() => {
        const target = typingStrings[lineIndex] || '';
        if (typedText.length < target.length) {
            const timeout = setTimeout(() => setTypedText(target.slice(0, typedText.length + 1)), 38);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setTypedText('');
            setLineIndex((current) => (current + 1) % Math.max(typingStrings.length, 1));
        }, 1600);
        return () => clearTimeout(timeout);
    }, [lineIndex, typedText, typingStrings]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-background py-12 font-mono text-foreground">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/40" />
            <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-theme items-center gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground"><span className="text-primary">visitor@limefolio</span>:<span className="text-primary">~/profile</span>$ ./whoami</p>
                        <h1 className="max-w-4xl text-4xl font-bold leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">{headline}</h1>
                        <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{subheadline}</p>
                    </div>
                    <p className="max-w-2xl border-l border-primary/50 pl-4 text-sm leading-7 text-muted-foreground sm:text-base">{body}</p>
                    <div className="rounded border border-border bg-card px-4 py-3 text-sm text-primary">
                        $ {typedText}<span className="animate-pulse">_</span>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link href={primaryCtaUrl} className="inline-flex items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">./{primaryCtaLabel}<IconArrowRight size={17} /></Link>
                        <Link href={secondaryCtaUrl} className="inline-flex items-center justify-center rounded border border-border bg-card px-5 py-3 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary">./{secondaryCtaLabel}</Link>
                    </div>
                </div>

                <aside className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/5">
                    <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                        <span>profile.json</span>
                        <span>readonly</span>
                    </div>
                    <div className="space-y-2 p-4 text-sm">
                        <p className="text-muted-foreground">{'{'}</p>
                        {profileRows.map(([key, value], index) => (
                            <p key={key} className="grid grid-cols-[7rem_1fr] gap-2 pl-4">
                                <span className="text-primary">&quot;{key}&quot;:</span>
                                <span className="truncate text-foreground">&quot;{value}&quot;{index < profileRows.length - 1 ? ',' : ''}</span>
                            </p>
                        ))}
                        <p className="text-muted-foreground">{'}'}</p>
                    </div>
                    <div className="border-t border-border bg-background px-4 py-3 text-xs text-muted-foreground">
                        {siteData.blog_posts?.length || 0} notes indexed
                    </div>
                </aside>
            </div>
        </section>
    );
}
