'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  { title: 'Profile', href: '/dashboard/settings/profile', icon: 'user' },
  {
    title: 'Appearance',
    href: '/dashboard/settings/appearance',
    icon: 'palette'
  },
  {
    title: 'Notifications',
    href: '/dashboard/settings/notifications',
    icon: 'bell'
  },
  { title: 'Display', href: '/dashboard/settings/display', icon: 'layout' },
  { title: 'Security', href: '/dashboard/settings/security', icon: 'shield' },
  {
    title: 'Billing',
    href: '/dashboard/settings/billing',
    icon: 'credit-card'
  }
];

import {
  User,
  Palette,
  Bell,
  Layout,
  Shield,
  CreditCard,
  Code
} from 'lucide-react';

const iconMap = {
  user: User,
  palette: Palette,
  bell: Bell,
  layout: Layout,
  shield: Shield,
  'credit-card': CreditCard,
  code: Code
};

export default function SettingsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <nav className="space-y-2 lg:sticky lg:top-8">
              {menuItems.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? 'default' : 'ghost'}
                    className={`w-full justify-start ${pathname != item.href && 'text-muted-foreground hover:text-foreground'}`}
                    asChild
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>
        </aside>
        <main className="flex-1 lg:max-w-2xl">{children}</main>
      </div>
    </div>
  );
}
