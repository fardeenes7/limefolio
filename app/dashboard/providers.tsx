'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Next13ProgressBar } from 'next13-progressbar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Next13ProgressBar
        height="4px"
        color="#ADFA1D"
        options={{ showSpinner: true }}
        showOnShallow
      />

      {children}
    </TooltipProvider>
  );
}
