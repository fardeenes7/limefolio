import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';

import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'src/components/ui/table';

export default function ProjectTable({ projects }: { projects: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Views</TableHead>

          <TableHead className="hidden md:table-cell">Last Updated</TableHead>
          <TableHead>
            <span className="">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt="Project image"
                className="aspect-video rounded-md object-cover"
                height="90"
                src={project.thumbnail ?? '/placeholder.svg'}
                width="160"
              />
            </TableCell>
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell>
              <Badge
                variant={project.status == 'published' ? 'default' : 'outline'}
                className="capitalize"
              >
                {project.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {project.views}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {new Date(project.last_updated).toDateString()}
            </TableCell>
            <TableCell>
              <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                <Button size="sm" variant="outline">
                  View Project
                </Button>
              </Link>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
