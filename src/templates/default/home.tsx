import { PageProps } from "@/lib/template-types";
import Link from "next/link";
import {
    IconArrowRight,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconBrandMedium,
    IconBrandStackoverflow,
    IconExternalLink,
    IconCode,
    IconRocket,
} from "@tabler/icons-react";

// Social icon mapping
const socialIconsMap: Record<string, any> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
    medium: IconBrandMedium,
    stackoverflow: IconBrandStackoverflow,
};

/**
 * Default Theme - Home Page Component
 * Modern, card-based design with gradient accents
 */

const socialIcons = socialIconsMap;

export default function DefaultHome({ data }: PageProps) {
    let featuredProjects: any[] = [];

    if (data?.projects.length > 1) {
        const featured = data?.projects.filter((p: any) => p.featured);
        featuredProjects = featured.length
            ? featured
            : data?.projects.slice(0, 3);
    }
    const recentExperience = data?.experiences?.[0];
    const socialLinks = data?.social_links || [];
    const featuredSkills =
        data?.skills?.filter((s: any) => s.is_featured).slice(0, 6) || [];

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="container mx-auto px-6 py-20 sm:py-64 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <IconRocket size={16} />
                            <span>Available for opportunities</span>
                        </div> */}

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                            {data?.title || "Welcome to My Portfolio"}
                        </h1>

                        {data?.tagline && (
                            <p className="text-xl sm:text-2xl text-muted-foreground mb-6 font-light">
                                {data.tagline}
                            </p>
                        )}

                        {data?.description && (
                            <p className="text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                                {data.description}
                            </p>
                        )}

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                View My Work
                                <IconArrowRight size={20} />
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-border bg-background text-foreground font-semibold hover:bg-accent transition-all"
                            >
                                Get In Touch
                            </a>
                        </div>

                        {/* Social Links */}
                        {socialLinks.length > 0 && (
                            <div className="flex gap-4 justify-center">
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
                                            className="p-3 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                                            aria-label={link.platform}
                                        >
                                            <Icon size={20} />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Skills */}
            {featuredSkills.length > 0 && (
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center gap-3 justify-center mb-8">
                                <IconCode className="text-primary" size={24} />
                                <h2 className="text-2xl font-bold text-foreground">
                                    Core Technologies
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {featuredSkills.map((skill: any) => (
                                    <div
                                        key={skill.id}
                                        className="px-6 py-3 rounded-full bg-background border border-border shadow-sm hover:shadow-md transition-all hover:scale-105"
                                    >
                                        <span className="font-semibold text-foreground">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section id="projects" className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                    Featured Projects
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    Some of my recent work
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {featuredProjects.map((project: any) => (
                                    <Link
                                        key={project.id}
                                        href={`/projects/${project.slug}`}
                                        className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {/* Project Thumbnail */}
                                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                            {project.thumbnail ? (
                                                <img
                                                    src={project.thumbnail}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-primary/5">
                                                    <IconRocket
                                                        className="text-primary/20"
                                                        size={48}
                                                    />
                                                </div>
                                            )}
                                            {/* Featured tag */}
                                            {project.featured && (
                                                <div className="absolute top-3 left-3 z-10">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground shadow-lg">
                                                        FEATURED
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-1 flex-col">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                <IconArrowRight
                                                    size={20}
                                                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                                                />
                                            </div>

                                            {project.tagline && (
                                                <p className="text-sm text-muted-foreground mb-4">
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
                                                                        className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                                                                    >
                                                                        {tech}
                                                                    </span>
                                                                ),
                                                            )}
                                                        {project.technologies
                                                            .length > 3 && (
                                                            <span className="text-xs px-3 py-1 text-muted-foreground">
                                                                +
                                                                {project
                                                                    .technologies
                                                                    .length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                        </div>

                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </Link>
                                ))}
                            </div>

                            {data?.projects?.length > 3 && (
                                <div className="text-center mt-12">
                                    <Link
                                        href="/projects"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-border hover:border-primary text-foreground hover:text-primary font-semibold transition-all"
                                    >
                                        View All Projects
                                        <IconArrowRight size={20} />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Current Experience Highlight */}
            {recentExperience && (
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-foreground mb-2">
                                    Currently Working At
                                </h2>
                            </div>

                            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-1">
                                            {recentExperience.position}
                                        </h3>
                                        <p className="text-lg text-primary font-semibold">
                                            {recentExperience.company}
                                        </p>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                            {recentExperience.is_current
                                                ? "Current"
                                                : new Date(
                                                      recentExperience.end_date,
                                                  ).getFullYear()}
                                        </span>
                                    </div>
                                </div>

                                {recentExperience.description && (
                                    <p className="text-muted-foreground leading-relaxed">
                                        {
                                            recentExperience.description.split(
                                                "\n",
                                            )[0]
                                        }
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section id="contact" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            Let's Work Together
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Have a project in mind? I'd love to hear about it.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`mailto:${data?.user?.email || "contact@example.com"}`}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
                            >
                                Send Me an Email
                                <IconArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
