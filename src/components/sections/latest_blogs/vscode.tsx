import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowUpRight, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

function formatDate(date?: string | null) {
    if (!date) return 'draft';
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
}

export default function LatestBlogsVsCode({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Search Results';
    const maxItemsStr = (i.maxItems as string) || '3';
    const maxItems = maxItemsStr === 'all' ? Infinity : parseInt(maxItemsStr, 10);
    const showExcerpt = i.showExcerpt !== false;
    const showDate = i.showDate !== false;
    const showTags = i.showTags !== false;
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'Open Blog';
    const posts = (siteData.blog_posts || []).slice(0, maxItems);

    if (posts.length === 0) return null;

    return (
        <section id="blog" className="bg-background py-8 font-mono">
            <div className="mx-auto max-w-theme px-4 sm:px-6">
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-2"><IconSearch size={14} /> {sectionTitle}</span>
                        {showViewAll && <Link href="/blog" className="inline-flex items-center gap-1 text-primary hover:underline">{viewAllLabel}<IconArrowUpRight size={13} /></Link>}
                    </div>
                    <div className="divide-y divide-border">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="block px-4 py-4 transition hover:bg-muted/40">
                                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                    <span className="text-primary">blog/{post.slug}.md</span>
                                    {showDate && <span>{formatDate(post.published_at)}</span>}
                                </div>
                                <h3 className="mt-2 text-lg font-semibold text-foreground">{post.title}</h3>
                                {showExcerpt && post.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>}
                                {showTags && post.tags && post.tags.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {post.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded bg-muted px-2 py-1 text-[11px] text-muted-foreground">#{tag}</span>)}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
