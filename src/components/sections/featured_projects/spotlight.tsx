import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';

export default function FeaturedProjectsSpotlight({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Featured Project';
    const filterByTag = (i.filterByTag as string) || '';
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'View All Projects';

    let allProjects = siteData.projects || [];
    if (filterByTag) {
        const tags = filterByTag.split(',').map((t) => t.trim().toLowerCase());
        allProjects = allProjects.filter((project) =>
            project.technologies?.some((tech) => tags.includes(tech.toLowerCase()))
        );
    }
    if (allProjects.length === 0) return null;

    const [featured, ...rest] = allProjects.filter((project) => project.featured).length > 0
        ? allProjects.filter((project) => project.featured)
        : allProjects;
    const sideProjects = rest.slice(0, 3);

    return (
        <section id="projects" className="bg-background py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Selected work</p>
                        <h2 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">{sectionTitle}</h2>
                    </div>
                    {showViewAll && allProjects.length > 1 && (
                        <Link href="/projects" className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3">
                            {viewAllLabel}
                            <IconArrowRight size={18} />
                        </Link>
                    )}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
                    <Link href={`/projects/${featured.slug}`} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-foreground/5">
                        <div className="aspect-video bg-muted">
                            {featured.thumbnail || featured.cover_image ? (
                                <img src={featured.thumbnail || featured.cover_image || ''} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                                <div className="h-full w-full bg-linear-to-br from-primary/20 to-accent/20" />
                            )}
                        </div>
                        <div className="p-8">
                            <h3 className="text-3xl font-bold text-foreground group-hover:text-primary">{featured.title}</h3>
                            {featured.tagline && <p className="mt-3 text-lg text-muted-foreground">{featured.tagline}</p>}
                            {featured.technologies && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {featured.technologies.slice(0, 5).map((tech) => (
                                        <span key={tech} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{tech}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Link>

                    <div className="grid gap-4">
                        {sideProjects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/40">
                                <div>
                                    <h3 className="font-bold text-foreground group-hover:text-primary">{project.title}</h3>
                                    {project.tagline && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>}
                                </div>
                                <IconExternalLink size={18} className="shrink-0 text-muted-foreground group-hover:text-primary" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
