import { SiteConfig } from 'src/lib/site-config';
import Link from 'next/link';
import {
  FolderKanban,
  Globe,
  Home,
  Images,
  LineChart,
  NotebookPen,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2
} from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from 'src/components/ui/breadcrumb';
import { Button } from 'src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from 'src/components/ui/tooltip';
import { User } from '../(landing)/user';
import Providers from './providers';
import { NavItem } from '../../components/nav/dashboard/nav-item';
import { SearchInput } from './search';
import { DynamicBreadcrumbs } from './breadcrumb';
import Image from 'next/image';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }

  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar user={session?.user} />
        <SidebarInset className="bg-muted relative">
          <header className="bg-sidebar border-b flex sticky top-0 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumbs />
            </div>
          </header>
          <div className="p-4 container h-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  );
}
