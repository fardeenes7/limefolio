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
import { Facebook, Github, Google } from '@/components/icons';
import { Badge } from '@/components/ui/badge';

export default function LoginPage() {
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
          <form
            action={async () => {
              'use server';
              await signIn('google', {
                redirectTo: '/dashboard'
              });
            }}
            className="w-full"
          >
            <Button className="w-full flex gap-2" variant="outline">
              <Google className="size-5" />
              Sign in with Google
            </Button>
          </form>
          <form
            action={async () => {
              'use server';
              await signIn('facebook', {
                redirectTo: '/dashboard'
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
                redirectTo: '/dashboard'
              });
            }}
            className="w-full"
          >
            <Button disabled className="w-full flex gap-2" variant="outline">
              <Github className="size-5" />
              Sign in with Github <Badge>Upcoming</Badge>
            </Button>
          </form>
          {/* <form
            action={async () => {
              'use server';
              await signIn('github', {
                redirectTo: '/'
                });
                }}
                className="w-full"
                >
                <Button className="w-full">Sign in with GitHub</Button>
                </form> */}
        </CardContent>
      </Card>
    </div>
  );
}
