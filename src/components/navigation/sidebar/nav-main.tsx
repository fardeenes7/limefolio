"use client";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { primaryNavItems, useActiveItem } from "./items";

export function NavMain() {
    const { isItemActive } = useActiveItem();

    return (
        <>
            {primaryNavItems.map((section) => (
                <SidebarGroup key={section.title}>
                    <SidebarGroupLabel>{section.title}</SidebarGroupLabel>

                    {section.items?.length ? (
                        <SidebarMenu>
                            {section.items?.map((item) => {
                                const isActive = isItemActive(item.url);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className="h-8"
                                            tooltip={item.title}
                                        >
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    ) : null}
                </SidebarGroup>
            ))}
        </>
    );
}
