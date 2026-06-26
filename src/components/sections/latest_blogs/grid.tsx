/**
 * Latest Blogs — Grid Variant
 *
 * Traditional grid of blog posts.
 */
import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconCalendar, IconClock } from '@tabler/icons-react';
import Link from 'next/link';

export default function LatestBlogsGrid({ section, siteData }: SectionProps) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const sectionTitle = (i.sectionTitle as string) || 'Latest Posts';
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

    return (
        <section id="blog" className="py-24 bg-muted/30">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        {sectionTitle && (
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                {sectionTitle}
                            </h2>
                        )}
                    </div>
                    {showViewAll && maxItems !== undefined && allPosts.length > maxItems && (
                        <Link
                            href="/blog"
                            className="shrink-0 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                        >
                            {viewAllLabel}
                            <IconArrowRight size={20} />
                        </Link>
                    )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {(post.cover_image || post.thumbnail || post.thumbnail_url) && (
                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                    <img
                                        src={post.cover_image || post.thumbnail || post.thumbnail_url || ''}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            <div className="p-6 md:p-8 flex flex-col grow">
                                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                                    {showDate && post.published_at && (
                                        <div className="flex items-center gap-1.5">
                                            <IconCalendar size={14} />
                                            {new Date(post.published_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    )}
                                    {(post.reading_time_minutes || post.reading_time) && (
                                        <div className="flex items-center gap-1.5">
                                            <IconClock size={14} />
                                            {post.reading_time_minutes || post.reading_time} min read
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                                    {post.title}
                                </h3>

                                {showExcerpt && post.excerpt && (
                                    <p className="text-muted-foreground line-clamp-3 mb-6">
                                        {post.excerpt}
                                    </p>
                                )}

                                {showTags && post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {post.tags.slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary">
                                    Read Article
                                    <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
