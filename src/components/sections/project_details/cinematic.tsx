import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconPhoto, IconPlayerPlayFilled, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToProjectsLink, getProjectAuthor, getProjectMediaUrl, getProjectMeta, getRelatedProjects, ProjectDate, ProjectExternalLinks } from './projectDetailsUtils';

export default function ProjectDetailsCinematic({ siteData }: SectionProps) {
    const project = siteData.project;
    if (!project) return null;

    const { media, heroImage, paragraphs, date } = getProjectMeta(project);
    const authorName = getProjectAuthor(siteData);
    const relatedProjects = getRelatedProjects(siteData, project, 3);

    return (
        <article className="overflow-hidden bg-background text-foreground">
            <section className="relative min-h-[88vh] overflow-hidden border-b border-border">
                {heroImage ? (
                    <img src={heroImage} alt={project.title} className="absolute inset-0 h-full w-full object-cover opacity-60" />
                ) : (
                    <div className="absolute inset-0 bg-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/25" />
                <div className="absolute inset-x-0 top-10 h-px bg-primary/40" />
                <div className="absolute inset-x-0 bottom-10 h-px bg-primary/40" />

                <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 py-16 md:py-24">
                    <BackToProjectsLink className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-4 py-2 text-sm font-semibold text-primary backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground" />
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
                        <div>
                            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-primary">
                                <span>Feature Presentation</span>
                                <ProjectDate date={date} className="inline-flex items-center gap-2 text-primary" />
                            </div>
                            <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter text-foreground md:text-7xl lg:text-8xl">
                                {project.title}
                            </h1>
                            {(project.tagline || project.description) && (
                                <p className="mt-7 max-w-3xl text-xl leading-8 text-muted-foreground md:text-2xl">
                                    {project.tagline || project.description}
                                </p>
                            )}
                        </div>

                        <aside className="rounded-3xl border border-border bg-card/80 p-5 shadow-2xl shadow-primary/10 backdrop-blur">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <IconUserCircle size={26} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Directed by</p>
                                    <p className="font-semibold text-foreground">{authorName}</p>
                                </div>
                            </div>
                            <ProjectExternalLinks project={project} />
                        </aside>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
                    <div>
                        <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-primary">Production Notes</p>
                        <div className="space-y-7 text-xl leading-9 text-muted-foreground">
                            {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>No project details have been added yet.</p>}
                        </div>

                        {media.length > 1 && (
                            <div className="mt-16 grid gap-5 md:grid-cols-2">
                                {media.slice(1, 5).map((item, index) => {
                                    const imageUrl = getProjectMediaUrl(item);
                                    if (!imageUrl) return null;

                                    return (
                                        <figure key={item.id ?? index} className="group overflow-hidden rounded-2xl border border-border bg-card">
                                            <img src={imageUrl} alt={item.alt || item.caption || `${project.title} frame ${index + 1}`} className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            {item.caption && <figcaption className="px-4 py-3 text-sm text-muted-foreground">{item.caption}</figcaption>}
                                        </figure>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        {project.technologies && project.technologies.length > 0 && (
                            <div className="rounded-3xl border border-border bg-card p-6">
                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Credits</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => <span key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{tech}</span>)}
                                </div>
                            </div>
                        )}
                        <div className="rounded-3xl border border-border bg-card p-6">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Next Screening</p>
                            <div className="space-y-3">
                                {relatedProjects.length > 0 ? relatedProjects.map((item) => (
                                    <Link key={item.id} href={`/projects/${item.slug}`} className="group block rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/60">
                                        <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary"><IconPlayerPlayFilled size={12} /> Play</span>
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary">{item.title}</h3>
                                            <IconArrowRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                        </div>
                                    </Link>
                                )) : (
                                    <Link href="/projects" className="inline-flex items-center gap-2 font-semibold text-primary">Browse the archive <IconArrowRight size={16} /></Link>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {media.length > 1 && (
                <section className="border-y border-border bg-card/30 py-14">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
                        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-primary"><IconPhoto size={16} /> {media.length} frames archived</p>
                        <Link href="/projects" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">All projects</Link>
                    </div>
                </section>
            )}
        </article>
    );
}
