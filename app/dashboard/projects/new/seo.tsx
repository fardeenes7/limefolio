'use client';

import * as React from 'react';
import { ChevronsUpDown, Plus, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function SEOSection() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className=" space-y-2"
      >
        <CardHeader className={`${isOpen && 'pb-2'}`}>
          <CollapsibleTrigger asChild>
            <div className="w-full flex flex-row items-center justify-between space-x-4">
              <CardTitle>Custom SEO</CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-9 p-0"
              >
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </div>
          </CollapsibleTrigger>
          <CardDescription>
            Optimize your project for search engines
          </CardDescription>
        </CardHeader>

        <CollapsibleContent className="space-y-2">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Meta Image</Label>
              <Input
                id="meta-image"
                placeholder="Custom image for social media"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-title">Meta Title</Label>
              <Input
                id="meta-title"
                placeholder="Custom meta title for search engines"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <Input
                id="meta-description"
                placeholder="Custom meta description for search engines"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta-keywords">Keywords</Label>
              <Input
                id="meta-keywords"
                placeholder="Separate keywords with commas"
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
