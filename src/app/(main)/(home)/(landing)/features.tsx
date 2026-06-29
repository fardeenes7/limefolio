"use client";

import { motion } from "motion/react";
import { GlobeHemisphereWest, Palette, Gauge, Layout, LinkIcon } from "@phosphor-icons/react";
import Image from "next/image";

export function Features() {
    return (
        <section className="relative z-10 py-24 bg-background">
            <div className="container px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.7 }}
                    className="max-w-2xl mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
                        Everything you need.
                        <br className="hidden md:block" />
                        Nothing you don't.
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Built with obsessive attention to detail, Limefolio gives you the tools to create a site that truly reflects your work.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Main visual cell */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 bg-muted rounded-[2rem] p-8 overflow-hidden relative min-h-[400px] flex flex-col justify-between group"
                    >
                        <div className="relative z-10 max-w-md">
                            <div className="flex items-center gap-2 mb-4">
                                <Layout weight="duotone" className="w-6 h-6 text-foreground" />
                                <h3 className="text-xl font-medium">Hundreds of templates</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Start with a meticulously crafted foundation, then make it entirely your own.
                            </p>
                        </div>
                        <div className="absolute bottom-0 right-0 w-[90%] md:w-[65%] aspect-video translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500 rounded-tl-2xl overflow-hidden shadow-2xl border border-border/50">
                            <Image 
                                src="/images/templates_bento.png"
                                alt="Limefolio templates"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </motion.div>

                    {/* Color Themes cell */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="col-span-1 bg-muted rounded-[2rem] p-8 overflow-hidden relative flex flex-col group"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Palette weight="duotone" className="w-6 h-6 text-foreground" />
                                <h3 className="text-xl font-medium">30+ Color Themes</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Switch vibes instantly with our dynamic theming engine.
                            </p>
                        </div>
                        {/* Interactive UI snippet */}
                        <div className="mt-auto pt-12 relative z-10 flex justify-center">
                            <div className="flex gap-2">
                                {[
                                    "bg-lime-400",
                                    "bg-indigo-500",
                                    "bg-rose-500",
                                    "bg-amber-400",
                                    "bg-zinc-800"
                                ].map((color, i) => (
                                    <div 
                                        key={i} 
                                        className={`w-10 h-10 rounded-full ${color} border-4 border-muted shadow-sm -ml-4 first:ml-0 group-hover:translate-y-[-4px] transition-transform duration-300`} 
                                        style={{ transitionDelay: `${i * 50}ms` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Custom Domains */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="col-span-1 bg-muted rounded-[2rem] p-8 relative overflow-hidden flex flex-col group min-h-[300px]"
                    >
                        <div className="relative z-10 mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <GlobeHemisphereWest weight="duotone" className="w-6 h-6 text-foreground" />
                                <h3 className="text-xl font-medium">Custom Domains</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Connect your own domain seamlessly, or use our short subdomains.
                            </p>
                        </div>
                        {/* UI Snippet */}
                        <div className="mt-auto w-full bg-background border border-border/50 rounded-xl p-4 flex items-center justify-between group-hover:border-primary/50 transition-colors shadow-sm">
                            <span className="text-foreground font-mono text-sm tracking-tight flex items-center gap-2 truncate">
                                <span className="text-muted-foreground hidden sm:inline">https://</span>yourname.com
                            </span>
                            <div className="w-2.5 h-2.5 shrink-0 rounded-full bg-emerald-500/80 animate-pulse" />
                        </div>
                    </motion.div>

                    {/* Perfect Lighthouse */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="col-span-1 bg-muted rounded-[2rem] p-8 flex flex-col relative overflow-hidden group min-h-[300px]"
                    >
                        <div className="relative z-10 mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Gauge weight="duotone" className="w-6 h-6 text-foreground" />
                                <h3 className="text-xl font-medium">Perfect Lighthouse</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Blazing fast edge delivery. 100/100 performance scores out of the box.
                            </p>
                        </div>
                        <div className="mt-auto flex justify-center pb-2">
                            <div className="relative w-24 h-24 rounded-full border-[6px] border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <div className="absolute inset-0 rounded-full border-[6px] border-emerald-500 border-t-transparent animate-spin-slow opacity-20 group-hover:opacity-100 transition-opacity" style={{ animationDuration: '3s' }} />
                                <span className="text-3xl font-medium text-emerald-500">100</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Trackable Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="col-span-1 bg-muted rounded-[2rem] p-8 flex flex-col relative overflow-hidden group min-h-[300px]"
                    >
                        <div className="relative z-10 mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <LinkIcon weight="duotone" className="w-6 h-6 text-foreground" />
                                <h3 className="text-xl font-medium">Trackable Links</h3>
                            </div>
                            <p className="text-muted-foreground">
                                Generate custom tracking links to see exactly who views your portfolio.
                            </p>
                        </div>
                        <div className="mt-auto flex items-end gap-3 h-16 justify-center px-4">
                            {[40, 70, 45, 90, 60, 100].map((height, i) => (
                                <div 
                                    key={i} 
                                    className="w-full max-w-[1.25rem] bg-foreground/10 rounded-t-md group-hover:bg-primary transition-colors duration-500"
                                    style={{ height: `${height}%`, transitionDelay: `${i * 75}ms` }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
