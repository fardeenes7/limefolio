import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LimefolioLIcon } from "@/lib/icons";
import { PricingSection } from "@/components/home/pricing-section";
import {
    IconSparkles,
    IconPalette,
    IconWorld,
    IconChartBar,
    IconCode,
    IconRocket,
    IconShield,
    IconArrowRight,
    IconStar,
    IconBolt,
    IconUsers,
    IconTemplate,
    IconBrandGithub,
    IconLink
} from "@tabler/icons-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
    {
        icon: IconTemplate,
        label: "Beautiful Templates",
        desc: "Choose from a library of stunning, professionally-crafted portfolio templates designed for maximum impact."
    },
    {
        icon: IconPalette,
        label: "Theme Customisation",
        desc: "Personalise every detail — colours, fonts, sections — with a live visual editor, no code required."
    },
    {
        icon: IconWorld,
        label: "Custom Domains",
        desc: "Bring your own domain or get a free <you>.limefolio.com subdomain in seconds."
    },
    {
        icon: IconChartBar,
        label: "Built-in Analytics",
        desc: "See who visits, where they come from, and which projects capture their attention most."
    },
    {
        icon: IconCode,
        label: "SEO Ready",
        desc: "Every portfolio is server-rendered and optimised so you rank higher on Google."
    },
    {
        icon: IconShield,
        label: "Privacy First",
        desc: "No third-party trackers. Your data and your visitors' data stays yours."
    }
];

const steps = [
    {
        step: "01",
        title: "Create your account",
        desc: "Sign up in seconds with Google or email — no credit card required."
    },
    {
        step: "02",
        title: "Pick a template",
        desc: "Browse our growing library and choose the layout that fits your style."
    },
    {
        step: "03",
        title: "Add your content",
        desc: "Fill in your projects, experience, and skills. We make it painless."
    },
    {
        step: "04",
        title: "Publish & share",
        desc: "Hit publish and share your portfolio with the world. Done in minutes."
    }
];

const testimonials = [
    {
        quote: "Limefolio took my portfolio from a clunky PDF to a stunning live site in under an hour. I got two interview calls the same week I launched.",
        name: "Sarah K.",
        role: "Product Designer",
        avatar: "SK"
    },
    {
        quote: "As a freelance developer, my portfolio is my storefront. Limefolio made it look like I hired a professional studio. Highly recommend.",
        name: "Marcus T.",
        role: "Freelance Developer",
        avatar: "MT"
    },
    {
        quote: "The analytics alone are worth it. I can see exactly which projects get the most attention and update my portfolio strategy accordingly.",
        name: "Priya M.",
        role: "UX Researcher",
        avatar: "PM"
    }
];

const stats = [
    { value: "12 000+", label: "Portfolios created" },
    { value: "94%", label: "User satisfaction" },
    { value: "3 min", label: "Average setup time" },
    { value: "40+", label: "Templates available" }
];

const integrations = [
    { icon: IconBrandGithub, label: "GitHub" },
    { icon: IconLink, label: "Behance" },
    { icon: IconWorld, label: "Dribbble" },
    { icon: IconCode, label: "Codepen" },
    { icon: IconUsers, label: "LinkedIn" }
];

// ─── Page ─────────────────────────────────────────────────────────────────────

async function getLatestPromotion() {
    try {
        const apiUrl = process.env.API_URL || "http://localhost:8001";
        const res = await fetch(`${apiUrl}/api/billing/promotions/latest/`, {
            next: { revalidate: 3600 }
        });
        if (res.ok && res.status !== 204) {
            return await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch promotion:", e);
    }
    return null;
}

async function getPlans() {
    try {
        const apiUrl = process.env.API_URL || "http://localhost:8001";
        const res = await fetch(`${apiUrl}/api/billing/plans/`, {
            next: { revalidate: 300 }
        });
        if (res.ok && res.status !== 204) {
            return await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch plans:", e);
    }
    return [];
}

export default async function HomePage() {
    const [promotion, plans] = await Promise.all([
        getLatestPromotion(),
        getPlans()
    ]);

    return (
        <div className="flex flex-col">
            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden border-b border-border bg-linear-to-br from-background via-background to-primary/5 py-24 md:py-36">
                {/* Decorative grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                        backgroundSize: "64px 64px"
                    }}
                />
                {/* Glow orb */}
                <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-3xl" />

                <div className="container relative px-6 text-center">
                    {/* Eyebrow badge */}
                    <div className="mb-8 flex justify-center">
                        {promotion ? (
                            <Link href="/pricing">
                                <Badge
                                    variant="secondary"
                                    className="gap-1.5 px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                >
                                    <IconSparkles className="size-3.5" />
                                    <span className="font-semibold">
                                        {promotion.name}
                                    </span>
                                    : Get {promotion.duration_days} days of{" "}
                                    {promotion.plan_name} for free!
                                    <IconArrowRight className="size-3.5 ml-1" />
                                </Badge>
                            </Link>
                        ) : (
                            <Badge
                                variant="outline"
                                className="gap-1.5 px-3 py-1 text-sm"
                            >
                                <IconSparkles className="size-3.5 text-primary" />
                                Now in public beta — free to use
                            </Badge>
                        )}
                    </div>

                    {/* Headline */}
                    <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-bold leading-[1.15] tracking-tight sm:text-6xl md:text-7xl">
                        Your portfolio,{" "}
                        <span className="text-primary">
                            beautifully crafted
                        </span>{" "}
                        in minutes
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
                        Limefolio gives designers, developers, and creators
                        everything they need to showcase their work
                        professionally — without touching a single line of code.
                    </p>

                    {/* CTAs – use plain <a> tags inside Buttons with no asChild to avoid Slot conflicts */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button size="lg" className="gap-2 px-8">
                            <Link
                                href="/login"
                                className="flex items-center gap-2"
                            >
                                <IconRocket className="size-4" />
                                Start for free
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 px-8"
                        >
                            <Link
                                href="/templates"
                                className="flex items-center gap-2"
                            >
                                <IconTemplate className="size-4" />
                                Browse templates
                            </Link>
                        </Button>
                    </div>

                    {/* Social proof */}
                    <p className="mt-8 text-sm text-muted-foreground">
                        Trusted by{" "}
                        <span className="font-medium text-foreground">
                            12 000+
                        </span>{" "}
                        creators worldwide · No credit card required
                    </p>
                </div>
            </section>

            {/* ── Stats bar ────────────────────────────────────────────── */}
            <section className="border-b border-border bg-muted/40 py-12">
                <div className="container px-6">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="text-center space-y-1">
                                <p className="text-3xl font-bold text-primary">
                                    {value}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features ─────────────────────────────────────────────── */}
            <section id="features" className="py-24 border-b border-border">
                <div className="container px-6">
                    <div className="mb-16 text-center space-y-4">
                        <Badge variant="secondary" className="gap-1.5">
                            <IconBolt className="size-3" />
                            Features
                        </Badge>
                        <h2 className="text-4xl font-bold tracking-tight">
                            Everything your portfolio needs
                        </h2>
                        <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
                            We&apos;ve thought of every detail so you can focus
                            on what matters most — your work.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map(({ icon: Icon, label, desc }) => (
                            <Card
                                key={label}
                                className="group relative overflow-hidden p-6 hover:shadow-md transition-all duration-300 hover:border-primary/30"
                            >
                                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                                    <Icon className="size-5" />
                                </div>
                                <h3 className="mb-2 font-semibold text-foreground">
                                    {label}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {desc}
                                </p>
                                <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How it works ─────────────────────────────────────────── */}
            <section
                id="how-it-works"
                className="py-24 border-b border-border bg-muted/20"
            >
                <div className="container px-6">
                    <div className="mb-16 text-center space-y-4">
                        <Badge variant="secondary" className="gap-1.5">
                            <IconRocket className="size-3" />
                            How it works
                        </Badge>
                        <h2 className="text-4xl font-bold tracking-tight">
                            Live in four easy steps
                        </h2>
                        <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
                            From zero to a published portfolio in the time it
                            takes to make a coffee.
                        </p>
                    </div>

                    <div className="relative grid gap-8 md:grid-cols-4">
                        {/* Connector line */}
                        <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-transparent via-border to-transparent" />

                        {steps.map(({ step, title, desc }) => (
                            <div
                                key={step}
                                className="relative flex flex-col items-center text-center gap-4"
                            >
                                <div className="relative flex size-20 items-center justify-center rounded-2xl border-2 border-primary/30 bg-primary/10 text-primary font-bold text-lg z-10">
                                    {step}
                                </div>
                                <div className="space-y-1.5">
                                    <h3 className="font-semibold text-foreground">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ─────────────────────────────────────────── */}
            <section id="testimonials" className="py-24 border-b border-border">
                <div className="container px-6">
                    <div className="mb-16 text-center space-y-4">
                        <Badge variant="secondary" className="gap-1.5">
                            <IconStar className="size-3" />
                            Testimonials
                        </Badge>
                        <h2 className="text-4xl font-bold tracking-tight">
                            Loved by creators
                        </h2>
                        <p className="mx-auto max-w-xl text-muted-foreground">
                            Real people, real results. Here&apos;s what our
                            community says.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map(({ quote, name, role, avatar }) => (
                            <Card
                                key={name}
                                className="p-6 flex flex-col gap-5"
                            >
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <IconStar
                                            key={i}
                                            className="size-4 fill-primary text-primary"
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                    &ldquo;{quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-semibold">
                                        {avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            {name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {role}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <PricingSection plans={plans} />

            {/* ── Integrations strip ───────────────────────────────────── */}
            <section className="py-16 border-b border-border">
                <div className="container px-6 text-center space-y-8">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                        Integrates with your favourite tools
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {integrations.map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:border-primary/30 hover:text-primary transition-colors duration-200"
                            >
                                <Icon className="size-4" />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ────────────────────────────────────────────── */}
            <section className="relative overflow-hidden py-28 bg-linear-to-br from-primary/10 via-background to-background">
                <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-primary/15 blur-3xl" />
                <div className="container relative px-6 text-center space-y-8">
                    <div className="space-y-4">
                        <LimefolioLIcon className="mx-auto size-14" />
                        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                            Ready to stand out?
                        </h2>
                        <p className="mx-auto max-w-xl text-muted-foreground text-lg">
                            Join thousands of creators who already trust
                            Limefolio to represent their best work.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button size="lg" className="gap-2 px-10">
                            <Link
                                href="/login"
                                className="flex items-center gap-2"
                            >
                                Get started — it&apos;s free
                                <IconArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="ghost">
                            <Link href="#features">Learn more</Link>
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        No credit card · Cancel anytime · Always free tier
                    </p>
                </div>
            </section>
        </div>
    );
}
