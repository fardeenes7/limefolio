import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';

function formatDate(value?: string | null) {
    if (!value) return 'unknown';
    return new Date(value).toISOString().slice(0, 10);
}

export default function LatestBlogsTerminal({ section, siteData }: SectionProps) {
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

    return (
        <section id="blog" className="border-y border-border bg-card py-20 font-mono">
            <div className="mx-auto max-w-theme px-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">$ tail -f ./{sectionTitle.toLowerCase()}</h2>
                    {showViewAll && maxItems !== undefined && posts.length > maxItems && <Link href="/blog" className="text-sm text-primary hover:underline">{viewAllLabel}</Link>}
                </div>
                <div className="space-y-3">
                    {displayPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="block rounded border border-border bg-background p-4 hover:border-primary/60">
                            <p className="text-xs text-muted-foreground">[{formatDate(post.published_at)}] INFO opened {post.slug}.md</p>
                            <h3 className="mt-2 font-semibold text-foreground">{post.title}</h3>
                            {showExcerpt && post.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
