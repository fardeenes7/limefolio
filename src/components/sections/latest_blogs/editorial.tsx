import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconCalendar, IconClock } from '@tabler/icons-react';
import Link from 'next/link';

function formatDate(value?: string | null) {
    if (!value) return null;
    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function LatestBlogsEditorial({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Latest Writing';
    const maxItemsStr = (i.maxItems as string) || '3';
    const maxItems = maxItemsStr === 'all' ? undefined : parseInt(maxItemsStr, 10);
    const showExcerpt = i.showExcerpt !== false;
    const showDate = i.showDate !== false;
    const showTags = i.showTags !== false;
    const showViewAll = i.showViewAll !== false;
    const viewAllLabel = (i.viewAllLabel as string) || 'View All Posts';

    const allPosts = siteData.blog_posts || [];
    if (allPosts.length === 0) return null;

    const displayPosts = maxItems === undefined ? allPosts : allPosts.slice(0, maxItems);
    const [leadPost, ...sidePosts] = displayPosts;
    const leadImage = leadPost.cover_image || leadPost.thumbnail || leadPost.thumbnail_url;

    return (
        <section id="blog" className="bg-background py-24">
            <div className="container mx-auto max-w-theme px-6">
                <div className="mb-14 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Journal</p>
                        <h2 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">{sectionTitle}</h2>
                    </div>
                    {showViewAll && maxItems !== undefined && allPosts.length > maxItems && (
                        <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3">
                            {viewAllLabel}
                            <IconArrowRight size={18} />
                        </Link>
                    )}
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <Link href={`/blog/${leadPost.slug}`} className="group block">
                        {leadImage && (
                            <div className="mb-7 aspect-video overflow-hidden rounded-3xl bg-muted">
                                <img src={leadImage} alt={leadPost.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            {showDate && leadPost.published_at && <span className="inline-flex items-center gap-1.5"><IconCalendar size={15} />{formatDate(leadPost.published_at)}</span>}
                            {(leadPost.reading_time_minutes || leadPost.reading_time) && <span className="inline-flex items-center gap-1.5"><IconClock size={15} />{leadPost.reading_time_minutes || leadPost.reading_time} min read</span>}
                        </div>
                        <h3 className="mt-4 text-3xl font-black tracking-tight text-foreground group-hover:text-primary md:text-5xl">{leadPost.title}</h3>
                        {showExcerpt && leadPost.excerpt && <p className="mt-5 text-lg leading-8 text-muted-foreground">{leadPost.excerpt}</p>}
                    </Link>

                    <div className="divide-y divide-border">
                        {sidePosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group block py-6 first:pt-0">
                                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                    {showDate && post.published_at && <span>{formatDate(post.published_at)}</span>}
                                    {(post.reading_time_minutes || post.reading_time) && <span>{post.reading_time_minutes || post.reading_time} min read</span>}
                                </div>
                                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary">{post.title}</h3>
                                {showExcerpt && post.excerpt && <p className="mt-3 line-clamp-2 text-muted-foreground">{post.excerpt}</p>}
                                {showTags && post.tags && post.tags.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {post.tags.slice(0, 3).map((tag) => <span key={tag} className="text-xs text-primary">#{tag}</span>)}
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
