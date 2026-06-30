/**
 * SectionWireframe
 *
 * Tiny inline SVG wireframe thumbnails for each section component type.
 * Used in the section list to give a quick visual preview of each section's layout.
 */

import React from "react";
import { cn } from "@/lib/utils";

interface WireframeProps {
    className?: string;
}

// Helper primitives
const Bar = ({ x, y, w, h, opacity = 1, rx = 1 }: { x: number; y: number; w: number; h: number; opacity?: number; rx?: number }) => (
    <rect x={x} y={y} width={w} height={h} rx={rx} fill="currentColor" opacity={opacity} />
);

const Circle = ({ cx, cy, r, opacity = 1 }: { cx: number; cy: number; r: number; opacity?: number }) => (
    <circle cx={cx} cy={cy} r={r} fill="currentColor" opacity={opacity} />
);

// ── Wireframe definitions ──────────────────────────────────────────────────────

const WIREFRAMES: Record<string, (props: WireframeProps) => React.ReactElement> = {
    hero: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            {/* Nav */}
            <Bar x={2} y={2} w={8} h={2} opacity={0.5} />
            <Bar x={36} y={2} w={10} h={2} opacity={0.3} />
            {/* Headline */}
            <Bar x={10} y={10} w={28} h={3} opacity={0.8} />
            <Bar x={14} y={15} w={20} h={2} opacity={0.45} />
            {/* CTA */}
            <Bar x={17} y={20} w={14} h={4} rx={2} opacity={0.6} />
        </svg>
    ),
    about: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            {/* Avatar circle */}
            <Circle cx={10} cy={16} r={7} opacity={0.25} />
            <Circle cx={10} cy={16} r={7} opacity={0} />
            <circle cx={10} cy={16} r={7} stroke="currentColor" strokeWidth="1.2" opacity={0.4} fill="none" />
            {/* Text lines */}
            <Bar x={22} y={9} w={20} h={2.5} opacity={0.7} />
            <Bar x={22} y={14} w={18} h={1.5} opacity={0.35} />
            <Bar x={22} y={18} w={14} h={1.5} opacity={0.35} />
            <Bar x={22} y={22} w={10} h={3} rx={2} opacity={0.5} />
        </svg>
    ),
    skills: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            {/* Title */}
            <Bar x={14} y={3} w={20} h={2} opacity={0.6} />
            {/* Skill pills */}
            {[0, 1, 2].map(row => [0, 1, 2].map(col => (
                <Bar key={`${row}-${col}`} x={4 + col * 15} y={9 + row * 7} w={12} h={5} rx={2.5} opacity={0.25 + col * 0.1} />
            )))}
        </svg>
    ),
    featured_projects: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            {/* Title */}
            <Bar x={14} y={2} w={20} h={2} opacity={0.55} />
            {/* 3 project cards */}
            {[0, 1, 2].map(i => (
                <g key={i}>
                    <rect x={3 + i * 15} y={8} width={13} height={20} rx={2} stroke="currentColor" strokeWidth="0.8" opacity={0.3} fill="currentColor" fillOpacity={0.07} />
                    <Bar x={5 + i * 15} y={10} w={9} h={6} opacity={0.2} />
                    <Bar x={5 + i * 15} y={18} w={7} h={1.5} opacity={0.4} />
                    <Bar x={5 + i * 15} y={21} w={5} h={1} opacity={0.25} />
                </g>
            ))}
        </svg>
    ),
    media_gallery: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            {/* Title */}
            <Bar x={14} y={2} w={20} h={2} opacity={0.55} />
            {/* Masonry grid */}
            <rect x={3} y={7} width={12} height={18} rx={2} fill="currentColor" opacity={0.18} />
            <rect x={17} y={7} width={12} height={10} rx={2} fill="currentColor" opacity={0.18} />
            <rect x={17} y={19} width={12} height={6} rx={2} fill="currentColor" opacity={0.18} />
            <rect x={31} y={7} width={14} height={14} rx={2} fill="currentColor" opacity={0.18} />
            <rect x={31} y={23} width={14} height={2} rx={1} fill="currentColor" opacity={0.1} />
        </svg>
    ),
    project_details: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            <Bar x={4} y={4} w={22} h={3} opacity={0.65} />
            <Bar x={4} y={9} w={16} h={1.6} opacity={0.35} />
            <rect x={4} y={14} width={23} height={12} rx={2} fill="currentColor" opacity={0.16} />
            <rect x={31} y={5} width={13} height={8} rx={2} fill="currentColor" opacity={0.1} stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" />
            <Circle cx={35} cy={9} r={2} opacity={0.28} />
            <Bar x={39} y={8} w={4} h={1.2} opacity={0.35} />
            <Bar x={31} y={18} w={13} h={1.4} opacity={0.4} />
            <Bar x={31} y={22} w={10} h={1.2} opacity={0.25} />
            <Bar x={31} y={26} w={12} h={1.2} opacity={0.25} />
        </svg>
    ),
    latest_blogs: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            {/* Title */}
            <Bar x={14} y={2} w={20} h={2} opacity={0.55} />
            {/* 3 blog cards */}
            {[0, 1, 2].map(i => (
                <g key={i}>
                    <Bar x={3 + i * 15} y={8} w={13} h={5} opacity={0.18} />
                    <Bar x={3 + i * 15} y={15} w={11} h={1.5} opacity={0.4} />
                    <Bar x={3 + i * 15} y={18} w={8} h={1} opacity={0.25} />
                    <Bar x={3 + i * 15} y={21} w={5} h={1} opacity={0.2} />
                </g>
            ))}
        </svg>
    ),
    cta: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            <rect x={3} y={3} width={42} height={26} rx={3} fill="currentColor" opacity={0.08} stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
            <Bar x={10} y={9} w={28} h={3} opacity={0.55} />
            <Bar x={14} y={14} w={20} h={2} opacity={0.3} />
            <Bar x={17} y={20} w={14} h={5} rx={2.5} opacity={0.5} />
        </svg>
    ),
    testimonials: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            {/* Title */}
            <Bar x={14} y={2} w={20} h={2} opacity={0.55} />
            {/* Quote */}
            <rect x={6} y={8} width={36} height={16} rx={3} fill="currentColor" opacity={0.08} stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
            <Bar x={10} y={12} w={28} h={1.5} opacity={0.35} />
            <Bar x={10} y={15} w={22} h={1.5} opacity={0.35} />
            {/* Avatar + name */}
            <Circle cx={14} cy={27} r={2.5} opacity={0.3} />
            <Bar x={19} y={26} w={14} h={1.5} opacity={0.4} />
            <Bar x={19} y={29} w={10} h={1} opacity={0.25} />
        </svg>
    ),
    contact: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            {/* Title */}
            <Bar x={14} y={2} w={20} h={2} opacity={0.55} />
            {/* Form fields */}
            <rect x={6} y={8} width={36} height={5} rx={1.5} fill="none" stroke="currentColor" strokeWidth="0.8" opacity={0.3} />
            <rect x={6} y={15} width={36} height={5} rx={1.5} fill="none" stroke="currentColor" strokeWidth="0.8" opacity={0.3} />
            <rect x={6} y={22} width={36} height={4} rx={1.5} fill="none" stroke="currentColor" strokeWidth="0.8" opacity={0.3} />
            {/* Submit */}
            <Bar x={16} y={28} w={16} h={3} rx={1.5} opacity={0.5} />
        </svg>
    ),
    header: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            <rect x={0} y={0} width={48} height={32} rx={0} fill="currentColor" opacity={0.05} />
            <Bar x={4} y={13} w={8} h={2.5} opacity={0.55} />
            <Bar x={22} y={14} w={6} h={1.5} opacity={0.3} />
            <Bar x={30} y={14} w={6} h={1.5} opacity={0.3} />
            <Bar x={38} y={12} w={6} h={4} rx={2} opacity={0.5} />
            {/* Bottom border */}
            <rect x={0} y={30} width={48} height={1} fill="currentColor" opacity={0.2} />
        </svg>
    ),
    footer: ({ className }) => (
        <svg viewBox="0 0 48 32" className={className} fill="none">
            <rect x={0} y={0} width={48} height={32} fill="currentColor" opacity={0.05} />
            <Bar x={4} y={6} w={10} h={2.5} opacity={0.5} />
            <Bar x={4} y={11} w={18} h={1.5} opacity={0.25} />
            {/* Social icons */}
            {[0,1,2,3].map(i => <Circle key={i} cx={30 + i * 5} cy={10} r={2} opacity={0.25} />)}
            {/* Copyright */}
            <Bar x={12} y={24} w={24} h={1.5} opacity={0.2} />
            {/* Top border */}
            <rect x={0} y={1} width={48} height={1} fill="currentColor" opacity={0.2} />
        </svg>
    ),
};

const FALLBACK: (props: WireframeProps) => React.ReactElement = ({ className }) => (
    <svg viewBox="0 0 48 32" className={className} fill="none">
        <Bar x={8} y={8} w={32} h={2} opacity={0.5} />
        <Bar x={4} y={14} w={40} h={1.5} opacity={0.25} />
        <Bar x={4} y={18} w={36} h={1.5} opacity={0.25} />
        <Bar x={4} y={22} w={28} h={1.5} opacity={0.25} />
    </svg>
);

interface SectionWireframeProps {
    componentKey: string;
    className?: string;
}

export function SectionWireframe({ componentKey, className }: SectionWireframeProps) {
    const Wireframe = WIREFRAMES[componentKey] ?? FALLBACK;
    return (
        <Wireframe
            className={cn("text-foreground", className)}
        />
    );
}
