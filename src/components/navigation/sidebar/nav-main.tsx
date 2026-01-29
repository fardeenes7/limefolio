"use client";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TablerIcon } from "@tabler/icons-react";
import Link from "next/link";

export function NavMain({
    sections,
}: {
    sections: {
        title: string;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
            icon: TablerIcon;
        }[];
    }[];
}) {
    return (
        <>
            {sections.map((section) => (
                <SidebarGroup key={section.title}>
                    <SidebarGroupLabel>{section.title}</SidebarGroupLabel>

                    {section.items?.length ? (
                        <SidebarMenu>
                            {section.items?.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="h-8">
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    ) : null}
                </SidebarGroup>
            ))}
        </>
    );
}
