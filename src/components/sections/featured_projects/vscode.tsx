import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUpRight, IconFileCode, IconGitBranch } from '@tabler/icons-react';
import Link from 'next/link';

export default function FeaturedProjectsVsCode({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Projects';
    const maxItemsStr = (i.maxItems as string) || 'all';
    const maxItems = maxItemsStr === 'all' ? Infinity : parseInt(maxItemsStr, 10);
    const filterByTag = (i.filterByTag as string) || '';
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'Open All Projects';
    let allProjects = siteData.projects || [];

    if (filterByTag) {
        const tags = filterByTag.split(',').map((tag) => tag.trim().toLowerCase());
        allProjects = allProjects.filter((project) => project.technologies?.some((tech) => tags.includes(tech.toLowerCase())));
    }
    if (allProjects.length === 0) return null;

    const featuredOnly = allProjects.filter((project) => project.featured);
    const displayProjects = (featuredOnly.length > 0 ? featuredOnly : allProjects).slice(0, maxItems);

    return (
        <section id="projects" className="bg-background py-8 font-mono">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
                        <span>Explorer: {sectionTitle}</span>
                        {showViewAll && allProjects.length > displayProjects.length && <Link href="/projects" className="inline-flex items-center gap-1 text-primary hover:underline">{viewAllLabel}<IconArrowUpRight size={13} /></Link>}
                    </div>
                    <div className="divide-y divide-border">
                        {displayProjects.map((project, index) => (
                            <Link key={project.id} href={`/projects/${project.slug}`} className="group grid gap-3 px-4 py-4 transition hover:bg-muted/40 md:grid-cols-[2rem_minmax(0,1fr)_14rem_auto] md:items-center">
                                <span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <IconFileCode size={16} className="text-primary" />
                                        <h3 className="truncate font-semibold text-foreground group-hover:text-primary">{project.title}.tsx</h3>
                                    </div>
                                    {project.tagline && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.technologies?.slice(0, 3).map((tech) => <span key={tech} className="rounded bg-muted px-2 py-1 text-[11px] text-muted-foreground">{tech}</span>)}
                                </div>
                                <span className="inline-flex items-center gap-1 text-sm text-primary"><IconGitBranch size={15} /> open</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
