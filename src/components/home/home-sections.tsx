"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LimefolioLIcon } from "@/lib/icons";
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
    IconTemplate,
    IconBrandGithub,
    IconLink,
    IconUsers
} from "@tabler/icons-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
    {
        icon: IconTemplate,
        label: "Beautiful Templates",
        desc: "Choose from stunning, professionally-crafted portfolio layouts designed for maximum impact.",
        colSpan: "md:col-span-2",
        bg: "bg-primary/5"
    },
    {
        icon: IconPalette,
        label: "Live Customisation",
        desc: "Personalise every detail with our live visual editor. No code required.",
        colSpan: "md:col-span-1",
        bg: "bg-card"
    },
    {
        icon: IconWorld,
        label: "Custom Domains",
        desc: "Bring your own domain or get a free limefolio.com subdomain instantly.",
        colSpan: "md:col-span-1",
        bg: "bg-card"
    },
    {
        icon: IconChartBar,
        label: "Built-in Analytics",
        desc: "See who visits, where they come from, and which projects capture attention.",
        colSpan: "md:col-span-2",
        bg: "bg-primary/5"
    },
    {
        icon: IconCode,
        label: "SEO Ready",
        desc: "Server-rendered and highly optimised out of the box so you rank higher on Google.",
        colSpan: "md:col-span-2",
        bg: "bg-card"
    },
    {
        icon: IconShield,
        label: "Privacy First",
        desc: "No third-party trackers. Your data and your visitors' data stays completely yours.",
        colSpan: "md:col-span-1",
        bg: "bg-card"
    }
];

const steps = [
    {
        step: "01",
        title: "Create your account",
        desc: "Sign up in seconds with Google or email. No credit card required."
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

// ─── Components ───────────────────────────────────────────────────────────────

export function HomeHero({ promotion }: { promotion: any }) {
    const reduce = useReducedMotion();
    const slideUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="relative overflow-hidden border-b border-border bg-linear-to-br from-background via-background to-primary/5 pt-24 pb-16 md:pt-32 md:pb-24">
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
                <motion.div
                    initial={reduce ? "visible" : "hidden"}
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="mx-auto flex max-w-4xl flex-col items-center"
                >
                    {/* Eyebrow badge (Allowed in Hero) */}
                    <motion.div
                        variants={slideUp}
                        className="mb-8 flex justify-center"
                    >
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
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={slideUp}
                        className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
                    >
                        Your portfolio,{" "}
                        <span className="text-primary">
                            beautifully crafted
                        </span>{" "}
                        in minutes
                    </motion.h1>

                    {/* Subtext (Max 20 words) */}
                    <motion.p
                        variants={slideUp}
                        className="mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl"
                    >
                        Limefolio gives creators everything they need to
                        showcase their work professionally, without touching a
                        single line of code.
                    </motion.p>

                    {/* CTAs (Fixed DOM Nesting) */}
                    <motion.div
                        variants={slideUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/login">
                            <Button
                                size="lg"
                                className="gap-2 px-8 shadow-sm transition-transform active:scale-95"
                            >
                                <IconRocket className="size-4" />
                                Start for free
                            </Button>
                        </Link>
                        <Link href="/templates">
                            <Button
                                size="lg"
                                variant="outline"
                                className="gap-2 px-8 transition-transform active:scale-95"
                            >
                                <IconTemplate className="size-4" />
                                Browse templates
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export function HomeStats() {
    const reduce = useReducedMotion();
    return (
        <section className="border-b border-border bg-muted/30 py-12">
            <div className="container px-6">
                <div className="mb-10 text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                        Trusted by{" "}
                        <span className="text-foreground">12,000+</span>{" "}
                        creators worldwide
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map(({ value, label }, i) => (
                        <motion.div
                            key={label}
                            initial={reduce ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.05,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="text-center space-y-1"
                        >
                            <p className="text-3xl font-bold text-primary">
                                {value}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function HomeFeatures() {
    const reduce = useReducedMotion();
    return (
        <section id="features" className="py-24 border-b border-border">
            <div className="container px-6">
                {/* No eyebrow, just the headline */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                            Everything your portfolio needs
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            We've thought of every detail so you can focus on
                            what matters most: your work.
                        </p>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    {features.map(
                        ({ icon: Icon, label, desc, colSpan, bg }, i) => (
                            <motion.div
                                key={label}
                                initial={reduce ? false : { opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.06,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className={colSpan}
                            >
                                <Card
                                    className={`group relative h-full overflow-hidden p-8 hover:shadow-md transition-all duration-300 hover:border-primary/30 ${bg}`}
                                >
                                    <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon className="size-6" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                                        {label}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {desc}
                                    </p>
                                </Card>
                            </motion.div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

export function HomeSteps() {
    const reduce = useReducedMotion();
    return (
        <section
            id="how-it-works"
            className="py-24 border-b border-border bg-muted/20"
        >
            <div className="container px-6">
                <div className="mb-16 max-w-2xl space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Live in four easy steps
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        From zero to a published portfolio in the time it takes
                        to make a coffee.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                    {steps.map(({ step, title, desc }, i) => (
                        <motion.div
                            key={step}
                            initial={reduce ? false : { opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="flex gap-6"
                        >
                            <div className="flex-none mt-1">
                                <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-primary/20 bg-primary/5 text-primary font-bold text-xl">
                                    {step}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-foreground">
                                    {title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function HomeTestimonials() {
    const reduce = useReducedMotion();
    return (
        <section id="testimonials" className="py-24 border-b border-border">
            <div className="container px-6">
                <div className="mb-16 max-w-2xl space-y-4 mx-auto text-center">
                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Loved by creators
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Real people, real results. Here's what our community
                        says.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 items-start">
                    {testimonials.map(({ quote, name, role, avatar }, i) => (
                        <motion.div
                            key={name}
                            initial={reduce ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className={i === 1 ? "md:mt-12" : ""}
                        >
                            <Card className="p-8 flex flex-col gap-6">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, j) => (
                                        <IconStar
                                            key={j}
                                            className="size-4 fill-primary text-primary"
                                        />
                                    ))}
                                </div>
                                <p className="text-muted-foreground leading-relaxed flex-1">
                                    "{quote}"
                                </p>
                                <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                        {avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">
                                            {name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {role}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function HomeIntegrations() {
    return (
        <section className="py-20 border-b border-border bg-muted/20">
            <div className="container px-6 text-center space-y-10">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    Integrates with your favourite tools
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {integrations.map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-medium text-foreground hover:border-primary/30 hover:text-primary transition-colors duration-200"
                        >
                            <Icon className="size-5" />
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function HomeFinalCta() {
    return (
        <section className="relative overflow-hidden py-32 bg-linear-to-br from-primary/5 via-background to-background">
            <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-3xl" />
            <div className="container relative px-6 text-center space-y-10">
                <div className="space-y-6">
                    <LimefolioLIcon className="mx-auto size-16" />
                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl max-w-3xl mx-auto">
                        Ready to stand out?
                    </h2>
                    <p className="mx-auto max-w-xl text-muted-foreground text-lg">
                        Join thousands of creators who already trust Limefolio
                        to represent their best work.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/login">
                        <Button
                            size="lg"
                            className="gap-2 px-10 transition-transform active:scale-95"
                        >
                            Start for free
                            <IconArrowRight className="size-4" />
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button
                            size="lg"
                            variant="ghost"
                            className="transition-transform active:scale-95"
                        >
                            Learn more
                        </Button>
                    </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                    No credit card · Cancel anytime · Always free tier
                </p>
            </div>
        </section>
    );
}
