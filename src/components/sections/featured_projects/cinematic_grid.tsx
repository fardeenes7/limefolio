'use client';

import { useRef, useEffect } from 'react';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconPlayerPlayFilled } from '@tabler/icons-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjectsCinematicGrid({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Featured Works';
    const maxItemsStr = (i.maxItems as string) || '4';
    const maxItems = maxItemsStr === 'all' ? Infinity : parseInt(maxItemsStr, 10);
    const filterByTag = (i.filterByTag as string) || '';
    const hoverToPlay = i.hoverToPlay !== false;
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'View All Projects';

    const containerRef = useRef<HTMLDivElement>(null);

    let allProjects = siteData.projects || [];
    if (filterByTag) {
        const tags = filterByTag.split(',').map((t) => t.trim().toLowerCase());
        allProjects = allProjects.filter((p) => 
            p.technologies && p.technologies.some((tech) => tags.includes(tech.toLowerCase()))
        );
    }

    const featuredOnly = allProjects.filter((p) => p.featured);
    const displayProjects = (featuredOnly.length > 0 ? featuredOnly : allProjects).slice(0, maxItems);

    useGSAP(() => {
        if (!containerRef.current || prefersReducedMotion()) return;

        const cards = containerRef.current.querySelectorAll('.cinematic-card');
        
        if (cards.length === 0) return;

        gsap.fromTo(
            cards,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }, { scope: containerRef, dependencies: [displayProjects, sectionTitle] });

    if (allProjects.length === 0) return null;

    return (
        <section id="projects" className="py-32 bg-background relative z-10">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        {sectionTitle && (
                            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-4">
                                {sectionTitle}
                            </h2>
                        )}
                    </div>
                    
                    {showViewAll && allProjects.length > displayProjects.length && (
                        <div className="shrink-0">
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
                            >
                                {viewAllLabel}
                                <span className="p-2 rounded-full border border-border group-hover:border-primary group-hover:bg-primary/10 transition-all">
                                    <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </div>
                    )}
                </div>

                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {displayProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="cinematic-card group relative flex flex-col gap-6 outline-none"
                        >
                            {/* Thumbnail Container */}
                            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                                {project.thumbnail ? (
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-secondary" />
                                )}
                                
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                
                                {/* Inner Border Glow on hover */}
                                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-500 rounded-md" />

                                {/* Center Play Icon */}
                                {hoverToPlay && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="p-4 rounded-full bg-black/50 backdrop-blur-md text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <IconPlayerPlayFilled size={32} />
                                        </div>
                                    </div>
                                )}
                                
                                {project.featured && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 text-xs font-bold bg-primary text-primary-foreground uppercase tracking-widest rounded-sm">
                                            Featured
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-2">
                                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                                    {project.title}
                                </h3>
                                
                                {project.tagline && (
                                    <p className="text-lg text-muted-foreground line-clamp-1">
                                        {project.tagline}
                                    </p>
                                )}

                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                                        {project.technologies.slice(0, 4).map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="text-sm font-medium text-muted-foreground/80 uppercase tracking-wider"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
