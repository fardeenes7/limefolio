'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Textarea } from 'src/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from 'src/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from 'src/components/ui/select';
import { Calendar } from 'src/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'src/components/ui/popover';
import { CalendarIcon, LoaderCircle, Upload } from 'lucide-react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

import * as React from 'react';
import { ChevronsUpDown, Plus, X } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from 'src/components/ui/collapsible';
import NovelEditor from '@/components/novel/editor';
import SEOSection from './seo';
import BasicForm from './forms/basic';
import { Form } from '@/components/ui/form';
import { updateProject } from '../server';
import { Sidebar } from './forms/sidebar';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters.'
    })
    .max(64, {
      message: 'title must be at most 64 characters.'
    }),
  description: z
    .string()
    .min(0)
    .max(1000, {
      message: 'Short description must be at most 1000 characters.'
    })
    .optional()
    .nullable(),
  content: z.any().optional().nullable(),
  meta_title: z
    .string()
    .max(256, { message: 'Maximum 256 characters' })
    .optional()
    .nullable(),
  meta_description: z
    .string()
    .max(256, { message: 'Maximum 256 characters' })
    .optional()
    .nullable(),
  meta_keywords: z
    .string()
    .max(256, { message: 'Maximum 256 characters' })
    .optional()
    .nullable(),
  media: z
    .array(
      z.object({
        image: z.string().optional().nullable(),
        video: z.string().optional().nullable(),
        media_type: z.string(),
        default: z.boolean().optional().nullable(),
        url: z.string().optional().nullable(),
        project: z.string().optional().nullable()
      })
    )
    .optional()
    .nullable()
});

export default function NewProjectPage({
  data,
  id
}: {
  data: any;
  id: string;
}) {
  const { refresh } = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    try {
      const res = await updateProject(values, id);
      if (!res.id) throw new Error('Project not found');
      toast('Project updated successfully');
      refresh();
    } catch (e) {
      toast('Failed to update project');
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-2 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <div className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <LoaderCircle className="size-4 animate-spin mr-1" />
              )}
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <BasicForm form={form} />
          </div>
          <div>
            <Sidebar form={form} />
          </div>
        </div>
      </form>
    </Form>

    // <div className="container mx-auto py-8">
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <div className="flex items-center justify-between">
    //       <h1 className="text-3xl font-bold">Create New Project</h1>
    //       <div className="flex justify-end">
    //         <Button type="submit" size="lg">
    //           Save Changes
    //         </Button>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //       <div className="col-span-2">
    //         <div className=" grid gap-6">
    //           <Card>
    //             <CardHeader>
    //               <CardTitle>Basic Information</CardTitle>
    //               <CardDescription>
    //                 Enter the core details of your project
    //               </CardDescription>
    //             </CardHeader>
    //             <CardContent className="space-y-4">
    //               <div className="space-y-2">
    //                 <Label htmlFor="title">Project Title</Label>
    //                 <Input
    //                   id="title"
    //                   value={title}
    //                   onChange={(e) => setTitle(e.target.value)}
    //                   required
    //                 />
    //               </div>
    //               <div className="space-y-2">
    //                 <Label htmlFor="projectType">Project Type</Label>
    //                 <Select onValueChange={setProjectType}>
    //                   <SelectTrigger>
    //                     <SelectValue placeholder="Select project type" />
    //                   </SelectTrigger>
    //                   <SelectContent>
    //                     <SelectItem value="web">Web Development</SelectItem>
    //                     <SelectItem value="mobile">Mobile App</SelectItem>
    //                     <SelectItem value="design">Design</SelectItem>
    //                     <SelectItem value="other">Other</SelectItem>
    //                   </SelectContent>
    //                 </Select>
    //               </div>
    //               <div className="space-y-2">
    //                 <Label htmlFor="shortDescription">Description</Label>
    //                 <NovelEditor
    //                   initialValue={{}}
    //                   onChange={(value) => console.log(value)}
    //                   // onChange={(value) => field.onChange(value)}
    //                 />
    //               </div>
    //             </CardContent>
    //           </Card>
    //         </div>
    //       </div>
    //       <div>
    //         <div className="grid grid-cols-1 gap-4">
    //           <Card>
    //             <CardHeader>
    //               <CardTitle>Media</CardTitle>
    //               <CardDescription>
    //                 Upload images and videos for your project
    //               </CardDescription>
    //             </CardHeader>
    //             <CardContent>
    //               <div className="space-y-4">
    //                 <div className="flex items-center justify-center w-full">
    //                   <label
    //                     htmlFor="media"
    //                     className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
    //                   >
    //                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
    //                       <Upload className="w-8 h-8 mb-4 text-gray-500" />
    //                       <p className="mb-2 text-sm text-gray-500">
    //                         <span className="font-semibold">
    //                           Click to upload
    //                         </span>{' '}
    //                         or drag and drop
    //                       </p>
    //                       <p className="text-xs text-gray-500">
    //                         SVG, PNG, JPG or GIF (MAX. 800x400px)
    //                       </p>
    //                     </div>
    //                     <Input
    //                       id="media"
    //                       type="file"
    //                       className="hidden"
    //                       onChange={handleMediaUpload}
    //                       multiple
    //                       accept="image/*,video/*"
    //                     />
    //                   </label>
    //                 </div>
    //                 {mediaFiles.length > 0 && (
    //                   <div className="space-y-2">
    //                     <Label>Selected Files:</Label>
    //                     <ul className="list-disc pl-5">
    //                       {mediaFiles.map((file, index) => (
    //                         <li key={index}>{file.name}</li>
    //                       ))}
    //                     </ul>
    //                   </div>
    //                 )}
    //               </div>
    //             </CardContent>
    //           </Card>
    //           <SEOSection />

    //           <AdditionalSection />
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
}
