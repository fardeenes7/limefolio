'use client';

import { useRef } from 'react';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconDownload } from '@tabler/icons-react';
import { useParallax, useFadeUp } from '@/lib/animations';

export default function AboutDirectorCut({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;

    const bio = (i.bio as string) || siteData.description;
    const showProfileImage = i.showProfileImage !== false;
    const showResumeButton = i.showResumeButton !== false;
    const resumeFile = (i.resumeFile as string) || '#';
    const resumeLabel = (i.resumeLabel as string) || 'Download Resume';

    const imageUrl = (i.profileImage as string) || siteData.logo; // fallback for now

    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useParallax(imageRef, 0.15, [imageUrl]); // Slight parallax scroll on the image
    useFadeUp(contentRef, 60, 0.1, [bio]); // Fade up text content

    return (
        <section id="about" className="relative overflow-hidden border-y border-border bg-background py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent" />
            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-center">
                    
                    {/* Image Column */}
                    {showProfileImage && (
                        <div className="relative order-2 h-[60vh] w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-2xl lg:order-1 lg:h-[78vh]">
                            {imageUrl ? (
                                <div 
                                    ref={imageRef} 
                                    className="absolute inset-x-0 -top-[20%] -bottom-[20%] w-full h-[140%] bg-cover bg-center"
                                    style={{ backgroundImage: `url(${imageUrl})` }}
                                />
                            ) : (
                                <div className="w-full h-full bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center text-muted-foreground/50 font-mono">
                                    No Image Provided
                                </div>
                            )}
                            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent z-10" />
                            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent z-10" />
                            <div className="absolute left-4 top-4 z-20 rounded-full border border-primary/40 bg-background/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary backdrop-blur">Scene 02</div>
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl pointer-events-none z-20" />
                        </div>
                    )}

                    {/* Text Column */}
                    <div ref={contentRef} className={`order-1 lg:order-2 ${!showProfileImage ? 'col-span-full max-w-4xl mx-auto text-center' : ''}`}>
                        <h2 className="text-sm tracking-[0.45em] text-primary uppercase font-bold mb-4">
                            Director&apos;s Cut
                        </h2>
                        <h3 className="text-5xl lg:text-7xl font-black text-foreground mb-8 leading-none tracking-tighter uppercase">
                            Behind the lens
                        </h3>

                        {bio ? (
                            <div className="space-y-6 border-l border-primary/40 pl-6 text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed">
                                {bio.split(/\n\s*\n/).map((paragraph, idx) => (
                                    <p key={idx}>{paragraph.trim()}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xl text-muted-foreground italic">
                                Add your bio here.
                            </p>
                        )}

                        {showResumeButton && (
                            <div className={`mt-16 ${!showProfileImage ? 'flex justify-center' : ''}`}>
                                <a
                                    href={resumeFile}
                                    className="group inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-8 py-4 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                                >
                                    <IconDownload size={22} className="group-hover:-translate-y-1 transition-transform" />
                                    {resumeLabel}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
