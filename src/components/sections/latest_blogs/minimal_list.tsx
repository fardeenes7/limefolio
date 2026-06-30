import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import Link from 'next/link';

function formatDate(value?: string | null) {
    if (!value) return null;
    return new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function LatestBlogsMinimalList({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Writing';
    const maxItemsStr = (i.maxItems as string) || '3';
    const maxItems = maxItemsStr === 'all' ? undefined : parseInt(maxItemsStr, 10);
    const showExcerpt = i.showExcerpt === true;
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'All posts';

    const allPosts = siteData.blog_posts || [];
    if (allPosts.length === 0) return null;

    const displayPosts = maxItems === undefined ? allPosts : allPosts.slice(0, maxItems);

    return (
        <section id="blog" className="bg-background py-12">
            <div className="mx-auto max-w-theme px-6">
                <div className="border-t border-border pt-8">
                    <div className="mb-5 flex items-baseline justify-between gap-4">
                        {sectionTitle && <h2 className="text-sm font-medium text-foreground">{sectionTitle}</h2>}
                        {showViewAll && maxItems !== undefined && allPosts.length > maxItems && (
                            <Link href="/blog" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                                {viewAllLabel}
                            </Link>
                        )}
                    </div>

                    <div className="divide-y divide-border">
                        {displayPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group grid gap-2 py-5 sm:grid-cols-[1fr_7rem]">
                                <div>
                                    <h3 className="font-medium text-foreground underline-offset-4 group-hover:underline">{post.title}</h3>
                                    {showExcerpt && post.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>}
                                </div>
                                <p className="text-sm text-muted-foreground sm:text-right">{formatDate(post.published_at)}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
