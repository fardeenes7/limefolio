// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface UploadedMedia {
    id: number;
    url: string;
    thumbnail_url?: string | null;
    media_type: string;
    alt: string;
    caption: string;
    is_featured?: boolean;
}

/** A file that has been selected but not yet confirmed for upload */
export interface StagedFile {
    file: File;
    mediaType: "image" | "video";
    /** Auto-generated thumbnail blob (filled async after staging) */
    thumbBlob?: Blob;
    /** Preview URL for the generated thumbnail */
    thumbPreview?: string;
    /** User-selected custom thumbnail file */
    customThumbFile?: File;
    /** Preview URL for the custom thumbnail */
    customThumbPreview?: string;
    /** Whether thumbnail is still being generated */
    thumbGenerating: boolean;
}

export interface UploadStatus {
    file: File;
    mediaType: "image" | "video";
    status: "pending" | "uploading" | "success" | "error";
    progress: number;
    error?: string;
    thumbBlob?: Blob;
    customThumbFile?: File;
    thumbPreview?: string;
    customThumbPreview?: string;
}

export interface MediaUploaderProps {
    onUploadComplete?: (media: UploadedMedia[]) => void;
    onSuccess?: (media: UploadedMedia) => void;
    maxFiles?: number;
    mode?: "dialog" | "inline";
    buttonLabel?: string;
}
