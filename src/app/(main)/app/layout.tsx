import { AppSidebar } from "@/components/navigation/sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Dashboard",
    noIndex: true,
});


export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="py-10 lg:py-20 px-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
