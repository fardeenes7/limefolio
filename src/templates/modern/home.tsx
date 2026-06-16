import { PageProps } from "@/lib/template-types";
import Link from "next/link";
import {
    IconArrowRight,
    IconArrowUpRight,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconBrandMedium,
    IconBrandStackoverflow,
    IconExternalLink,
    IconMapPin,
    IconCalendar,
    IconBriefcase,
    IconCode,
    IconSparkles,
    IconMail,
} from "@tabler/icons-react";

/**
 * Modern Template — Home Page
 *
 * Design language:
 *  • Full-bleed gradient hero (primary → accent) with bold centred copy
 *  • Floating sticky navbar
 *  • Bento-style project grid
 *  • Horizontal skills strip
 *  • Alternating experience timeline
 *  • Gradient CTA footer band
 */

const socialIcons: Record<string, any> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
    medium: IconBrandMedium,
    stackoverflow: IconBrandStackoverflow,
};

// ── helpers ──────────────────────────────────────────────────────────────────

function formatYear(dateStr: string | undefined) {
    if (!dateStr) return "";
    try {
        return new Date(dateStr).getFullYear();
    } catch {
        return "";
    }
}

// ── sub-components ────────────────────────────────────────────────────────────

function HeroSection({ data, socialLinks }: { data: any; socialLinks: any[] }) {
    return (
        <section className="relative overflow-hidden">
            {/* Gradient blob background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-primary/30 blur-3xl" />
                <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl" />
            </div>

            <div className="container mx-auto max-w-5xl px-6 pb-24 pt-20">
                {/* Eyebrow badge */}
                {data?.available_for_hire && (
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        <IconSparkles size={14} />
                        Available for opportunities
                    </div>
                )}

                <h1 className="mb-6 text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
                    {data?.title || "Your Name"}
                </h1>

                {data?.tagline && (
                    <p className="mb-6 max-w-2xl text-xl font-light text-muted-foreground sm:text-2xl">
                        {data.tagline}
                    </p>
                )}

                {data?.description && (
                    <p className="mb-10 max-w-xl leading-relaxed text-muted-foreground/80">
                        {data.description}
                    </p>
                )}

                {/* CTA row */}
                <div className="flex flex-wrap gap-4">
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50"
                    >
                        View My Work
                        <IconArrowRight size={18} />
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3 font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-accent/10"
                    >
                        Get In Touch
                    </a>
                </div>

                {/* Social icons */}
                {socialLinks.length > 0 && (
                    <div className="mt-10 flex gap-4">
                        {socialLinks.map((link: any) => {
                            const Icon =
                                socialIcons[link.platform] || IconExternalLink;
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.platform}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                                >
                                    <Icon size={18} />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

function ProjectsSection({ projects }: { projects: any[] }) {
    if (!projects.length) return null;

    // Featured projects get big cards, rest get small ones
    const featured = projects.filter((p) => p.featured);
    const displayed = featured.length ? featured : projects.slice(0, 6);
    const hero = displayed[0];
    const rest = displayed.slice(1, 5);
    const hasMore = projects.length > displayed.length;

    return (
        <section id="projects" className="py-24">
            <div className="container mx-auto max-w-5xl px-6">
                {/* Section header */}
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                            Work
                        </p>
                        <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
                            Featured Projects
                        </h2>
                    </div>
                    {hasMore && (
                        <Link
                            href="/projects"
                            className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
                        >
                            All projects
                            <IconArrowRight size={16} />
                        </Link>
                    )}
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Hero card — spans 2 cols on large */}
                    <Link
                        href={`/projects/${hero.slug}`}
                        className="group relative col-span-1 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 lg:col-span-2"
                    >
                        <div className="flex h-full flex-col md:flex-row">
                            {/* Hero Card Image */}
                            <div className="relative aspect-video w-full overflow-hidden bg-muted md:aspect-auto md:w-1/2">
                                {hero.thumbnail ? (
                                    <img
                                        src={hero.thumbnail}
                                        alt={hero.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
                                        <IconSparkles
                                            className="text-primary/20"
                                            size={48}
                                        />
                                    </div>
                                )}
                                <div className="absolute left-4 top-4 z-10">
                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
                                        <IconSparkles size={12} /> Featured
                                    </div>
                                </div>
                            </div>

                            {/* Hero Card Content */}
                            <div className="flex flex-1 flex-col p-8">
                                <h3 className="mb-3 text-2xl font-bold text-foreground transition-colors group-hover:text-primary lg:text-3xl">
                                    {hero.title}
                                </h3>
                                {hero.tagline && (
                                    <p className="mb-6 text-muted-foreground line-clamp-3">
                                        {hero.tagline}
                                    </p>
                                )}
                                {hero.technologies?.length > 0 && (
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {hero.technologies
                                            .slice(0, 5)
                                            .map((tech: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                    </div>
                                )}
                                {/* Arrow */}
                                <IconArrowUpRight
                                    size={20}
                                    className="absolute right-6 top-6 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary"
                                />
                                {/* Gradient hover shimmer */}
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                        </div>
                    </Link>

                    {/* Smaller cards */}
                    {rest.map((project: any) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                        >
                            {/* Small Card Image */}
                            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                {project.thumbnail ? (
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/5 to-accent/5">
                                        <IconSparkles
                                            className="text-primary/10"
                                            size={32}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                                    {project.title}
                                </h3>
                                {project.tagline && (
                                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                                        {project.tagline}
                                    </p>
                                )}
                                {project.technologies?.length > 0 && (
                                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                                        {project.technologies
                                            .slice(0, 3)
                                            .map((tech: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] text-muted-foreground"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                    </div>
                                )}
                                <IconArrowUpRight
                                    size={18}
                                    className="absolute right-4 top-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                        </Link>
                    ))}
                </div>

                {hasMore && (
                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                            View all projects
                            <IconArrowRight size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

function ExperienceSection({ experiences }: { experiences: any[] }) {
    if (!experiences.length) return null;

    return (
        <section id="experience" className="relative py-24">
            {/* Subtle bg stripe */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-muted/0 via-muted/30 to-muted/0" />

            <div className="container mx-auto max-w-5xl px-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                    Career
                </p>
                <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-foreground">
                    Experience
                </h2>

                <div className="relative space-y-0">
                    {/* Vertical line */}
                    <div className="absolute left-[19px] top-0 hidden h-full w-px bg-border sm:block" />

                    {experiences.map((exp: any, idx: number) => (
                        <div
                            key={exp.id ?? idx}
                            className="relative flex gap-6 pb-12 last:pb-0"
                        >
                            {/* Timeline dot */}
                            <div className="relative mt-1 hidden shrink-0 sm:block">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-background text-primary shadow-sm shadow-primary/10">
                                    <IconBriefcase size={16} />
                                </span>
                            </div>

                            {/* Card */}
                            <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">
                                            {exp.position}
                                        </h3>
                                        <p className="font-semibold text-primary">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1">
                                            <IconCalendar size={13} />
                                            {formatYear(exp.start_date)} —{" "}
                                            {exp.is_current
                                                ? "Present"
                                                : formatYear(exp.end_date)}
                                        </span>
                                        {exp.location && (
                                            <span className="inline-flex items-center gap-1">
                                                <IconMapPin size={13} />
                                                {exp.location}
                                            </span>
                                        )}
                                        {exp.type && (
                                            <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                                                {exp.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {exp.description && (
                                    <p className="leading-relaxed text-muted-foreground/80 whitespace-pre-line">
                                        {exp.description.split("\n")[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SkillsSection({ skills }: { skills: any[] }) {
    if (!skills.length) return null;

    const grouped = skills.reduce((acc: any, skill: any) => {
        const cat = skill.category || "other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    const categoryLabel: Record<string, string> = {
        programming: "Programming",
        framework: "Frameworks",
        database: "Databases",
        devops: "DevOps",
        design: "Design",
        soft_skill: "Soft Skills",
        language: "Languages",
        tool: "Tools",
        other: "Other",
    };

    return (
        <section id="skills" className="py-24">
            <div className="container mx-auto max-w-5xl px-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                    Expertise
                </p>
                <h2 className="mb-12 text-4xl font-extrabold tracking-tight text-foreground">
                    Skills &amp; Technologies
                </h2>

                <div className="space-y-8">
                    {Object.entries(grouped).map(
                        ([cat, catSkills]: [string, any]) => (
                            <div key={cat}>
                                <div className="mb-4 flex items-center gap-3">
                                    <IconCode
                                        size={16}
                                        className="text-primary"
                                    />
                                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        {categoryLabel[cat] ?? cat}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {catSkills.map((skill: any) => (
                                        <span
                                            key={skill.id}
                                            title={
                                                skill.description || undefined
                                            }
                                            className="group inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
                                        >
                                            {skill.name}
                                            {skill.proficiency === "expert" && (
                                                <IconSparkles
                                                    size={12}
                                                    className="text-primary"
                                                />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}

function ContactSection({ data }: { data: any }) {
    return (
        <section id="contact" className="relative overflow-hidden py-24">
            {/* Full-bleed gradient band */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-primary via-primary/80 to-accent opacity-90" />
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-foreground/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-foreground/10 blur-3xl" />

            <div className="container mx-auto max-w-3xl px-6 text-center">
                <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    Let&apos;s build something great
                </h2>
                <p className="mb-10 text-lg text-foreground/80">
                    Have a project in mind? I&apos;d love to hear about it.
                    Reach out and let&apos;s talk.
                </p>
                <a
                    href={`mailto:${data?.user?.email}`}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/40 bg-primary-foreground px-8 py-3.5 font-semibold text-primary shadow-xl shadow-black/20 transition-all hover:scale-105"
                >
                    <IconMail size={20} />
                    Send Me an Email
                </a>
            </div>
        </section>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ModernHome({ data }: PageProps) {
    const projects = data?.projects || [];
    const experiences = data?.experiences || [];
    const skills = data?.skills || [];
    const socialLinks = data?.social_links || [];
    const title = data?.title || "Portfolio";

    return (
        <div className="min-h-screen bg-background text-foreground antialiased">
            {/* Hero */}
            <HeroSection data={data} socialLinks={socialLinks} />

            {/* Projects */}
            <ProjectsSection projects={projects} />

            {/* Experience */}
            <ExperienceSection experiences={experiences} />

            {/* Skills */}
            <SkillsSection skills={skills} />

            {/* Contact CTA */}
            <ContactSection data={data} />
        </div>
    );
}
