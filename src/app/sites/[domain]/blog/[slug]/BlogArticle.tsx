import Link from "next/link";
import { IconArrowLeft, IconCalendar, IconClock, IconEye } from "@tabler/icons-react";
import type { BlogPost } from "@/types/site";

interface BlogArticleProps {
    post: BlogPost;
    siteTitle: string;
}

function formatDate(value?: string | null) {
    if (!value) return null;
    return new Date(value).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function renderContent(content: string) {
    return content
        .split(/\n{2,}/)
        .map((paragraph, index) => (
            <p key={index} className="text-lg leading-8 text-muted-foreground">
                {paragraph.trim()}
            </p>
        ));
}

export function BlogArticle({ post, siteTitle }: BlogArticleProps) {
    const image = post.cover_image || post.thumbnail || post.thumbnail_url;
    const publishedAt = formatDate(post.published_at);
    const readingTime = post.reading_time_minutes || post.reading_time;
    const author = post.author_name || post.author || siteTitle;

    return (
        <article className="bg-background">
            <div className="container mx-auto max-w-4xl px-6 py-16 md:py-24">
                <Link
                    href="/blog"
                    className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                    <IconArrowLeft size={18} />
                    Back to blog
                </Link>

                <header className="mb-10">
                    {post.categories && post.categories.length > 0 && (
                        <div className="mb-5 flex flex-wrap gap-2">
                            {post.categories.map((category) => (
                                <span key={category} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                                    {category}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="mt-6 text-xl leading-8 text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{author}</span>
                        {publishedAt && (
                            <span className="inline-flex items-center gap-1.5">
                                <IconCalendar size={16} />
                                {publishedAt}
                            </span>
                        )}
                        {readingTime && (
                            <span className="inline-flex items-center gap-1.5">
                                <IconClock size={16} />
                                {readingTime} min read
                            </span>
                        )}
                        {post.view_count !== undefined && (
                            <span className="inline-flex items-center gap-1.5">
                                <IconEye size={16} />
                                {post.view_count} views
                            </span>
                        )}
                    </div>
                </header>

                {image && (
                    <div className="mb-12 overflow-hidden rounded-3xl border border-border bg-muted">
                        <img src={image} alt={post.title} className="aspect-video w-full object-cover" />
                    </div>
                )}

                <div className="space-y-7">
                    {post.content ? renderContent(post.content) : (
                        <p className="text-lg leading-8 text-muted-foreground">
                            {post.excerpt || "This post does not have any published content yet."}
                        </p>
                    )}
                </div>

                {post.tags && post.tags.length > 0 && (
                    <footer className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
                        {post.tags.map((tag) => (
                            <span key={tag} className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">
                                #{tag}
                            </span>
                        ))}
                    </footer>
                )}
            </div>
        </article>
    );
}
