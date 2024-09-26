import './globals.css';
import { Space_Grotesk } from 'next/font/google';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

const space_grotesk = Space_Grotesk({
  display: 'swap',
  subsets: ['latin']
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen w-full flex-col ${space_grotesk.className}`}
      >
        {children}
      </body>
    </html>
  );
}
