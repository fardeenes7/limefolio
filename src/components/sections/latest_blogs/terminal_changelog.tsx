import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUpRight, IconGitCommit } from '@tabler/icons-react';
import Link from 'next/link';

function formatDate(value?: string | null) {
    if (!value) return 'unreleased';
    return new Date(value).toISOString().slice(0, 10);
}

export default function LatestBlogsTerminalChangelog({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Logs';
    const maxItemsStr = (i.maxItems as string) || '3';
    const maxItems = maxItemsStr === 'all' ? undefined : parseInt(maxItemsStr, 10);
    const showExcerpt = i.showExcerpt !== false;
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'All logs';
    const posts = siteData.blog_posts || [];

    if (posts.length === 0) return null;

    const displayPosts = maxItems === undefined ? posts : posts.slice(0, maxItems);
    const lead = displayPosts[0];
    const rest = displayPosts.slice(1);

    return (
        <section id="blog" className="border-y border-border bg-card py-20 font-mono text-foreground">
            <div className="mx-auto max-w-theme px-6">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-primary">$ git log --oneline ./notes</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{sectionTitle}</h2>
                    </div>
                    {showViewAll && maxItems !== undefined && posts.length > maxItems && <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{viewAllLabel}<IconArrowUpRight size={16} /></Link>}
                </div>

                {lead && (
                    <Link href={`/blog/${lead.slug}`} className="group mb-4 block rounded-lg border border-primary/40 bg-background p-5 shadow-xl shadow-primary/5">
                        <p className="text-xs text-muted-foreground">commit {String(lead.id).padStart(7, '0')} [{formatDate(lead.published_at)}]</p>
                        <h3 className="mt-3 text-2xl font-bold text-foreground group-hover:text-primary sm:text-3xl">{lead.title}</h3>
                        {showExcerpt && lead.excerpt && <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{lead.excerpt}</p>}
                    </Link>
                )}

                <div className="space-y-3">
                    {rest.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group grid gap-3 rounded border border-border bg-background p-4 hover:border-primary/60 sm:grid-cols-[2rem_9rem_1fr_auto] sm:items-start">
                            <IconGitCommit className="text-primary" size={20} />
                            <span className="text-xs text-muted-foreground">{formatDate(post.published_at)}</span>
                            <div>
                                <h3 className="font-semibold text-foreground group-hover:text-primary">{post.title}</h3>
                                {showExcerpt && post.excerpt && <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{post.excerpt}</p>}
                            </div>
                            <IconArrowUpRight className="text-muted-foreground group-hover:text-primary" size={18} />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
