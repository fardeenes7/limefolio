import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconHash, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToBlogLink, BlogDate, BlogReadingTime, BlogViews, getBlogMeta, getRelatedPosts } from './blogDetailsUtils';

export default function BlogDetailsDefault({ siteData }: SectionProps) {
    const post = siteData.blog_post;
    if (!post) return null;

    const { author, date, image, paragraphs, readingTime } = getBlogMeta(siteData, post);
    const relatedPosts = getRelatedPosts(siteData, post, 3);

    return (
        <article className="bg-background text-foreground">
            <header className="border-b border-border">
                <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
                    <BackToBlogLink className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" />

                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
                        <div>
                            {post.categories && post.categories.length > 0 && (
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {post.categories.map((category) => <span key={category} className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">{category}</span>)}
                                </div>
                            )}

                            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight text-foreground md:text-7xl lg:text-8xl">
                                {post.title}
                            </h1>

                            {post.excerpt && <p className="mt-8 max-w-3xl text-xl leading-8 text-muted-foreground md:text-2xl md:leading-9">{post.excerpt}</p>}
                        </div>

                        <aside className="border-l border-border pl-6">
                            <dl className="space-y-5 text-sm">
                                <div>
                                    <dt className="font-medium uppercase tracking-widest text-muted-foreground">Author</dt>
                                    <dd className="mt-1 inline-flex items-center gap-2 text-foreground"><IconUserCircle size={16} /> {author}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium uppercase tracking-widest text-muted-foreground">Published</dt>
                                    <dd className="mt-1"><BlogDate date={date} className="inline-flex items-center gap-2 text-foreground" /></dd>
                                </div>
                                <div>
                                    <dt className="font-medium uppercase tracking-widest text-muted-foreground">Read</dt>
                                    <dd className="mt-1"><BlogReadingTime minutes={readingTime} className="inline-flex items-center gap-2 text-foreground" /></dd>
                                </div>
                            </dl>
                        </aside>
                    </div>
                </div>
            </header>

            {image && (
                <section className="py-8 md:py-12">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="overflow-hidden rounded-[2rem] border border-border bg-muted shadow-2xl shadow-foreground/10">
                            <img src={image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div className="max-w-3xl">
                        <div className="mb-8 flex items-center justify-between gap-6 border-b border-border pb-5">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Article</h2>
                            <BlogViews views={post.view_count} />
                        </div>

                        <div className="space-y-7 text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
                            {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>This post does not have any published content yet.</p>}
                        </div>

                        {post.tags && post.tags.length > 0 && (
                            <footer className="mt-12 border-t border-border pt-8">
                                <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-sm font-medium text-foreground"><IconHash size={14} />{tag}</span>)}
                                </div>
                            </footer>
                        )}
                    </div>

                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <div className="space-y-8 border-l border-border pl-6">
                            <div>
                                <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">More Posts</h2>
                                <div className="divide-y divide-border">
                                    {relatedPosts.length > 0 ? relatedPosts.map((item) => (
                                        <Link key={item.id} href={`/blog/${item.slug}`} className="group block py-4 first:pt-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="font-medium text-foreground underline-offset-4 group-hover:underline">{item.title}</h3>
                                                    {item.excerpt && <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.excerpt}</p>}
                                                </div>
                                                <IconArrowRight size={16} className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                            </div>
                                        </Link>
                                    )) : (
                                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">View all posts <IconArrowRight size={16} /></Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </article>
    );
}
