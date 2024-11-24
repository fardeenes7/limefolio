'use client';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { useQueryState } from 'nuqs';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu';

const options = [
  {
    title: 'All',
    value: null
  },
  {
    title: 'Published',
    value: 'published'
  },
  {
    title: 'Draft',
    value: 'draft'
  }
];
export default function Filter() {
  const [status, setStatus] = useQueryState('status');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            checked={status == option.value}
            onSelect={() => setStatus(option.value)}
          >
            {option.title}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
