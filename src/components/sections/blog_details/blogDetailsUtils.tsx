import { IconArrowLeft, IconArrowRight, IconCalendar, IconClock, IconEye } from '@tabler/icons-react';
import Link from 'next/link';
import type { BlogPost, SiteData } from '@/types/site';

export function getBlogImage(post: BlogPost) {
    return post.cover_image || post.thumbnail || post.thumbnail_url || null;
}

export function getBlogAuthor(siteData: SiteData, post: BlogPost) {
    return post.author_name || post.author || [siteData.user?.first_name, siteData.user?.last_name].filter(Boolean).join(' ') || siteData.title;
}

export function formatBlogDate(value?: string | null) {
    if (!value) return null;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

export function splitBlogParagraphs(value?: string | null) {
    return (value || '')
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
}

export function getBlogReadingTime(post: BlogPost) {
    return post.reading_time_minutes || post.reading_time || null;
}

export function getRelatedPosts(siteData: SiteData, post: BlogPost, limit = 3) {
    return (siteData.blog_posts || []).filter((item) => item.slug !== post.slug).slice(0, limit);
}

export function getBlogMeta(siteData: SiteData, post: BlogPost) {
    return {
        author: getBlogAuthor(siteData, post),
        date: formatBlogDate(post.published_at),
        image: getBlogImage(post),
        paragraphs: splitBlogParagraphs(post.content || post.excerpt),
        readingTime: getBlogReadingTime(post),
    };
}

export function BackToBlogLink({ className = '' }: { className?: string }) {
    return (
        <Link href="/blog" className={className || 'inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary'}>
            <IconArrowLeft size={16} />
            Back to blog
        </Link>
    );
}

export function BlogDate({ date, className = '' }: { date: string | null; className?: string }) {
    if (!date) return null;

    return (
        <span className={className || 'inline-flex items-center gap-2 text-sm text-muted-foreground'}>
            <IconCalendar size={16} />
            {date}
        </span>
    );
}

export function BlogReadingTime({ minutes, className = '' }: { minutes: number | null; className?: string }) {
    if (!minutes) return null;

    return (
        <span className={className || 'inline-flex items-center gap-2 text-sm text-muted-foreground'}>
            <IconClock size={16} />
            {minutes} min read
        </span>
    );
}

export function BlogViews({ views, className = '' }: { views?: number; className?: string }) {
    if (views === undefined) return null;

    return (
        <span className={className || 'inline-flex items-center gap-2 text-sm text-muted-foreground'}>
            <IconEye size={16} />
            {views} views
        </span>
    );
}

export function RelatedPostList({ posts, fallbackClassName = '' }: { posts: BlogPost[]; fallbackClassName?: string }) {
    if (posts.length === 0) {
        return (
            <Link href="/blog" className={fallbackClassName || 'inline-flex items-center gap-2 font-semibold text-primary'}>
                View all posts
                <IconArrowRight size={16} />
            </Link>
        );
    }

    return (
        <div className="space-y-3">
            {posts.map((item) => (
                <Link key={item.id} href={`/blog/${item.slug}`} className="group block rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/50">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary">{item.title}</h3>
                            {item.excerpt && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>}
                        </div>
                        <IconArrowRight size={16} className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                </Link>
            ))}
        </div>
    );
}
