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
    const headline = (i.headline as string) || 'Latest Writing';
    const subheadline = (i.subheadline as string) || 'Thoughts, tutorials, and insights';
    const maxPosts = (i.maxPosts as number) || 3;
    const viewAllLink = i.viewAllLink !== false;

    const allPosts = siteData.blog_posts || [];
    if (allPosts.length === 0) return null;

    const displayPosts = allPosts.slice(0, maxPosts);

    return (
        <section id="blog" className="py-24 bg-muted/30">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {headline}
                        </h2>
                        {subheadline && (
                            <p className="text-lg text-muted-foreground">
                                {subheadline}
                            </p>
                        )}
                    </div>
                    {viewAllLink && allPosts.length > maxPosts && (
                        <Link
                            href="/blog"
                            className="shrink-0 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                        >
                            View All Posts
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
                            {post.cover_image && (
                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                    <img
                                        src={post.cover_image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            <div className="p-6 md:p-8 flex flex-col grow">
                                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                                    {post.published_at && (
                                        <div className="flex items-center gap-1.5">
                                            <IconCalendar size={14} />
                                            {new Date(post.published_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    )}
                                    {post.reading_time_minutes && (
                                        <div className="flex items-center gap-1.5">
                                            <IconClock size={14} />
                                            {post.reading_time_minutes} min read
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">
                                    {post.title}
                                </h3>

                                {post.excerpt && (
                                    <p className="text-muted-foreground line-clamp-3 mb-6">
                                        {post.excerpt}
                                    </p>
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
