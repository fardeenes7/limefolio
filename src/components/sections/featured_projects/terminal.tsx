import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function FeaturedProjectsTerminal({ section, siteData }: SectionProps) {
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
        <section id="projects" className="bg-background py-20 font-mono">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-4">
                    <div>
                        <p className="text-xs text-muted-foreground">$ find ./work -type repo -featured</p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{sectionTitle}</h2>
                    </div>
                    {showViewAll && allProjects.length > displayProjects.length && <Link href="/projects" className="text-sm text-primary hover:underline">{viewAllLabel}</Link>}
                </div>
                <div className="overflow-x-auto rounded-lg border border-border bg-card">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground">
                            <tr><th className="px-4 py-3">mode</th><th className="px-4 py-3">repo</th><th className="px-4 py-3">summary</th><th className="px-4 py-3">stack</th><th className="px-4 py-3 text-right">exec</th></tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {displayProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-4 text-primary">{project.featured ? 'drwx*' : 'drwx-'}</td>
                                    <td className="px-4 py-4 font-semibold text-foreground">{project.title}</td>
                                    <td className="max-w-sm truncate px-4 py-4 text-muted-foreground">{project.tagline}</td>
                                    <td className="px-4 py-4 text-muted-foreground">{project.technologies?.slice(0, 3).join('  ')}</td>
                                    <td className="px-4 py-4 text-right"><Link href={`/projects/${project.slug}`} className="inline-flex text-primary"><IconArrowUpRight size={18} /></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
