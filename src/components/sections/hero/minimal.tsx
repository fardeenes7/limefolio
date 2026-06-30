import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';

export default function HeroMinimal({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'Software engineer';
    const subheadline = (i.subheadline as string) || siteData.tagline;
    const body = (i.body as string) || siteData.description;
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'Projects';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '/projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'Writing';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '/blog';

    return (
        <section className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-theme px-6">
                {subheadline && <p className="mb-4 text-sm text-muted-foreground">{subheadline}</p>}
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {headline}
                </h1>
                {body && <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">{body}</p>}

                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
                    {primaryCtaLabel && (
                        <Link href={primaryCtaUrl} className="font-medium text-foreground underline underline-offset-4">
                            {primaryCtaLabel}
                        </Link>
                    )}
                    {secondaryCtaLabel && (
                        <Link href={secondaryCtaUrl} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                            {secondaryCtaLabel}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
