import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Templates | Limefolio",
    description: "Start with a solid foundation. Find your perfect portfolio template.",
});

export default function TemplatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
