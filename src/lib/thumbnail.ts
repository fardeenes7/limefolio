/**
 * Thumbnail generation utilities for images and videos.
 * All operations run client-side using Canvas API and HTMLVideoElement.
 */

const THUMBNAIL_WIDTH = 600;
const THUMBNAIL_HEIGHT = 337;
const THUMBNAIL_QUALITY = 0.78;

/**
 * Generate a thumbnail blob from an image File by drawing it onto a canvas
 * and resizing it to a standard size.
 */
export async function generateImageThumbnail(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Canvas context unavailable"));

            // Maintain aspect ratio while fitting within THUMBNAIL_WIDTH x THUMBNAIL_HEIGHT
            const scale = Math.min(
                THUMBNAIL_WIDTH / img.width,
                THUMBNAIL_HEIGHT / img.height,
            );
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => {
                    if (blob) resolve(blob);
                    else
                        reject(new Error("Failed to generate image thumbnail"));
                },
                "image/jpeg",
                THUMBNAIL_QUALITY,
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Failed to load image for thumbnail generation"));
        };

        img.src = objectUrl;
    });
}

/**
 * Seek a video element to a specific time and capture a frame as a Blob.
 */
function captureVideoFrame(
    video: HTMLVideoElement,
    time: number,
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const onSeeked = () => {
            video.removeEventListener("seeked", onSeeked);
            const canvas = document.createElement("canvas");

            // Maintain aspect ratio
            const scale = Math.min(
                THUMBNAIL_WIDTH / video.videoWidth,
                THUMBNAIL_HEIGHT / video.videoHeight,
            );
            canvas.width = Math.round(video.videoWidth * scale);
            canvas.height = Math.round(video.videoHeight * scale);

            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Canvas context unavailable"));

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error("Failed to capture video frame"));
                },
                "image/jpeg",
                THUMBNAIL_QUALITY,
            );
        };

        video.addEventListener("seeked", onSeeked);
        video.currentTime = time;
    });
}

/**
 * Generate a thumbnail from a video File.
 * Tries to capture a frame at 10% into the video, then at 0s as fallback.
 */
export async function generateVideoThumbnail(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        const objectUrl = URL.createObjectURL(file);

        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;

        video.onloadedmetadata = async () => {
            try {
                const seekTime = video.duration > 0 ? video.duration * 0.1 : 0;
                const blob = await captureVideoFrame(video, seekTime);
                URL.revokeObjectURL(objectUrl);
                video.src = "";
                resolve(blob);
            } catch {
                // Fallback: try at 0s
                try {
                    const blob = await captureVideoFrame(video, 0);
                    URL.revokeObjectURL(objectUrl);
                    video.src = "";
                    resolve(blob);
                } catch (err) {
                    URL.revokeObjectURL(objectUrl);
                    video.src = "";
                    reject(err);
                }
            }
        };

        video.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Failed to load video for thumbnail generation"));
        };

        video.src = objectUrl;
    });
}

/**
 * Convert a Blob to a local object URL for preview purposes.
 * Remember to call URL.revokeObjectURL when done.
 */
export function blobToPreviewUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
}

/**
 * Convert a thumbnail Blob to a File object suitable for upload.
 */
export function thumbnailBlobToFile(blob: Blob, basename: string): File {
    const name = `thumb_${basename.replace(/\.[^/.]+$/, "")}.jpg`;
    return new File([blob], name, { type: "image/jpeg" });
}
