/**
 * Media Gallery — Carousel Variant
 *
 * (Placeholder for now since siteData doesn't have a media_gallery field yet)
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';

export default function MediaGalleryCarousel({ section }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Gallery';

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 text-center">
                {sectionTitle && <h2 className="text-3xl font-bold mb-8">{sectionTitle}</h2>}
                <div className="p-12 border-2 border-dashed border-border rounded-xl text-muted-foreground w-full">
                    Media gallery carousel view not yet available in SiteData.
                </div>
            </div>
        </section>
    );
}
