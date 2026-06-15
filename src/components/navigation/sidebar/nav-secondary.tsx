"use client";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { secondaryNavItems, useActiveItem } from "./items";

export function NavSecondary({
    ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const { isItemActive } = useActiveItem();

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {secondaryNavItems.map((item) => {
                        const isActive = isItemActive(item.url);
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild size="sm" isActive={isActive}>
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
