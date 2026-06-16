import { PageProps } from "@/lib/template-types";
import Link from "next/link";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconBrandMedium,
    IconBrandStackoverflow,
    IconBrandYoutube,
    IconExternalLink,
    IconCalendar,
    IconMapPin,
    IconBriefcase,
} from "@tabler/icons-react";

/**
 * Minimal Theme - Home Page Component
 * Clean, typography-focused design with emphasis on content
 */

// Social icon mapping
const socialIcons: Record<string, any> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
    medium: IconBrandMedium,
    stackoverflow: IconBrandStackoverflow,
};

export default function MinimalHome({ data }: PageProps) {
    const featuredProjects =
        data?.projects?.filter((p: any) => p.featured) || [];
    const allProjects = data?.projects || [];
    const experiences = data?.experiences || [];
    const skills = data?.skills || [];
    const socialLinks = data?.social_links || [];
    const featuredSkills = skills.filter((s: any) => s.is_featured);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-3xl mx-auto px-6 py-16 sm:px-8 sm:py-24">
                {/* Hero Section */}
                <header className="mb-20">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
                        {data?.title || "Portfolio"}
                    </h1>
                    {data?.tagline && (
                        <p className="text-xl sm:text-2xl text-muted-foreground mb-6 font-light">
                            {data.tagline}
                        </p>
                    )}
                    {data?.description && (
                        <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
                            {data.description}
                        </p>
                    )}

                    {/* Social Links */}
                    {socialLinks.length > 0 && (
                        <div className="flex gap-4 mt-8">
                            {socialLinks.map((link: any) => {
                                const Icon =
                                    socialIcons[link.platform] ||
                                    IconExternalLink;
                                return (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                        aria-label={link.platform}
                                    >
                                        <Icon size={24} />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </header>

                {/* Featured Skills */}
                {featuredSkills.length > 0 && (
                    <section className="mb-20">
                        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-6 font-medium">
                            Core Skills
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {featuredSkills.map((skill: any) => (
                                <span
                                    key={skill.id}
                                    className="px-4 py-2 bg-muted text-foreground rounded-full text-sm font-medium"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Featured Projects */}
                {featuredProjects.length > 0 && (
                    <section className="mb-20">
                        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-8 font-medium">
                            Featured Projects
                        </h2>
                        <div className="space-y-16">
                            {featuredProjects.map((project: any) => (
                                <article key={project.id} className="group">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="block"
                                    >
                                        {/* Project Thumbnail */}
                                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted mb-6">
                                            {project.thumbnail ? (
                                                <img
                                                    src={project.thumbnail}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-muted/50">
                                                    <IconBriefcase
                                                        className="text-muted-foreground/20"
                                                        size={40}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-muted-foreground transition-colors">
                                            {project.title}
                                        </h3>
                                        {project.tagline && (
                                            <p className="text-base text-muted-foreground mb-3 font-light">
                                                {project.tagline}
                                            </p>
                                        )}
                                        <p className="text-base text-muted-foreground/80 leading-relaxed mb-4">
                                            {project.description}
                                        </p>
                                        {project.technologies &&
                                            project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.technologies.map(
                                                        (
                                                            tech: string,
                                                            idx: number,
                                                        ) => (
                                                            <span
                                                                key={idx}
                                                                className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-full"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        <div className="flex gap-4 text-sm">
                                            {project.project_url && (
                                                <span className="text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                                                    View Project{" "}
                                                    <IconExternalLink
                                                        size={16}
                                                    />
                                                </span>
                                            )}
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                                                >
                                                    <IconBrandGithub
                                                        size={16}
                                                    />{" "}
                                                    Source
                                                </a>
                                            )}
                                            {project.youtube_url && (
                                                <a
                                                    href={project.youtube_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1"
                                                >
                                                    <IconBrandYoutube
                                                        size={16}
                                                    />{" "}
                                                    Video
                                                </a>
                                            )}
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Projects (if more than featured) */}
                {allProjects.length > featuredProjects.length && (
                    <section className="mb-20">
                        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-8 font-medium">
                            Other Projects
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {allProjects
                                .filter((p: any) => !p.featured)
                                .map((project: any) => (
                                    <Link
                                        key={project.id}
                                        href={`/projects/${project.slug}`}
                                        className="group block overflow-hidden border border-border rounded-lg hover:border-foreground/20 transition-all"
                                    >
                                        {/* Small Thumbnail */}
                                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                            {project.thumbnail ? (
                                                <img
                                                    src={project.thumbnail}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-muted/30">
                                                    <IconBriefcase
                                                        className="text-muted-foreground/10"
                                                        size={24}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-muted-foreground transition-colors">
                                                {project.title}
                                            </h3>
                                            {project.tagline && (
                                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                    {project.tagline}
                                                </p>
                                            )}
                                            {project.technologies &&
                                                project.technologies.length >
                                                    0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies
                                                            .slice(0, 3)
                                                            .map(
                                                                (
                                                                    tech: string,
                                                                    idx: number,
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="text-[10px] px-2 py-0.5 bg-muted/50 text-muted-foreground rounded"
                                                                    >
                                                                        {tech}
                                                                    </span>
                                                                ),
                                                            )}
                                                    </div>
                                                )}
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <section className="mb-20">
                        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-8 font-medium">
                            Experience
                        </h2>
                        <div className="space-y-10">
                            {experiences.map((exp: any) => (
                                <article
                                    key={exp.id}
                                    className="relative pl-8 border-l-2 border-border"
                                >
                                    <div className="absolute left-0 top-0 w-2 h-2 -ml-[5px] rounded-full bg-foreground" />
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                        <div>
                                            <h3 className="text-xl font-semibold text-foreground">
                                                {exp.position}
                                            </h3>
                                            <p className="text-base text-muted-foreground font-medium">
                                                {exp.company}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 sm:mt-0">
                                            <IconCalendar size={16} />
                                            <span>
                                                {new Date(
                                                    exp.start_date,
                                                ).getFullYear()}{" "}
                                                -{" "}
                                                {exp.is_current
                                                    ? "Present"
                                                    : new Date(
                                                          exp.end_date,
                                                      ).getFullYear()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3 mb-3">
                                        {exp.type && (
                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                <IconBriefcase size={14} />
                                                {exp.type}
                                            </span>
                                        )}
                                        {exp.location && (
                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                <IconMapPin size={14} />
                                                {exp.location}
                                            </span>
                                        )}
                                    </div>
                                    {exp.description && (
                                        <p className="text-base text-muted-foreground/80 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Skills */}
                {skills.length > 0 && (
                    <section className="mb-20">
                        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-8 font-medium">
                            Skills & Technologies
                        </h2>
                        <div className="space-y-6">
                            {Object.entries(
                                skills.reduce((acc: any, skill: any) => {
                                    const category = skill.category || "other";
                                    if (!acc[category]) acc[category] = [];
                                    acc[category].push(skill);
                                    return acc;
                                }, {}),
                            ).map(
                                ([category, categorySkills]: [string, any]) => (
                                    <div key={category}>
                                        <h3 className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-3 font-medium">
                                            {category.replace("_", " ")}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {categorySkills.map(
                                                (skill: any) => (
                                                    <span
                                                        key={skill.id}
                                                        className="px-3 py-1.5 bg-muted/30 text-foreground/90 rounded text-sm"
                                                        title={
                                                            skill.description ||
                                                            undefined
                                                        }
                                                    >
                                                        {skill.name}
                                                        {skill.years_of_experience && (
                                                            <span className="text-muted-foreground ml-1">
                                                                (
                                                                {
                                                                    skill.years_of_experience
                                                                }
                                                                y)
                                                            </span>
                                                        )}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
