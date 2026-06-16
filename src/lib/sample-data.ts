/**
 * Sample Data for Template Previews
 *
 * A realistic mock portfolio used by /preview/[template] so visitors
 * can see a fully populated template without needing a real site.
 *
 * Shape must match the API response from getSite().
 */

export const SAMPLE_DATA = {
    // ── Site ──────────────────────────────────────────────────────────────────
    title: "Alex Rivera",
    tagline: "Senior Full-Stack Engineer · Building products people love",
    description:
        "I design and ship full-stack web applications — from zero-to-one SaaS products to large-scale distributed systems. Currently focused on developer tools, AI-powered workflows, and everything that makes engineers faster.",
    template: "default",
    theme: "default",
    font: "outfit",

    // ── User ──────────────────────────────────────────────────────────────────
    user: {
        email: "alex@example.com",
        first_name: "Alex",
        last_name: "Rivera",
    },

    // ── Social links ──────────────────────────────────────────────────────────
    social_links: [
        { id: 1, platform: "github", url: "https://github.com" },
        { id: 2, platform: "linkedin", url: "https://linkedin.com" },
        { id: 3, platform: "twitter", url: "https://twitter.com" },
    ],

    // ── Projects ──────────────────────────────────────────────────────────────
    projects: [
        {
            id: 1,
            slug: "limefolio",
            title: "Limefolio",
            tagline: "The portfolio platform for developers",
            description:
                "A multi-tenant SaaS platform that lets developers spin up a beautiful, SEO-optimised portfolio site in under 3 minutes. Supports custom domains, multiple templates, and AI-assisted bio writing.",
            featured: true,
            technologies: ["Next.js", "Django", "PostgreSQL", "Cloudflare R2"],
            project_url: "https://limefolio.com",
            github_url: "https://github.com",
        },
        {
            id: 2,
            slug: "devflow",
            title: "DevFlow",
            tagline: "AI-native pull request reviewer",
            description:
                "An AI code review tool that integrates with GitHub to automatically surface security issues, performance bottlenecks, and style violations — giving actionable feedback before human review even begins.",
            featured: true,
            technologies: ["Python", "FastAPI", "OpenAI", "GitHub Apps"],
            project_url: "https://devflow.example.com",
            github_url: "https://github.com",
        },
        {
            id: 3,
            slug: "runbook",
            title: "Runbook",
            tagline: "Collaborative incident management",
            description:
                "A real-time incident management dashboard for on-call engineers. Live timeline, multi-user editing, Slack integration, and automatic post-mortem generation.",
            featured: true,
            technologies: ["React", "Node.js", "WebSockets", "Redis"],
            project_url: null,
            github_url: "https://github.com",
        },
        {
            id: 4,
            slug: "pgviz",
            title: "PGViz",
            tagline: "Visual query planner for PostgreSQL",
            description:
                "A browser-based EXPLAIN ANALYZE visualiser that turns dense query plans into interactive tree diagrams with bottleneck highlighting.",
            featured: false,
            technologies: ["TypeScript", "D3.js", "PostgreSQL"],
            project_url: null,
            github_url: "https://github.com",
        },
    ],

    // ── Experience ────────────────────────────────────────────────────────────
    experiences: [
        {
            id: 1,
            position: "Senior Software Engineer",
            company: "Vercel",
            location: "Remote",
            type: "Full-time",
            start_date: "2022-06-01",
            end_date: null,
            is_current: true,
            description:
                "Leading feature development on the Edge Network team. Designed the re-architected cold-start pipeline that cut function startup latency by 42 %. Mentoring three junior engineers and driving quarterly architecture reviews.",
        },
        {
            id: 2,
            position: "Full-Stack Engineer",
            company: "Notion",
            location: "San Francisco, CA",
            type: "Full-time",
            start_date: "2020-03-01",
            end_date: "2022-05-31",
            is_current: false,
            description:
                "Built the API integrations layer (200+ third-party connectors) and co-designed Notion's public REST API. Shipped the import pipeline that onboarded 1 M+ users from Confluence.",
        },
    ],

    // ── Skills ────────────────────────────────────────────────────────────────
    skills: [
        {
            id: 1,
            name: "TypeScript",
            category: "languages",
            is_featured: true,
            years_of_experience: 6,
        },
        {
            id: 2,
            name: "Python",
            category: "languages",
            is_featured: true,
            years_of_experience: 8,
        },
        {
            id: 3,
            name: "Go",
            category: "languages",
            is_featured: false,
            years_of_experience: 2,
        },
        {
            id: 4,
            name: "Next.js",
            category: "frameworks",
            is_featured: true,
            years_of_experience: 5,
        },
        {
            id: 5,
            name: "React",
            category: "frameworks",
            is_featured: true,
            years_of_experience: 7,
        },
        {
            id: 6,
            name: "Django",
            category: "frameworks",
            is_featured: true,
            years_of_experience: 6,
        },
        {
            id: 7,
            name: "FastAPI",
            category: "frameworks",
            is_featured: false,
            years_of_experience: 3,
        },
        {
            id: 8,
            name: "PostgreSQL",
            category: "databases",
            is_featured: true,
            years_of_experience: 7,
        },
        {
            id: 9,
            name: "Redis",
            category: "databases",
            is_featured: false,
            years_of_experience: 4,
        },
        {
            id: 10,
            name: "AWS",
            category: "cloud",
            is_featured: false,
            years_of_experience: 5,
        },
        {
            id: 11,
            name: "Docker",
            category: "devops",
            is_featured: false,
            years_of_experience: 5,
        },
        {
            id: 12,
            name: "Kubernetes",
            category: "devops",
            is_featured: false,
            years_of_experience: 3,
        },
    ],
};
