import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LimefolioLIcon } from "@/lib/icons";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href="/app"
                                className="flex items-center gap-2"
                            >
                                <LimefolioLIcon />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        Limefolio
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
                <NavSecondary className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <Suspense
                    fallback={
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Skeleton className="h-12 w-full" />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    }
                >
                    <NavUser />
                </Suspense>
            </SidebarFooter>
        </Sidebar>
    );
}
