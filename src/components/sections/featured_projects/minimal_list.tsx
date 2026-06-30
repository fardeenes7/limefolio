import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';

export default function FeaturedProjectsMinimalList({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Selected work';
    const maxItemsStr = (i.maxItems as string) || '4';
    const maxItems = maxItemsStr === 'all' ? Infinity : parseInt(maxItemsStr, 10);
    const filterByTag = (i.filterByTag as string) || '';
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'All projects';

    let allProjects = siteData.projects || [];
    if (filterByTag) {
        const tags = filterByTag.split(',').map((tag) => tag.trim().toLowerCase());
        allProjects = allProjects.filter((project) => project.technologies?.some((tech) => tags.includes(tech.toLowerCase())));
    }

    if (allProjects.length === 0) return null;

    const featuredOnly = allProjects.filter((project) => project.featured);
    const displayProjects = (featuredOnly.length > 0 ? featuredOnly : allProjects).slice(0, maxItems);

    return (
        <section id="projects" className="bg-background py-12">
            <div className="mx-auto max-w-theme px-6">
                <div className="border-t border-border pt-8">
                    <div className="mb-5 flex items-baseline justify-between gap-4">
                        {sectionTitle && <h2 className="text-sm font-medium text-foreground">{sectionTitle}</h2>}
                        {showViewAll && allProjects.length > displayProjects.length && (
                            <Link href="/projects" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                                {viewAllLabel}
                            </Link>
                        )}
                    </div>

                    <div className="divide-y divide-border">
                        {displayProjects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.slug}`} className="group block py-5">
                                <div className="flex items-baseline justify-between gap-4">
                                    <h3 className="font-medium text-foreground underline-offset-4 group-hover:underline">{project.title}</h3>
                                    {project.technologies && project.technologies.length > 0 && (
                                        <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
                                            {project.technologies.slice(0, 2).join(', ')}
                                        </span>
                                    )}
                                </div>
                                {project.tagline && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.tagline}</p>}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
