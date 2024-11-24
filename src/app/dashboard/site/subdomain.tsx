'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from 'src/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from 'src/components/ui/card';

const formSchema = z.object({
  subdomain: z
    .string()
    .min(3, {
      message: 'Subdomain must be at least 3 characters.'
    })
    .max(20, {
      message: 'Subdomain must be at most 20 characters.'
    })
    .regex(/^[a-z0-9-]+$/, {
      message:
        'Subdomain must only contain lowercase letters, numbers, and hyphens.'
    })
});

export default function SubdomainForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subdomain: ''
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Subdomain</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="fardeen" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be used to access your site.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
