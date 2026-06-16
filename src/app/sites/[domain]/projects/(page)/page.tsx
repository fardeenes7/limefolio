import { notFound } from "next/navigation";
import getSite, { getProjects } from "@/lib/api";
import { getTemplate } from "@/templates";
import Link from "next/link";
import { IconArrowLeft, IconSparkles } from "@tabler/icons-react";
import ProjectCard from "./card";

interface ProjectsPageProps {
    params: Promise<{ domain: string }>;
    searchParams: Promise<{ template?: string }>;
}

export default async function ProjectsPage({
    params,
    searchParams,
}: ProjectsPageProps) {
    const { domain } = await params;
    const { template: templateOverride } = await searchParams;

    const [siteData, projects] = await Promise.all([
        getSite(domain),
        getProjects(domain),
    ]);

    if (!siteData || siteData.error) return notFound();

    const templateSlug =
        domain === "preview" && templateOverride
            ? templateOverride
            : siteData.template;

    // Get brand colours from the active template for consistent accent styling
    const _ = getTemplate(templateSlug); // type-check only; unused here

    return (
        <AllProjectsPage
            siteData={siteData}
            projects={projects}
            templateSlug={templateSlug}
        />
    );
}

// ── View ─────────────────────────────────────────────────────────────────────

function AllProjectsPage({
    siteData,
    projects,
    templateSlug,
}: {
    siteData: any;
    projects: any[];
    templateSlug: string;
}) {
    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);

    return (
        <div className="min-h-screen bg-background text-foreground antialiased">
            {/* ── Page header ───────────────────────────────────────────── */}
            <div className="border-b border-border bg-muted/30">
                <div className="container mx-auto max-w-5xl px-6 py-10">
                    <Link
                        href="/"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <IconArrowLeft size={15} />
                        Back to Portfolio
                    </Link>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
                        All Projects
                    </h1>
                    <p className="text-muted-foreground">
                        {projects.length} project{projects.length !== 1 && "s"}{" "}
                        · {siteData.title}
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-6 py-14 space-y-16">
                {/* Featured */}
                {featured.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-8">
                            <IconSparkles size={16} className="text-primary" />
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
                                Featured
                            </h2>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {featured.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Other projects */}
                {others.length > 0 && (
                    <section>
                        {featured.length > 0 && (
                            <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                Other Projects
                            </h2>
                        )}
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {others.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {projects.length === 0 && (
                    <div className="py-24 text-center text-muted-foreground">
                        No projects yet.
                    </div>
                )}
            </div>
        </div>
    );
}
