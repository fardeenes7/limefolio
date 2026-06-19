/**
 * About — Default Variant
 *
 * Clean two-column split with profile image on the left and bio on the right.
 * Optional resume button.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconDownload } from '@tabler/icons-react';

export default function AboutDefault({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;

    const headline = (i.headline as string) || 'About Me';
    const body = (i.body as string) || siteData.description;
    const showImage = i.showImage !== false;
    const showResumeButton = i.showResumeButton !== false;
    const resumeLink = (i.resumeLink as string) || '#';
    const resumeLabel = (i.resumeLabel as string) || 'Download Resume';

    // In a real app, this would be a dedicated about image from the DB
    const imageUrl = siteData.logo; // fallback for now

    return (
        <section id="about" className="py-24 bg-background">
            <div className="container max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
                    {/* Image Column */}
                    {showImage && (
                        <div className="relative aspect-square md:aspect-4/5 rounded-2xl overflow-hidden bg-muted order-2 md:order-1">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="About me"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center text-muted-foreground/50">
                                    No Image
                                </div>
                            )}
                            <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-2xl pointer-events-none" />
                        </div>
                    )}

                    {/* Text Column */}
                    <div className={`order-1 ${showImage ? 'md:order-2' : 'col-span-full max-w-3xl mx-auto text-center'}`}>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
                            {headline}
                        </h2>

                        {body ? (
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                {/* Split body by double newlines into paragraphs */}
                                {body.split(/\n\s*\n/).map((paragraph, idx) => (
                                    <p key={idx}>{paragraph.trim()}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-lg text-muted-foreground italic">
                                Add your bio here.
                            </p>
                        )}

                        {showResumeButton && (
                            <div className={`mt-10 ${!showImage ? 'flex justify-center' : ''}`}>
                                <a
                                    href={resumeLink}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                                >
                                    <IconDownload size={20} />
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
