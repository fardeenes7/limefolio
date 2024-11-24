import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from 'src/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from 'src/components/ui/button';
import SubdomainSettings from './subdomain';
export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SubdomainSettings />
    </div>
  );
}
