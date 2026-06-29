"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function AuthBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position between -1 and 1
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
            {/* Base Grid - Much subtler */}
            <div 
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '4rem 4rem',
                    maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 10%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 10%, transparent 80%)'
                }}
            />

            {/* Interactive Glow - Monochromatic with primary accent */}
            <motion.div
                animate={{
                    x: mousePosition.x * 30,
                    y: mousePosition.y * 30
                }}
                transition={{ type: "spring", stiffness: 40, damping: 30 }}
                className="absolute inset-0"
            >
                <div
                    className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[130px] mix-blend-screen animate-pulse"
                    style={{ animationDuration: "6s" }}
                />
                <div
                    className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-zinc-400/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"
                    style={{ animationDuration: "8s" }}
                />
            </motion.div>

            {/* Elegant Monospaced Watermark instead of giant CREATE */}
            <div className="absolute top-12 right-12 opacity-30 flex flex-col items-end gap-1 font-mono text-[10px] tracking-[0.2em] text-background pointer-events-none">
                <span>SYS.LOGIN_v2.4</span>
                <span>AESTHETIC_ENGINE_ACTIVE</span>
                <span>LIME_FOLIO // 2026</span>
            </div>

            {/* Glass Vignette overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_0%,#0a0a0a_120%)]" />
        </div>
    );
}
