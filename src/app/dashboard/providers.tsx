'use client';

import { TooltipProvider } from 'src/components/ui/tooltip';
import { Next13ProgressBar } from 'next13-progressbar';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NuqsAdapter>
        <TooltipProvider>
          <Next13ProgressBar
            height="4px"
            color="#ADFA1D"
            options={{ showSpinner: true }}
            showOnShallow
          />

          {children}
        </TooltipProvider>
      </NuqsAdapter>
    </SessionProvider>
  );
}
