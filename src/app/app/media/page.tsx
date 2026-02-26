import { getMediaList } from "@/lib/actions/media";
import { MediaClient } from "./media-client";

export default async function MediaPage() {
    const response = await getMediaList();
    const media = response.ok && response.data ? response.data : [];
console.log(media);
    return (
        <div className="container flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Media Library
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Upload and manage your images and videos
                    </p>
                </div>
            </div>

            <MediaClient initialMedia={media} />
        </div>
    );
}
