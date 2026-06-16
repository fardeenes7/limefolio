import { PageProps } from "@/lib/template-types";
import Link from "next/link";
import {
    IconArrowLeft,
    IconExternalLink,
    IconBrandGithub,
    IconBrandYoutube,
    IconCalendar,
    IconSparkles,
} from "@tabler/icons-react";
import { MediaGallery } from "@/components/ui/media-gallery";

/**
 * Modern Template — Single Project Page
 *
 * Design: dark hero band with project title, tech tags,
 * and external links; rich content body.
 */

function formatDate(dateStr: string | undefined) {
    if (!dateStr) return "";
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    } catch {
        return "";
    }
}

export default function ModernSingleProject({ data }: PageProps) {
    const project = data?.project;

    if (!project) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        Project Not Found
                    </h1>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                        <IconArrowLeft size={18} />
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    const technologies: string[] = project.technologies || [];
    const hasLinks =
        project.project_url || project.github_url || project.youtube_url;

    return (
        <div className="min-h-screen bg-background text-foreground antialiased">
            {/* ── Hero Band ─────────────────────────────────────────────── */}
            <div className="relative overflow-hidden bg-linear-to-br from-primary via-primary/85 to-accent pt-8 pb-16">
                {/* Blob accents */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

                <div className="container relative mx-auto max-w-5xl px-6">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur transition-all hover:bg-primary-foreground/20"
                    >
                        <IconArrowLeft size={15} />
                        Back to Portfolio
                    </Link>

                    {/* Featured badge */}
                    {project.is_featured && (
                        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-semibold text-primary-foreground">
                            <IconSparkles size={12} />
                            Featured Project
                        </div>
                    )}

                    <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                        {project.title}
                    </h1>

                    {project.tagline && (
                        <p className="mb-6 max-w-xl text-lg text-primary-foreground/80">
                            {project.tagline}
                        </p>
                    )}

                    {/* Tech tags */}
                    {technologies.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                            {technologies.map((tech: string, i: number) => (
                                <span
                                    key={i}
                                    className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* External links */}
                    {hasLinks && (
                        <div className="flex gap-3">
                            {project.project_url && (
                                <a
                                    href={project.project_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/50 bg-primary-foreground px-5 py-2 text-sm font-semibold text-primary shadow-md transition-all hover:scale-105"
                                >
                                    <IconExternalLink size={16} />
                                    Live Demo
                                </a>
                            )}
                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-5 py-2 text-sm font-semibold text-primary-foreground backdrop-blur transition-all hover:bg-primary-foreground/20"
                                >
                                    <IconBrandGithub size={16} />
                                    Source
                                </a>
                            )}
                            {project.youtube_url && (
                                <a
                                    href={project.youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-50 backdrop-blur transition-all hover:bg-red-500/20"
                                >
                                    <IconBrandYoutube size={16} />
                                    YouTube
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Body ──────────────────────────────────────────────────── */}
            <div className="container mx-auto max-w-5xl px-6 py-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">
                        {project.description && (
                            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                                <h2 className="mb-4 text-xl font-bold text-foreground">
                                    About this project
                                </h2>
                                <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                                    {project.description}
                                </p>
                            </div>
                        )}

                        {/* Media Slider */}
                        {project.media && project.media.length > 0 && (
                            <MediaGallery media={project.media} />
                        )}
                    </div>

                    {/* Sidebar meta */}
                    <div className="space-y-6">
                        {/* Meta card */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                Project Details
                            </h3>

                            {project.start_date && (
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <IconCalendar size={15} />
                                    </span>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Timeline
                                        </p>
                                        <p className="font-medium text-foreground">
                                            {formatDate(project.start_date)}
                                            {project.end_date &&
                                                ` — ${formatDate(project.end_date)}`}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {project.status && (
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <IconSparkles size={15} />
                                    </span>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Status
                                        </p>
                                        <p className="font-medium capitalize text-foreground">
                                            {project.status}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Technologies deep-list */}
                        {technologies.length > 0 && (
                            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                    Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {technologies.map(
                                        (tech: string, i: number) => (
                                            <span
                                                key={i}
                                                className="inline-block rounded-xl border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        {hasLinks && (
                            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
                                <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                    Links
                                </h3>
                                {project.project_url && (
                                    <a
                                        href={project.project_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                    >
                                        <IconExternalLink
                                            size={16}
                                            className="text-primary"
                                        />
                                        Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                    >
                                        <IconBrandGithub
                                            size={16}
                                            className="text-primary"
                                        />
                                        View Source
                                    </a>
                                )}
                                {project.youtube_url && (
                                    <a
                                        href={project.youtube_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3 text-sm font-medium text-foreground transition-all hover:border-red-500/40 hover:bg-red-500/5 hover:text-red-500"
                                    >
                                        <IconBrandYoutube
                                            size={16}
                                            className="text-red-500"
                                        />
                                        Watch Video
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Back link bottom */}
                <div className="mt-16 pt-8 border-t border-border">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        <IconArrowLeft size={16} />
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
}
