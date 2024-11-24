import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2
} from 'lucide-react';

import { Badge } from 'src/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from 'src/components/ui/breadcrumb';
import { Button } from 'src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from 'src/components/ui/card';

import { Input } from 'src/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from 'src/components/ui/pagination';
import { Progress } from 'src/components/ui/progress';
import { Separator } from 'src/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'src/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from 'src/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from 'src/components/ui/tooltip';
import ProjectTable from './table';
import { getProjects } from '../server';
import Filter from './filter';
import NewProjectButton from '../new';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Projects'
};

export default async function ProjectPage({
  searchParams
}: {
  searchParams: any;
}) {
  const data = await getProjects();
  if (!data) {
    return <div>Something wrong happened!</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            My Projects
          </h1>
          <NewProjectButton />
        </div>
        <div className="flex items-center gap-2">
          <Filter />
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="sr-only">Projects</CardTitle>
          <CardDescription className="sr-only">
            The list for your projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.count > 0 ? (
            <ProjectTable projects={data.results} />
          ) : (
            <div></div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
