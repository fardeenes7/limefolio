import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ExternalLink, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MediaForm({ form }: { form: any }) {
  return (
    <div className="px-2 space-y-3">
      <FormField
        control={form.control}
        name={`media` + `[0]` + `[file]`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Title</FormLabel>
            <FormControl>
              <Input placeholder="Custom meta title for SEO" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="divide-y">
        {form.getValues('media').map((media: any, index: number) => (
          <div key={index} className="py-1 flex items-center justify-between">
            <div className="flex gap-2 items-start">
              <div className="aspect-video h-16 rounded-lg overflow-hidden">
                {media.media_type == 'image' ? (
                  <Image
                    src={media.thumbnail}
                    alt="media"
                    width={160}
                    height={90}
                    className="size-full rounded-lg object-cover object-center"
                  />
                ) : (
                  <video
                    src={media.video}
                    controls={false}
                    className="rounded-lg"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  Type:
                  <strong className="capitalize">{media.media_type}</strong>
                </p>
                <p>
                  Size: <strong>{(media.size / 1024).toFixed(2)} KB</strong>
                </p>
              </div>
            </div>
            <Link
              href={media.media_type == 'image' ? media.image : media.video}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button" size="sm" variant="outline">
                View <ExternalLink className="size-4 ml-1" />
              </Button>
            </Link>
            <Button size="icon" variant="destructive">
              <Trash />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
