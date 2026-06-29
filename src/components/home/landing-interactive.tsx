"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform
} from "motion/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// 5. Footer Parallax Background Word
export function FooterParallaxWord({ text }: { text: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["80%", "0%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 0.08]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    return (
        <div
            ref={ref}
            className="absolute inset-0 overflow-hidden pointer-events-none flex items-end justify-center select-none z-0"
        >
            <motion.h2
                className="text-[20vw] font-bold tracking-tighter leading-none text-foreground uppercase whitespace-nowrap mb-[-2vw]"
                style={
                    reduce ? { opacity: 0.08, y: "0%" } : { y, opacity, scale }
                }
            >
                {text}
            </motion.h2>
        </div>
    );
}
