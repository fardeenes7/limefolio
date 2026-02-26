import { getPresignedURL } from "@/lib/actions/media";

/**
 * Upload a file directly to S3 via presigned URL.
 * Used for videos (large files that should bypass Django's request limit).
 */
export async function uploadToS3(file: File): Promise<string> {
    const presignedResponse = await getPresignedURL({
        filename: file.name,
        content_type: file.type,
        file_size: file.size,
    });

    if (!presignedResponse.ok || !presignedResponse.data) {
        throw new Error("Failed to get presigned upload URL");
    }

    const { upload_url, public_url } = presignedResponse.data;

    const uploadResponse = await fetch(upload_url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
    });

    if (!uploadResponse.ok)
        throw new Error("Failed to upload video to storage");

    return public_url;
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
