import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.limefolio.com"),
    title: {
        template: "%s | Limefolio",
        default: "Limefolio",
    },
    description: "Create stunning portfolio websites in minutes.",
    openGraph: {
        title: "Limefolio",
        description: "Create stunning portfolio websites in minutes.",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/api/og",
                width: 1200,
                height: 630,
            },
        ],
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png" }],
    },
    manifest: "/site.webmanifest",
    robots: {
        index: false,
        follow: false,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={outfit.variable}>
            <GoogleTagManager gtmId="GTM-PDSBXRH5" />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
