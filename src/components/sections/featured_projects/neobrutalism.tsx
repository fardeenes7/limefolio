import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconRocket } from '@tabler/icons-react';
import Link from 'next/link';

export default function FeaturedProjectsNeobrutalism({ section, siteData }: SectionProps) {
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
        <section id="projects" className="border-b-4 border-border bg-background py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="text-5xl font-black uppercase leading-none tracking-tighter text-foreground sm:text-7xl">{sectionTitle}</h2>
                    {showViewAll && allProjects.length > displayProjects.length && <Link href="/projects" className="inline-flex w-fit items-center gap-2 border-4 border-border bg-primary px-5 py-3 text-sm font-black uppercase text-primary-foreground shadow-[6px_6px_0_hsl(var(--border))]">{viewAllLabel}<IconArrowRight size={18} /></Link>}
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    {displayProjects.map((project, index) => (
                        <Link key={project.id} href={`/projects/${project.slug}`} className="group border-4 border-border bg-card text-card-foreground shadow-[10px_10px_0_hsl(var(--border))] transition-transform hover:-translate-x-1 hover:-translate-y-1">
                            <div className="relative aspect-video border-b-4 border-border bg-muted">
                                {project.thumbnail ? <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0" /> : <div className="flex h-full w-full items-center justify-center bg-secondary"><IconRocket size={52} /></div>}
                                <span className="absolute left-3 top-3 border-4 border-border bg-accent px-3 py-1 text-xs font-black uppercase text-accent-foreground">#{index + 1}</span>
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-2xl font-black uppercase leading-none tracking-tight">{project.title}</h3>
                                    <IconArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" size={24} />
                                </div>
                                {project.tagline && <p className="mt-4 text-base font-semibold leading-relaxed text-muted-foreground">{project.tagline}</p>}
                                {project.technologies && project.technologies.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{project.technologies.slice(0, 4).map((tech) => <span key={tech} className="border-2 border-border bg-secondary px-2 py-1 text-xs font-black uppercase text-secondary-foreground">{tech}</span>)}</div>}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
