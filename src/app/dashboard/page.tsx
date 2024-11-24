import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from 'src/components/ui/tabs';
import {
  BriefcaseBusiness,
  File,
  Plus,
  PlusCircle,
  Settings2
} from 'lucide-react';
import { Button } from 'src/components/ui/button';
import { auth } from '@/auth';
import Link from 'next/link';
import { NewProjectHomePageButton } from './projects/new';

export const metadata = {
  title: 'Dashboard',
  description: 'Limefolio user dashboard'
};

const tabs = [
  {
    title: 'My Projects',
    href: '/dashboard/projects',
    icon: BriefcaseBusiness
  },
  { title: 'New Project', content: NewProjectHomePageButton, icon: Plus },
  { title: 'My Blogs', href: '/dashboard/blog', icon: Settings2 },
  { title: 'New Blog', href: '/dashboard/blog/new', icon: Plus }
];

export default async function HomePage() {
  const session = await auth();
  return (
    <section className="size-full ">
      <div className="mx-auto  size-full max-w-xl flex flex-col gap-8 items-center justify-center">
        <h1 className="font-extrabold text-2xl md:text-4xl lg:text-6xl xl:text-7xl bg-gradient-to-br from-primary to-blue-800 bg-clip-text text-transparent bg-300% animate-gradient">
          Hello,
          <br /> {session?.user.name}!
        </h1>
        <div className="w-full grid grid-cols-4 gap-4">
          {tabs.map((tab) =>
            tab.content ? (
              <tab.content />
            ) : (
              <Link href={tab.href} key={tab.href} className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-auto flex flex-col gap-2"
                >
                  <tab.icon className="size-6 mx-auto" />
                  {tab.title}
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
