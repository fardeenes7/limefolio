"use client";

import Link from "next/link";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import {
    IconBriefcase,
    IconArticle,
    IconCode,
    IconActivity,
    IconLink,
    IconEye,
    IconPlus,
    IconWorld,
    IconSettings,
    IconCheck,
    IconX,
    IconAlertTriangle,
    IconExternalLink,
    IconArrowRight,
    IconPhoto,
    IconSparkles,
    IconTrendingUp,
    IconLayoutDashboard,
    IconChartBar,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardAction,
    CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { DashboardStats, AnalyticsOverview } from "@/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatShortDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatRelativeDate(iso: string) {
    const d = new Date(iso);
    const diffDays = Math.floor((Date.now() - d.getTime()) / 86_400_000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return formatShortDate(iso);
}

function StatusBadge({ status }: { status: "draft" | "published" | "archived" }) {
    return (
        <Badge
            variant={
                status === "published" ? "default"
                    : status === "draft" ? "outline"
                        : "muted"
            }
            className="capitalize shrink-0"
        >
            {status}
        </Badge>
    );
}

// ---------------------------------------------------------------------------
// Chart config
// ---------------------------------------------------------------------------
const miniChartConfig = {
    visits: { label: "Views", color: "var(--chart-1)" },
    unique_visitors: { label: "Visitors", color: "var(--chart-3)" },
} satisfies ChartConfig;

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------
interface StatCardProps {
    label: string;
    value: number;
    sub?: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    highlight?: boolean;
}

function StatCard({ label, value, sub, icon: Icon, href, highlight }: StatCardProps) {
    return (
        <Link href={href} className="group">
            <Card
                size="sm"
                className={cn(
                    "h-full transition-all duration-200 hover:ring-primary/30 hover:shadow-sm cursor-pointer",
                    highlight && "ring-primary/20 bg-primary/5"
                )}
            >
                <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                        <CardDescription className="text-xs font-medium">{label}</CardDescription>
                        <div className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10",
                            highlight && "bg-primary/10"
                        )}>
                            <Icon className={cn("size-3.5 text-muted-foreground transition-colors group-hover:text-primary", highlight && "text-primary")} />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tabular-nums leading-none">
                        {value.toLocaleString()}
                    </CardTitle>
                    {sub && <CardDescription className="text-xs leading-tight">{sub}</CardDescription>}
                </CardHeader>
            </Card>
        </Link>
    );
}

// ---------------------------------------------------------------------------
// Site Status Bar
// ---------------------------------------------------------------------------
function SiteStatusBar({ stats }: { stats: DashboardStats }) {
    const portfolioUrl = stats.verified_domain
        ? `https://${stats.verified_domain}`
        : `https://${stats.subdomain}.limefolio.com`;

    const domainLabel =
        stats.domain_status === "verified" ? stats.verified_domain
            : stats.domain_status === "pending" ? "Pending verification"
                : stats.domain_status === "failed" ? "Verification failed"
                    : `${stats.subdomain}.limefolio.com`;

    const domainColor =
        stats.domain_status === "verified" ? "text-primary"
            : stats.domain_status === "pending" ? "text-amber-500"
                : stats.domain_status === "failed" ? "text-destructive"
                    : "text-muted-foreground";

    return (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-border/60 bg-card px-4 py-3">
            <div className="flex items-center gap-2">
                <div className={cn(
                    "size-2 rounded-full",
                    stats.is_published ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                )} />
                <span className={cn("text-sm font-medium", !stats.is_published && "text-muted-foreground")}>
                    {stats.is_published ? "Live" : "Offline"}
                </span>
                {!stats.is_published && (
                    <Link href="/app/site">
                        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">Publish</Badge>
                    </Link>
                )}
            </div>

            <Separator orientation="vertical" className="h-3.5 hidden sm:block" />

            <div className="flex items-center gap-1.5">
                <IconWorld className="size-3.5 text-muted-foreground shrink-0" />
                <a href={portfolioUrl} target="_blank" rel="noopener noreferrer"
                    className={cn("text-sm hover:underline underline-offset-2 transition-colors", domainColor)}>
                    {domainLabel}
                </a>
                {stats.domain_status === "none" && (
                    <Link href="/app/site/domains">
                        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">Add domain</Badge>
                    </Link>
                )}
                {stats.domain_status === "pending" && (
                    <Link href="/app/site/domains">
                        <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-600 dark:text-amber-400">Pending</Badge>
                    </Link>
                )}
                {stats.domain_status === "failed" && (
                    <Link href="/app/site/domains">
                        <Badge variant="destructive" className="text-xs">Failed</Badge>
                    </Link>
                )}
            </div>

            <Separator orientation="vertical" className="h-3.5 hidden sm:block" />

            <div className="flex items-center gap-1.5">
                <div className={cn(
                    "size-1.5 rounded-full",
                    stats.available_for_hire ? "bg-primary" : "bg-muted-foreground/30"
                )} />
                <span className={cn("text-sm", stats.available_for_hire ? "text-primary font-medium" : "text-muted-foreground")}>
                    {stats.available_for_hire ? "Open to work" : "Not available"}
                </span>
                {!stats.available_for_hire && (
                    <Link href="/app/site">
                        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">Enable</Badge>
                    </Link>
                )}
            </div>

            <div className="ml-auto">
                <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                        <IconExternalLink data-icon="inline-start" />
                        View Portfolio
                    </Button>
                </a>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Contextual Tips
// ---------------------------------------------------------------------------
function ContextualTips({ stats }: { stats: DashboardStats }) {
    const tips: Array<{ condition: boolean; message: string; action: string; href: string; icon: React.ComponentType<{ className?: string }> }> = [
        {
            condition: stats.total_projects === 0,
            message: "Showcase your work by adding your first project.",
            action: "Add project",
            href: "/app/projects/new",
            icon: IconBriefcase,
        },
        {
            condition: stats.total_posts === 0,
            message: "Blog posts build your brand and attract recruiters.",
            action: "Write first post",
            href: "/app/posts/new",
            icon: IconArticle,
        },
        {
            condition: stats.total_social_links === 0,
            message: "Add your GitHub and LinkedIn so visitors can find you.",
            action: "Add social links",
            href: "/app/social-links",
            icon: IconLink,
        },
        {
            condition: !stats.available_for_hire && stats.completeness_score >= 50,
            message: 'Enable "Open to work" to signal recruiters you\'re available.',
            action: "Enable now",
            href: "/app/site",
            icon: IconTrendingUp,
        },
    ];

    const activeTips = tips.filter((t) => t.condition).slice(0, 2);
    if (activeTips.length === 0) return null;

    return (
        <div className="flex flex-col gap-2">
            {activeTips.map((tip, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-2.5">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                        <tip.icon className="size-3.5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <p className="flex-1 text-xs text-foreground/80">{tip.message}</p>
                    <Link href={tip.href}>
                        <Button size="sm" variant="outline" className="shrink-0 border-amber-500/30 h-7 text-xs px-2">
                            {tip.action}
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Mini Traffic Chart
// ---------------------------------------------------------------------------
function MiniTrafficChart({ overview }: { overview: AnalyticsOverview }) {
    const data = overview.data.map((d) => ({
        ...d,
        date: formatShortDate(d.date),
    }));

    const hasData = overview.total_visits > 0;

    // compute week-over-week change for headline
    const half = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, half).reduce((s, d) => s + d.visits, 0);
    const secondHalf = data.slice(half).reduce((s, d) => s + d.visits, 0);
    const trend = firstHalf === 0 ? null : Math.round(((secondHalf - firstHalf) / firstHalf) * 100);

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <IconChartBar className="size-4 text-muted-foreground" />
                        Traffic
                        <span className="text-xs font-normal text-muted-foreground">· last 7 days</span>
                    </CardTitle>
                    <div className="flex items-baseline gap-3 mt-1">
                        <span className="text-2xl font-bold tabular-nums">
                            {overview.total_visits.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">views</span>
                        <span className="text-sm text-muted-foreground">·</span>
                        <span className="text-2xl font-bold tabular-nums">
                            {overview.unique_visitors.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">visitors</span>
                        {trend !== null && (
                            <Badge
                                variant={trend >= 0 ? "default" : "destructive"}
                                className="text-xs ml-1"
                            >
                                {trend >= 0 ? "+" : ""}{trend}% vs prior week
                            </Badge>
                        )}
                    </div>
                </div>
                <CardAction>
                    <Link href="/app/analytics">
                        <Button variant="ghost" size="sm" className="text-xs">
                            Full analytics
                            <IconArrowRight className="size-3" />
                        </Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent className="flex-1 pt-0">
                {!hasData ? (
                    <div className="flex flex-col items-center justify-center gap-2 h-[140px] rounded-lg bg-muted/30 border border-dashed border-border">
                        <IconChartBar className="size-6 text-muted-foreground/40" />
                        <p className="text-xs text-muted-foreground text-center max-w-48 leading-relaxed">
                            No visits yet. Connect tracking to your public portfolio to see data here.
                        </p>
                        <Link href="/app/analytics">
                            <Button size="sm" variant="outline" className="text-xs h-7 mt-1">
                                Set up tracking
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <ChartContainer config={miniChartConfig} className="h-[140px] w-full">
                        <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: -32 }}>
                            <defs>
                                <linearGradient id="dash-gradVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} />
                                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="dash-gradUnique" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.15} />
                                    <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={6}
                                tick={{ fontSize: 10 }}
                            />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} allowDecimals={false} />
                            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                            <Area type="monotone" dataKey="visits" stroke="var(--chart-1)" strokeWidth={2}
                                fill="url(#dash-gradVisits)" dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
                            <Area type="monotone" dataKey="unique_visitors" stroke="var(--chart-3)" strokeWidth={1.5}
                                fill="url(#dash-gradUnique)" dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Top Content By Views
// ---------------------------------------------------------------------------
function TopContentCard({ stats }: { stats: DashboardStats }) {
    // Sort posts by view count descending
    const topPosts = [...stats.recent_posts]
        .sort((a, b) => b.view_count - a.view_count)
        .filter((p) => p.status === "published");

    const maxViews = topPosts[0]?.view_count ?? 1;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconEye className="size-4 text-muted-foreground" />
                    Top Posts by Views
                </CardTitle>
                <CardDescription>Your most-read published content</CardDescription>
                <CardAction>
                    <Link href="/app/posts">
                        <Button variant="ghost" size="sm" className="text-xs">
                            All posts
                            <IconArrowRight className="size-3" />
                        </Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                {topPosts.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                        <div className="flex size-10 items-center justify-center rounded-2xl bg-muted">
                            <IconArticle className="size-4 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-medium">No published posts yet</p>
                            <p className="text-xs text-muted-foreground">Publish your first post to track views here</p>
                        </div>
                        <Link href="/app/posts/new">
                            <Button size="sm">
                                <IconPlus data-icon="inline-start" />
                                Write a post
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-0.5">
                        {topPosts.map((post, i) => (
                            <Link
                                key={post.id}
                                href={`/app/posts/${post.id}/edit`}
                                className="group flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/50 transition-colors"
                            >
                                <span className="w-4 shrink-0 text-xs font-mono text-muted-foreground/60 text-right">{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium group-hover:text-primary transition-colors">
                                        {post.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden max-w-24">
                                            <div
                                                className="h-full rounded-full bg-primary/50 transition-all"
                                                style={{ width: `${Math.round((post.view_count / maxViews) * 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground tabular-nums">
                                            {post.view_count.toLocaleString()} views
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className="text-xs text-muted-foreground">{formatRelativeDate(post.updated_at)}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="border-t pt-4">
                <Link href="/app/posts/new" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                        <IconPlus data-icon="inline-start" />
                        Write New Post
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Profile Completeness
// ---------------------------------------------------------------------------
function CompletenessCard({ stats }: { stats: DashboardStats }) {
    const done = stats.completeness_items.filter((i) => i.done).length;
    const total = stats.completeness_items.length;
    const score = stats.completeness_score;

    const scoreColor = score >= 80 ? "text-primary" : score >= 50 ? "text-amber-500" : "text-destructive";
    const progressClass = score >= 80 ? "" : score >= 50 ? "[&>div]:bg-amber-500" : "[&>div]:bg-destructive";

    const pending = stats.completeness_items.filter((i) => !i.done);
    const completed = stats.completeness_items.filter((i) => i.done);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                        <IconSparkles className="size-3.5 text-primary" />
                        Profile Strength
                    </CardTitle>
                    <span className={cn("text-xl font-bold tabular-nums leading-none", scoreColor)}>
                        {score}%
                    </span>
                </div>
                <Progress value={score} className={cn("h-1.5", progressClass)} />
                <CardDescription className="text-xs">{done} of {total} complete</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-0.5">
                    {pending.map((item) => (
                        <Link key={item.key} href={item.url}
                            className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted transition-colors">
                            <div className="flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                                <IconX className="size-2.5 text-muted-foreground/50" />
                            </div>
                            <span className="flex-1 truncate text-xs">{item.label}</span>
                            <IconArrowRight className="size-3 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                    {pending.length > 0 && completed.length > 0 && <Separator className="my-1" />}
                    {completed.map((item) => (
                        <div key={item.key} className="flex items-center gap-2 px-2 py-1.5">
                            <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15">
                                <IconCheck className="size-2.5 text-primary" />
                            </div>
                            <span className="flex-1 truncate text-xs text-muted-foreground line-through opacity-50">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Dashboard Skeleton
// ---------------------------------------------------------------------------
export function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-5">
            <Skeleton className="h-12 w-full rounded-xl" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-xl" />
                ))}
            </div>
            <div className="grid gap-5 lg:grid-cols-5">
                <div className="lg:col-span-3"><Skeleton className="h-64 rounded-xl" /></div>
                <div className="lg:col-span-2"><Skeleton className="h-64 rounded-xl" /></div>
            </div>
            <div className="grid gap-5 lg:grid-cols-5">
                <div className="lg:col-span-3"><Skeleton className="h-56 rounded-xl" /></div>
                <div className="lg:col-span-2"><Skeleton className="h-56 rounded-xl" /></div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main DashboardContent
// ---------------------------------------------------------------------------
export function DashboardContent({
    stats,
    overview,
}: {
    stats: DashboardStats | null;
    overview: AnalyticsOverview | null;
}) {
    if (!stats) {
        return (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
                <IconAlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-destructive">Unable to load dashboard</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Could not connect to the API. Make sure the server is running.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {/* Site status bar */}
            <SiteStatusBar stats={stats} />

            {/* Contextual tips */}
            <ContextualTips stats={stats} />

            {/* KPI stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                <StatCard label="Projects" value={stats.total_projects}
                    sub={`${stats.published_projects} published`} icon={IconBriefcase} href="/app/projects" />
                <StatCard label="Blog Posts" value={stats.total_posts}
                    sub={`${stats.published_posts} live · ${stats.draft_posts} draft`} icon={IconArticle} href="/app/posts" />
                <StatCard label="Post Views" value={stats.total_post_views}
                    sub="across all posts" icon={IconEye} href="/app/analytics" highlight={stats.total_post_views > 0} />
                <StatCard label="Skills" value={stats.total_skills} icon={IconCode} href="/app/skills" />
                <StatCard label="Experience" value={stats.total_experiences} icon={IconActivity} href="/app/experiences" />
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground mr-1">Quick add:</span>
                <Link href="/app/projects/new">
                    <Button size="sm">
                        <IconPlus data-icon="inline-start" />
                        Project
                    </Button>
                </Link>
                <Link href="/app/posts/new">
                    <Button size="sm" variant="secondary">
                        <IconPlus data-icon="inline-start" />
                        Blog Post
                    </Button>
                </Link>
                <Separator orientation="vertical" className="h-5" />
                <Link href="/app/site">
                    <Button size="sm" variant="outline">
                        <IconSettings data-icon="inline-start" />
                        Site Settings
                    </Button>
                </Link>
                <Link href="/app/media">
                    <Button size="sm" variant="ghost">
                        <IconPhoto data-icon="inline-start" />
                        Media
                    </Button>
                </Link>
                <Link href="/app/analytics">
                    <Button size="sm" variant="ghost">
                        <IconLayoutDashboard data-icon="inline-start" />
                        Analytics
                    </Button>
                </Link>
            </div>

            {/* Analytics row: mini traffic chart + top content + completeness */}
            <div className="grid gap-5 lg:grid-cols-5">
                {/* Mini traffic chart — takes 3 cols */}
                <div className="lg:col-span-3">
                    {overview ? (
                        <MiniTrafficChart overview={overview} />
                    ) : (
                        <Card className="flex flex-col justify-center items-center gap-2 py-12">
                            <IconChartBar className="size-6 text-muted-foreground/40" />
                            <p className="text-xs text-muted-foreground">Analytics unavailable</p>
                        </Card>
                    )}
                </div>
                {/* Profile completeness — takes 2 cols */}
                <div className="lg:col-span-2">
                    <CompletenessCard stats={stats} />
                </div>
            </div>

            {/* Top content by views — full width, below chart */}
            <div className="grid gap-5 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <TopContentCard stats={stats} />
                </div>
                {/* Quick content summary */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Summary</CardTitle>
                            <CardDescription>Overview of your portfolio content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-3">
                                {[
                                    { label: "Projects", total: stats.total_projects, published: stats.published_projects, href: "/app/projects", icon: IconBriefcase },
                                    { label: "Blog Posts", total: stats.total_posts, published: stats.published_posts, href: "/app/posts", icon: IconArticle },
                                    { label: "Skills", total: stats.total_skills, published: stats.total_skills, href: "/app/skills", icon: IconCode },
                                    { label: "Experiences", total: stats.total_experiences, published: stats.total_experiences, href: "/app/experiences", icon: IconActivity },
                                    { label: "Social Links", total: stats.total_social_links, published: stats.total_social_links, href: "/app/social-links", icon: IconLink },
                                ].map((item) => (
                                    <Link key={item.label} href={item.href}
                                        className="group flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50 transition-colors">
                                        <div className="flex size-7 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                                            <item.icon className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <span className="flex-1 text-sm">{item.label}</span>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {item.published < item.total && (
                                                <span className="text-xs text-muted-foreground">
                                                    {item.published}/{item.total} live
                                                </span>
                                            )}
                                            <span className="text-sm font-semibold tabular-nums">{item.total}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex gap-2">
                            <Link href="/app/projects/new" className="flex-1">
                                <Button variant="outline" size="sm" className="w-full text-xs">
                                    <IconPlus data-icon="inline-start" />
                                    Project
                                </Button>
                            </Link>
                            <Link href="/app/posts/new" className="flex-1">
                                <Button variant="outline" size="sm" className="w-full text-xs">
                                    <IconPlus data-icon="inline-start" />
                                    Post
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
