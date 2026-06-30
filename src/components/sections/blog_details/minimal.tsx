import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToBlogLink, BlogDate, BlogReadingTime, getBlogMeta, getRelatedPosts } from './blogDetailsUtils';

export default function BlogDetailsMinimal({ siteData }: SectionProps) {
    const post = siteData.blog_post;
    if (!post) return null;

    const { author, date, image, paragraphs, readingTime } = getBlogMeta(siteData, post);
    const relatedPosts = getRelatedPosts(siteData, post, 3);

    return (
        <article className="bg-background py-12 text-foreground md:py-20">
            <div className="mx-auto max-w-theme px-6">
                <BackToBlogLink className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline" />

                <header className="border-b border-border pb-10">
                    {post.categories && post.categories.length > 0 && <p className="mb-5 text-sm text-muted-foreground">{post.categories.join(' / ')}</p>}
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">{post.title}</h1>
                    {post.excerpt && <p className="mt-6 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>}
                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span>{author}</span>
                        <BlogDate date={date} />
                        <BlogReadingTime minutes={readingTime} />
                    </div>
                </header>

                {image && <img src={image} alt={post.title} className="my-10 aspect-video w-full rounded-lg border border-border object-cover" />}

                <section className="space-y-6 text-lg leading-8 text-muted-foreground">
                    {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>This post does not have any published content yet.</p>}
                </section>

                {post.tags && post.tags.length > 0 && (
                    <footer className="mt-12 flex flex-wrap gap-x-3 gap-y-2 border-t border-border pt-8 text-sm text-muted-foreground">
                        {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                    </footer>
                )}

                <nav className="mt-14 border-t border-border pt-8">
                    <h2 className="mb-4 text-sm font-medium text-foreground">More writing</h2>
                    <div className="divide-y divide-border">
                        {relatedPosts.length > 0 ? relatedPosts.map((item) => (
                            <Link key={item.id} href={`/blog/${item.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
                                <span className="font-medium text-foreground underline-offset-4 group-hover:underline">{item.title}</span>
                                <IconArrowRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                            </Link>
                        )) : (
                            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">All posts <IconArrowRight size={16} /></Link>
                        )}
                    </div>
                </nav>
            </div>
        </article>
    );
}
