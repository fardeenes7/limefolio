import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconRocket } from '@tabler/icons-react';
import Link from 'next/link';

export default function FeaturedProjectsNeobrutalismStack({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Projects';
    const maxItemsStr = (i.maxItems as string) || '6';
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
        <section id="projects" className="border-b-4 border-border bg-secondary py-20 text-secondary-foreground">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 grid gap-6 lg:grid-cols-[24rem_1fr] lg:items-end">
                    <h2 className="text-5xl font-black uppercase leading-none tracking-tighter sm:text-7xl">{sectionTitle}</h2>
                    <p className="max-w-2xl border-4 border-border bg-background p-5 text-lg font-semibold leading-relaxed text-foreground shadow-[8px_8px_0_hsl(var(--border))]">A stacked case-file layout for project-heavy portfolios. Every card reads like a tear-off proof sheet.</p>
                </div>

                <div className="space-y-7">
                    {displayProjects.map((project, index) => (
                        <Link key={project.id} href={`/projects/${project.slug}`} className="group grid border-4 border-border bg-card text-card-foreground shadow-[10px_10px_0_hsl(var(--border))] transition-transform hover:-translate-x-1 hover:-translate-y-1 md:grid-cols-[17rem_1fr_auto]">
                            <div className="relative min-h-52 border-b-4 border-border bg-muted md:border-b-0 md:border-r-4">
                                {project.thumbnail ? <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0" /> : <div className="flex h-full min-h-52 w-full items-center justify-center bg-primary text-primary-foreground"><IconRocket size={48} /></div>}
                                <span className="absolute left-3 top-3 border-4 border-border bg-accent px-3 py-1 text-xs font-black uppercase text-accent-foreground">File {String(index + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="p-6 md:p-8">
                                <h3 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">{project.title}</h3>
                                {project.tagline && <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-muted-foreground">{project.tagline}</p>}
                                {project.technologies && project.technologies.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{project.technologies.slice(0, 5).map((tech) => <span key={tech} className="border-2 border-border bg-primary px-2 py-1 text-xs font-black uppercase text-primary-foreground">{tech}</span>)}</div>}
                            </div>
                            <div className="flex items-center border-t-4 border-border p-6 md:border-l-4 md:border-t-0">
                                <span className="inline-flex items-center gap-2 text-sm font-black uppercase">Open<IconArrowRight className="transition-transform group-hover:translate-x-1" size={18} /></span>
                            </div>
                        </Link>
                    ))}
                </div>

                {showViewAll && allProjects.length > displayProjects.length && <Link href="/projects" className="mt-12 inline-flex items-center gap-2 border-4 border-border bg-accent px-6 py-4 text-sm font-black uppercase text-accent-foreground shadow-[6px_6px_0_hsl(var(--border))]">{viewAllLabel}<IconArrowRight size={18} /></Link>}
            </div>
        </section>
    );
}
