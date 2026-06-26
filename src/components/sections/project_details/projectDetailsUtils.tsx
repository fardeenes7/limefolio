import {
    IconArrowLeft,
    IconArrowRight,
    IconBrandGithub,
    IconCalendar,
    IconExternalLink,
    IconWorld,
} from '@tabler/icons-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Media, Project, SiteData } from '@/types/site';

export function getProjectMediaUrl(media?: Media | null) {
    return media?.url || media?.image || media?.thumbnail || null;
}

export function formatProjectDate(value?: string | null) {
    if (!value) return null;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });
}

export function splitProjectParagraphs(value?: string | null) {
    return (value || '')
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
}

export function getProjectImage(project: Project) {
    const media = getProjectMedia(project);
    return project.cover_image || project.thumbnail || getProjectMediaUrl(media[0]) || null;
}

export function getProjectMedia(project: Project) {
    return (project.media || []).filter((item) => item.url || item.image || item.thumbnail);
}

export function getProjectAuthor(siteData: SiteData) {
    return [siteData.user?.first_name, siteData.user?.last_name].filter(Boolean).join(' ') || siteData.title;
}

export function getProjectMeta(project: Project) {
    return {
        date: formatProjectDate(project.end_date || project.start_date || project.created_at),
        paragraphs: splitProjectParagraphs(project.content || project.description),
        media: getProjectMedia(project),
        heroImage: getProjectImage(project),
    };
}

export function getRelatedProjects(siteData: SiteData, project: Project, limit = 3) {
    return (siteData.projects || []).filter((item) => item.slug !== project.slug).slice(0, limit);
}

export function BackToProjectsLink({ className = '' }: { className?: string }) {
    return (
        <Link href="/projects" className={className || 'inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary'}>
            <IconArrowLeft size={16} />
            Back to projects
        </Link>
    );
}

export function ProjectExternalLinks({ project, className = '' }: { project: Project; className?: string }) {
    const links = [
        project.project_url ? { href: project.project_url, label: 'Live', icon: <IconExternalLink size={16} /> } : null,
        project.github_url ? { href: project.github_url, label: 'Source', icon: <IconBrandGithub size={16} /> } : null,
        project.youtube_url ? { href: project.youtube_url, label: 'Video', icon: <IconWorld size={16} /> } : null,
    ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[];

    if (links.length === 0) return null;

    return (
        <div className={className || 'flex flex-wrap gap-2'}>
            {links.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                    {link.icon}
                    {link.label}
                </a>
            ))}
        </div>
    );
}

export function ProjectDate({ date, className = '' }: { date: string | null; className?: string }) {
    if (!date) return null;

    return (
        <span className={className || 'inline-flex items-center gap-2 text-sm text-muted-foreground'}>
            <IconCalendar size={16} />
            {date}
        </span>
    );
}

export function RelatedProjectList({ projects, fallbackClassName = '' }: { projects: Project[]; fallbackClassName?: string }) {
    if (projects.length === 0) {
        return (
            <Link href="/projects" className={fallbackClassName || 'inline-flex items-center gap-2 font-semibold text-primary'}>
                View all projects
                <IconArrowRight size={16} />
            </Link>
        );
    }

    return (
        <div className="space-y-3">
            {projects.map((item) => (
                <Link key={item.id} href={`/projects/${item.slug}`} className="group block rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/50">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary">{item.title}</h3>
                            {item.tagline && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.tagline}</p>}
                        </div>
                        <IconArrowRight size={16} className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                </Link>
            ))}
        </div>
    );
}
