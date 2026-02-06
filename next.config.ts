// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:
                    "dcc5c4c1c37dff1b4eb228f790df4f03.r2.cloudflarestorage.com",
            },
            {
                protocol: "https",
                hostname: "pub-ab7cf654c486416aaa4c574f58d8fa7c.r2.dev",
            },
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
};

module.exports = withMDX(nextConfig);
