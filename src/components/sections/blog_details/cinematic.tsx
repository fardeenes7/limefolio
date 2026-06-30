import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconPlayerPlayFilled, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToBlogLink, BlogDate, BlogReadingTime, getBlogMeta, getRelatedPosts } from './blogDetailsUtils';

export default function BlogDetailsCinematic({ siteData }: SectionProps) {
    const post = siteData.blog_post;
    if (!post) return null;

    const { author, date, image, paragraphs, readingTime } = getBlogMeta(siteData, post);
    const relatedPosts = getRelatedPosts(siteData, post, 3);

    return (
        <article className="overflow-hidden bg-background text-foreground">
            <section className="relative min-h-[88vh] overflow-hidden border-b border-border">
                {image ? <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60" /> : <div className="absolute inset-0 bg-muted" />}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/25" />
                <div className="absolute inset-x-0 top-10 h-px bg-primary/40" />
                <div className="absolute inset-x-0 bottom-10 h-px bg-primary/40" />

                <div className="relative mx-auto flex min-h-[88vh] max-w-theme flex-col justify-end px-6 py-16 md:py-24">
                    <BackToBlogLink className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-4 py-2 text-sm font-semibold text-primary backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground" />
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
                        <div>
                            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-primary">
                                <span>Production Note</span>
                                <BlogDate date={date} className="inline-flex items-center gap-2 text-primary" />
                            </div>
                            <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter text-foreground md:text-7xl lg:text-8xl">{post.title}</h1>
                            {post.excerpt && <p className="mt-7 max-w-3xl text-xl leading-8 text-muted-foreground md:text-2xl">{post.excerpt}</p>}
                        </div>

                        <aside className="rounded-3xl border border-border bg-card/80 p-5 shadow-2xl shadow-primary/10 backdrop-blur">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <IconUserCircle size={26} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Written by</p>
                                    <p className="font-semibold text-foreground">{author}</p>
                                </div>
                            </div>
                            <BlogReadingTime minutes={readingTime} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground" />
                        </aside>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="mx-auto grid max-w-theme gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
                    <div>
                        <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-primary">Director&apos;s Notes</p>
                        <div className="space-y-7 text-xl leading-9 text-muted-foreground">
                            {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>This post does not have any published content yet.</p>}
                        </div>
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        {post.tags && post.tags.length > 0 && (
                            <div className="rounded-3xl border border-border bg-card p-6">
                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Credits</p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{tag}</span>)}
                                </div>
                            </div>
                        )}
                        <div className="rounded-3xl border border-border bg-card p-6">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Next Notes</p>
                            <div className="space-y-3">
                                {relatedPosts.length > 0 ? relatedPosts.map((item) => (
                                    <Link key={item.id} href={`/blog/${item.slug}`} className="group block rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/60">
                                        <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary"><IconPlayerPlayFilled size={12} /> Read</span>
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary">{item.title}</h3>
                                            <IconArrowRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                        </div>
                                    </Link>
                                )) : (
                                    <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-primary">Browse the archive <IconArrowRight size={16} /></Link>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </article>
    );
}
