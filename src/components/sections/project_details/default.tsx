import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconCalendar, IconPhoto, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToProjectsLink, getProjectAuthor, getProjectMediaUrl, getProjectMeta, getRelatedProjects, ProjectExternalLinks } from './projectDetailsUtils';

export default function ProjectDetailsDefault({ siteData }: SectionProps) {
    const project = siteData.project;
    if (!project) return null;

    const { media, heroImage, paragraphs, date } = getProjectMeta(project);
    const authorName = getProjectAuthor(siteData);
    const relatedProjects = getRelatedProjects(siteData, project, 3);
    const summary = project.tagline || project.description;
    const hasProjectLinks = Boolean(project.project_url || project.github_url || project.youtube_url);

    return (
        <article className="bg-background text-foreground">
            <header className="border-b border-border">
                <div className="mx-auto max-w-theme px-6 py-10 md:py-16">
                    <BackToProjectsLink className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" />

                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
                        <div>
                            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                {project.featured && <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">Featured</span>}
                                {date && <span className="inline-flex items-center gap-2"><IconCalendar size={16} /> {date}</span>}
                                <span className="inline-flex items-center gap-2"><IconUserCircle size={16} /> {authorName}</span>
                            </div>

                            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight text-foreground md:text-7xl lg:text-8xl">
                                {project.title}
                            </h1>

                            {summary && <p className="mt-8 max-w-3xl text-xl leading-8 text-muted-foreground md:text-2xl md:leading-9">{summary}</p>}
                        </div>

                        <aside className="border-l border-border pl-6">
                            <dl className="space-y-5 text-sm">
                                <div>
                                    <dt className="font-medium uppercase tracking-widest text-muted-foreground">Project</dt>
                                    <dd className="mt-1 text-foreground">{project.featured ? 'Featured case study' : 'Case study'}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium uppercase tracking-widest text-muted-foreground">Media</dt>
                                    <dd className="mt-1 text-foreground">{media.length} {media.length === 1 ? 'asset' : 'assets'}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium uppercase tracking-widest text-muted-foreground">Stack</dt>
                                    <dd className="mt-2 flex flex-wrap gap-2">
                                        {project.technologies && project.technologies.length > 0 ? (
                                            project.technologies.slice(0, 5).map((tech) => <span key={tech} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{tech}</span>)
                                        ) : (
                                            <span className="text-muted-foreground">Not specified</span>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </aside>
                    </div>
                </div>
            </header>

            {heroImage && (
                <section className="py-8 md:py-12">
                    <div className="mx-auto max-w-theme px-6">
                        <div className="overflow-hidden rounded-[2rem] border border-border bg-muted shadow-2xl shadow-foreground/10">
                            <img src={heroImage} alt={project.title} className="aspect-[16/9] w-full object-cover" />
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12 md:py-20">
                <div className="mx-auto grid max-w-theme gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div className="max-w-3xl">
                        <div className="mb-8 flex items-center justify-between gap-6 border-b border-border pb-5">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Project Overview</h2>
                            {hasProjectLinks && <ProjectExternalLinks project={project} />}
                        </div>

                        <div className="space-y-7 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
                            {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>No project details have been added yet.</p>}
                        </div>

                        {project.technologies && project.technologies.length > 0 && (
                            <div className="mt-12 border-t border-border pt-8">
                                <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Technologies</h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => <span key={tech} className="rounded-full border border-border px-3 py-1 text-sm font-medium text-foreground">{tech}</span>)}
                                </div>
                            </div>
                        )}
                    </div>

                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <div className="space-y-8 border-l border-border pl-6">
                            <div>
                                <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Open Project</h2>
                                {hasProjectLinks ? (
                                    <ProjectExternalLinks project={project} className="flex flex-col items-start gap-3" />
                                ) : (
                                    <p className="text-sm leading-6 text-muted-foreground">Public links have not been added for this project yet.</p>
                                )}
                            </div>

                            <div>
                                <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">More Work</h2>
                                <div className="divide-y divide-border">
                                    {relatedProjects.length > 0 ? relatedProjects.map((item) => (
                                        <Link key={item.id} href={`/projects/${item.slug}`} className="group block py-4 first:pt-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="font-medium text-foreground underline-offset-4 group-hover:underline">{item.title}</h3>
                                                    {item.tagline && <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.tagline}</p>}
                                                </div>
                                                <IconArrowRight size={16} className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                            </div>
                                        </Link>
                                    )) : (
                                        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">View all projects <IconArrowRight size={16} /></Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {media.length > 1 && (
                <section className="border-t border-border py-12 md:py-20">
                    <div className="mx-auto max-w-theme px-6">
                        <div className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_20rem] md:items-end">
                            <div>
                                <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary"><IconPhoto size={16} /> Gallery</p>
                                <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">Project visuals and supporting media</h2>
                            </div>
                            <p className="text-sm leading-6 text-muted-foreground">A curated look at the additional assets attached to this project.</p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {media.slice(1).map((item, index) => {
                                const imageUrl = getProjectMediaUrl(item);
                                if (!imageUrl) return null;

                                return (
                                    <figure key={item.id ?? index} className="group overflow-hidden rounded-3xl border border-border bg-card">
                                        <img src={imageUrl} alt={item.alt || item.caption || `${project.title} image ${index + 1}`} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        {item.caption && <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">{item.caption}</figcaption>}
                                    </figure>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
}
