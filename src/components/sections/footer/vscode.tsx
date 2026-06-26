"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconBell, IconCheck, IconGitBranch, IconPlugConnected, IconRadioactive } from '@tabler/icons-react';

export default function FooterVsCode({ siteData }: SectionProps) {
    const title = siteData.title || 'portfolio';
    const projectCount = siteData.projects?.length || 0;
    const blogCount = siteData.blog_posts?.length || 0;
    const availability = siteData.available_for_hire ? 'Available for hire' : 'Online';

    return (
        <footer className="z-50 shrink-0 border-t border-border bg-primary font-mono text-[11px] text-primary-foreground">
            <div className="flex h-7 items-center justify-between gap-3 overflow-hidden px-3">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="inline-flex items-center gap-1"><IconGitBranch size={13} /> main</span>
                    <span className="hidden items-center gap-1 sm:inline-flex"><IconCheck size={13} /> {projectCount} projects</span>
                    <span className="hidden sm:inline">{blogCount} notes</span>
                    <span className="truncate">{title}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden items-center gap-1 sm:inline-flex"><IconPlugConnected size={13} /> {availability}</span>
                    <span className="hidden items-center gap-1 md:inline-flex"><IconRadioactive size={13} /> Limefolio</span>
                    <IconBell size={13} />
                </div>
            </div>
        </footer>
    );
}
