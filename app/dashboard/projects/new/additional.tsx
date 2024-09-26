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

export default function AdditionalSection() {
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
              <CardTitle>Additional Information</CardTitle>

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
            Add extra details about your project
          </CardDescription>
        </CardHeader>

        <CollapsibleContent className="space-y-2">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name (optional)</Label>
              <Input id="clientName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectUrl">Project URL (optional)</Label>
              <Input id="projectUrl" type="url" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectUrl">Github URL (optional)</Label>
              <Input id="githubUrl" type="url" />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
