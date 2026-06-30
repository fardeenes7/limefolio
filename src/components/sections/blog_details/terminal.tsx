import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconTerminal2 } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToBlogLink, BlogDate, BlogReadingTime, getBlogMeta, getRelatedPosts } from './blogDetailsUtils';

export default function BlogDetailsTerminal({ siteData }: SectionProps) {
    const post = siteData.blog_post;
    if (!post) return null;

    const { author, date, image, paragraphs, readingTime } = getBlogMeta(siteData, post);
    const relatedPosts = getRelatedPosts(siteData, post, 4);
    const fileName = `${post.slug || 'post'}.md`;

    return (
        <article className="bg-background py-8 font-mono text-foreground">
            <div className="mx-auto max-w-theme px-4 sm:px-6">
                <BackToBlogLink className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary" />

                <section className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/5">
                    <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-2"><IconTerminal2 size={15} className="text-primary" /> ~/blog/{fileName}</span>
                        <span>{post.is_featured ? 'featured' : 'published'}</span>
                    </div>

                    <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_22rem]">
                        <div className="p-5 sm:p-8 lg:p-10">
                            <p className="text-sm text-muted-foreground"><span className="text-primary">$</span> cat {fileName}</p>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl">{post.title}</h1>
                            {post.excerpt && <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{post.excerpt}</p>}

                            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                <div className="rounded border border-border bg-background p-4">
                                    <p className="text-xs text-muted-foreground">author</p>
                                    <p className="mt-1 font-semibold text-primary">{author}</p>
                                </div>
                                <div className="rounded border border-border bg-background p-4">
                                    <p className="text-xs text-muted-foreground">published</p>
                                    <BlogDate date={date} className="mt-1 inline-flex items-center gap-2 font-semibold text-foreground" />
                                </div>
                                <div className="rounded border border-border bg-background p-4">
                                    <p className="text-xs text-muted-foreground">runtime</p>
                                    <BlogReadingTime minutes={readingTime} className="mt-1 inline-flex items-center gap-2 font-semibold text-foreground" />
                                </div>
                            </div>

                            {image && <img src={image} alt={post.title} className="mt-8 aspect-video w-full rounded border border-border object-cover" />}
                        </div>

                        <aside className="border-t border-border bg-background/70 p-5 lg:border-l lg:border-t-0">
                            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">metadata</p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                {(post.categories || []).map((category) => <div key={category} className="rounded border border-border bg-card px-3 py-2">category: {category}</div>)}
                                {(post.tags || []).map((tag) => <div key={tag} className="rounded border border-border bg-card px-3 py-2">tag: {tag}</div>)}
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="grid gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
                    <div className="rounded-lg border border-border bg-card p-5 sm:p-8">
                        <p className="mb-5 text-sm text-muted-foreground"><span className="text-primary">$</span> less {fileName}</p>
                        <div className="space-y-5 text-base leading-8 text-muted-foreground">
                            {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>This post does not have any published content yet.</p>}
                        </div>
                    </div>

                    <aside className="rounded-lg border border-border bg-card p-5 sm:p-6">
                        <p className="mb-4 text-sm text-muted-foreground"><span className="text-primary">$</span> ls related</p>
                        <div className="space-y-3">
                            {relatedPosts.length > 0 ? relatedPosts.map((item) => (
                                <Link key={item.id} href={`/blog/${item.slug}`} className="group flex items-start justify-between gap-3 rounded border border-border bg-background p-3 transition-colors hover:border-primary/60">
                                    <div>
                                        <p className="font-semibold text-foreground group-hover:text-primary">{item.title}</p>
                                        {item.excerpt && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.excerpt}</p>}
                                    </div>
                                    <IconArrowRight size={15} className="mt-1 shrink-0 text-muted-foreground group-hover:text-primary" />
                                </Link>
                            )) : (
                                <Link href="/blog" className="inline-flex items-center gap-2 text-primary">cd ../blog <IconArrowRight size={15} /></Link>
                            )}
                        </div>
                    </aside>
                </section>
            </div>
        </article>
    );
}
