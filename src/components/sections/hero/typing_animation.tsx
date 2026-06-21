'use client';

import { useState, useEffect } from 'react';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconTerminal2, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function HeroTypingAnimation({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'guest@limefolio:~$';
    const subheadline = (i.subheadline as string) || siteData.tagline;
    const typingStringsStr = (i.typingStrings as string) || 'Developer, Designer, Creator';
    const typingStrings = typingStringsStr.split(',').map(s => s.trim());
    
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'View My Work';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '#projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'Contact Me';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '#contact';

    const [currentStringIndex, setCurrentStringIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typeSpeed = isDeleting ? 50 : 100;
        const targetString = typingStrings[currentStringIndex] || '';

        if (!isDeleting && currentText === targetString) {
            setTimeout(() => setIsDeleting(true), 2000);
            return;
        }

        if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setCurrentStringIndex((prev) => (prev + 1) % typingStrings.length);
            return;
        }

        const timeout = setTimeout(() => {
            setCurrentText(
                targetString.substring(0, currentText.length + (isDeleting ? -1 : 1))
            );
        }, typeSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentStringIndex, typingStrings]);

    return (
        <section className="relative min-h-screen flex flex-col bg-background font-mono overflow-hidden py-8 sm:py-12">
            {/* Terminal Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
            
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex-1 flex flex-col">
                <div className="border border-border bg-card rounded-lg shadow-2xl overflow-hidden flex-1 flex flex-col">
                    {/* Terminal Header */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <div className="flex-1 text-center text-xs text-muted-foreground font-semibold">
                            bash — {siteData.title?.toLowerCase() || 'user'}
                        </div>
                    </div>
                    
                    {/* Terminal Body */}
                    <div className="p-6 sm:p-12 md:p-16 flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-primary mb-8">
                            <IconTerminal2 size={28} />
                            <span className="text-sm tracking-wider uppercase font-bold opacity-80">Initialising system...</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
                            <span className="text-muted-foreground mr-4">❯</span>
                            {headline}
                        </h1>

                        <div className="text-2xl sm:text-4xl md:text-5xl text-muted-foreground mb-16 h-12">
                            <span className="text-primary mr-4">I am a</span>
                            <span className="text-foreground">{currentText}</span>
                            <span className="animate-pulse text-primary ml-1">_</span>
                        </div>

                        {subheadline && (
                            <p className="text-xl sm:text-2xl text-muted-foreground mb-16 max-w-3xl border-l-4 border-primary/30 pl-6 leading-relaxed">
                                {subheadline}
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-6 mt-auto sm:mt-8">
                            {primaryCtaLabel && (
                                <Link
                                    href={primaryCtaUrl}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all"
                                >
                                    {primaryCtaLabel}
                                    <IconArrowRight size={20} />
                                </Link>
                            )}
                            {secondaryCtaLabel && (
                                <Link
                                    href={secondaryCtaUrl}
                                    className="inline-flex items-center justify-center px-8 py-4 text-lg text-muted-foreground border border-border hover:text-foreground hover:border-foreground transition-all"
                                >
                                    {secondaryCtaLabel}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
