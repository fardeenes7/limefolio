import SiteConfig from '@/lib/site-config';
import Link from 'next/link';
import {
  FolderKanban,
  Globe,
  Home,
  Images,
  LineChart,
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
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { User } from './user';
import { VercelLogo } from '@/components/icons';
import Providers from './providers';
import { NavItem } from './nav-item';
import { SearchInput } from './search';
import { DynamicBreadcrumbs } from './breadcrumb';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { href: '/dashboard/media', label: 'Media', icon: Images },
  { href: '/dashboard/site', label: 'Portfolio Settings', icon: Globe }
];

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="min-h-screen w-full grid sm:grid-cols-[16rem_1fr] bg-muted/40">
        <DesktopNav />
        <div className="w-full flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <DynamicBreadcrumbs />
            <SearchInput />
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="w-full inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col gap-6 px-4 sm:py-5 text-sm">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
          <span className="sr-only">{SiteConfig.name}</span>
        </Link>
        <div className="flex flex-col gap-2">
          {navLinks.map((item, idx) => (
            <NavItem key={idx} href={item.href} label={item.label}>
              <item.icon className="h-5 w-5" />
            </NavItem>
          ))}
        </div>
      </nav>
      <nav className="w-full mt-auto  px-2 sm:py-5">
        <NavItem href="#" label="Settings">
          <Settings className="h-5 w-5" />
        </NavItem>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <div className="flex flex-col gap-2">
            {navLinks.map((item, idx) => (
              <NavItem key={idx} href={item.href} label={item.label}>
                <item.icon className="h-5 w-5" />
              </NavItem>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
