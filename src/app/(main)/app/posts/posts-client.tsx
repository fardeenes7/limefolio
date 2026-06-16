"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty";
import {
    IconPlus,
    IconPencil,
    IconTrash,
    IconStar,
    IconStarFilled,
    IconArticle,
    IconEye
} from "@tabler/icons-react";
import { deleteBlogPost, updateBlogPost, toggleBlogPostFeatured } from "@/lib/actions/blog";
import { BlogPost } from "@/types";
import Image from "next/image";

interface PostsClientProps {
    initialPosts: BlogPost[];
}

export function PostsClient({ initialPosts }: PostsClientProps) {
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        const response = await deleteBlogPost(id);
        if (response.ok) {
            setPosts((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const handleToggleFeatured = async (id: number, featured: boolean) => {
        const response = await toggleBlogPostFeatured(id, !featured);
        if (response.ok && response.data) {
            setPosts((prev) =>
                prev.map((p) =>
                    p.id === id ? { ...p, is_featured: !featured } : p
                )
            );
        }
    };

    if (initialPosts.length === 0) {
        return (
            <Empty className="border-2">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <IconArticle />
                    </EmptyMedia>
                    <EmptyTitle>No blog posts yet</EmptyTitle>
                    <EmptyDescription>
                        Create your first blog post to share your expertise.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button onClick={() => router.push("/app/posts/new")}>
                        <IconPlus />
                        Create Post
                    </Button>
                </EmptyContent>
            </Empty>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <Card
                    key={post.id}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 py-0 gap-2 flex flex-col"
                >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-muted shrink-0">
                        {post.thumbnail ? (
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <IconArticle className="w-12 h-12 text-muted-foreground opacity-50" />
                            </div>
                        )}

                        {/* Featured Badge */}
                        {post.is_featured && (
                            <div className="absolute top-2 right-2">
                                <Badge className="bg-yellow-500 text-white">
                                    <IconStarFilled className="w-3 h-3 mr-1" />
                                    Featured
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col">
                        <div>
                            <h3 className="font-semibold line-clamp-2">
                                {post.title}
                            </h3>
                            {post.excerpt && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {post.excerpt}
                                </p>
                            )}
                        </div>

                        <div className="flex-1" />

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                                {post.reading_time} min read
                            </Badge>
                            <Badge
                                variant={
                                    post.status === "published" ? "default" : post.status === "archived" ? "destructive" : "outline"
                                }
                                className="text-xs capitalize"
                            >
                                {post.status}
                            </Badge>
                            <span className="flex items-center ml-auto gap-1">
                                <IconEye className="size-3.5" />
                                {post.view_count}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t mt-3">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                    handleToggleFeatured(
                                        post.id,
                                        post.is_featured
                                    )
                                }
                                className="flex-1"
                            >
                                {post.is_featured ? (
                                    <IconStarFilled className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                                ) : (
                                    <IconStar className="w-3.5 h-3.5 mr-1" />
                                )}
                                {post.is_featured ? "Unfeature" : "Feature"}
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                    router.push(
                                        `/app/posts/${post.id}/edit`
                                    )
                                }
                            >
                                <IconPencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(post.id)}
                            >
                                <IconTrash className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
