import { AppSidebar } from "@/components/navigation/sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="py-10 lg:py-20 px-6">
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
