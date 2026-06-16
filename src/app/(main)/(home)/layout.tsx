import { HomeHeader } from "@/components/home/header";
import { HomeFooter } from "@/components/home/footer";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <HomeHeader />
            <main className="flex-1">{children}</main>
            <HomeFooter />
        </div>
    );
}
