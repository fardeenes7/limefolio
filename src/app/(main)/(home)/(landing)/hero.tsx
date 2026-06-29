"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion, motion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const floatWrapRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (reduce || !ref.current || !contentRef.current) return;
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ref.current,
                start: "top top",
                end: "+=80%",
                pin: true,
                pinSpacing: false
            });

            gsap.to(contentRef.current, {
                scale: 0.9,
                opacity: 0.2,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top top",
                    end: "+=80%",
                    scrub: true
                }
            });

            // Parallax for floating images
            if (floatWrapRef.current) {
                const images =
                    floatWrapRef.current.querySelectorAll(".float-img");
                images.forEach((img, i) => {
                    gsap.to(img, {
                        y: i % 2 === 0 ? -150 : 150,
                        rotation: i % 2 === 0 ? "+=10" : "-=10",
                        ease: "none",
                        scrollTrigger: {
                            trigger: ref.current,
                            start: "top top",
                            end: "+=100%",
                            scrub: true
                        }
                    });
                });
            }
        }, ref);
        return () => ctx.revert();
    }, [reduce]);

    const titleWords = "The portfolio builder for people who care.".split(" ");

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section
            ref={ref}
            className="relative min-h-dvh flex items-center justify-center pt-24 pb-12 overflow-hidden bg-background"
        >
            {/* Floating Background Images */}
            <div
                ref={floatWrapRef}
                className="absolute inset-0 z-0 hidden lg:block pointer-events-none opacity-[0.35]"
            >
                <div className="float-img absolute top-[15%] left-[-2%] w-[24vw] aspect-video rounded-2xl overflow-hidden -rotate-6 shadow-2xl border border-white/10">
                    <Image
                        src="/images/templates/minimal.png"
                        alt=""
                        fill
                        className="object-cover object-top"
                    />
                </div>
                <div className="float-img absolute top-[20%] right-[-2%] w-[22vw] aspect-video rounded-2xl overflow-hidden rotate-12 shadow-2xl border border-white/10">
                    <Image
                        src="/images/templates/neobrutalism.png"
                        alt=""
                        fill
                        className="object-cover object-top"
                    />
                </div>
                <div className="float-img absolute bottom-[15%] left-[8%] w-[20vw] aspect-video rounded-2xl overflow-hidden rotate-6 shadow-2xl border border-white/10">
                    <Image
                        src="/images/templates/terminal.png"
                        alt=""
                        fill
                        className="object-cover object-top"
                    />
                </div>
                <div className="float-img absolute bottom-[20%] right-[5%] w-[22vw] aspect-video rounded-2xl overflow-hidden -rotate-12 shadow-2xl border border-white/10">
                    <Image
                        src="/images/templates/cinematic.png"
                        alt=""
                        fill
                        className="object-cover object-top"
                    />
                </div>
            </div>

            <div
                ref={contentRef}
                className="container flex flex-col items-center text-center z-10 px-4 relative"
            >
                <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border/50 text-sm font-medium shadow-sm"
                >
                    <Sparkle weight="fill" className="text-primary w-4 h-4" />
                    <span>Limefolio 2.0 is now live</span>
                </motion.div>

                <motion.h1
                    variants={reduce ? {} : containerVariants}
                    initial="hidden"
                    animate="show"
                    className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] text-foreground mb-8 max-w-[15ch] flex flex-wrap justify-center gap-x-[0.25em]"
                >
                    {titleWords.map((word, i) => {
                        const isItalic = word.includes("proper");
                        return (
                            <motion.span
                                key={i}
                                variants={reduce ? {} : itemVariants}
                                className={isItalic ? "italic pb-1" : ""}
                            >
                                {word}
                            </motion.span>
                        );
                    })}
                </motion.h1>

                <motion.p
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-lg md:text-xl text-muted-foreground max-w-[45ch] mx-auto mb-10 leading-relaxed"
                >
                    Beautiful templates, custom domains, real analytics.
                    Everything a serious creative needs - nothing they don't.
                </motion.p>

                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 1,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button
                        size="lg"
                        className="rounded-full px-8 text-base h-14 transition-transform active:scale-[0.98]"
                    >
                        Start building
                    </Button>
                    <Button
                        size="lg"
                        variant="ghost"
                        className="rounded-full px-8 text-base h-14 gap-2 hover:bg-muted/50"
                    >
                        <PlayCircle
                            weight="fill"
                            className="w-6 h-6 text-muted-foreground"
                        />
                        Watch demo
                    </Button>
                </motion.div>
            </div>

            {/* Ambient background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />
        </section>
    );
}
