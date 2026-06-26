import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconFileCode, IconGitBranch, IconPhoto, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToProjectsLink, getProjectMediaUrl, getProjectMeta, getRelatedProjects, ProjectDate, ProjectExternalLinks } from './projectDetailsUtils';

export default function ProjectDetailsVsCode({ siteData }: SectionProps) {
    const project = siteData.project;
    if (!project) return null;

    const { media, heroImage, paragraphs, date } = getProjectMeta(project);
    const relatedProjects = getRelatedProjects(siteData, project, 5);
    const fileName = `${project.slug || 'project'}.md`;

    return (
        <article className="bg-background py-6 font-mono text-foreground">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/5">
                    <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-2"><IconSearch size={14} /> Project Workspace</span>
                        <span>Markdown Preview</span>
                    </div>

                    <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)_19rem]">
                        <aside className="border-b border-border bg-background/70 p-4 lg:border-b-0 lg:border-r">
                            <BackToProjectsLink className="mb-4 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary" />
                            <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Explorer</p>
                            <div className="space-y-1 text-sm">
                                <div className="rounded bg-muted px-2 py-1 text-foreground">projects</div>
                                <div className="flex items-center gap-2 rounded bg-primary/10 px-2 py-1 text-primary"><IconFileCode size={14} /> {fileName}</div>
                                {media.length > 1 && <div className="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground"><IconPhoto size={14} /> assets ({media.length})</div>}
                            </div>
                        </aside>

                        <main className="min-w-0">
                            <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-2 text-xs text-muted-foreground">
                                <span className="rounded-t border border-border bg-card px-3 py-1 text-foreground">{fileName}</span>
                                <ProjectDate date={date} />
                            </div>
                            <div className="p-5 sm:p-8 lg:p-10">
                                <p className="mb-3 text-sm text-muted-foreground"># project.detail</p>
                                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">{project.title}</h1>
                                {(project.tagline || project.description) && <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{project.tagline || project.description}</p>}

                                <div className="mt-7 flex flex-wrap gap-2">
                                    {project.featured && <span className="rounded bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">featured</span>}
                                    {project.technologies?.slice(0, 6).map((tech) => <span key={tech} className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">{tech}</span>)}
                                </div>

                                {heroImage && <img src={heroImage} alt={project.title} className="mt-8 aspect-video w-full rounded border border-border object-cover" />}

                                <div className="mt-10 border-l border-border pl-5">
                                    <p className="mb-4 text-sm text-primary">## implementation-notes</p>
                                    <div className="space-y-5 text-base leading-8 text-muted-foreground">
                                        {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>No project details have been added yet.</p>}
                                    </div>
                                </div>
                            </div>
                        </main>

                        <aside className="border-t border-border bg-background/70 p-4 lg:border-l lg:border-t-0">
                            <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Source Control</p>
                            <div className="mb-6 rounded border border-border bg-card p-3 text-sm">
                                <div className="mb-2 flex items-center gap-2 text-primary"><IconGitBranch size={15} /> main</div>
                                <p className="text-muted-foreground">{project.featured ? 'Pinned case study' : 'Published case study'}</p>
                            </div>
                            <ProjectExternalLinks project={project} className="mb-6 flex flex-col gap-2" />
                            <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Related</p>
                            <div className="space-y-2">
                                {relatedProjects.length > 0 ? relatedProjects.map((item) => (
                                    <Link key={item.id} href={`/projects/${item.slug}`} className="group block rounded border border-border bg-card p-3 transition-colors hover:border-primary/60">
                                        <p className="line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary">{item.title}</p>
                                        {item.tagline && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.tagline}</p>}
                                    </Link>
                                )) : (
                                    <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-primary">Open projects <IconArrowRight size={14} /></Link>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>

                {media.length > 1 && (
                    <section className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
                        <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">Preview: assets</div>
                        <div className="grid gap-4 p-4 md:grid-cols-3">
                            {media.slice(1).map((item, index) => {
                                const imageUrl = getProjectMediaUrl(item);
                                if (!imageUrl) return null;
                                return <img key={item.id ?? index} src={imageUrl} alt={item.alt || item.caption || `${project.title} preview ${index + 1}`} className="aspect-video rounded border border-border object-cover" />;
                            })}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}
