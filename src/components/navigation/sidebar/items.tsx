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
    IconLifebuoy,
    IconSend,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export const primaryNavItems = [
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
        url: "/app",
        items: [
            {
                title: "Projects",
                url: "/app/projects",
                icon: IconBriefcase,
            },
            {
                title: "Experience",
                url: "/app/experiences",
                icon: IconActivity,
            },
            {
                title: "Skills",
                url: "/app/skills",
                icon: IconCode,
            },
            {
                title: "Blog Posts",
                url: "/app/posts",
                icon: IconArticle,
            },
            {
                title: "Media Library",
                url: "/app/media",
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
                title: "Billing & Subscription",
                url: "/app/billing",
                icon: IconCreditCard,
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

export const secondaryNavItems = [
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
];

export function useActiveItem() {
    const pathname = usePathname();

    const allUrls = [
        ...primaryNavItems.flatMap((s) => s.items?.map((i) => i.url) || []),
        ...secondaryNavItems.map((i) => i.url),
    ].filter(Boolean);

    const activeUrl = allUrls
        .sort((a, b) => b.length - a.length)
        .find((u) => pathname === u || pathname?.startsWith(`${u}/`));

    const isItemActive = (url: string) => {
        return url === activeUrl;
    };

    return { isItemActive };
}
