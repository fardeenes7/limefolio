import { Button } from 'src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from 'src/components/ui/card';
import { signIn } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { SiteConfig } from '@/lib/site-config';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Chrome, Github, Facebook } from 'lucide-react';

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const {error} = await searchParams

  return (
    <div className="min-h-full flex flex-col justify-center items-center p-8">
      <Card className=" w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            <Link href="/">
              <Image
                src="/icon.svg"
                width={32}
                height={32}
                alt="limefolio"
                className="inline-block mr-2"
              />
            </Link>
            Login to {SiteConfig.title}
          </CardTitle>
          <CardDescription>Login to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error === 'OAuthAccountNotLinked'
                  ? 'This email is already associated with another account. Please use a different sign-in method.'
                  : error === 'OAuthCallback'
                    ? 'Authentication failed. Please try again.'
                    : error === 'Configuration'
                      ? 'There is a problem with the server configuration. Please contact support.'
                      : 'An error occurred during sign in. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          <form
            action={async () => {
              'use server';
              await signIn('google', {
                redirectTo: '/app'
              });
            }}
            className="w-full"
          >
            <Button className="w-full flex gap-2" variant="outline">
              <Chrome className="size-5" />
              Sign in with Google
            </Button>
          </form>
          <form
            action={async () => {
              'use server';
              await signIn('facebook', {
                redirectTo: '/app'
              });
            }}
            className="w-full"
          >
            <Button disabled className="w-full flex gap-2" variant="outline">
              <Facebook className="size-5" />
              Sign in with Facebook <Badge>Upcoming</Badge>
            </Button>
          </form>
          <form
            action={async () => {
              'use server';
              await signIn('github', {
                redirectTo: '/app'
              });
            }}
            className="w-full"
          >
            <Button className="w-full flex gap-2" variant="outline">
              <Github className="size-5" />
              Sign in with Github
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
