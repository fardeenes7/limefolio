'use client';

import { useRef } from 'react';
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconDownload } from '@tabler/icons-react';
import { useParallax, useFadeUp } from '@/lib/animations';

export default function AboutDirectorCut({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;

    const headline = (i.headline as string) || 'The Director';
    const body = (i.body as string) || siteData.description;
    const showImage = i.showImage !== false;
    const showResumeButton = i.showResumeButton !== false;
    const resumeLink = (i.resumeLink as string) || '#';
    const resumeLabel = (i.resumeLabel as string) || 'Download Resume';

    const imageUrl = (i.profileImage as string) || siteData.logo; // fallback for now

    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useParallax(imageRef, 0.15, [imageUrl]); // Slight parallax scroll on the image
    useFadeUp(contentRef, 60, 0.1, [headline, body]); // Fade up text content

    return (
        <section id="about" className="py-32 bg-background relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Image Column */}
                    {showImage && (
                        <div className="relative order-2 lg:order-1 h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-md border border-border bg-secondary">
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
                            {/* Cinematic letterbox overlay */}
                            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent z-10" />
                            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent z-10" />
                            
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-md pointer-events-none z-20" />
                        </div>
                    )}

                    {/* Text Column */}
                    <div ref={contentRef} className={`order-1 lg:order-2 ${!showImage ? 'col-span-full max-w-4xl mx-auto text-center' : ''}`}>
                        <h2 className="text-sm tracking-[0.3em] text-primary uppercase font-bold mb-4">
                            Director's Cut
                        </h2>
                        <h3 className="text-4xl lg:text-6xl font-black text-foreground mb-8 leading-tight tracking-tighter uppercase">
                            {headline}
                        </h3>

                        {body ? (
                            <div className="space-y-6 text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed">
                                {body.split(/\n\s*\n/).map((paragraph, idx) => (
                                    <p key={idx}>{paragraph.trim()}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xl text-muted-foreground italic">
                                Add your bio here.
                            </p>
                        )}

                        {showResumeButton && (
                            <div className={`mt-16 ${!showImage ? 'flex justify-center' : ''}`}>
                                <a
                                    href={resumeLink}
                                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border bg-card text-foreground font-semibold hover:border-primary hover:text-primary transition-all shadow-sm"
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
