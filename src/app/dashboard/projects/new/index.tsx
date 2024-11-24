import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { ProjectForm } from './form';

export default function NewProjectButton() {
  return (
    <ProjectDialog>
      <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
        <Plus className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only">New Project</span>
      </Button>
    </ProjectDialog>
  );
}

export function NewProjectHomePageButton() {
  return (
    <ProjectDialog>
      <Button variant="outline" className="w-full h-auto flex flex-col gap-2">
        <Plus className="size-6 mx-auto" />
        New Project
      </Button>
    </ProjectDialog>
  );
}

function ProjectDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Start by giving your project a title and an seo friendly slug.
          </DialogDescription>
          <ProjectForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
