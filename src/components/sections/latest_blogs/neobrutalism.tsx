import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconCalendar, IconClock } from '@tabler/icons-react';
import Link from 'next/link';

export default function LatestBlogsNeobrutalism({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Latest Posts';
    const maxItemsStr = (i.maxItems as string) || '3';
    const maxItems = maxItemsStr === 'all' ? undefined : parseInt(maxItemsStr, 10);
    const showExcerpt = i.showExcerpt !== false;
    const showDate = i.showDate !== false;
    const showTags = i.showTags !== false;
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'View All Posts';
    const posts = siteData.blog_posts || [];

    if (posts.length === 0) return null;

    const displayPosts = maxItems === undefined ? posts : posts.slice(0, maxItems);

    return (
        <section id="blog" className="border-b-4 border-border bg-muted py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="border-4 border-border bg-background px-4 py-3 text-4xl font-black uppercase leading-none tracking-tighter text-foreground shadow-[8px_8px_0_hsl(var(--border))] sm:text-6xl">{sectionTitle}</h2>
                    {showViewAll && maxItems !== undefined && posts.length > maxItems && <Link href="/blog" className="inline-flex w-fit items-center gap-2 border-4 border-border bg-accent px-5 py-3 text-sm font-black uppercase text-accent-foreground shadow-[6px_6px_0_hsl(var(--border))]">{viewAllLabel}<IconArrowRight size={18} /></Link>}
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    {displayPosts.map((post, index) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col border-4 border-border bg-card shadow-[8px_8px_0_hsl(var(--border))] transition-transform hover:-translate-x-1 hover:-translate-y-1">
                            {(post.cover_image || post.thumbnail || post.thumbnail_url) && <img src={post.cover_image || post.thumbnail || post.thumbnail_url || ''} alt={post.title} className="aspect-video w-full border-b-4 border-border object-cover grayscale transition-all group-hover:grayscale-0" />}
                            <div className="flex grow flex-col p-6">
                                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-black uppercase text-muted-foreground">
                                    <span className="border-2 border-border bg-primary px-2 py-1 text-primary-foreground">Post {index + 1}</span>
                                    {showDate && post.published_at && <span className="flex items-center gap-1"><IconCalendar size={14} />{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                                    {(post.reading_time_minutes || post.reading_time) && <span className="flex items-center gap-1"><IconClock size={14} />{post.reading_time_minutes || post.reading_time} min</span>}
                                </div>
                                <h3 className="text-2xl font-black uppercase leading-none tracking-tight text-foreground">{post.title}</h3>
                                {showExcerpt && post.excerpt && <p className="mt-4 line-clamp-3 font-semibold leading-relaxed text-muted-foreground">{post.excerpt}</p>}
                                {showTags && post.tags && post.tags.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{post.tags.slice(0, 3).map((tag) => <span key={tag} className="border-2 border-border bg-secondary px-2 py-1 text-xs font-black uppercase text-secondary-foreground">{tag}</span>)}</div>}
                                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black uppercase text-foreground">Read it<IconArrowRight size={16} /></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
