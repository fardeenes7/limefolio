import Link from 'next/link';
import { SiteConfig } from '@/lib/site-config';
import Image from 'next/image';
import { User } from './user';

export default function Header() {
  return (
    <div className="w-full sticky top-0 bg-background">
      <header className=" container px-4 lg:px-6 h-14 flex items-center ">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/icon.svg"
            alt={SiteConfig.title}
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="ml-2 text-xl font-extrabold uppercase">
            {SiteConfig.title}
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/explore"
          >
            Explore
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/blog"
          >
            Blog
          </Link>
          <User />
        </nav>
      </header>
    </div>
  );
}
