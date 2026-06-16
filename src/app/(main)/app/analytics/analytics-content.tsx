"use client";

import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import {
    IconChartBar,
    IconUsers,
    IconWorld,
    IconDevices,
    IconLink,
    IconFile,
    IconAlertTriangle,
} from "@tabler/icons-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { AnalyticsOverview, AnalyticsBreakdown } from "@/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatShortDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function pct(value: number, total: number) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}

// ---------------------------------------------------------------------------
// Chart config
// ---------------------------------------------------------------------------
const visitsChartConfig = {
    visits: {
        label: "Page Views",
        color: "var(--chart-1)",
    },
    unique_visitors: {
        label: "Unique Visitors",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig;

// ---------------------------------------------------------------------------
// KPI stat card
// ---------------------------------------------------------------------------
interface AnalyticsStatProps {
    label: string;
    value: number | string;
    icon: React.ComponentType<{ className?: string }>;
    sub?: string;
    highlight?: boolean;
}

function AnalyticsStat({ label, value, icon: Icon, sub, highlight }: AnalyticsStatProps) {
    return (
        <Card size="sm" className={cn(highlight && "ring-primary/20 bg-primary/5")}>
            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <CardDescription className="text-xs font-medium">{label}</CardDescription>
                    <div className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted",
                        highlight && "bg-primary/10"
                    )}>
                        <Icon className={cn("size-3.5 text-muted-foreground", highlight && "text-primary")} />
                    </div>
                </div>
                <CardTitle className="text-2xl font-bold tabular-nums leading-none">
                    {typeof value === "number" ? value.toLocaleString() : value}
                </CardTitle>
                {sub && <CardDescription className="text-xs leading-tight">{sub}</CardDescription>}
            </CardHeader>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Visits Area Chart
// ---------------------------------------------------------------------------
function VisitsChart({
    overview,
    onDaysChange,
    days,
}: {
    overview: AnalyticsOverview;
    days: number;
    onDaysChange: (d: number) => void;
}) {
    const data = overview.data.map((d) => ({
        ...d,
        date: formatShortDate(d.date),
    }));

    const DAY_OPTIONS = [7, 14, 30, 90];

    return (
        <Card>
            <CardHeader>
                <div>
                    <CardTitle>Traffic Over Time</CardTitle>
                    <CardDescription>
                        Page views and unique visitors
                    </CardDescription>
                </div>
                <CardAction>
                    <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 p-0.5">
                        {DAY_OPTIONS.map((d) => (
                            <button
                                key={d}
                                onClick={() => onDaysChange(d)}
                                className={cn(
                                    "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                                    days === d
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {d}d
                            </button>
                        ))}
                    </div>
                </CardAction>
            </CardHeader>
            <CardContent>
                {overview.total_visits === 0 ? (
                    <EmptyAnalytics label="No visits recorded yet. Add the tracking snippet to your public portfolio to start collecting data." />
                ) : (
                    <ChartContainer config={visitsChartConfig} className="h-[240px] w-full">
                        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                            <defs>
                                <linearGradient id="lf-gradVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="lf-gradUnique" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                interval="preserveStartEnd"
                                tick={{ fontSize: 11 }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={4}
                                tick={{ fontSize: 11 }}
                                allowDecimals={false}
                            />
                            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                            <Area
                                type="monotone"
                                dataKey="visits"
                                stroke="var(--chart-1)"
                                strokeWidth={2}
                                fill="url(#lf-gradVisits)"
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 0 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="unique_visitors"
                                stroke="var(--chart-3)"
                                strokeWidth={2}
                                fill="url(#lf-gradUnique)"
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 0 }}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Ranked list row (shared by Top Pages and Referrers)
// ---------------------------------------------------------------------------
function RankedRow({
    rank,
    label,
    visits,
    total,
    maxVisits,
    barColor,
    prefix,
}: {
    rank: number;
    label: string;
    visits: number;
    total: number;
    maxVisits: number;
    barColor: string;
    prefix?: React.ReactNode;
}) {
    return (
        <div className="group flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50 transition-colors">
            <span className="w-4 shrink-0 text-xs font-mono text-muted-foreground/60 text-right">{rank}</span>
            {prefix}
            <span className="flex-1 min-w-0 truncate text-sm">{label}</span>
            <div className="hidden sm:flex items-center gap-2 shrink-0">
                <div className="w-16 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                        className={cn("h-full rounded-full transition-all", barColor)}
                        style={{ width: `${pct(visits, maxVisits)}%` }}
                    />
                </div>
                <span className="text-xs tabular-nums text-muted-foreground w-10 text-right">
                    {visits.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground/60 w-8 text-right">
                    {pct(visits, total)}%
                </span>
            </div>
            <div className="flex sm:hidden items-center gap-1 shrink-0">
                <span className="text-xs font-medium tabular-nums">{visits.toLocaleString()}</span>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Top Pages
// ---------------------------------------------------------------------------
function TopPagesCard({ breakdown }: { breakdown: AnalyticsBreakdown }) {
    const total = breakdown.top_pages.reduce((s, p) => s + p.visits, 0);
    const maxVisits = breakdown.top_pages[0]?.visits ?? 1;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconFile className="size-4 text-muted-foreground" />
                    Top Pages
                </CardTitle>
                <CardDescription>Most visited · last {breakdown.days} days</CardDescription>
            </CardHeader>
            <CardContent>
                {breakdown.top_pages.length === 0 ? (
                    <EmptyAnalytics label="No page data yet." />
                ) : (
                    <div className="flex flex-col gap-0.5">
                        {breakdown.top_pages.map((page, i) => (
                            <RankedRow
                                key={i}
                                rank={i + 1}
                                label={page.path}
                                visits={page.visits}
                                total={total}
                                maxVisits={maxVisits}
                                barColor="bg-primary/60"
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Top Referrers
// ---------------------------------------------------------------------------
function ReferrersCard({ breakdown }: { breakdown: AnalyticsBreakdown }) {
    const total = breakdown.top_referrers.reduce((s, r) => s + r.visits, 0);
    const maxVisits = breakdown.top_referrers[0]?.visits ?? 1;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconLink className="size-4 text-muted-foreground" />
                    Traffic Sources
                </CardTitle>
                <CardDescription>Where visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
                {breakdown.top_referrers.length === 0 ? (
                    <EmptyAnalytics label="No referrer data yet." />
                ) : (
                    <div className="flex flex-col gap-0.5">
                        {breakdown.top_referrers.map((ref, i) => (
                            <RankedRow
                                key={i}
                                rank={i + 1}
                                label={ref.domain}
                                visits={ref.visits}
                                total={total}
                                maxVisits={maxVisits}
                                barColor="bg-chart-2"
                                prefix={
                                    <div className="flex size-5 shrink-0 items-center justify-center rounded bg-muted overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`https://www.google.com/s2/favicons?domain=${ref.domain}&sz=16`}
                                            alt=""
                                            className="size-3.5"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                        />
                                    </div>
                                }
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Device Breakdown
// ---------------------------------------------------------------------------
const DEVICE_COLORS = {
    desktop: "var(--chart-1)",
    mobile: "var(--chart-2)",
    tablet: "var(--chart-3)",
    unknown: "var(--chart-4)",
} as const;

const deviceChartConfig: ChartConfig = {
    desktop: { label: "Desktop", color: "var(--chart-1)" },
    mobile: { label: "Mobile", color: "var(--chart-2)" },
    tablet: { label: "Tablet", color: "var(--chart-3)" },
    unknown: { label: "Unknown", color: "var(--chart-4)" },
};

// Device icons as text for simplicity
const DEVICE_ICONS: Record<string, string> = {
    desktop: "🖥",
    mobile: "📱",
    tablet: "📱",
    unknown: "?",
};

function DeviceCard({ breakdown }: { breakdown: AnalyticsBreakdown }) {
    const data = breakdown.devices.map((d) => ({
        name: d.device,
        value: d.visits,
        color: DEVICE_COLORS[d.device as keyof typeof DEVICE_COLORS] ?? "var(--chart-5)",
    }));
    const total = data.reduce((s, d) => s + d.value, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconDevices className="size-4 text-muted-foreground" />
                    Devices
                </CardTitle>
                <CardDescription>Visitor device breakdown</CardDescription>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <EmptyAnalytics label="No device data yet." />
                ) : (
                    <div className="flex items-center gap-6">
                        {/* Donut */}
                        <ChartContainer config={deviceChartConfig} className="h-[130px] w-[130px] shrink-0">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={38}
                                    outerRadius={60}
                                    paddingAngle={3}
                                    dataKey="value"
                                    nameKey="name"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {data.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} stroke="transparent" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: "var(--background)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "8px",
                                        fontSize: "12px",
                                        padding: "6px 10px",
                                    }}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    formatter={((value: any, name: any) => [
                                        typeof value === "number"
                                            ? `${value.toLocaleString()} (${pct(value, total)}%)`
                                            : String(value ?? ""),
                                        typeof name === "string"
                                            ? name.charAt(0).toUpperCase() + name.slice(1)
                                            : String(name ?? ""),
                                    ]) as any}
                                />
                            </PieChart>
                        </ChartContainer>
                        {/* Legend + values */}
                        <div className="flex flex-col gap-2 flex-1">
                            {data.map((d, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                                    <span className="text-xs capitalize flex-1">{d.name}</span>
                                    <span className="text-xs font-medium tabular-nums">{d.value.toLocaleString()}</span>
                                    <span className="text-xs text-muted-foreground w-8 text-right">{pct(d.value, total)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// ---------------------------------------------------------------------------
// Country Breakdown
// ---------------------------------------------------------------------------
function CountryCard({ breakdown }: { breakdown: AnalyticsBreakdown }) {
    const total = breakdown.countries.reduce((s, c) => s + c.visits, 0);
    const maxVisits = breakdown.countries[0]?.visits ?? 1;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconWorld className="size-4 text-muted-foreground" />
                    Countries
                </CardTitle>
                <CardDescription>Top visitor locations</CardDescription>
            </CardHeader>
            <CardContent>
                {breakdown.countries.length === 0 ? (
                    <EmptyAnalytics label="No geographic data yet." />
                ) : (
                    <div className="flex flex-col gap-0.5">
                        {breakdown.countries.slice(0, 8).map((c, i) => (
                            <RankedRow
                                key={i}
                                rank={i + 1}
                                label={countryName(c.country)}
                                visits={c.visits}
                                total={total}
                                maxVisits={maxVisits}
                                barColor="bg-chart-4"
                                prefix={
                                    <span className="text-base leading-none shrink-0">
                                        {countryFlag(c.country)}
                                    </span>
                                }
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function countryFlag(code: string): string {
    if (!code || code.length !== 2) return "🌍";
    try {
        const codePoints = [...code.toUpperCase()].map(
            (c) => 0x1f1e6 + c.charCodeAt(0) - 65
        );
        return String.fromCodePoint(...codePoints);
    } catch {
        return "🌍";
    }
}

function countryName(code: string): string {
    try {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        return regionNames.of(code) ?? code;
    } catch {
        return code;
    }
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
function EmptyAnalytics({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-muted">
                <IconChartBar className="size-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground max-w-52 leading-relaxed">{label}</p>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Tracking callout
// ---------------------------------------------------------------------------
function TrackingCallout() {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                <IconChartBar className="size-4 text-primary" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">Tracking not yet active</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Send a <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">POST</code> to{" "}
                    <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">/api/analytics/track/</code>{" "}
                    with the site UUID in an{" "}
                    <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">X-Site-ID</code>{" "}
                    header from your public portfolio on each page load.
                </p>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main AnalyticsContent
// ---------------------------------------------------------------------------
export function AnalyticsContent({
    overview: initialOverview,
    breakdown: initialBreakdown,
}: {
    overview: AnalyticsOverview | null;
    breakdown: AnalyticsBreakdown | null;
}) {
    const [days, setDays] = useState(30);

    const hasData = (initialOverview?.total_visits ?? 0) > 0;

    if (!initialOverview || !initialBreakdown) {
        return (
            <div className="flex flex-col gap-6">
                <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
                    <IconAlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-destructive">Unable to load analytics</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Could not connect to the analytics API. Make sure the server is running.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {/* Tracking info if no data yet */}
            {!hasData && <TrackingCallout />}

            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <AnalyticsStat
                    label="Total Views"
                    value={initialOverview.total_visits}
                    sub={`Last ${initialOverview.days} days`}
                    icon={IconChartBar}
                    highlight={initialOverview.total_visits > 0}
                />
                <AnalyticsStat
                    label="Unique Visitors"
                    value={initialOverview.unique_visitors}
                    sub="Distinct sessions"
                    icon={IconUsers}
                />
                <AnalyticsStat
                    label="Top Country"
                    value={
                        initialBreakdown.countries[0]
                            ? countryFlag(initialBreakdown.countries[0].country) + " " + countryName(initialBreakdown.countries[0].country)
                            : "—"
                    }
                    sub={initialBreakdown.countries[0] ? `${initialBreakdown.countries[0].visits.toLocaleString()} visits` : "No data yet"}
                    icon={IconWorld}
                />
                <AnalyticsStat
                    label="Top Source"
                    value={initialBreakdown.top_referrers[0]?.domain || "Direct"}
                    sub={initialBreakdown.top_referrers[0] ? `${initialBreakdown.top_referrers[0].visits.toLocaleString()} visits` : "No referrals yet"}
                    icon={IconLink}
                />
            </div>

            {/* Traffic chart (with day selector inside) */}
            <VisitsChart
                overview={initialOverview}
                days={days}
                onDaysChange={setDays}
            />

            {/* 2-col: top pages + referrers */}
            <div className="grid gap-5 lg:grid-cols-2">
                <TopPagesCard breakdown={initialBreakdown} />
                <ReferrersCard breakdown={initialBreakdown} />
            </div>

            {/* 2-col: devices + countries */}
            <div className="grid gap-5 lg:grid-cols-2">
                <DeviceCard breakdown={initialBreakdown} />
                <CountryCard breakdown={initialBreakdown} />
            </div>
        </div>
    );
}
