'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(5, 'Title must contain at least 5 characters').max(50),
  slug: z.string().min(5, 'Slug must contain at least 5 characters').max(50)
});

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createProject } from '../server';
import { LoaderCircle } from 'lucide-react';

export function ProjectForm() {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const data = await createProject(values);
      if (data.id) {
        toast('Project created successfully');
        push(`/dashboard/projects/${data.id}`);
      } else {
        throw new Error('Error creating project');
      }
    } catch (e) {
      toast('Error creating project', {
        description: 'Refresh the page and try again'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  onChange={(e) => {
                    form.setValue(
                      'slug',
                      e.target.value.toLowerCase().replace(/\s/g, '-')
                    );
                    field.onChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <LoaderCircle className="size-4 mr-1" />
            )}
            Create Project
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
