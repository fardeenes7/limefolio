"use client";
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
    IconLink,
} from "@tabler/icons-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TablerIcon } from "@tabler/icons-react";
import Link from "next/link";

const sections = [
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
            {
                title: "Social Links",
                url: "/app/social-links",
                icon: IconLink,
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
];

import { usePathname } from "next/navigation";

export function NavMain() {
    const pathname = usePathname();

    const isItemActive = (url: string) => {
        if (url === "/app" && pathname === "/app") return true;
        if (url !== "/app" && pathname?.startsWith(url)) return true;
        return false;
    };

    return (
        <>
            {sections.map((section) => (
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
