import { getBlogPostList } from "@/lib/actions/blog";
import { PostsClient } from "./posts-client";
import { Button } from "@/components/ui/button";
import {
    Page,
    PageAction,
    PageBody,
    PageDescription,
    PageHeader,
    PageHeading,
    PageTitle
} from "@/components/ui/page";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";

export default async function BlogPostsPage() {
    const response = await getBlogPostList();
    const posts = response.ok ? response.data || [] : [];

    console.log('------response' , response)

    return (
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Blog Posts</PageTitle>
                    <PageDescription>
                        Manage your blog posts and articles
                    </PageDescription>
                </PageHeading>
                {posts.length > 0 && (
                    <PageAction>
                        <Link href="/app/posts/new">
                            <Button>
                                <IconPlus />
                                New Post
                            </Button>
                        </Link>
                    </PageAction>
                )}
            </PageHeader>

            <PageBody>
                <PostsClient initialPosts={posts} />
            </PageBody>
        </Page>
    );
}
