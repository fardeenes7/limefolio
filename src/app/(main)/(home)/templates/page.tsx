"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { getAvailableTemplates, getTemplate } from "@/templates/registry";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, EyeIcon, MonitorIcon, DeviceMobileIcon } from "@phosphor-icons/react";

const PREVIEW_BASE_URL = process.env.NEXT_AUTH_URL;

const TEMPLATE_IMAGES: Record<string, string> = {
    default: "/images/templates/minimal.png",
    cinematic: "/images/templates/cinematic.png",
    terminal: "/images/templates/terminal.png",
    minimal: "/images/templates/minimal.png",
    neobrutalism: "/images/templates/neobrutalism.png"
};

export default function TemplatesPage() {
    const templateKeys = getAvailableTemplates();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
        "desktop"
    );

    return (
        <main className="min-h-dvh pt-32 pb-24 bg-background selection:bg-primary/20">
            <div className="container px-4 max-w-7xl mx-auto">
                {/* Header */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]"
                    >
                        Find your <span className="italic pb-1">starting</span>{" "}
                        point.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.1,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                    >
                        Every template is fully customizable. Start with a solid
                        foundation, preview it with real sample data, and make
                        it yours.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
                    {templateKeys.map((key, i) => {
                        const tmpl = getTemplate(key);
                        const image =
                            TEMPLATE_IMAGES[key] ??
                            "/images/templates/minimal.png";
                        const url = `${PREVIEW_BASE_URL}?template=${key}`;

                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.1,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="group flex flex-col"
                            >
                                <Dialog>
                                    <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-muted mb-6 shadow-sm transition-all duration-500 group-hover:shadow-2xl ring-1 ring-border/50 group-hover:ring-primary/20">
                                        <Image
                                            src={image}
                                            alt={tmpl.label}
                                            fill
                                            className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                                            <DialogTrigger asChild>
                                                <Button
                                                    size="lg"
                                                    className="rounded-full shadow-2xl h-14 px-8 text-base transition-transform active:scale-95"
                                                    onClick={() =>
                                                        setPreviewUrl(url)
                                                    }
                                                >
                                                    <EyeIcon
                                                        weight="bold"
                                                        className="mr-2 w-5 h-5"
                                                    />{" "}
                                                    Live Preview
                                                </Button>
                                            </DialogTrigger>
                                        </div>
                                    </div>

                                    <div className="flex items-start justify-between gap-4 px-2">
                                        <div>
                                            <h2 className="text-2xl font-medium tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                                                {tmpl.label}
                                            </h2>
                                            <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">
                                                {tmpl.defaultTheme.replace(
                                                    "-",
                                                    " "
                                                )}
                                            </p>
                                        </div>
                                        <Link href={`/login?template=${key}`}>
                                            <Button
                                                variant="ghost"
                                                className="rounded-full shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300 h-10 px-4"
                                            >
                                                Use this{" "}
                                                <ArrowRightIcon
                                                    weight="bold"
                                                    className="ml-2 w-4 h-4"
                                                />
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* The Preview Dialog */}
                                    <DialogContent className="max-w-[100vw] w-screen h-screen m-0 p-0 rounded-none border-none bg-background/95 backdrop-blur-xl flex flex-col [&>button]:right-6 [&>button]:top-4 [&>button]:bg-background [&>button]:p-2 [&>button]:rounded-full [&>button]:shadow-xl [&>button]:z-[60] overflow-hidden">
                                        <DialogTitle className="sr-only">
                                            Preview {tmpl.label} Template
                                        </DialogTitle>

                                        {/* Dialog Header / Controls */}
                                        <div className="flex items-center justify-center h-16 border-b border-border/10 bg-background/40 absolute top-0 inset-x-0 z-50 shadow-sm">
                                            <div className="flex items-center gap-1 bg-muted/80 p-1 rounded-full border border-border/50 shadow-sm backdrop-blur-md">
                                                <Button
                                                    variant={
                                                        previewMode ===
                                                        "desktop"
                                                            ? "default"
                                                            : "ghost"
                                                    }
                                                    size="sm"
                                                    className={`rounded-full px-4 h-8 ${previewMode === "desktop" ? "shadow-sm" : ""}`}
                                                    onClick={() =>
                                                        setPreviewMode(
                                                            "desktop"
                                                        )
                                                    }
                                                >
                                                    <MonitorIcon
                                                        weight={
                                                            previewMode ===
                                                            "desktop"
                                                                ? "fill"
                                                                : "regular"
                                                        }
                                                        className="w-4 h-4 mr-2"
                                                    />{" "}
                                                    Desktop
                                                </Button>
                                                <Button
                                                    variant={
                                                        previewMode === "mobile"
                                                            ? "default"
                                                            : "ghost"
                                                    }
                                                    size="sm"
                                                    className={`rounded-full px-4 h-8 ${previewMode === "mobile" ? "shadow-sm" : ""}`}
                                                    onClick={() =>
                                                        setPreviewMode("mobile")
                                                    }
                                                >
                                                    <DeviceMobileIcon
                                                        weight={
                                                            previewMode ===
                                                            "mobile"
                                                                ? "fill"
                                                                : "regular"
                                                        }
                                                        className="w-4 h-4 mr-2"
                                                    />{" "}
                                                    Mobile
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Iframe Container */}
                                        <div className="flex-1 w-full h-full pt-16 flex items-center justify-center bg-muted/20">
                                            <div
                                                className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shadow-2xl ring-1 ring-border/50 ${previewMode === "desktop" ? "w-full h-[calc(100vh-64px)] rounded-none border-none ring-0" : "w-[375px] h-[812px] max-h-[85vh] rounded-[3rem] bg-background"}`}
                                            >
                                                <iframe
                                                    src={
                                                        previewMode ===
                                                        "desktop"
                                                            ? url
                                                            : `${url}&mobile=true`
                                                    }
                                                    className="w-full h-full bg-background border-none"
                                                    title={`${tmpl.label} Preview`}
                                                    allow="fullscreen"
                                                />
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
