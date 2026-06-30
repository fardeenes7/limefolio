import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Features | Limefolio",
    description: "Everything you need to build a stunning portfolio. Lightning fast, customizable, and optimized for conversions.",
});

export default function FeaturesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
