import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    IconExternalLink,
    IconLayoutGrid,
    IconArrowRight,
} from "@tabler/icons-react";
import { TEMPLATES_META } from "@/lib/templates-meta";

export const metadata: Metadata = {
    title: "Templates",
    description:
        "Browse Limefolio's portfolio templates. Preview each one live with real sample content and choose the design that fits your style.",
};

const PREVIEW_BASE_URL =
    process.env.NEXT_PUBLIC_PREVIEW_URL ?? "http://preview.localhost:3001";

// Distinct accent colours per template for the card header strip
const ACCENT: Record<string, string> = {
    default: "from-primary/20 via-primary/10 to-transparent",
    minimal: "from-muted via-muted/50 to-transparent",
    modern: "from-violet-500/20 via-violet-500/10 to-transparent",
};

export default function TemplatesPage() {
    return (
        <div className="py-16 md:py-24">
            <div className="container px-6 mx-auto max-w-6xl">
                {/* ── Header ── */}
                <div className="mb-14 space-y-4 max-w-xl">
                    <Badge variant="secondary" className="gap-1.5">
                        <IconLayoutGrid className="size-3" />
                        Templates
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Pick your style
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Every template is fully customisable — swap colours,
                        fonts, and content at any time. Click{" "}
                        <span className="font-medium text-foreground">
                            Preview
                        </span>{" "}
                        to see a live demo with realistic sample data.
                    </p>
                </div>

                <Separator className="mb-14" />

                {/* ── Grid ── */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {TEMPLATES_META.map((tmpl) => {
                        const accent = ACCENT[tmpl.slug] ?? ACCENT.default;
                        const previewUrl = `${PREVIEW_BASE_URL}?template=${tmpl.slug}`;

                        return (
                            <Card
                                key={tmpl.slug}
                                className="group relative flex flex-col overflow-hidden border border-border transition-shadow duration-300 hover:shadow-lg pt-0"
                            >
                                {/* Colour strip */}
                                <div
                                    className={`h-auto aspect-video w-full bg-linear-to-br ${accent} flex items-center justify-center`}
                                >
                                    <span className="text-4xl font-black tracking-tight text-foreground/10 select-none uppercase">
                                        {tmpl.name}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="flex flex-1 flex-col gap-4 px-6">
                                    <div className="space-y-1.5">
                                        <h2 className="text-lg font-semibold text-foreground">
                                            {tmpl.name}
                                        </h2>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {tmpl.description}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {tmpl.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="text-xs font-normal"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-auto flex gap-2 pt-2">
                                        <Link
                                            href={previewUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 gap-1.5"
                                            >
                                                <IconExternalLink className="size-3.5" />
                                                Preview
                                            </Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button
                                                size="sm"
                                                className="flex-1 gap-1.5"
                                            >
                                                Use this
                                                <IconArrowRight className="size-3.5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* ── Footer note ── */}
                <p className="mt-16 text-center text-sm text-muted-foreground">
                    More templates are on the way.{" "}
                    <a
                        href="mailto:hello@limefolio.com"
                        className="font-medium text-primary hover:underline"
                    >
                        Request a design
                    </a>{" "}
                    or{" "}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                    >
                        contribute one
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
