import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconCalendar, IconClock } from '@tabler/icons-react';
import Link from 'next/link';

export default function LatestBlogsNeobrutalismZine({ section, siteData }: SectionProps) {
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
    const [leadPost, ...restPosts] = displayPosts;

    return (
        <section id="blog" className="border-b-4 border-border bg-background py-20">
            <div className="mx-auto max-w-theme px-6">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="text-5xl font-black uppercase leading-none tracking-tighter text-foreground sm:text-7xl">{sectionTitle}</h2>
                    {showViewAll && maxItems !== undefined && posts.length > maxItems && <Link href="/blog" className="inline-flex w-fit items-center gap-2 border-4 border-border bg-primary px-5 py-3 text-sm font-black uppercase text-primary-foreground shadow-[6px_6px_0_hsl(var(--border))]">{viewAllLabel}<IconArrowRight size={18} /></Link>}
                </div>

                <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
                    <Link href={`/blog/${leadPost.slug}`} className="group border-4 border-border bg-card shadow-[12px_12px_0_hsl(var(--border))] transition-transform hover:-translate-x-1 hover:-translate-y-1">
                        {(leadPost.cover_image || leadPost.thumbnail || leadPost.thumbnail_url) && <img src={leadPost.cover_image || leadPost.thumbnail || leadPost.thumbnail_url || ''} alt={leadPost.title} className="aspect-[16/9] w-full border-b-4 border-border object-cover grayscale transition-all group-hover:grayscale-0" />}
                        <div className="p-6 sm:p-8">
                            <div className="mb-5 flex flex-wrap gap-3 text-xs font-black uppercase text-muted-foreground">
                                <span className="border-2 border-border bg-accent px-2 py-1 text-accent-foreground">Lead story</span>
                                {showDate && leadPost.published_at && <span className="flex items-center gap-1"><IconCalendar size={14} />{new Date(leadPost.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                                {(leadPost.reading_time_minutes || leadPost.reading_time) && <span className="flex items-center gap-1"><IconClock size={14} />{leadPost.reading_time_minutes || leadPost.reading_time} min</span>}
                            </div>
                            <h3 className="text-4xl font-black uppercase leading-none tracking-tighter text-foreground sm:text-5xl">{leadPost.title}</h3>
                            {showExcerpt && leadPost.excerpt && <p className="mt-5 text-lg font-semibold leading-relaxed text-muted-foreground">{leadPost.excerpt}</p>}
                            {showTags && leadPost.tags && leadPost.tags.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{leadPost.tags.slice(0, 4).map((tag) => <span key={tag} className="border-2 border-border bg-secondary px-2 py-1 text-xs font-black uppercase text-secondary-foreground">{tag}</span>)}</div>}
                        </div>
                    </Link>

                    <div className="space-y-5">
                        {restPosts.map((post, index) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group block border-4 border-border bg-muted p-5 shadow-[8px_8px_0_hsl(var(--border))] transition-transform hover:-translate-x-1 hover:-translate-y-1">
                                <span className="mb-3 inline-block border-2 border-border bg-primary px-2 py-1 text-xs font-black uppercase text-primary-foreground">Issue {index + 2}</span>
                                <h3 className="text-2xl font-black uppercase leading-none tracking-tight text-foreground">{post.title}</h3>
                                {showExcerpt && post.excerpt && <p className="mt-3 line-clamp-2 font-semibold leading-relaxed text-muted-foreground">{post.excerpt}</p>}
                                <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase text-foreground">Read<IconArrowRight size={14} /></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
