import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToProjectsLink, getProjectMediaUrl, getProjectMeta, getRelatedProjects, ProjectDate, ProjectExternalLinks } from './projectDetailsUtils';

export default function ProjectDetailsMinimal({ siteData }: SectionProps) {
    const project = siteData.project;
    if (!project) return null;

    const { media, heroImage, paragraphs, date } = getProjectMeta(project);
    const relatedProjects = getRelatedProjects(siteData, project, 3);

    return (
        <article className="bg-background py-12 text-foreground md:py-20">
            <div className="mx-auto max-w-theme px-6">
                <BackToProjectsLink className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline" />

                <header className="border-b border-border pb-10">
                    <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <ProjectDate date={date} />
                        {project.featured && <span>Featured</span>}
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">{project.title}</h1>
                    {(project.tagline || project.description) && <p className="mt-6 text-lg leading-8 text-muted-foreground">{project.tagline || project.description}</p>}
                    <div className="mt-6"><ProjectExternalLinks project={project} /></div>
                </header>

                {heroImage && <img src={heroImage} alt={project.title} className="my-10 aspect-video w-full rounded-lg border border-border object-cover" />}

                {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-10 flex flex-wrap gap-2 text-sm text-muted-foreground">
                        {project.technologies.map((tech) => <span key={tech} className="rounded-full border border-border px-3 py-1">{tech}</span>)}
                    </div>
                )}

                <section className="space-y-6 text-lg leading-8 text-muted-foreground">
                    {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>No project details have been added yet.</p>}
                </section>

                {media.length > 1 && (
                    <section className="mt-14 border-t border-border pt-8">
                        <h2 className="mb-5 text-sm font-medium text-foreground">Images</h2>
                        <div className="space-y-5">
                            {media.slice(1).map((item, index) => {
                                const imageUrl = getProjectMediaUrl(item);
                                if (!imageUrl) return null;

                                return (
                                    <figure key={item.id ?? index}>
                                        <img src={imageUrl} alt={item.alt || item.caption || `${project.title} image ${index + 1}`} className="aspect-video w-full rounded-lg border border-border object-cover" />
                                        {item.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{item.caption}</figcaption>}
                                    </figure>
                                );
                            })}
                        </div>
                    </section>
                )}

                <nav className="mt-14 border-t border-border pt-8">
                    <h2 className="mb-4 text-sm font-medium text-foreground">More projects</h2>
                    <div className="divide-y divide-border">
                        {relatedProjects.length > 0 ? relatedProjects.map((item) => (
                            <Link key={item.id} href={`/projects/${item.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
                                <span className="font-medium text-foreground underline-offset-4 group-hover:underline">{item.title}</span>
                                <IconArrowRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                            </Link>
                        )) : (
                            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">All projects <IconArrowRight size={16} /></Link>
                        )}
                    </div>
                </nav>
            </div>
        </article>
    );
}
