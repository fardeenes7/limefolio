import type { SectionProps } from '@/components/sections/_renderer/SectionRenderer';
import { IconArrowRight, IconFileCode, IconGitBranch, IconSearch, IconTag } from '@tabler/icons-react';
import Link from 'next/link';
import { BackToBlogLink, BlogDate, BlogReadingTime, getBlogMeta, getRelatedPosts } from './blogDetailsUtils';

export default function BlogDetailsVsCode({ siteData }: SectionProps) {
    const post = siteData.blog_post;
    if (!post) return null;

    const { author, date, image, paragraphs, readingTime } = getBlogMeta(siteData, post);
    const relatedPosts = getRelatedPosts(siteData, post, 5);
    const fileName = `${post.slug || 'post'}.md`;

    return (
        <article className="bg-background py-6 font-mono text-foreground">
            <div className="mx-auto max-w-theme px-4 sm:px-6">
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-primary/5">
                    <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-2"><IconSearch size={14} /> Blog Workspace</span>
                        <span>Markdown Preview</span>
                    </div>

                    <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)_19rem]">
                        <aside className="border-b border-border bg-background/70 p-4 lg:border-b-0 lg:border-r">
                            <BackToBlogLink className="mb-4 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary" />
                            <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Explorer</p>
                            <div className="space-y-1 text-sm">
                                <div className="rounded bg-muted px-2 py-1 text-foreground">blog</div>
                                <div className="flex items-center gap-2 rounded bg-primary/10 px-2 py-1 text-primary"><IconFileCode size={14} /> {fileName}</div>
                                {post.tags && post.tags.length > 0 && <div className="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground"><IconTag size={14} /> tags ({post.tags.length})</div>}
                            </div>
                        </aside>

                        <main className="min-w-0">
                            <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-2 text-xs text-muted-foreground">
                                <span className="rounded-t border border-border bg-card px-3 py-1 text-foreground">{fileName}</span>
                                <BlogDate date={date} />
                            </div>
                            <div className="p-5 sm:p-8 lg:p-10">
                                <p className="mb-3 text-sm text-muted-foreground"># blog.post</p>
                                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">{post.title}</h1>
                                {post.excerpt && <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{post.excerpt}</p>}

                                <div className="mt-7 flex flex-wrap gap-2">
                                    {post.is_featured && <span className="rounded bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">featured</span>}
                                    {post.tags?.slice(0, 6).map((tag) => <span key={tag} className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">{tag}</span>)}
                                </div>

                                {image && <img src={image} alt={post.title} className="mt-8 aspect-video w-full rounded border border-border object-cover" />}

                                <div className="mt-10 border-l border-border pl-5">
                                    <p className="mb-4 text-sm text-primary">## article-body</p>
                                    <div className="space-y-5 text-base leading-8 text-muted-foreground">
                                        {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>This post does not have any published content yet.</p>}
                                    </div>
                                </div>
                            </div>
                        </main>

                        <aside className="border-t border-border bg-background/70 p-4 lg:border-l lg:border-t-0">
                            <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Source Control</p>
                            <div className="mb-6 rounded border border-border bg-card p-3 text-sm">
                                <div className="mb-2 flex items-center gap-2 text-primary"><IconGitBranch size={15} /> published</div>
                                <p className="text-muted-foreground">{author}</p>
                                <BlogReadingTime minutes={readingTime} className="mt-2 inline-flex items-center gap-2 text-muted-foreground" />
                            </div>
                            <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Related</p>
                            <div className="space-y-2">
                                {relatedPosts.length > 0 ? relatedPosts.map((item) => (
                                    <Link key={item.id} href={`/blog/${item.slug}`} className="group block rounded border border-border bg-card p-3 transition-colors hover:border-primary/60">
                                        <p className="line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary">{item.title}</p>
                                        {item.excerpt && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.excerpt}</p>}
                                    </Link>
                                )) : (
                                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary">Open blog <IconArrowRight size={14} /></Link>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </article>
    );
}
