/**
 * Featured Projects — Table Variant
 *
 * A terminal/developer style list view for projects.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUpRight, IconFolder } from '@tabler/icons-react';
import Link from 'next/link';

export default function FeaturedProjectsTable({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Projects';
    const maxItemsStr = (i.maxItems as string) || 'all';
    const maxItems = maxItemsStr === 'all' ? Infinity : parseInt(maxItemsStr, 10);
    const filterByTag = (i.filterByTag as string) || '';
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'View All Projects';

    let allProjects = siteData.projects || [];
    if (filterByTag) {
        const tags = filterByTag.split(',').map((t) => t.trim().toLowerCase());
        allProjects = allProjects.filter((p) => 
            p.technologies && p.technologies.some((tech) => tags.includes(tech.toLowerCase()))
        );
    }
    if (allProjects.length === 0) return null;

    const featuredOnly = allProjects.filter((p) => p.featured);
    const displayProjects = (featuredOnly.length > 0 ? featuredOnly : allProjects).slice(0, maxItems);

    return (
        <section id="projects" className="py-24 bg-background font-mono">
            <div className="container max-w-theme mx-auto px-6">
                <div className="flex items-center justify-between mb-12 border-b border-border pb-4">
                    {sectionTitle && (
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                            <span className="text-primary">~/</span>{sectionTitle}
                        </h2>
                    )}
                    {showViewAll && allProjects.length > displayProjects.length && (
                        <Link href="/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
                            {viewAllLabel} <IconArrowUpRight size={16} />
                        </Link>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border text-muted-foreground text-sm">
                                <th className="py-4 font-normal w-1/3">Name</th>
                                <th className="py-4 font-normal hidden md:table-cell">Description</th>
                                <th className="py-4 font-normal w-1/4">Stack</th>
                                <th className="py-4 font-normal text-right w-16">Link</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {displayProjects.map((project) => (
                                <tr key={project.id} className="group hover:bg-muted/30 transition-colors">
                                    <td className="py-5 pr-4">
                                        <div className="flex items-center gap-3">
                                            <IconFolder size={18} className="text-primary opacity-70" />
                                            <Link href={`/projects/${project.slug}`} className="font-bold text-foreground hover:text-primary transition-colors">
                                                {project.title}
                                            </Link>
                                            {project.featured && (
                                                <span className="px-1.5 py-0.5 text-[10px] bg-primary/20 text-primary border border-primary/30 rounded">
                                                    *
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-5 pr-4 hidden md:table-cell text-muted-foreground text-sm truncate max-w-xs">
                                        {project.tagline}
                                    </td>
                                    <td className="py-5 pr-4">
                                        {project.technologies && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 3).map((tech, idx) => (
                                                    <span key={idx} className="text-xs text-muted-foreground/80">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="text-xs text-muted-foreground/50">
                                                        +{project.technologies.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-5 text-right">
                                        <Link href={`/projects/${project.slug}`} className="inline-flex p-2 rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                                            <IconArrowUpRight size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
