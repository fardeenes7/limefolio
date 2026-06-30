import { Button } from "@/components/ui/button";
import { PostForm } from "../post-form";
import {
    Page,
    PageAction,
    PageBody,
    PageDescription,
    PageHeader,
    PageHeading,
    PageTitle,
} from "@/components/ui/page";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

export default function NewPostPage() {
    return (
        <Page>
            <PageHeader>
                <PageHeading>
                    <PageTitle>Create New Blog Post</PageTitle>
                    <PageDescription>
                        Write a new article for your blog
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
                <PostForm />
            </PageBody>
        </Page>
    );
}


export const metadata = {
    title: "New Post",
};
