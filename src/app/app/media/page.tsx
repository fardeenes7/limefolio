import { getMediaList } from "@/lib/actions/media";
import { MediaClient } from "./media-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Media Library",
    description: "Media Library",
};

export default async function MediaPage() {
    const response = await getMediaList();
    const media = response.ok && response.data ? response.data : [];

    return (
        <div className="container flex flex-col gap-6">
           

            <MediaClient initialMedia={media} />
        </div>
    );
}
