import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconBrandGithub, IconExternalLink, IconTerminal2 } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToProjectsLink, getProjectMediaUrl, getProjectMeta, getRelatedProjects, ProjectDate, ProjectExternalLinks } from './projectDetailsUtils';

export default function ProjectDetailsTerminal({ siteData }: SectionProps) {
    const project = siteData.project;
    if (!project) return null;

    const { media, heroImage, paragraphs, date } = getProjectMeta(project);
    const relatedProjects = getRelatedProjects(siteData, project, 4);
    const repoName = project.slug || project.title.toLowerCase().replace(/\s+/g, '-');

    return (
        <article className="bg-background py-8 font-mono text-foreground">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <BackToProjectsLink className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary" />

                <section className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/5">
                    <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-2"><IconTerminal2 size={15} className="text-primary" /> ~/projects/{repoName}</span>
                        <span>{project.featured ? 'featured' : 'readonly'}</span>
                    </div>

                    <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_22rem]">
                        <div className="p-5 sm:p-8 lg:p-10">
                            <p className="text-sm text-muted-foreground"><span className="text-primary">$</span> inspect --project {repoName}</p>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl">{project.title}</h1>
                            {(project.tagline || project.description) && <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{project.tagline || project.description}</p>}

                            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                <div className="rounded border border-border bg-background p-4">
                                    <p className="text-xs text-muted-foreground">status</p>
                                    <p className="mt-1 font-semibold text-primary">{project.featured ? 'featured' : 'published'}</p>
                                </div>
                                <div className="rounded border border-border bg-background p-4">
                                    <p className="text-xs text-muted-foreground">date</p>
                                    <ProjectDate date={date} className="mt-1 inline-flex items-center gap-2 font-semibold text-foreground" />
                                </div>
                                <div className="rounded border border-border bg-background p-4">
                                    <p className="text-xs text-muted-foreground">media</p>
                                    <p className="mt-1 font-semibold text-foreground">{media.length} assets</p>
                                </div>
                            </div>

                            {heroImage && (
                                <div className="mt-8 overflow-hidden rounded border border-border bg-muted">
                                    <img src={heroImage} alt={project.title} className="aspect-video w-full object-cover" />
                                </div>
                            )}
                        </div>

                        <aside className="border-t border-border bg-background/70 p-5 lg:border-l lg:border-t-0">
                            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">links</p>
                            <ProjectExternalLinks project={project} className="flex flex-col gap-2" />
                            {project.technologies && project.technologies.length > 0 && (
                                <div className="mt-8">
                                    <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">dependencies</p>
                                    <div className="space-y-2">
                                        {project.technologies.map((tech) => <div key={tech} className="rounded border border-border bg-card px-3 py-2 text-sm text-muted-foreground">+ {tech}</div>)}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </section>

                <section className="grid gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
                    <div className="rounded-lg border border-border bg-card p-5 sm:p-8">
                        <p className="mb-5 text-sm text-muted-foreground"><span className="text-primary">$</span> cat README.md</p>
                        <div className="space-y-5 text-base leading-8 text-muted-foreground">
                            {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>No project details have been added yet.</p>}
                        </div>
                    </div>

                    <aside className="rounded-lg border border-border bg-card p-5 sm:p-6">
                        <p className="mb-4 text-sm text-muted-foreground"><span className="text-primary">$</span> ls related</p>
                        <div className="space-y-3">
                            {relatedProjects.length > 0 ? relatedProjects.map((item) => (
                                <Link key={item.id} href={`/projects/${item.slug}`} className="group flex items-start justify-between gap-3 rounded border border-border bg-background p-3 transition-colors hover:border-primary/60">
                                    <div>
                                        <p className="font-semibold text-foreground group-hover:text-primary">{item.title}</p>
                                        {item.tagline && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.tagline}</p>}
                                    </div>
                                    <IconArrowRight size={15} className="mt-1 shrink-0 text-muted-foreground group-hover:text-primary" />
                                </Link>
                            )) : (
                                <Link href="/projects" className="inline-flex items-center gap-2 text-primary">cd ../projects <IconArrowRight size={15} /></Link>
                            )}
                        </div>
                    </aside>
                </section>

                {media.length > 1 && (
                    <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
                        <p className="mb-5 text-sm text-muted-foreground"><span className="text-primary">$</span> open ./assets</p>
                        <div className="grid gap-4 md:grid-cols-3">
                            {media.slice(1).map((item, index) => {
                                const imageUrl = getProjectMediaUrl(item);
                                if (!imageUrl) return null;

                                return <img key={item.id ?? index} src={imageUrl} alt={item.alt || item.caption || `${project.title} asset ${index + 1}`} className="aspect-video rounded border border-border object-cover" />;
                            })}
                        </div>
                    </section>
                )}

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    {project.github_url && <span className="inline-flex items-center gap-2"><IconBrandGithub size={15} /> source linked</span>}
                    {project.project_url && <span className="inline-flex items-center gap-2"><IconExternalLink size={15} /> live build available</span>}
                </div>
            </div>
        </article>
    );
}
