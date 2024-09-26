import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  return (
    <section className="size-full flex flex-col items-center justify-center font-bold text-lg">
      Coming Soon
    </section>
  );
}
