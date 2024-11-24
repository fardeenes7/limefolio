'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from 'src/components/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`px-4 py-2 flex gap-4 items-center justify-start rounded-lg text-muted-foreground transition-colors ',
            ${pathname === href ? 'bg-muted text-black' : 'hover:bg-muted hover:text-foreground'}
          `}
        >
          {children}
          <span className="text-sm">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
