import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUpRight, IconGitBranch, IconTerminal2 } from '@tabler/icons-react';
import Link from 'next/link';

export default function FeaturedProjectsTerminalProcess({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Projects';
    const maxItemsStr = (i.maxItems as string) || 'all';
    const maxItems = maxItemsStr === 'all' ? Infinity : parseInt(maxItemsStr, 10);
    const filterByTag = (i.filterByTag as string) || '';
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'View All Projects';
    let allProjects = siteData.projects || [];

    if (filterByTag) {
        const tags = filterByTag.split(',').map((tag) => tag.trim().toLowerCase());
        allProjects = allProjects.filter((project) => project.technologies?.some((tech) => tags.includes(tech.toLowerCase())));
    }
    if (allProjects.length === 0) return null;

    const featuredOnly = allProjects.filter((project) => project.featured);
    const displayProjects = (featuredOnly.length > 0 ? featuredOnly : allProjects).slice(0, maxItems);

    return (
        <section id="projects" className="bg-background py-20 font-mono text-foreground">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-8 grid gap-4 border-b border-border pb-5 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-primary">$ top --sort=impact</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{sectionTitle}</h2>
                    </div>
                    {showViewAll && allProjects.length > displayProjects.length && <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{viewAllLabel}<IconArrowUpRight size={16} /></Link>}
                </div>
                <div className="grid gap-4">
                    {displayProjects.map((project, index) => (
                        <Link key={project.id} href={`/projects/${project.slug}`} className="group grid gap-4 rounded-lg border border-border bg-card p-4 transition hover:border-primary/70 hover:bg-muted/20 lg:grid-cols-[7rem_1fr_14rem_auto] lg:items-center">
                            <div className="rounded border border-border bg-background p-3 text-xs text-muted-foreground">
                                <p className="text-primary">pid {String(index + 241).padStart(4, '0')}</p>
                                <p>{project.featured ? 'featured' : 'worker'}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary">{project.title}</h3>
                                {project.tagline && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.tagline}</p>}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies?.slice(0, 4).map((tech) => <span key={tech} className="rounded border border-border bg-background px-2 py-1 text-xs text-muted-foreground">{tech}</span>)}
                            </div>
                            <div className="flex items-center gap-2 text-primary">
                                <IconGitBranch size={17} /> open
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-4 rounded border border-border bg-card/60 px-4 py-3 text-xs text-muted-foreground">
                    <IconTerminal2 className="mr-2 inline" size={15} /> {displayProjects.length} process{displayProjects.length === 1 ? '' : 'es'} returned with exit code 0
                </div>
            </div>
        </section>
    );
}
