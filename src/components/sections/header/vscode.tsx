"use client";

import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconChevronDown, IconFiles, IconGitBranch, IconSearch, IconSettings, IconTerminal2, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';

const socialIconsMap: Record<string, typeof IconBrandGithub> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
};

export default function HeaderVsCode({ siteData }: SectionProps) {
    const title = siteData.title || 'portfolio';
    const projectCount = siteData.projects?.length || 0;
    const skillCount = siteData.skills?.length || 0;
    const socialLinks = siteData.social_links || [];
    const explorerItems = [
        { label: 'README.md', href: '/', active: true },
        { label: 'projects.ts', href: '/projects', count: projectCount },
        { label: 'skills.json', href: '/#skills', count: skillCount },
        { label: 'blog.md', href: '/blog', count: siteData.blog_posts?.length || 0 },
        { label: '.env.contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background font-mono text-xs text-muted-foreground">
            <div className="flex h-8 items-center border-b border-border bg-muted/60">
                <Link href="/" className="flex h-full min-w-0 items-center gap-2 border-r border-border px-3 text-foreground">
                    <span className="grid size-4 place-items-center rounded bg-primary text-[10px] font-bold text-primary-foreground">LF</span>
                    <span className="truncate text-[11px]">{title}.code-workspace</span>
                </Link>
                <nav className="hidden h-full items-center md:flex">
                    {['File', 'Edit', 'View', 'Go', 'Run'].map((item) => (
                        <span key={item} className="flex h-full items-center px-2.5 hover:bg-accent hover:text-accent-foreground">{item}</span>
                    ))}
                </nav>
                <div className="mx-auto hidden min-w-64 max-w-md flex-1 items-center justify-center px-4 sm:flex">
                    <Link href="/projects" className="flex w-full items-center gap-2 rounded border border-border bg-background/80 px-3 py-0.5 text-muted-foreground shadow-sm hover:border-primary/60 hover:text-foreground">
                        <IconSearch size={14} />
                        <span className="truncate">Search {title} portfolio</span>
                    </Link>
                </div>
                <div className="ml-auto flex h-full items-center border-l border-border px-3">
                    <IconSettings size={15} />
                </div>
            </div>

            <div className="h-9 border-b border-border bg-background lg:pl-72">
                <nav className="flex h-full min-w-0 overflow-x-auto">
                    {explorerItems.map((item) => (
                        <Link key={item.label} href={item.href} className={`flex min-w-max items-center gap-2 border-r border-border px-3 text-[12px] ${item.active ? 'bg-background text-foreground' : 'bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}>
                            <span>{item.label}</span>
                            {typeof item.count === 'number' && <span className="rounded bg-muted px-1.5 text-[10px] text-muted-foreground">{item.count}</span>}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="hidden border-r border-border bg-card lg:fixed lg:bottom-7 lg:left-0 lg:top-[4.25rem] lg:z-40 lg:block lg:w-72">
                <div className="grid h-full grid-cols-[2.75rem_1fr]">
                    <aside className="flex flex-col items-center gap-4 border-r border-border bg-muted/40 py-3 text-muted-foreground">
                        <IconFiles size={19} className="text-foreground" />
                        <IconSearch size={18} />
                        <IconGitBranch size={18} />
                        <IconTerminal2 size={18} />
                    </aside>
                    <aside className="flex min-w-0 flex-col">
                        <div className="flex h-8 items-center justify-between border-b border-border px-3 text-[11px] uppercase tracking-wide text-foreground">
                            <span>Explorer</span>
                            <IconChevronDown size={14} />
                        </div>
                        <div className="flex items-center gap-1 border-b border-border px-3 py-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                            <IconChevronDown size={13} /> portfolio
                        </div>
                        <div className="flex-1 space-y-1 overflow-y-auto p-2">
                            {explorerItems.map((item) => (
                                <Link key={item.label} href={item.href} className={`flex items-center justify-between rounded px-2 py-1.5 ${item.active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                                    <span>{item.label}</span>
                                    {typeof item.count === 'number' && <span className="text-[10px]">{item.count}</span>}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-border p-2">
                            {socialLinks.slice(0, 3).map((link) => {
                                const Icon = socialIconsMap[link.platform] || IconUserCircle;
                                return (
                                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                                        <Icon size={15} /> {link.platform}
                                    </a>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </div>
        </header>
    );
}
