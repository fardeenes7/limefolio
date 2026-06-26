import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconBolt, IconPhoto } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToProjectsLink, getProjectMediaUrl, getProjectMeta, getRelatedProjects, ProjectDate, ProjectExternalLinks } from './projectDetailsUtils';

export default function ProjectDetailsNeobrutalism({ siteData }: SectionProps) {
    const project = siteData.project;
    if (!project) return null;

    const { media, heroImage, paragraphs, date } = getProjectMeta(project);
    const relatedProjects = getRelatedProjects(siteData, project, 3);

    return (
        <article className="border-b-4 border-border bg-background text-foreground">
            <section className="border-b-4 border-border bg-muted py-10 md:py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <BackToProjectsLink className="mb-8 inline-flex items-center gap-2 border-4 border-border bg-background px-4 py-2 text-sm font-black uppercase text-foreground shadow-[5px_5px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5" />
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
                        <div>
                            <div className="mb-5 flex flex-wrap items-center gap-3">
                                <span className="border-4 border-border bg-primary px-3 py-1 text-xs font-black uppercase text-primary-foreground">Case study</span>
                                <ProjectDate date={date} className="inline-flex items-center gap-2 border-4 border-border bg-accent px-3 py-1 text-xs font-black uppercase text-accent-foreground" />
                            </div>
                            <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter text-foreground md:text-7xl lg:text-8xl">{project.title}</h1>
                            {(project.tagline || project.description) && <p className="mt-6 max-w-3xl text-xl font-semibold leading-8 text-muted-foreground">{project.tagline || project.description}</p>}
                        </div>

                        <aside className="border-4 border-border bg-card p-5 shadow-[10px_10px_0_hsl(var(--border))]">
                            <p className="mb-4 text-sm font-black uppercase tracking-widest text-muted-foreground">Launch Links</p>
                            <ProjectExternalLinks project={project} />
                            {project.technologies && project.technologies.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 6).map((tech) => <span key={tech} className="border-2 border-border bg-secondary px-2 py-1 text-xs font-black uppercase text-secondary-foreground">{tech}</span>)}
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>

            {heroImage && (
                <section className="border-b-4 border-border bg-background py-8">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="border-4 border-border bg-primary p-3 shadow-[12px_12px_0_hsl(var(--border))]">
                            <img src={heroImage} alt={project.title} className="aspect-video w-full border-4 border-border object-cover grayscale transition-all hover:grayscale-0" />
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
                    <div className="border-4 border-border bg-card p-6 shadow-[10px_10px_0_hsl(var(--border))] sm:p-10">
                        <p className="mb-5 inline-flex items-center gap-2 border-4 border-border bg-accent px-3 py-1 text-sm font-black uppercase text-accent-foreground"><IconBolt size={18} /> What shipped</p>
                        <div className="space-y-6 text-lg font-semibold leading-8 text-foreground">
                            {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>No project details have been added yet.</p>}
                        </div>
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        <div className="border-4 border-border bg-primary p-5 text-primary-foreground shadow-[8px_8px_0_hsl(var(--border))]">
                            <p className="text-sm font-black uppercase tracking-widest">Stats</p>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                                <div className="border-4 border-border bg-background p-3 text-foreground"><p className="text-2xl font-black">{media.length}</p><p className="text-xs font-black uppercase">Assets</p></div>
                                <div className="border-4 border-border bg-background p-3 text-foreground"><p className="text-2xl font-black">{project.technologies?.length || 0}</p><p className="text-xs font-black uppercase">Tools</p></div>
                            </div>
                        </div>
                        <div className="border-4 border-border bg-card p-5 shadow-[8px_8px_0_hsl(var(--border))]">
                            <p className="mb-4 text-sm font-black uppercase tracking-widest text-muted-foreground">More Builds</p>
                            <div className="space-y-3">
                                {relatedProjects.length > 0 ? relatedProjects.map((item) => (
                                    <Link key={item.id} href={`/projects/${item.slug}`} className="group flex items-center justify-between gap-3 border-4 border-border bg-background p-3 font-black uppercase transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">
                                        <span>{item.title}</span>
                                        <IconArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                )) : (
                                    <Link href="/projects" className="inline-flex items-center gap-2 font-black uppercase text-primary">All projects <IconArrowRight size={18} /></Link>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {media.length > 1 && (
                <section className="border-t-4 border-border bg-muted py-12">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="mb-8 inline-flex items-center gap-2 border-4 border-border bg-background px-4 py-2 text-2xl font-black uppercase shadow-[6px_6px_0_hsl(var(--border))]"><IconPhoto /> Proof Wall</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {media.slice(1).map((item, index) => {
                                const imageUrl = getProjectMediaUrl(item);
                                if (!imageUrl) return null;

                                return <img key={item.id ?? index} src={imageUrl} alt={item.alt || item.caption || `${project.title} proof ${index + 1}`} className="aspect-video border-4 border-border object-cover shadow-[8px_8px_0_hsl(var(--border))]" />;
                            })}
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
}
