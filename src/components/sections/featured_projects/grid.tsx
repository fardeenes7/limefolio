/**
 * Featured Projects — Grid Variant
 *
 * Traditional card grid showing the thumbnail, title, tagline, and technologies.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconRocket } from '@tabler/icons-react';
import Link from 'next/link';

export default function FeaturedProjectsGrid({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || 'Featured Projects';
    const subheadline = (i.subheadline as string) || 'Some of my recent work';
    const maxItems = (i.maxItems as number) || 3;
    const columns = (i.columns as number) || 3;
    const showTags = i.showTags !== false;
    const viewAllLink = i.viewAllLink !== false;

    // In siteData, 'projects' contains all projects. The backend returns them ordered.
    const allProjects = siteData.projects || [];
    if (allProjects.length === 0) return null;

    // Filter to featured first, then fallback to just the first few
    const featuredOnly = allProjects.filter((p) => p.featured);
    const displayProjects = (featuredOnly.length > 0 ? featuredOnly : allProjects).slice(0, maxItems);

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'md:grid-cols-2 lg:grid-cols-3';

    return (
        <section id="projects" className="py-24 bg-background">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        {headline}
                    </h2>
                    {subheadline && (
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {subheadline}
                        </p>
                    )}
                </div>

                <div className={`grid gap-8 ${gridCols}`}>
                    {displayProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                {project.thumbnail ? (
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-primary/5">
                                        <IconRocket className="text-primary/20" size={48} />
                                    </div>
                                )}
                                {project.featured && (
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-primary text-primary-foreground shadow-lg uppercase tracking-wider">
                                            Featured
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-1 flex-col">
                                <div className="flex items-start justify-between mb-3 gap-4">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                                        {project.title}
                                    </h3>
                                    <IconArrowRight
                                        size={20}
                                        className="shrink-0 mt-1 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                                    />
                                </div>

                                {project.tagline && (
                                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                                        {project.tagline}
                                    </p>
                                )}

                                {/* Tags pushed to bottom */}
                                {showTags && project.technologies && project.technologies.length > 0 && (
                                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-[11px] font-medium px-2 py-1 text-muted-foreground">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {viewAllLink && allProjects.length > maxItems && (
                    <div className="text-center mt-16">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-border hover:border-primary text-foreground hover:text-primary font-semibold transition-all"
                        >
                            View All Projects
                            <IconArrowRight size={20} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
