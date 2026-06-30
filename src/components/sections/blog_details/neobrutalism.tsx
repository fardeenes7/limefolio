import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconBolt, IconHash } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToBlogLink, BlogDate, BlogReadingTime, getBlogMeta, getRelatedPosts } from './blogDetailsUtils';

export default function BlogDetailsNeobrutalism({ siteData }: SectionProps) {
    const post = siteData.blog_post;
    if (!post) return null;

    const { author, date, image, paragraphs, readingTime } = getBlogMeta(siteData, post);
    const relatedPosts = getRelatedPosts(siteData, post, 3);

    return (
        <article className="border-b-4 border-border bg-background text-foreground">
            <section className="border-b-4 border-border bg-muted py-10 md:py-16">
                <div className="mx-auto max-w-theme px-6">
                    <BackToBlogLink className="mb-8 inline-flex items-center gap-2 border-4 border-border bg-background px-4 py-2 text-sm font-black uppercase text-foreground shadow-[5px_5px_0_hsl(var(--border))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5" />
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
                        <div>
                            <div className="mb-5 flex flex-wrap items-center gap-3">
                                <span className="border-4 border-border bg-primary px-3 py-1 text-xs font-black uppercase text-primary-foreground">Article</span>
                                <BlogDate date={date} className="inline-flex items-center gap-2 border-4 border-border bg-accent px-3 py-1 text-xs font-black uppercase text-accent-foreground" />
                            </div>
                            <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter text-foreground md:text-7xl lg:text-8xl">{post.title}</h1>
                            {post.excerpt && <p className="mt-6 max-w-3xl text-xl font-semibold leading-8 text-muted-foreground">{post.excerpt}</p>}
                        </div>

                        <aside className="border-4 border-border bg-card p-5 shadow-[10px_10px_0_hsl(var(--border))]">
                            <p className="mb-4 text-sm font-black uppercase tracking-widest text-muted-foreground">Post Meta</p>
                            <div className="space-y-3 text-sm font-black uppercase">
                                <p>By {author}</p>
                                <BlogReadingTime minutes={readingTime} className="inline-flex items-center gap-2" />
                                {post.view_count !== undefined && <p>{post.view_count} views</p>}
                            </div>
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {post.tags.slice(0, 6).map((tag) => <span key={tag} className="border-2 border-border bg-secondary px-2 py-1 text-xs font-black uppercase text-secondary-foreground">{tag}</span>)}
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>

            {image && (
                <section className="border-b-4 border-border bg-background py-8">
                    <div className="mx-auto max-w-theme px-6">
                        <div className="border-4 border-border bg-primary p-3 shadow-[12px_12px_0_hsl(var(--border))]">
                            <img src={image} alt={post.title} className="aspect-video w-full border-4 border-border object-cover grayscale transition-all hover:grayscale-0" />
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12 md:py-20">
                <div className="mx-auto grid max-w-theme gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
                    <div className="border-4 border-border bg-card p-6 shadow-[10px_10px_0_hsl(var(--border))] sm:p-10">
                        <p className="mb-5 inline-flex items-center gap-2 border-4 border-border bg-accent px-3 py-1 text-sm font-black uppercase text-accent-foreground"><IconBolt size={18} /> The take</p>
                        <div className="space-y-6 text-lg font-semibold leading-8 text-foreground">
                            {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>This post does not have any published content yet.</p>}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-10 flex flex-wrap gap-2 border-t-4 border-border pt-6">
                                {post.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 border-4 border-border bg-background px-3 py-1 text-xs font-black uppercase"><IconHash size={14} />{tag}</span>)}
                            </div>
                        )}
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        <div className="border-4 border-border bg-primary p-5 text-primary-foreground shadow-[8px_8px_0_hsl(var(--border))]">
                            <p className="text-sm font-black uppercase tracking-widest">Scoreboard</p>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                                <div className="border-4 border-border bg-background p-3 text-foreground"><p className="text-2xl font-black">{post.tags?.length || 0}</p><p className="text-xs font-black uppercase">Tags</p></div>
                                <div className="border-4 border-border bg-background p-3 text-foreground"><p className="text-2xl font-black">{readingTime || 0}</p><p className="text-xs font-black uppercase">Mins</p></div>
                            </div>
                        </div>
                        <div className="border-4 border-border bg-card p-5 shadow-[8px_8px_0_hsl(var(--border))]">
                            <p className="mb-4 text-sm font-black uppercase tracking-widest text-muted-foreground">More Posts</p>
                            <div className="space-y-3">
                                {relatedPosts.length > 0 ? relatedPosts.map((item) => (
                                    <Link key={item.id} href={`/blog/${item.slug}`} className="group flex items-center justify-between gap-3 border-4 border-border bg-background p-3 font-black uppercase transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">
                                        <span>{item.title}</span>
                                        <IconArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                )) : (
                                    <Link href="/blog" className="inline-flex items-center gap-2 font-black uppercase text-primary">All posts <IconArrowRight size={18} /></Link>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </article>
    );
}
