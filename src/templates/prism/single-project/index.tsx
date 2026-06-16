import { PageProps } from "@/lib/template-types";
import Link from "next/link";
import {
    IconArrowLeft,
    IconExternalLink,
    IconBrandGithub,
    IconBrandYoutube,
    IconCalendar,
    IconArrowRight,
} from "@tabler/icons-react";
import { MediaGallery } from "@/components/ui/media-gallery";

/**
 * Prism Template — Single Project Page
 *
 * Design: dark prismatic hero with gradient title,
 * glass content card, and coloured tech pills.
 */

const PILL_COLORS = [
    {
        bg: "rgba(99,102,241,0.15)", // indigo
        border: "rgba(99,102,241,0.3)",
        text: "#818cf8", // indigo-400
    },
    {
        bg: "rgba(6,182,212,0.12)",
        border: "rgba(6,182,212,0.3)",
        text: "#22d3ee", // cyan-400
    },
    {
        bg: "rgba(236,72,153,0.12)",
        border: "rgba(236,72,153,0.3)",
        text: "#f472b6", // pink-400
    },
    {
        bg: "rgba(16,185,129,0.12)",
        border: "rgba(16,185,129,0.3)",
        text: "#34d399", // emerald-400
    },
    {
        bg: "rgba(245,158,11,0.12)",
        border: "rgba(245,158,11,0.3)",
        text: "#fbbf24", // amber-400
    },
];

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

function GradientText({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                background:
                    "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}
        >
            {children}
        </span>
    );
}

function TechPill({ label, index }: { label: string; index: number }) {
    const col = PILL_COLORS[index % PILL_COLORS.length];
    return (
        <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{
                background: col.bg,
                border: `1px solid ${col.border}`,
                color: col.text,
            }}
        >
            {label}
        </span>
    );
}

export default function PrismSingleProject({ data }: PageProps) {
    const project = data?.project;

    if (!project) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-extrabold text-foreground">
                        Project Not Found
                    </h1>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                    >
                        <IconArrowLeft size={18} />
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    const technologies: string[] = project.technologies || [];
    // Check if there are ANY links to display
    const hasLinks =
        project.project_url || project.github_url || project.youtube_url;

    return (
        <div className="min-h-screen bg-background text-foreground antialiased">
            {/* ── Hero ──────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden pb-20 pt-12 z-0">
                {/* Orbs */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div
                        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full blur-[120px]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        className="absolute -right-32 top-10 h-[400px] w-[400px] rounded-full blur-[100px]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
                        }}
                    />
                    {/* Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                <div className="mx-auto max-w-4xl px-6">
                    {/* Back link */}
                    <Link
                        href="/projects"
                        className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <IconArrowLeft size={16} />
                        Back to Projects
                    </Link>

                    {/* Status + date */}
                    <div className="mb-8 flex flex-wrap items-center gap-3">
                        {project.status && (
                            <span
                                className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                                style={{
                                    background: "rgba(16,185,129,0.12)",
                                    border: "1px solid rgba(16,185,129,0.3)",
                                    color: "#34d399",
                                }}
                            >
                                {project.status}
                            </span>
                        )}
                        {project.completion_date && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                <IconCalendar size={13} />
                                {formatDate(project.completion_date)}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
                        <GradientText>{project.title}</GradientText>
                    </h1>

                    {/* Tagline */}
                    {project.tagline && (
                        <p className="mb-8 max-w-2xl text-xl text-muted-foreground leading-relaxed">
                            {project.tagline}
                        </p>
                    )}

                    {/* Tech pills */}
                    {technologies.length > 0 && (
                        <div className="mb-10 flex flex-wrap gap-2">
                            {technologies.map((tech: string, i: number) => (
                                <TechPill key={i} label={tech} index={i} />
                            ))}
                        </div>
                    )}

                    {/* Action links */}
                    {hasLinks && (
                        <div className="flex flex-wrap gap-3">
                            {project.project_url && (
                                <a
                                    href={project.project_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                                        boxShadow:
                                            "0 0 30px rgba(99,102,241,0.35)",
                                    }}
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
                                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground hover:border-primary/50 bg-foreground/5 border border-border/40"
                                >
                                    <IconBrandGithub size={16} />
                                    GitHub
                                </a>
                            )}
                            {project.youtube_url && (
                                <a
                                    href={project.youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-muted-foreground transition-all hover:text-red-500 hover:border-red-500/50 bg-foreground/5 border border-border/40"
                                >
                                    <IconBrandYoutube size={16} />
                                    YouTube
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Project images/videos ─────────────────────────────────────────── */}
            {project.media && project.media.length > 0 && (
                <div className="mx-auto max-w-5xl px-6 pb-12">
                    <MediaGallery media={project.media} />
                </div>
            )}

            {/* ── Content body ──────────────────────────────────────────── */}
            <div className="mx-auto max-w-4xl px-6 pb-28">
                {project.description && (
                    <div className="rounded-2xl p-8 bg-foreground/5 border border-border/40">
                        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">
                            About this project
                        </h2>
                        <div className="prose prose-invert prose-slate max-w-none">
                            {project.description
                                .split("\n")
                                .map((line: string, i: number) =>
                                    line.trim() ? (
                                        <p
                                            key={i}
                                            className="mb-4 text-base leading-relaxed text-muted-foreground"
                                        >
                                            {line}
                                        </p>
                                    ) : null,
                                )}
                        </div>
                    </div>
                )}

                {/* Back CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <IconArrowLeft size={16} />
                        See all projects
                    </Link>
                </div>
            </div>
        </div>
    );
}
