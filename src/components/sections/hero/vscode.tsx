import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconBraces, IconBug, IconFileCode, IconPlayerPlay } from '@tabler/icons-react';
import Link from 'next/link';

export default function HeroVsCode({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const headline = (i.headline as string) || siteData.title || 'portfolio';
    const subheadline = (i.subheadline as string) || siteData.tagline || 'developer portfolio';
    const primaryCtaLabel = (i.primaryCtaLabel as string) || 'Open Projects';
    const primaryCtaUrl = (i.primaryCtaUrl as string) || '/projects';
    const secondaryCtaLabel = (i.secondaryCtaLabel as string) || 'Contact Terminal';
    const secondaryCtaUrl = (i.secondaryCtaUrl as string) || '/contact';
    const name = siteData.user?.first_name || headline;
    const rows = [
        ['const name', `'${name}'`],
        ['const role', `'${subheadline}'`],
        ['const projects', `${siteData.projects?.length || 0}`],
        ['const skills', `${siteData.skills?.length || 0}`],
        ['const status', `'${siteData.available_for_hire ? 'available' : 'online'}'`],
    ];

    return (
        <section className="bg-background py-8 font-mono text-foreground">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/5">
                    <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <IconFileCode size={15} className="text-primary" /> README.md
                        </div>
                        <div className="hidden items-center gap-3 sm:flex">
                            <span>Ln 1, Col 1</span>
                            <span>Markdown</span>
                        </div>
                    </div>
                    <div className="grid min-h-[calc(100vh-11rem)] lg:grid-cols-[minmax(0,1fr)_18rem]">
                        <div className="space-y-8 p-5 sm:p-8 lg:p-10">
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground"><span className="text-primary">#</span> portfolio.workspace</p>
                                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">{headline}</h1>
                                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{subheadline}</p>
                            </div>
                            <div className="rounded border border-border bg-background p-4 text-sm leading-7">
                                <p className="text-muted-foreground">export default {'{'}</p>
                                {rows.map(([key, value]) => (
                                    <p key={key} className="pl-4"><span className="text-primary">{key}</span> = <span className="text-accent">{value}</span>;</p>
                                ))}
                                <p className="text-muted-foreground">{'};'}</p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link href={primaryCtaUrl} className="inline-flex items-center justify-center gap-2 rounded border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                                    <IconPlayerPlay size={17} /> {primaryCtaLabel}
                                </Link>
                                <Link href={secondaryCtaUrl} className="inline-flex items-center justify-center gap-2 rounded border border-border bg-muted px-5 py-3 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary">
                                    {secondaryCtaLabel} <IconArrowRight size={17} />
                                </Link>
                            </div>
                        </div>
                        <aside className="border-t border-border bg-background/70 p-5 lg:border-l lg:border-t-0">
                            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground"><IconBug size={14} /> Debug Console</div>
                            <div className="space-y-3 text-sm">
                                {['site compiled', 'routes indexed', 'theme loaded', 'content ready'].map((item) => (
                                    <div key={item} className="flex items-center gap-2 rounded border border-border bg-card px-3 py-2 text-muted-foreground">
                                        <IconBraces size={15} className="text-primary" /> {item}
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    );
}
