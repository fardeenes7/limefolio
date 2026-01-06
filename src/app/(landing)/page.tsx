import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { ArrowRight, Image, PenTool, Layout, Layers } from 'lucide-react';
import { SiteConfig } from '@/lib/site-config';

export default function Component() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-linear-to-br from-primary via-blue-500 to-primary text-transparent bg-clip-text  bg-300%  animate-gradient">
                Showcase Your Creative Journey
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Build a stunning portfolio, share your projects, and connect
                with the creative community. Your work, your story, all in one
                place.
              </p>
            </div>
            <div className="space-x-4">
              <Button>
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">Explore Portfolios</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Features that empower creatives
          </h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <Image className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Unlimited Project Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Showcase your work in detail with unlimited photos for each
                  project. 1024 MB free storage to get you started.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <PenTool className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Integrated Blogging</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Write blogs directly on your portfolio or connect your
                  existing Medium blog to share your creative process.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Layout className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Custom Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Create unique pages with our rich text editor. Design your
                  portfolio to match your personal brand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to showcase your talent?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Join thousands of creatives sharing their work and building
                their professional brand.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Sign Up Free</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No credit card required. Upgrade anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Choose the plan that fits your needs
          </h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Unlimited projects</li>
                  <li>Unlimited photos per project</li>
                  <li>1024 MB storage</li>
                  <li>Basic analytics</li>
                </ul>
                <Button className="w-full mt-4">Start Free</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>All Free features</li>
                  <li>Custom domain</li>
                  <li>Advanced analytics</li>
                  <li>Priority support</li>
                </ul>
                <Button className="w-full mt-4" disabled>
                  Join Waitlist
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>All Pro features</li>
                  <li>Unlimited storage</li>
                  <li>Team collaboration</li>
                  <li>API access</li>
                </ul>
                <Button className="w-full mt-4" disabled>
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
