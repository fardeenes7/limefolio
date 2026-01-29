"use client";

import * as React from "react";
import {
    IconLayoutDashboard,
    IconChartBar,
    IconActivity,
    IconTrendingUp,
    IconFileText,
    IconArticle,
    IconBriefcase,
    IconPhoto,
    IconWorld,
    IconGlobe,
    IconHierarchy,
    IconSearch,
    IconUsers,
    IconShieldLock,
    IconMailForward,
    IconKey,
    IconWebhook,
    IconPlug,
    IconCreditCard,
    IconReceipt,
    IconWallet,
    IconUser,
    IconBuilding,
    IconLock,
    IconListCheck,
    IconBook,
    IconHelp,
    IconHeartbeat,
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

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/dashboard",
                    icon: IconLayoutDashboard,
                },
            ],
        },

        {
            title: "Content",
            url: "/dashboard/content",
            items: [
                // {
                //     title: "Pages",
                //     url: "/dashboard/content/pages",
                //     icon: IconFileText,
                // },
                {
                    title: "Projects",
                    url: "/dashboard/content/projects",
                    icon: IconBriefcase,
                },
                {
                    title: "Experiences",
                    url: "/dashboard/content/experiences",
                    icon: IconBriefcase,
                },
                {
                    title: "Blog Posts",
                    url: "/dashboard/content/posts",
                    icon: IconArticle,
                },
                {
                    title: "Media Library",
                    url: "/dashboard/content/media",
                    icon: IconPhoto,
                },
            ],
        },

        // {
        //     title: "Analytics",
        //     url: "/dashboard/analytics",
        //     items: [
        //         {
        //             title: "Overview",
        //             url: "/dashboard/analytics/overview",
        //             icon: IconChartBar,
        //         },
        //         {
        //             title: "Traffic",
        //             url: "/dashboard/analytics/traffic",
        //             icon: IconActivity,
        //         },
        //         {
        //             title: "Engagement",
        //             url: "/dashboard/analytics/engagement",
        //             icon: IconUsers,
        //         },
        //         {
        //             title: "Conversions",
        //             url: "/dashboard/analytics/conversions",
        //             icon: IconTrendingUp,
        //         },
        //     ],
        // },

        {
            title: "Sites",
            url: "/dashboard/sites",
            items: [
                {
                    title: "Domains",
                    url: "/dashboard/sites/domains",
                    icon: IconGlobe,
                },
                {
                    title: "Subdomains",
                    url: "/dashboard/sites/subdomains",
                    icon: IconHierarchy,
                },
                {
                    title: "SEO Settings",
                    url: "/dashboard/sites/seo",
                    icon: IconSearch,
                },
            ],
        },

        {
            title: "Billing",
            url: "/dashboard/billing",
            items: [
                {
                    title: "Subscription",
                    url: "/dashboard/billing/subscription",
                    icon: IconCreditCard,
                },
                {
                    title: "Invoices",
                    url: "/dashboard/billing/invoices",
                    icon: IconReceipt,
                },
                {
                    title: "Payment Methods",
                    url: "/dashboard/billing/payment-methods",
                    icon: IconWallet,
                },
            ],
        },

        {
            title: "Settings",
            items: [
                {
                    title: "Profile",
                    url: "/dashboard/settings/profile",
                    icon: IconUser,
                },
                {
                    title: "Site Settings",
                    url: "/dashboard/settings/site",
                    icon: IconWorld,
                },
                {
                    title: "API Keys",
                    url: "/dashboard/settings/api-keys",
                    icon: IconKey,
                },
                {
                    title: "Security",
                    url: "/dashboard/settings/security",
                    icon: IconLock,
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "/support",
            icon: IconLifebuoy,
        },
        {
            title: "Feedback",
            url: "/feedback",
            icon: IconSend,
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: IconHttpPost,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: IconHttpPost,
        },
        {
            name: "Travel",
            url: "#",
            icon: IconHttpPost,
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
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <IconHttpPost className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        Acme Inc
                                    </span>
                                    <span className="truncate text-xs">
                                        Enterprise
                                    </span>
                                </div>
                            </a>
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
