"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const templates1 = [
    {
        name: "Minimal",
        desc: "Minimalist & Clean",
        img: "/images/templates/minimal.png"
    },
    {
        name: "Cinematic",
        desc: "Cinematic & Visual",
        img: "/images/templates/cinematic.png"
    },
    {
        name: "Neobrutalism",
        desc: "Neobrutalism",
        img: "/images/templates/neobrutalism.png"
    },
    {
        name: "Terminal",
        desc: "Tech & Agency",
        img: "/images/templates/terminal.png"
    }
];

const templates2 = [
    {
        name: "Neobrutalism",
        desc: "Neobrutalism",
        img: "/images/templates/neobrutalism.png"
    },
    {
        name: "Minimal",
        desc: "Minimalist & Clean",
        img: "/images/templates/minimal.png"
    },
    {
        name: "Terminal",
        desc: "Tech & Agency",
        img: "/images/templates/terminal.png"
    },
    {
        name: "Cinematic",
        desc: "Cinematic & Visual",
        img: "/images/templates/cinematic.png"
    },
];

export function Showcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (reduce || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Row 1 goes left
            const tl1 = gsap.to(row1Ref.current, {
                xPercent: -50,
                ease: "none",
                duration: 40,
                repeat: -1
            });

            // Row 2 goes right
            gsap.set(row2Ref.current, { xPercent: -50 });
            const tl2 = gsap.to(row2Ref.current, {
                xPercent: 0,
                ease: "none",
                duration: 45,
                repeat: -1
            });

            // Scroll velocity integration
            let timeoutId: ReturnType<typeof setTimeout>;

            ScrollTrigger.create({
                trigger: document.documentElement,
                start: 0,
                end: "max",
                onUpdate: (self) => {
                    const velocity = self.getVelocity();
                    // Speed up based on scroll velocity
                    const speedMultiplier = 1 + Math.abs(velocity) / 300;
                    const clampedSpeed = Math.min(speedMultiplier, 5);

                    gsap.to([tl1, tl2], {
                        timeScale: clampedSpeed,
                        duration: 0.1,
                        overwrite: true
                    });

                    // Debounce returning to normal speed
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        gsap.to([tl1, tl2], {
                            timeScale: 1,
                            duration: 0.8,
                            ease: "power2.out",
                            overwrite: true
                        });
                    }, 50);
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [reduce]);

    const Card = ({ tpl }: { tpl: any }) => (
        <div className="pr-4 md:pr-6 shrink-0 w-[60vw] md:w-[25vw] max-w-md">
            <div className="aspect-video relative group overflow-hidden rounded-2xl md:rounded-3xl">
                <div className="absolute inset-0 bg-foreground/10 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                <Image
                    src={tpl.img}
                    alt={tpl.name}
                    fill
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                    <h3 className="text-lg md:text-2xl font-medium mb-1">
                        {tpl.name}
                    </h3>
                    <p className="text-white/80 tracking-wide uppercase text-xs font-medium">
                        {tpl.desc}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-32 overflow-hidden bg-background relative flex flex-col gap-4 md:gap-6"
        >
            <div className="container px-4 mb-8">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 leading-[1.1]">
                        Curated for creative visionaries.
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Don't start from a blank canvas unless you want to.
                        Choose from hundreds of meticulously crafted starting
                        points.
                    </p>
                </div>
            </div>

            {/* Marquee Tracks */}
            <div className="relative w-full overflow-hidden">
                {/* Row 1 */}
                <div className="w-full flex">
                    <div ref={row1Ref} className="flex w-max">
                        {[...templates1, ...templates1].map((tpl, i) => (
                            <Card key={i} tpl={tpl} />
                        ))}
                    </div>
                </div>
                <div className="h-4 md:h-6" /> {/* Gap between rows */}
                {/* Row 2 */}
                <div className="w-full flex">
                    <div ref={row2Ref} className="flex w-max">
                        {[...templates2, ...templates2].map((tpl, i) => (
                            <Card key={i} tpl={tpl} />
                        ))}
                    </div>
                </div>
                {/* Ambient vignette overlay for the sides to make the marquee fade in/out slightly */}
                <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-30 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-30 pointer-events-none" />
            </div>
        </section>
    );
}
