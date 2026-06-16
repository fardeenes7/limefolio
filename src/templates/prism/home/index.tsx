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
    IconStar,
} from "@tabler/icons-react";
import ProjectsSection from "./projects";
import { GradientText } from "../components/gradient-text";

/**
 * Prism Template — Home Page
 *
 * Design language: Stripe-inspired dark canvas with explosive colour.
 *  • Animated mesh-gradient hero with multiple floating orbs
 *  • Gradient text headings
 *  • Glass-morphism "frosted" cards with coloured border glows
 *  • Horizontal scrolling tech-pill strip
 *  • Timeline with gradient connector line
 *  • Full-width prismatic CTA band
 */

const socialIcons: Record<string, any> = {
    github: IconBrandGithub,
    linkedin: IconBrandLinkedin,
    twitter: IconBrandTwitter,
    medium: IconBrandMedium,
    stackoverflow: IconBrandStackoverflow,
};

// ── palette helpers ────────────────────────────────────────────────────────────

// ── helpers ────────────────────────────────────────────────────────────────────

function formatYear(dateStr: string | undefined) {
    if (!dateStr) return "";
    try {
        return new Date(dateStr).getFullYear();
    } catch {
        return "";
    }
}

// ── sections ──────────────────────────────────────────────────────────────────

function HeroSection({ data, socialLinks }: { data: any; socialLinks: any[] }) {
    return (
        <section className="relative min-h-[90vh] overflow-hidden flex items-center z-0">
            {/* Mesh gradient orbs */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className="absolute -left-40 top-0 h-[700px] w-[700px] rounded-full blur-[120px]"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full blur-[120px]"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(168,85,247,0.20) 0%, transparent 70%)",
                    }}
                />
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full blur-[100px]"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
                    }}
                />
                {/* Grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="mx-auto w-full max-w-6xl px-6 py-20">
                {/* Status badge */}
                {data?.available_for_hire && (
                    <div
                        className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
                        style={{
                            background: "rgba(99,102,241,0.12)",
                            border: "1px solid rgba(99,102,241,0.3)",
                            color: "#818cf8",
                        }}
                    >
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#818cf8]" />
                        Available for new opportunities
                    </div>
                )}

                {/* Headline */}
                <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
                    {data?.title || "Your Name"}
                </h1>

                {data?.tagline && (
                    <p className="mb-6 max-w-2xl text-xl font-light text-muted-foreground sm:text-2xl">
                        <GradientText>{data.tagline}</GradientText>
                    </p>
                )}

                {data?.description && (
                    <p className="mb-12 max-w-xl text-base leading-relaxed text-muted-foreground">
                        {data.description}
                    </p>
                )}

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                    <a
                        href="#projects"
                        className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105"
                        style={{
                            background:
                                "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                            boxShadow: "0 0 30px rgba(99,102,241,0.4)",
                        }}
                    >
                        View My Work
                        <IconArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-0.5"
                        />
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-foreground/5 px-7 py-3.5 text-sm font-semibold text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
                    >
                        Get In Touch
                    </a>
                </div>

                {/* Socials */}
                {socialLinks.length > 0 && (
                    <div className="mt-12 flex gap-3">
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
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 border border-border/40 text-muted-foreground transition-all hover:text-foreground hover:scale-110"
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

function ExperienceSection({ experiences }: { experiences: any[] }) {
    if (!experiences.length) return null;

    return (
        <section id="experience" className="relative py-28">
            {/* Subtle background orb */}
            <div
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[140px] -z-10"
                style={{
                    background:
                        "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
                }}
            />

            <div className="mx-auto max-w-6xl px-6">
                <p
                    className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: "#a855f7" }}
                >
                    Career
                </p>
                <h2 className="mb-14 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    <GradientText>Experience</GradientText>
                </h2>

                <div className="relative space-y-4">
                    {/* Gradient vertical line */}
                    <div
                        className="absolute left-[19px] top-0 hidden h-full w-px sm:block"
                        style={{
                            background:
                                "linear-gradient(to bottom, #6366f1, #a855f7, #ec4899)",
                        }}
                    />

                    {experiences.map((exp: any, idx: number) => (
                        <div
                            key={exp.id ?? idx}
                            className="relative flex gap-6 pb-4"
                        >
                            {/* Timeline dot */}
                            <div className="relative mt-5 hidden shrink-0 sm:block">
                                <span
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #6366f1, #a855f7)",
                                        boxShadow:
                                            "0 0 20px rgba(99,102,241,0.4)",
                                    }}
                                >
                                    <IconBriefcase size={16} />
                                </span>
                            </div>

                            <div className="flex-1 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 bg-foreground/5 border border-border/40">
                                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">
                                            {exp.position}
                                        </h3>
                                        <p
                                            className="font-semibold"
                                            style={{
                                                background:
                                                    "linear-gradient(90deg, #818cf8, #c084fc)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor:
                                                    "transparent",
                                            }}
                                        >
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1">
                                            <IconCalendar size={12} />
                                            {formatYear(exp.start_date)} –{" "}
                                            {exp.is_current
                                                ? "Present"
                                                : formatYear(exp.end_date)}
                                        </span>
                                        {exp.location && (
                                            <span className="inline-flex items-center gap-1">
                                                <IconMapPin size={12} />
                                                {exp.location}
                                            </span>
                                        )}
                                        {exp.type && (
                                            <span
                                                className="rounded-full px-2 py-0.5 text-xs font-medium"
                                                style={{
                                                    background:
                                                        "rgba(99,102,241,0.15)",
                                                    color: "#818cf8",
                                                    border: "1px solid rgba(99,102,241,0.25)",
                                                }}
                                            >
                                                {exp.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {exp.description && (
                                    <p className="text-sm leading-relaxed text-muted-foreground">
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
        devops: "DevOps & Cloud",
        design: "Design",
        soft_skill: "Soft Skills",
        language: "Languages",
        tool: "Tools",
        other: "Other",
    };

    const categoryColors = [
        { accent: "#818cf8" },
        { accent: "#22d3ee" },
        { accent: "#f472b6" },
        { accent: "#34d399" },
        { accent: "#fbbf24" },
    ];

    return (
        <section id="skills" className="relative py-28">
            {/* Orb */}
            <div
                className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full blur-[130px] -z-10"
                style={{
                    background:
                        "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
                }}
            />

            <div className="mx-auto max-w-6xl px-6">
                <p
                    className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: "#f472b6" }}
                >
                    Expertise
                </p>
                <h2 className="mb-14 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    Skills & <GradientText>Technologies</GradientText>
                </h2>

                <div className="space-y-10">
                    {Object.entries(grouped).map(
                        ([cat, catSkills]: [string, any], catIdx) => {
                            const col =
                                categoryColors[catIdx % categoryColors.length];
                            return (
                                <div key={cat}>
                                    <div className="mb-4 flex items-center gap-3">
                                        <IconCode
                                            size={14}
                                            style={{ color: col.accent }}
                                        />
                                        <span
                                            className="text-xs font-bold uppercase tracking-[0.15em]"
                                            style={{ color: col.accent }}
                                        >
                                            {categoryLabel[cat] ?? cat}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {catSkills.map(
                                            (skill: any, i: number) => (
                                                <span
                                                    key={skill.id}
                                                    title={
                                                        skill.description ||
                                                        undefined
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 bg-foreground/5 border border-border/40"
                                                >
                                                    {skill.name}
                                                    {skill.proficiency ===
                                                        "expert" && (
                                                        <IconSparkles
                                                            size={11}
                                                            style={{
                                                                color: col.accent,
                                                            }}
                                                        />
                                                    )}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
        </section>
    );
}

function ContactSection({ data }: { data: any }) {
    return (
        <section id="contact" className="relative overflow-hidden py-32 z-0">
            {/* Multi-color glow backdrop */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.20) 40%, rgba(236,72,153,0.15) 100%)",
                    }}
                />
                <div
                    className="absolute -left-32 -top-32 h-80 w-80 rounded-full blur-3xl"
                    style={{ background: "rgba(236,72,153,0.2)" }}
                />
                <div
                    className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full blur-3xl"
                    style={{ background: "rgba(168,85,247,0.2)" }}
                />
                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div
                className="relative mx-auto max-w-6xl rounded-3xl px-8 py-20 text-center bg-foreground/5 border border-border/40"
                style={{
                    backdropFilter: "blur(24px)",
                }}
            >
                <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    Let&apos;s build something{" "}
                    <GradientText>remarkable</GradientText>
                </h2>
                <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground">
                    Have a project in mind? I&apos;d love to hear about it.
                    Reach out and let&apos;s talk.
                </p>
                <a
                    href={`mailto:${data?.user?.email || "hello@example.com"}`}
                    className="inline-flex items-center gap-2.5 rounded-full px-10 py-4 text-base font-semibold text-primary-foreground transition-all hover:scale-105"
                    style={{
                        background:
                            "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                        boxShadow: "0 0 50px rgba(99,102,241,0.5)",
                    }}
                >
                    <IconMail size={20} />
                    Send Me an Email
                </a>
            </div>
        </section>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PrismHome({ data }: PageProps) {
    const projects = data?.projects || [];
    const experiences = data?.experiences || [];
    const skills = data?.skills || [];
    const socialLinks = data?.social_links || [];

    return (
        <div className="min-h-screen antialiased">
            <HeroSection data={data} socialLinks={socialLinks} />
            <ProjectsSection projects={projects} />
            <ExperienceSection experiences={experiences} />
            <SkillsSection skills={skills} />
            <ContactSection data={data} />
        </div>
    );
}
