import type { Metadata } from "next";

export function constructMetadata({
    title = "Limefolio",
    description = "Create stunning portfolio websites in minutes.",
    image,
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
} = {}): Metadata {
    const ogImage = image 
        ? `/api/og?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}`
        : `/api/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
