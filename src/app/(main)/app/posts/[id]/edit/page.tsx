import { getBlogPostDetail } from "@/lib/actions/blog";
import { PostForm } from "../../post-form";
import {
    Page,
    PageAction,
    PageBody,
    PageDescription,
    PageHeader,
    PageHeading,
    PageTitle
} from "@/components/ui/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

export default async function EditPostPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const projectId = parseInt((await params).id);
    const post = await getBlogPostDetail(projectId);

    return (
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Edit Blog Post</PageTitle>
                    <PageDescription>
                        Update your article details
                    </PageDescription>
                </PageHeading>
                <PageAction>
                    <Link href="/app/posts">
                        <Button variant="outline">
                            <IconChevronLeft />
                            Back to Posts
                        </Button>
                    </Link>
                </PageAction>
            </PageHeader>

            <PageBody>
                <PostForm post={post.data} />
            </PageBody>
        </Page>
    );
}


export const metadata = {
    title: "Edit Post",
};
