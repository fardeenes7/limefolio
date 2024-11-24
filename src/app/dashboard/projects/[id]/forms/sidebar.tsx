import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEOForm from './seo';
import MediaForm from './media';

export function Sidebar({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader className="p-0">
        <CardTitle className="sr-only">Other Sections of the form</CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <Accordion
          type="single"
          defaultValue="images"
          collapsible
          className="w-full"
        >
          <AccordionItem value="images">
            <AccordionTrigger>Images</AccordionTrigger>
            <AccordionContent>
              <MediaForm form={form} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="seo">
            <AccordionTrigger>Custom SEO</AccordionTrigger>
            <AccordionContent>
              <SEOForm form={form} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="others">
            <AccordionTrigger>Others</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
