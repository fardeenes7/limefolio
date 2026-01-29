"use client";

import * as React from "react";
import {
    IconLayoutDashboard,
    IconChartBar,
    IconActivity,
    IconArticle,
    IconBriefcase,
    IconPhoto,
    IconGlobe,
    IconSearch,
    IconKey,
    IconCreditCard,
    IconReceipt,
    IconUser,
    IconPalette,
    IconCode,
    IconWorld,
} from "@tabler/icons-react";

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
import { IconHttpPost, IconLifebuoy, IconSend } from "@tabler/icons-react";
import Link from "next/link";
import { LimefolioLIcon } from "@/lib/icons";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Overview",
            url: "/app",
            isActive: true,
            items: [
                {
                    title: "Dashboard",
                    url: "/app",
                    icon: IconLayoutDashboard,
                },
                {
                    title: "Analytics",
                    url: "/app/analytics",
                    icon: IconChartBar,
                },
            ],
        },

        {
            title: "Portfolio Content",
            url: "/app/content",
            items: [
                {
                    title: "Projects",
                    url: "/app/content/projects",
                    icon: IconBriefcase,
                },
                {
                    title: "Experience",
                    url: "/app/content/experiences",
                    icon: IconActivity,
                },
                {
                    title: "Skills",
                    url: "/app/content/skills",
                    icon: IconCode,
                },
                {
                    title: "Blog Posts",
                    url: "/app/content/posts",
                    icon: IconArticle,
                },
                {
                    title: "Media Library",
                    url: "/app/content/media",
                    icon: IconPhoto,
                },
            ],
        },

        {
            title: "Site Settings",
            url: "/app/site",
            items: [
                {
                    title: "Site",
                    url: "/app/site",
                    icon: IconWorld,
                },
                {
                    title: "Domains",
                    url: "/app/site/domains",
                    icon: IconGlobe,
                },
                {
                    title: "Appearance",
                    url: "/app/site/appearance",
                    icon: IconPalette,
                },
            ],
        },

        {
            title: "Account",
            url: "/app/account",
            items: [
                {
                    title: "Subscription",
                    url: "/app/billing/subscription",
                    icon: IconCreditCard,
                },
                {
                    title: "Billing & Invoices",
                    url: "/app/billing/invoices",
                    icon: IconReceipt,
                },
                {
                    title: "Profile Settings",
                    url: "/app/settings/profile",
                    icon: IconUser,
                },
                {
                    title: "API Keys",
                    url: "/app/settings/api-keys",
                    icon: IconKey,
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "/app/support",
            icon: IconLifebuoy,
        },
        {
            title: "Feedback",
            url: "/app/feedback",
            icon: IconSend,
        },
    ],
};

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
                <NavMain sections={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
