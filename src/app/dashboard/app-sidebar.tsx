'use client';

import * as React from 'react';

import {
  BookOpen,
  BriefcaseBusiness,
  GalleryVerticalEnd,
  Globe,
  Home,
  KeyIcon,
  NotebookPen,
  StickyNote,
  User,
  Settings
} from 'lucide-react';

import { NavMain } from '@/components/nav/dashboard/nav-main';
import { NavUser } from '@/components/nav/dashboard/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { SiteConfig } from '@/lib/site-config';
import Image from 'next/image';

// This is sample data.
const data = {
  nav: [
    {
      title: 'Platform',
      items: [
        {
          title: 'Home',
          url: '/dashboard',
          icon: Home
        },
        {
          title: 'Projects',
          url: '/dashboard/projects',
          icon: BriefcaseBusiness
        },
        {
          title: 'Blog Posts',
          url: '/dashboard/blog',
          icon: NotebookPen
        },
        {
          title: 'Pages',
          url: '/dashboard/pages',
          icon: StickyNote
        },

        {
          title: 'Guide',
          url: '#',
          icon: BookOpen,
          items: [
            {
              title: 'Introduction',
              url: '/dashboard/guide'
            },
            {
              title: 'Get Started',
              url: '/dashboard/guide/get-started'
            },
            {
              title: 'Tutorials',
              url: '/dashboard/guide/tutorials'
            },
            {
              title: 'Changelog',
              url: '/dashboard/guide/changelog'
            }
          ]
        },
        {
          title: 'Settings',
          url: '/dashboard/settings',
          icon: Settings
        }
      ]
    }
    // {
    //   title: 'Settings',
    //   items: [
    //     {
    //       title: 'Wesbite',
    //       url: '/dashboard/settings',
    //       icon: Globe
    //     },
    //     {
    //       title: 'Profile',
    //       url: '/dashboard/settings/profile',
    //       icon: User
    //     },
    //     {
    //       title: 'Authentication',
    //       url: '/dashboard/settings/authentication',
    //       icon: KeyIcon
    //     }
    //   ]
    // }
  ]
};

export function AppSidebar({
  user,
  ...props
}: any & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                  <Image
                    src="/icon.svg"
                    alt={SiteConfig.title}
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{SiteConfig.title}</span>
                  <span className="">v{SiteConfig.version ?? '0.0.0'}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.nav.map((nav) => (
          <NavMain key={nav.title} data={nav} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
