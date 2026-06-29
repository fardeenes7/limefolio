"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";

export function Cta() {
    return (
        <section className="py-32 bg-foreground text-background relative overflow-hidden flex items-center justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />

            <div className="container px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.1]">
                        Your best work belongs{" "}
                        <span className="italic">here</span>.
                    </h2>
                    <p className="text-xl md:text-2xl text-background/70 mb-10 max-w-[45ch] mx-auto leading-relaxed">
                        Stop fighting with generic website builders. Start
                        showcasing your work exactly how you intended.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={"/login"}>
                            <Button
                                size="lg"
                                className="rounded-full px-8 text-base h-14 bg-background text-foreground hover:bg-background/90 transition-transform active:scale-[0.98]"
                            >
                                Start building for free
                            </Button>
                        </Link>
                        <Link href={"/templates"}>
                            <Button
                                size="lg"
                                variant="ghost"
                                className="rounded-full px-8 text-base h-14 gap-2 hover:bg-background/10 text-background hover:text-background border border-transparent hover:border-background/20"
                            >
                                View all templates{" "}
                                <ArrowRightIcon weight="bold" className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
